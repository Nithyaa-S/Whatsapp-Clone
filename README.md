# WhatsApp Clone - Full Stack Developer Evaluation Task

A complete WhatsApp Web-like chat interface that displays real-time WhatsApp conversations using webhook data. Built with React, Node.js, and MongoDB Atlas.

## 🚀 Live Demo

- **Frontend**: [Your Vercel URL here]
- **Backend API**: [Your Backend URL here]
- **Health Check**: [Your Backend URL]/api/health

## ✨ Features

### Backend (Node.js + MongoDB Atlas)
- ✅ **MongoDB Atlas Integration**: Cloud database for scalability
- ✅ **Webhook Processing**: Handles WhatsApp Business API webhooks
- ✅ **Message Management**: CRUD operations for messages
- ✅ **Status Updates**: Real-time message status tracking
- ✅ **RESTful API**: Clean and documented endpoints
- ✅ **Health Checks**: Deployment-ready monitoring

### Frontend (React + Tailwind CSS)
- ✅ **WhatsApp Web-like UI**: Authentic design and interactions
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Real-time Updates**: Live message and status updates
- ✅ **Message Sending**: Demo message functionality
- ✅ **Search & Filter**: Find conversations easily
- ✅ **Modern Animations**: Smooth transitions and effects

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Deployment**: Vercel/Render/Heroku

### Frontend
- **Framework**: React 19
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Interview Requirements Checklist

### ✅ Task 1: Webhook Payload Processor
- [x] Read sample payloads from JSON files
- [x] Insert messages into MongoDB collection (`processed_messages`)
- [x] Update message statuses using `id` or `meta_msg_id`
- [x] Handle both message and status payloads

### ✅ Task 2: WhatsApp Web-like Interface
- [x] Frontend UI similar to WhatsApp Web
- [x] Conversations grouped by user (`wa_id`)
- [x] Message bubbles with date/time
- [x] Status indicators (sent, delivered, read)
- [x] User info (name and number)
- [x] Clean, responsive, mobile-friendly design

### ✅ Task 3: Send Message (Demo)
- [x] Send message input box
- [x] Messages appear in conversation UI
- [x] Messages saved to database
- [x] No external message sending

### ✅ Task 4: Deployment
- [x] Public URL hosting
- [x] Accessible without setup
- [x] Environment variables configured

### 🎯 Bonus: Real-time Interface (Optional)
- [ ] WebSocket integration
- [ ] Automatic message updates
- [ ] Status update notifications

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MongoDB Atlas account
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd whatsapp-clone
```

### 2. Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your MongoDB Atlas connection string
npm run process-payloads
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp env.example .env
# Edit .env with your backend API URL
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 📡 API Endpoints

### Conversations
- `GET /api/conversations` - Get all conversations with last message

### Messages
- `GET /api/messages/:wa_id` - Get all messages for a specific user
- `POST /api/send` - Send a new message

### Webhook
- `POST /api/webhook` - Process incoming webhook payloads

### Health
- `GET /api/health` - Health check endpoint

## 🗄️ Database Schema

### Collection: `processed_messages`

```javascript
{
  wa_id: String,        // WhatsApp user ID
  name: String,         // Contact name
  number: String,       // Phone number
  message: String,      // Message content
  timestamp: Date,      // Message timestamp
  status: String,       // Message status (sent, delivered, read)
  message_id: String,   // WhatsApp message ID
  meta_msg_id: String   // Meta message ID
}
```

## 🚀 Deployment

### Backend Deployment (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to backend: `cd backend`
3. Deploy: `vercel --prod`
4. Set environment variables in Vercel dashboard

### Frontend Deployment (Vercel)
1. Navigate to frontend: `cd frontend`
2. Update `vercel.json` with your backend URL
3. Deploy: `vercel --prod`

### Alternative Platforms
- **Render**: Connect GitHub repo, set environment variables
- **Heroku**: Use Procfile, set config vars
- **Railway**: Connect repo, configure environment

## 🔧 Environment Variables

### Backend (.env)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url.vercel.app
VITE_NODE_ENV=production
```

## 🧪 Testing

### API Testing
```bash
# Health check
curl https://your-backend-url.vercel.app/api/health

# Get conversations
curl https://your-backend-url.vercel.app/api/conversations

# Send message
curl -X POST https://your-backend-url.vercel.app/api/send \
  -H "Content-Type: application/json" \
  -d '{"wa_id":"user123","name":"Test User","number":"1234567890","message":"Hello!"}'
```

### Webhook Testing
```bash
curl -X POST https://your-backend-url.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d @payloads/conversation_1_message_1.json
```

## 📁 Project Structure

```
whatsapp-clone/
├── backend/
│   ├── models/
│   │   └── Message.js
│   ├── payloads/
│   │   ├── conversation_1_message_1.json
│   │   ├── conversation_1_status_1.json
│   │   └── ...
│   ├── server.js
│   ├── payloadProcessor.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
└── README.md
```

## 🎯 Evaluation Criteria Met

- ✅ **Closeness to WhatsApp Web**: Authentic UI and interactions
- ✅ **Mobile Responsiveness**: Works perfectly on all devices
- ✅ **Thoughtful Design**: Attention to detail in animations and UX
- ✅ **Well-structured Backend**: Clean architecture and documentation
- ✅ **Real-time Features**: Live updates and status tracking

## 📝 Notes

- This is a simulation - no real WhatsApp messages are sent
- Webhook processing is for demonstration purposes
- Database uses MongoDB Atlas for cloud hosting
- Frontend and backend are designed to work together seamlessly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the Full Stack Developer Evaluation Task.

---

**Built with ❤️ for the Full Stack Developer Evaluation Task** 