const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://nithyaasridhar:SLDVJrreKq2GQrSh@cluster0.vci7zmq.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Create router to prefix all routes with /api
const apiRouter = express.Router();

/* ========== ROUTES ========== */

// ✅ GET /api/conversations → unique wa_id + last message
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

// ✅ GET /api/messages/:wa_id → all messages with that user
apiRouter.get('/messages/:wa_id', async (req, res) => {
  try {
    const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST /api/send → insert a new message manually
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

// ✅ POST /api/webhook → handle incoming webhook payloads
apiRouter.post('/webhook', async (req, res) => {
  try {
    const payload = req.body;
    console.log('📥 Received webhook payload:', JSON.stringify(payload, null, 2));

    const entries = payload?.metaData?.entry || [];

    for (const entry of entries) {
      const changes = entry?.changes || [];

      for (const change of changes) {
        const value = change?.value || {};

        // 🔹 Process messages
        if (value.messages && value.contacts) {
          for (let i = 0; i < value.messages.length; i++) {
            const msg = value.messages[i];
            const contact = value.contacts[i] || value.contacts[0];

            await Message.create({
              wa_id: contact.wa_id,
              name: contact.profile?.name || 'Unknown',
              number: msg.from,
              message: msg.text?.body || 'Media/Other Message',
              timestamp: new Date(Number(msg.timestamp) * 1000),
              status: 'sent',
              message_id: msg.id || '',
              meta_msg_id: msg.meta?.meta_msg_id || '',
            });
          }
        }

        // 🔹 Process statuses
        if (value.statuses) {
          for (const status of value.statuses) {
            await Message.updateOne(
              {
                $or: [
                  { message_id: status.id },
                  { meta_msg_id: status.meta_msg_id },
                ],
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

// ✅ GET /api/health → health check for deployment
apiRouter.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ✅ Mount the API router at /api
app.use('/api', apiRouter);

// ✅ Default route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 WhatsApp Clone Backend API Running',
    version: '1.0.0',
    endpoints: {
      conversations: '/api/conversations',
      messages: '/api/messages/:wa_id',
      send: '/api/send',
      webhook: '/api/webhook',
      health: '/api/health'
    }
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
