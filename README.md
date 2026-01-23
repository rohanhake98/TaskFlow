# Personal Task Flow

Personal Task Flow is a comprehensive, full-stack project management application designed to streamline personal and team productivity. Built with a modern React frontend and a robust PHP/MySQL backend, it features interactive 3D visualizations, real-time task tracking, and role-based access control.

## 🚀 Features

- **Interactive Dashboard**: Real-time overview of projects, tasks, and team productivity with dynamic charts and stats.
- **3D Project Visualization**: Unique interactive 3D scene using Three.js (@react-three/fiber) to visualize project status.
- **Project Management**: Create, edit, and track projects with progress bars and status indicators.
- **Task Management**: Kanban-style task board with drag-and-drop capabilities (in progress), filtering, and priority management.
- **Team Collaboration**: Role-based access control (Admin, Project Manager, Team Member) and team member management.
- **Secure Authentication**: User registration and login system with secure password hashing.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and Shadcn/UI.
- **Smooth Animations**: Enhanced user experience with Framer Motion transitions.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI, Lucide React
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **State Management**: TanStack React Query, Context API
- **Routing**: React Router DOM

### Backend
- **Language**: PHP 8.x
- **Database**: MySQL
- **API Architecture**: RESTful API
- **Security**: PDO for database interactions, CORS enabled

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- PHP (v8.0+)
- MySQL Server (e.g., via XAMPP, WAMP, or standalone)
- Git

### 1. Database Setup
1. Start your MySQL server.
2. Create a new database named `taskflow`.
3. Import the schema file located at `database/schema.sql` into the `taskflow` database.

### 2. Backend Setup
1. Configure the database connection in `backend/config/database.php` if your credentials differ from the defaults (User: `root`, Password: empty).
2. Start the PHP development server:
   ```bash
   cd backend
   php -S localhost:8000
   ```
   *Note: Ensure the backend runs on port 8000 as the frontend is configured to communicate with this port.*

### 3. Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the local URL provided (usually `http://localhost:8080` or `http://localhost:8081`).

## 📂 Project Structure

```
personalwebtaskflow-main/
├── backend/                # PHP Backend
│   ├── api/                # API Endpoints (Auth, Projects, Tasks, Users)
│   └── config/             # Database Configuration
├── database/               # SQL Schema
├── src/                    # React Frontend
│   ├── components/         # Reusable UI Components & 3D Scenes
│   ├── context/            # Global State (AuthContext)
│   ├── pages/              # Application Pages (Dashboard, Projects, etc.)
│   ├── services/           # API Service Integration
│   └── ...
└── ...
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is open-source and available under the MIT License.
