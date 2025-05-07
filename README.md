# Vue + Django Knowledge Showcase

This is a fullstack web application built with **Vue.js** on the frontend and **Django** on the backend. The project serves as a **knowledge expositor**, featuring a responsive **landing page** and a **user login system**.

It is containerized using **Docker** and **Docker Compose** for easy setup and deployment.
NOTE: This project has not yet been completed

---

## 🚀 Tech Stack

### 🔧 Frontend (Vue.js)
- **Vue 3** with [Vite](https://vitejs.dev/)
- **Tailwind CSS** for modern utility-first styling
- **Pinia** for state management
- **Vue Router** for navigation
- Runs on port `3000`

### 🧠 Backend (Django)
- **Django 4+**
- **Django REST Framework** for building APIs
- **JWT Authentication** for secure login
- **CORS Handling** using `django-cors-headers`
- Managed with **Poetry**
- Runs on port `8000`

---

## 📁 Project Structure
```bash
├── backend/ # Django project
│ └── app/ # Main Django app
├── frontend/ # Vue 3 + Vite + Tailwind app
│ └── src/ # Components, views, store, routes
├── docker-compose.yml # Docker orchestration
├── README.md
```

---

## 🧪 Features

- ⚡ Fast SPA built with Vue 3 + Tailwind
- ✅ JWT-based authentication system
- 🌍 Cross-Origin requests managed via CORS
- 📄 API-first architecture using Django REST Framework
- 🖥️ Landing page + Login screen implemented
- 🔒 Ready to extend for authenticated areas

---

## 🐳 Running the Project with Docker

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/vue-django-app.git
cd vue-django-app
```

2. **Start the containers:**

```bash
docker compose up --build
or 
docker-compose up --build
```

3. Access the app:
* Frontend: http://localhost:3000

* Backend (API): http://localhost:8000