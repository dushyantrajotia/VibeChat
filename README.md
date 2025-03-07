VibeChat 🎶💬
VibeChat is a real-time chat and music synchronization app built with React, Node.js, and Socket.IO. It allows users to chat with each other while listening to synchronized music in real-time. Perfect for virtual hangouts, parties, or just vibing with friends!

Features ✨
Real-Time Chat: Send and receive messages instantly with other users.

Synchronized Music: Play, pause, and control YouTube music videos in sync with all connected users.

Responsive Design: Works seamlessly on both mobile and desktop browsers.

Username Persistence: Saves your username in local storage for convenience.

Typing Indicators: See when other users are typing.

Technologies Used 🛠️
1. Frontend: React, Next.js, Tailwind CSS

2. Backend: Node.js, Express, Socket.IO

3. APIs: YouTube Data API

4. Deployment: Vercel (Frontend), Render (Backend)

Getting Started 🚀
Follow these steps to set up VibeChat locally on your machine.

Prerequisites :
1. Node.js (v16 or higher)

2. npm or yarn

3. YouTube Data API Key (get it from Google Cloud Console)

Installation :
1. Clone the Repository
  git clone https://github.com/dushyantrajotia/VibeChat.git
2. Navigate to the project folder:
   cd VibeChat

3. Set Up the Backend
   Navigate to the backend folder:
   cd backend

4. Install dependencies:
   npm install

5. Create a .env file and add your YouTube API key:
   YOUTUBE_API_KEY=your_youtube_api_key_here

6. Start the backend server:
   npm start
   
7. Set Up the Frontend
   Navigate to the frontend folder:
   cd ../frontend

8. Install dependencies:
   npm install

9. Start the development server:
   npm run dev
   Open the App

Visit http://localhost:3000 in your browser.

Folder Structure 📂

VibeChat/
├── backend/
│   ├── server.js            # Backend server with Socket.IO
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── app/                 # Next.js app directory
│   │   ├── page.js          # Main page component
│   │   └── layout.js        # App layout
│   ├── components/          # React components
│   │   ├── Chat.js          # Chat component
│   │   └── MusicPlayer.js   # Music player component
│   ├── styles/              # Global styles
│   │   └── globals.css      # Global CSS
│   ├── package.json         # Frontend dependencies
│   └── .env.local           # Frontend environment variables
└── README.md                # Project documentation

Environment Variables 🔒

1. Backend (.env)
YOUTUBE_API_KEY=your_youtube_api_key_here
PORT=5000

2. Frontend (.env.local)
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

Contributing 🤝
Contributions are welcome! If you'd like to contribute to VibeChat, follow these steps:

1. Fork the repository.

2. Create a new branch:
   git checkout -b feature/your-feature-name

3. Commit your changes:
   git commit -m "Add your feature"

4. Push to the branch:
   git push origin feature/your-feature-name
   Open a pull request.

License 📄
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments 🙏
Socket.IO for real-time communication.

YouTube Data API for music integration.

React and Next.js for building the frontend.

Contact 📧
If you have any questions or feedback, feel free to reach out:

Dushyant Rajotia

Email:  dushyantrajotia@gmail.com

GitHub: your-username

Enjoy vibing with VibeChat! 🎉
Let the music and conversations flow! 🎶💬

