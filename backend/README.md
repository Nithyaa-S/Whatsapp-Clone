# WhatsApp Clone Backend API

This is the backend API for the WhatsApp Clone Full Stack Developer Evaluation Task.

## 🚀 Features

- **MongoDB Atlas Integration**: Cloud database for scalability
- **Webhook Processing**: Handles WhatsApp Business API webhooks
- **Message Management**: CRUD operations for messages
- **Status Updates**: Real-time message status tracking
- **RESTful API**: Clean and documented endpoints
- **Health Checks**: Deployment-ready health monitoring

## 📋 Requirements

- Node.js >= 16.0.0
- MongoDB Atlas account
- Environment variables configured

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `env.example` to `.env` and configure:
```bash
cp env.example .env
```

Update the following variables:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

### 3. Process Sample Payloads
```bash
npm run process-payloads
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Start Production Server
```bash
npm start
```

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

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`

### Heroku
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set MONGODB_URI=your_connection_string`
4. Deploy: `git push heroku main`

### Render
1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy automatically

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `WEBHOOK_SECRET` | Webhook verification secret | No |

## 📊 Health Check

The API includes a health check endpoint at `/api/health` that returns:
- Server status
- Database connection status
- Timestamp

## 🔄 Webhook Processing

The webhook endpoint processes WhatsApp Business API payloads:
- Extracts messages and contacts
- Updates message statuses
- Stores data in MongoDB

## 🧪 Testing

Test the API endpoints using tools like Postman or curl:

```bash
# Health check
curl https://your-api-url.vercel.app/api/health

# Get conversations
curl https://your-api-url.vercel.app/api/conversations

# Get messages for a user
curl https://your-api-url.vercel.app/api/messages/user123
```

## 📝 Notes

- This is a simulation - no real WhatsApp messages are sent
- Webhook processing is for demonstration purposes
- Database uses MongoDB Atlas for cloud hosting
- API is designed to work with the WhatsApp Clone frontend 