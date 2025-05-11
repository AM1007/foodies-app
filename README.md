# Foodies App 🍲

**Foodies** is a full-featured platform for culinary enthusiasts, empowering
users to discover, create, save, and share delicious recipes. Whether you're a
home cook or a professional chef, Foodies brings the culinary community
together.

---

## 🌐 Project Overview

Foodies consists of two decoupled applications — a RESTful API backend and a
responsive single-page frontend — designed to deliver an intuitive and engaging
user experience.

### 🔧 Architecture

The platform is structured into two separate repositories:

- [`backend/`](./backend/README.md) – REST API server with authentication,
  PostgreSQL database, and media uploads
- [`frontend/`](./frontend/README.md) – Modern SPA with intuitive UI,
  animations, and responsive design

---

## ✨ Key Features

- 🔍 Search recipes by categories, ingredients, or regional cuisine
- 📸 Create custom recipes with step-by-step instructions and image uploads
- ⭐ Save favorites and follow other users
- 🧑‍🤝‍🧑 Engage with a cooking community
- 📱 Mobile-first responsive design for seamless experience on any device

---

## 🛠 Tech Stack

### 🧠 Backend

- **Language**: Node.js (ESM modules)
- **Framework**: Express
- **Database**: PostgreSQL + Sequelize ORM
- **Auth**: JWT-based authentication
- **Validation**: Joi
- **Image Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Docs**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Other**: bcrypt, gravatar, chalk, nanoid, dotenv, morgan, cors

### 🖼 Frontend

- **Framework**: React 19 + React DOM
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7
- **Forms & Validation**: React Hook Form, Formik, Yup, @hookform/resolvers
- **HTTP Client**: Axios
- **Styling**: CSS Modules, Modern Normalize, clsx
- **UX/UI Enhancements**:
  - Animations: Framer Motion
  - Toasts: React Hot Toast
  - Loaders: React Spinners
  - Pagination: React Paginate
  - Scroll UX: React Scroll To Top
  - Carousels: React Slick, Swiper
- **Build Tool**: Vite
- **Linting**: ESLint, ESLint plugins for React and Hooks
- **Utilities**: Vite Plugin Remove Console

### 🧩 Infrastructure

- **Frontend Deployment**: Vercel
- **Backend Deployment**: Render
- **Media Storage**: Cloudinary
- **Version Control**: Git + GitHub

---

## 🚀 Getting Started

Refer to the specific README files to set up and run each part of the
application:

- [Backend Setup](./backend/README.md)
- [Frontend Setup](./frontend/README.md)

---

### Results of the completed task:

#### Page Home

![Results](./screens/print_screen_01.png)

#### Recipe List

![Results](./screens/print_screen_02.png)

#### Recipe Info

![Results](./screens/print_screen_03.png)

#### Add Recipe

![Results](./screens/print_screen_04.png)

#### Profile

![Results](./screens/print_screen_05.png)

#### Modal Sign Up

![Results](./screens/print_screen_06.png)

#### Modal Sign In

![Results](./screens/print_screen_07.png)

#### Modal Logging Out

![Results](./screens/print_screen_08.png)

#### Modal Team

![Results](./screens/print_screen_09.png)

#### Page 404

![Results](./screens/print_screen_10.png)
