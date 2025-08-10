# WhatsApp Clone

A WhatsApp Web-like chat interface built with React, Node.js, and MongoDB Atlas.

## Features

- WhatsApp Web-like UI  
- Real-time messaging simulation via webhook payloads  
- MongoDB Atlas integration for message storage  
- Responsive design for desktop and mobile  
- API proxying and environment variable setup

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas

## Setup Instructions

1. Clone the repository  
2. Navigate to frontend/backend folders separately  
3. Install dependencies:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

4. Create `.env` files in both frontend and backend with appropriate environment variables. For example:

    **Backend `.env`:**

    ```
    MONGODB_URI=your_mongodb_connection_string
    WEBHOOK_SECRET=your_webhook_secret
    PORT=5000
    ```

    **Frontend `.env`:**

    ```
    VITE_API_URL=https://your-backend-url
    ```

5. Run development servers:

    ```bash
    # In backend folder
    npm run dev

    # In frontend folder
    npm run dev
    ```

## Deployment

- Backend hosted on Render: `https://whatsapp-clone-1-l5rq.onrender.com/`  
- Frontend hosted on Vercel: [https://frontend-bdxmu3knx-nithyaa-s-projects.vercel.app/](https://frontend-bdxmu3knx-nithyaa-s-projects.vercel.app/)

## Notes

- No real WhatsApp messages are sent; this is a simulation using webhook payloads.  
- Frontend fetches API URLs from environment variables (`VITE_API_URL`).  
- You can explore the code to understand webhook processing and chat UI.

## Screenshots

![Chat UI Screenshot](frontend/assets/Screenshot%202025-08-11%20002015.png)  
*Chat interface displaying a conversation.*

![Chat List Screenshot](frontend/assets/Screenshot%202025-08-11%20002128.png)  
*Chat list and responsive layout.*

---


