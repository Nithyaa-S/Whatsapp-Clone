# 🚀 Deployment Checklist for Interview Submission

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a new cluster (free tier is fine)
- [ ] Get connection string
- [ ] Test connection locally

### 2. Backend Preparation
- [ ] Copy `env.example` to `.env` in backend folder
- [ ] Update `MONGODB_URI` with your Atlas connection string
- [ ] Test backend locally: `npm run dev`
- [ ] Test API endpoints:
  - [ ] `GET /api/health`
  - [ ] `GET /api/conversations`
  - [ ] `POST /api/send`
- [ ] Process sample payloads: `npm run process-payloads`

### 3. Frontend Preparation
- [ ] Copy `env.example` to `.env` in frontend folder
- [ ] Update `VITE_API_URL` to point to your backend
- [ ] Test frontend locally: `npm run dev`
- [ ] Verify API integration works

## 🚀 Deployment Steps

### Step 1: Deploy Backend (Vercel)
```bash
cd backend
npm install -g vercel
vercel --prod
```

**During deployment:**
- Choose "Create new project"
- Set project name: `whatsapp-clone-backend`
- Set environment variables in Vercel dashboard:
  - `MONGODB_URI`: Your MongoDB Atlas connection string
  - `NODE_ENV`: `production`

### Step 2: Update Frontend Configuration
1. Get your backend URL from Vercel
2. Update `frontend/vercel.json`:
   ```json
   {
     "env": {
       "VITE_API_URL": "https://your-backend-url.vercel.app"
     }
   }
   ```

### Step 3: Deploy Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

**During deployment:**
- Choose "Create new project"
- Set project name: `whatsapp-clone-frontend`

## ✅ Post-Deployment Verification

### Backend API Tests
```bash
# Health check
curl https://your-backend-url.vercel.app/api/health

# Get conversations
curl https://your-backend-url.vercel.app/api/conversations

# Send test message
curl -X POST https://your-backend-url.vercel.app/api/send \
  -H "Content-Type: application/json" \
  -d '{"wa_id":"test123","name":"Test User","number":"1234567890","message":"Hello from API!"}'
```

### Frontend Tests
- [ ] Open frontend URL in browser
- [ ] Verify conversations load
- [ ] Test chat selection
- [ ] Test message sending
- [ ] Test on mobile device
- [ ] Test search functionality

## 📋 Interview Submission Checklist

### Required URLs
- [ ] **Frontend URL**: `https://your-frontend-url.vercel.app`
- [ ] **Backend URL**: `https://your-backend-url.vercel.app`
- [ ] **Health Check**: `https://your-backend-url.vercel.app/api/health`

### Documentation
- [ ] Update main README.md with actual URLs
- [ ] Ensure all features are documented
- [ ] Include setup instructions
- [ ] Add testing examples

### Features Verification
- [ ] ✅ Webhook payload processing
- [ ] ✅ WhatsApp Web-like interface
- [ ] ✅ Message sending (demo)
- [ ] ✅ Responsive design
- [ ] ✅ MongoDB Atlas integration
- [ ] ✅ Public deployment

## 🎯 Final Submission

### For Interview Form:
1. **Public URL**: Your frontend URL
2. **GitHub Repository**: (Optional) Your repo URL
3. **Documentation**: Link to your README

### Demo Points to Highlight:
1. **Backend Architecture**: MongoDB Atlas + Node.js
2. **Frontend Design**: Authentic WhatsApp Web UI
3. **Real-time Features**: Message status updates
4. **Mobile Responsiveness**: Works on all devices
5. **Webhook Processing**: Handles sample payloads
6. **Deployment**: Live, accessible application

## 🚨 Common Issues & Solutions

### Backend Issues
- **MongoDB Connection**: Ensure Atlas IP whitelist includes `0.0.0.0/0`
- **Environment Variables**: Double-check in Vercel dashboard
- **CORS**: Should be handled by backend code

### Frontend Issues
- **API Connection**: Verify `VITE_API_URL` is correct
- **Build Errors**: Check for missing dependencies
- **CORS**: Backend should allow frontend domain

### Deployment Issues
- **Vercel Build Failures**: Check Node.js version compatibility
- **Environment Variables**: Ensure all required vars are set
- **Domain Issues**: Wait for DNS propagation

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check MongoDB Atlas connection
5. Review browser console for frontend errors

---

**Good luck with your interview! 🎉** 