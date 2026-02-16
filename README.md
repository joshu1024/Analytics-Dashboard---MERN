📊 MERN Analytics Dashboard 

A production-oriented, full-stack analytics dashboard built with the MERN stack, designed to mirror real-world SaaS and internal admin platforms used by distributed teams.

The application focuses on data aggregation, visualization, predictable state management, and secure access control, demonstrating the skills required for remote MERN / full-stack roles.

🌍 Live Demo
👉 https://dashboard-mern-tau.vercel.app/

This project showcases my ability to:

Build scalable dashboards used by businesses and SaaS products

Design clean frontend architectures for long-term maintainability

Implement secure authentication & role-based access

Manage global application state using Redux Toolkit

Work with API-driven data visualization

Deploy and maintain full-stack applications remotely

It reflects the type of work commonly done in remote-first teams, including async development, API contracts, and separation of concerns.

🧩 Core Features

📈 Interactive analytics charts (Line, Bar, Pie) using Recharts

🗂️ Predictable global state management with Redux Toolkit

📊 API-driven dashboards with aggregated backend data

🧾 Tabular data views with status indicators

🔐 JWT-based authentication

🛡️ Role-based authorization (admin / user)

🔒 Protected frontend & backend routes

⚡ Responsive admin-style UI suitable for desktop & tablet

🧱 Modular, scalable codebase

🧠 Architecture Overview
Frontend

Built with React using a feature-based structure

Redux Toolkit manages shared state (analytics data, user session, dashboard metrics)

Recharts renders visual analytics from API responses

ProtectedRoute ensures only authorized users access sensitive views

API layer abstracts backend communication

Backend

RESTful API built with Express.js

Controller–Route–Model pattern for clarity and scalability

MongoDB with Mongoose for structured data modeling

JWT authentication with role & admin middleware

Designed for easy extension (new metrics, reports, roles)

🛠️ Tech Stack
Frontend

React

Redux Toolkit

Recharts

Axios

Tailwind CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Deployment

Frontend: Vercel

Backend: Railway

Database: MongoDB Atlas

📁 Project Structure
├── client        # React frontend
├── server        # Node.js backend
└── README.md

📁 Frontend Structure (Scalable & Team-Friendly)
client/
└── src/
    ├── api/                  # API services & requests
    ├── components/           # Reusable UI components
    │   ├── charts/           # Analytics charts
    │   ├── tables/           # Data tables
    │   ├── layout/           # Sidebar, Navbar, Layouts
    │   └── ui/               # Shared UI elements
    ├── pages/                # Feature-based pages
    ├── redux/                # Store & slices
    ├── routes/               # Routing & access control
    ├── hooks/                # Custom hooks
    ├── utils/                # Helpers
    └── styles/               # Global styles

Redux Design Decisions

Redux Toolkit chosen for predictable state updates

Centralized analytics data avoids prop drilling

Enables consistent UI updates across charts and tables

Easy to extend with new slices and async thunks

📁 Backend Structure (Production-Ready)
server/
├── controllers/     # Business logic
├── routes/          # API endpoints
├── models/          # Mongoose schemas
├── middlewares/     # Auth & role control
├── config/          # DB & JWT utilities
└── server.js        # App entry point

Security

JWT-based authentication

Role & admin authorization middleware

Protected routes for sensitive operations

⚙️ Local Setup
Prerequisites

Node.js (v16+)

MongoDB (local or Atlas)

Installation
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

Create a .env file inside server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📸 Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/62454ae7-2b33-4a38-9bb4-55837c7faa0a" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0ea69242-ae87-43cf-8a3e-93810595fca0" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d754d3ab-ad74-4444-a543-85de7eed50c9" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fad3ac0f-42fe-4ee4-a1e9-6f95fee7f98c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e9bb78c9-aad2-4f0f-bb55-2e1dd0020bba" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9ce29958-d01e-40d2-848a-bc188ebae816" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dd706bab-9141-41c4-ae37-67e6df231e47" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/603fe3f5-9d3a-44ba-94de-3fdea3ff4305" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f22c5924-9c51-43a6-96df-fa2266c2edeb" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/68178614-f493-43d3-b04f-b4620a842596" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/96d4ea73-b275-467f-a6b7-1b9dd682821a" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/01039a56-5cfc-4da3-8755-1082ad2bad0b" />
Includes:

Dashboard overview

Analytics charts

User & company management

Admin views
(See screenshots above)

🚀 Future Improvements (Planned)

🌙 Dark mode

📅 Advanced filters & date ranges

📤 CSV / PDF export

🔄 Real-time updates (WebSockets)

🔐 Fine-grained role permissions

🧪 Automated tests

📄 License

MIT License

🧑‍💻 Author

Joshua Kipamet Olting’idi
MERN / Full-Stack Developer
Focus: Dashboards, SaaS tools, admin systems, and scalable web apps
