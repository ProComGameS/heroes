# 🦸 Superhero Management System

A robust full-stack CRUD application designed for managing a superhero database. This project demonstrates modern web development practices including RESTful API design, database migrations, containerized environments, and complex state management.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/DevOps-Docker-2496ED?logo=docker)

## 🚀 Features

- **Full CRUD Functionality**: Create, Read, Update, and Delete superhero profiles.
- **Advanced Image Handling**: Multi-image uploads via Multer with physical storage and database path mapping.
- **Dynamic Pagination**: Server-side pagination (5 records per page) for optimized performance.
- **Automated Migrations**: Database schema and seeding managed via Umzug.
- **Responsive Design**: Modern UI built with TailwindCSS.
- **Containerized DB**: Instant environment setup using Docker Compose.

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- TailwindCSS (Styling)
- React Router (Client-side routing)
- Axios (API requests)

### Backend
- Node.js & Express
- Sequelize ORM
- Umzug (Migrations & Seeding)
- Multer (File uploads)

### Database
- PostgreSQL
- Docker & Docker Compose
- pgAdmin 4 (Database Management)

---

## ⚙️ Getting Started

### 1. Before we can start
Ensure you have the following installed:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (v18+)
- npm

### 2. Environment Configuration
Create `.env` files in their respective directories:

**Backend (`/backend/.env`)**
```env
PORT=3000
DB_NAME=superhero_db
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
```

**Frontend (/frontend/.env)**
```
VITE_API_URL=http://localhost:3000
```

**3. Installation & Startup**
**Step 1: Spin up the Database**
```
docker-compose up -d
```

Postgres: Running on port 5432
pgAdmin: http://localhost:5050 (Login: example@example.com, Password: admin)


**Step 2: Backend Setup**
```
cd backend
npm install
npm start
```
The backend automatically runs migrations on startup to initialize the schema and seed 8 default heroes.


**Step 3: Frontend Setup**
```
cd frontend
npm install
npm run dev
```

**To Reset DataBase**
```
cd backend
npm run reset:superheroes
```


**To Use Tests**
```
cd backend
npm run jest
```
