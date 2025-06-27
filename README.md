# 🔐 Lockr – Military-Grade Password Manager & Vault

![React](https://img.shields.io/badge/React-18-blue)
![Express](https://img.shields.io/badge/Express.js-Backend-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow)
![AES-256](https://img.shields.io/badge/Encryption-AES256-darkblue)
![Bcrypt](https://img.shields.io/badge/Hashing-Bcrypt-orange)
![2FA](https://img.shields.io/badge/Security-2FA-critical)
![Tailwind CSS](https://img.shields.io/badge/Styling-TailwindCSS-lightblue)
![Analytics](https://img.shields.io/badge/Feature-Analytics-purple)
![Audit Logs](https://img.shields.io/badge/Logging-Audit%20Trail-important)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Ready-blueviolet)

---

## 📌 Project Overview

**Lockr** is a full-stack, ultra-secure password manager built using **React**, **Node.js**, and **MongoDB**. It allows users to store, manage, and encrypt their credentials with **AES-256 encryption**, securely authenticate with **JWT**. Lockr also features **audit logging**, **analytics**, and a responsive, modern UI.

---

## 🚀 Features

### 🛡 Security & Authentication
1. 🔐 AES-256 encryption using **CryptoJS**
2. 🔑 Password hashing with **bcrypt**
3. 🔓 JWT-based user authentication
4. 🧠 Secure token storage and middleware-based route protection

### 🧰 Password Management
1. ✍️ Add, edit, delete, and view passwords
2. 🧾 Search and tag-based filtering
3. 🧮 View decrypted passwords securely on demand

### 🔍 Logs & Analytics
1. 📊 Real-time analytics dashboard
2. 📜 Audit log tracking for every edit/view/delete
3. 📅 Timestamped logs and user-based activity history

### 💻 UI/UX
1. 🌙 Light/Dark mode toggle
2. 📱 Fully responsive design
3. ⚛️ Global state using Context API
4. 🎨 Tailwind CSS and custom CSS

---

## 🛠️ Tech Stack

### 🔧 Frontend (React)
- ⚛️ React.js + React Router DOM
- 📦 Context API for state management
- 🎨 Tailwind CSS + Custom Styles
- 🔄 Axios for API calls
- 🔐 JWT token handling
- 🌗 Theme toggling and responsive layout
- EmailJs for email Transfer

### 🛠 Backend (Node.js + Express)
- 🟢 Node.js and Express.js
- 🛡 JWT for auth
- 🔑 Bcrypt.js for hashing
- 🔐 CryptoJS (AES-256) for encryption/decryption
- 🗂 MongoDB + Mongoose for database


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/lockr.git
cd lockr
```

2️⃣ Setup Backend
```sh
cd server
npm install
# Create .env file with the following:
```

```sh
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CRYPTO_SECRET=your_crypto_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

```sh
node app.js/server.js
```

3️⃣ Setup Frontend
```sh
cd ../client
npm install
npm start
```



