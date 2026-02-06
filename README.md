📊 MERN Analytics Dashboard

A full-stack Analytics Dashboard built with the MERN stack, featuring interactive data visualizations using Recharts and predictable state management with Redux Toolkit.
The application provides actionable insights through charts, tables, and metrics in a clean, responsive admin-style interface.

🌐 Live Demo
👉 https://dashboard-mern-tau.vercel.app/

🚀 Features

📈 Interactive charts (Line, Bar, Pie) using Recharts

🗂️ Global state management with Redux Toolkit

📊 Analytics overview with real-time UI updates

🧾 Data tables with status indicators

🔐 JWT-based authentication & role-based authorization

🧩 Modular, shown scalable architecture

⚡ Fast, responsive dashboard layout

🛠️ Tech Stack
Frontend

React

Redux Toolkit

Recharts

Axios

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

📁 Project Structure
├── client        # React frontend
├── server        # Node.js backend
└── README.md

📁 Frontend Folder Structure

The frontend follows a feature-based and component-driven architecture for maintainability and scalability.

client/
└── src/
    ├── api/                  # API configurations & services
    ├── assets/               # Static assets
    ├── components/           # Reusable UI components
    │   ├── charts/           # Recharts components
    │   ├── tables/           # Table components
    │   ├── layout/           # Sidebar, Navbar, Layouts
    │   └── ui/               # Buttons, cards, inputs
    │
    ├── pages/                # Page-level views
    │   ├── Dashboard/
    │   ├── Analytics/
    │   ├── Companies/
    │   ├── Users/
    │   └── Settings/
    │
    ├── routes/               # App routing & protected routes
    │   ├── AppRoutes.jsx
    │   └── ProtectedRoute.jsx
    │
    ├── redux/                # Redux Toolkit store & slices
    │   ├── slices/
    │   └── store.js
    │
    ├── hooks/                # Custom React hooks
    ├── utils/                # Helper functions
    ├── styles/               # Global styles
    │
    ├── App.jsx               # Root component
    └── main.jsx              # Entry point

📁 Backend Folder Structure

The backend follows a controller–route–model pattern to keep business logic organized and scalable.

server/
├── config/
│   ├── connectToDB.js        # MongoDB connection
│   └── generateToken.js     # JWT generation
│
├── controllers/             # Business logic
│   ├── analyticsController.js
│   ├── authController.js
│   ├── billingController.js
│   ├── companyController.js
│   ├── dashboardController.js
│   ├── settingsController.js
│   └── userController.js
│
├── middlewares/             # Custom middleware
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/                  # Mongoose schemas
│   ├── Company.js
│   ├── Events.js
│   ├── Settings.js
│   ├── Subscriptions.js
│   ├── Transaction.js
│   └── UserModels.js
│
├── routes/                  # API routes
│   ├── analyticsRoutes.js
│   ├── authRoutes.js
│   ├── billingRoutes.js
│   ├── companyRoutes.js
│   ├── dashboardRoutes.js
│   ├── settingsRoutes.js
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js                # Express app entry

🧠 Architecture Overview

Frontend:

Redux Toolkit manages global app state

Recharts handles all data visualization

Protected routes secure dashboard pages

Backend:

RESTful API with Express

JWT-based authentication

Role & admin authorization middleware

MongoDB with Mongoose schemas

⚙️ Installation & Setup
Prerequisites

Node.js (v16+)

MongoDB (local or Atlas)

Clone the repository
git clone https://github.com/your-username/analytics-dashboard.git
cd analytics-dashboard

Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm start

🔑 Environment Variables

Create a .env file inside the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📸 Screenshots

Add screenshots or GIFs of the dashboard UI, analytics charts, and tables.

🧠 Future Enhancements

🌙 Dark mode

📅 Advanced filtering & date ranges

📤 Export reports (CSV / PDF)

🔄 Real-time updates with WebSockets

🔐 More granular role permissions

📄 License

This project is licensed under the MIT License
