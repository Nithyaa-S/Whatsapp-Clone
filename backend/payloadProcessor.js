const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Message = require('./models/Message');
require('dotenv').config();

const payloadDir = path.join(__dirname, 'payloads');

// ✅ Connect to MongoDB Atlas (for interview requirements)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/whatsapp';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const processPayloads = async () => {
  const files = fs.readdirSync(payloadDir);
  console.log('🗂️ Found files:', files);

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(payloadDir, file));
      const payload = JSON.parse(raw);
      console.log(`📄 Processing: ${file}`);

      const entries = payload?.metaData?.entry || [];

      for (const entry of entries) {
        const changes = entry?.changes || [];

        for (const change of changes) {
          const value = change?.value || {};

          // 🔹 Process messages
          if (value.messages && value.contacts) {
            for (let i = 0; i < value.messages.length; i++) {
              const msg = value.messages[i];
              const contact = value.contacts[i] || value.contacts[0]; // fallback

              const inserted = await Message.create({
                wa_id: contact.wa_id,
                name: contact.profile?.name || 'Unknown',
                number: msg.from,
                message: msg.text?.body || 'Media/Other Message',
                timestamp: new Date(Number(msg.timestamp) * 1000),
                status: 'sent', // default
                message_id: msg.id || '',
                meta_msg_id: msg.meta?.meta_msg_id || '',
              });

              console.log(`✅ Inserted: "${inserted.message}" from ${inserted.number}`);
            }
          }

          // 🔹 Process statuses
          if (value.statuses) {
            for (const status of value.statuses) {
              const result = await Message.updateOne(
                {
                  $or: [
                    { message_id: status.id },
                    { meta_msg_id: status.meta_msg_id },
                  ],
                },
                { status: status.status }
              );

              console.log(`🔄 Updated ${status.id} → ${status.status} | matched: ${result.matchedCount}`);
            }
          }
        }
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  console.log('✅ Payload processing complete.');
  mongoose.connection.close();
};

// Only run if called directly
if (require.main === module) {
  processPayloads();
}

module.exports = { processPayloads };
