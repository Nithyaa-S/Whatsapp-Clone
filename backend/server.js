// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (use environment variable)
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set. Set it in .env or your host environment.');
  process.exit(1);
}
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API router
const apiRouter = express.Router();

/* ========== ROUTES ========== */

// GET /api/conversations
apiRouter.get('/conversations', async (req, res) => {
  try {
    const latestMessages = await Message.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$wa_id',
          name: { $first: '$name' },
          number: { $first: '$number' },
          lastMessage: { $first: '$message' },
          lastTimestamp: { $first: '$timestamp' },
          unreadCount: { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } }
        }
      },
      { $sort: { lastTimestamp: -1 } }
    ]);
    res.json(latestMessages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/messages/:wa_id
apiRouter.get('/messages/:wa_id', async (req, res) => {
  try {
    const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/send
apiRouter.post('/send', async (req, res) => {
  try {
    const { wa_id, name, number, message } = req.body;
    const newMessage = await Message.create({
      wa_id,
      name,
      number,
      message,
      timestamp: new Date(),
      status: 'sent',
      message_id: `local-${Date.now()}`,
      meta_msg_id: `local-${Date.now()}`
    });
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/webhook
apiRouter.post('/webhook', async (req, res) => {
  try {
    const payload = req.body;
    console.log('📥 Received webhook payload:', JSON.stringify(payload, null, 2));

    // Accept either payload.entry or payload.metaData.entry (fallback)
    const entries = payload?.entry || payload?.metaData?.entry || [];

    for (const entry of entries) {
      const changes = entry?.changes || [];

      for (const change of changes) {
        const value = change?.value || {};

        // Process messages
        if (value.messages && value.contacts) {
          for (let i = 0; i < value.messages.length; i++) {
            const msg = value.messages[i];
            const contact = value.contacts[i] || value.contacts[0];

            await Message.create({
              wa_id: contact.wa_id,
              name: contact.profile?.name || 'Unknown',
              number: msg.from,
              message: msg.text?.body || 'Media/Other Message',
              timestamp: msg.timestamp ? new Date(Number(msg.timestamp) * 1000) : new Date(),
              status: 'sent',
              message_id: msg.id || '',
              meta_msg_id: msg.meta?.meta_msg_id || ''
            });
          }
        }

        // Process statuses
        if (value.statuses) {
          for (const status of value.statuses) {
            await Message.updateOne(
              {
                $or: [
                  { message_id: status.id },
                  { meta_msg_id: status.meta_msg_id }
                ]
              },
              { status: status.status }
            );
          }
        }
      }
    }

    res.status(200).json({ success: true, message: 'Webhook processed successfully' });
  } catch (err) {
    console.error('❌ Webhook processing error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Mount API routes UNDER /api
app.use('/api', apiRouter);

/* ---------- Serve frontend (production) ---------- */
/* This must come AFTER the API routes so /api/* continues to work. */
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

/* ---------- Start server ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
