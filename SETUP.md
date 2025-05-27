
# 🛍️ E-commerce Analytics Platform – Setup Guide 🚀

A step-by-step guide to set up and run the E-commerce Analytics Dashboard using **React**, **Node.js**, **MongoDB**, and **TensorFlow.js**.

---

## 📦 1. Prerequisites

Ensure the following are installed on your system:

- 🟢 **Node.js** (v14 or later)  
  🔗 [Download Node.js](https://nodejs.org/)

- 🍃 **MongoDB** (Community Edition)  
  🔗 [Download MongoDB](https://www.mongodb.com/try/download/community)

- 🐙 **Git** (optional, for cloning the project)  
  🔗 [Download Git](https://git-scm.com/downloads)

---

## 🔁 2. Clone the Project (Optional)

If Git is installed:

```bash
git clone https://github.com/your-repo/ecommerce-analytics.git
cd ecommerce-analytics
````

> 💡 Replace `your-repo` with your actual GitHub username or org.

📦 **OR:** Download the project ZIP from GitHub and extract it manually.

---

## ⚙️ 3. Set Up the Backend (Node.js + MongoDB)

### 1️⃣ Navigate to the `server` folder:

```bash
cd server
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Create a `.env` file with the following:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce-analytics
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

> 🔐 Replace `your_jwt_secret_here` with a strong secret key.

---

### 4️⃣ Start MongoDB

* **Windows:**

```bash
net start MongoDB
```

* **macOS/Linux:**

```bash
sudo systemctl start mongod
```

---

### 5️⃣ Run the backend server:

```bash
npm run dev
```

🌐 The backend will start at: [http://localhost:5000](http://localhost:5000)

---

## 🎨 4. Set Up the Frontend (React)

### 1️⃣ Open a new terminal and navigate to the `client` folder:

```bash
cd ../client
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Start the React app:

```bash
npm start
```

🌐 The frontend will launch at: [http://localhost:3000](http://localhost:3000)

---

## 🌍 5. Access the Application

Open your browser and visit:

```url
http://localhost:3000
```

### 👤 Default Login Credentials (if seeded):

* **Admin:** `admin@example.com` / `password123`
* **User:** `user@example.com` / `password123`

---

## 🧪 6. (Optional) Seed Sample Data

Create a `seed.js` file in the `server` folder and populate the DB with sample data:

```bash
node seed.js
```

> 📌 A sample `seed.js` script is included in the project.

---

## ⏹️ 7. Stopping the Application

* **Frontend (React):** Press `Ctrl + C` in the terminal
* **Backend (Node.js):** Press `Ctrl + C` in the terminal
* **MongoDB:**

```bash
sudo systemctl stop mongod     # Linux/macOS
net stop MongoDB               # Windows
```

---

## 🚀 8. Deployment (Optional)

* **Backend:** Deploy to Heroku, AWS, or DigitalOcean
* **Frontend:** Deploy to Vercel, Netlify, or Firebase
* **Database:** Use MongoDB Atlas (cloud-based MongoDB)

---

## 🛠️ Troubleshooting

### ❌ MongoDB not running?

Make sure MongoDB is installed and the service is started.

### ⚠️ Port conflicts?

Change ports in:

* `server/server.js` (backend)
* `client/package.json` (frontend)

### 📦 Missing dependencies?

Run `npm install` in both `server/` and `client/`.

---

## ✅ Final Notes

* 🧠 **Backend:** [http://localhost:5000](http://localhost:5000)
* 💻 **Frontend:** [http://localhost:3000](http://localhost:3000)
* 🍃 **Database:** `mongodb://localhost:27017`

You're now running a full-stack E-commerce Analytics Dashboard with predictive power! 🎉

---

> 💬 Questions or feedback? Feel free to open an issue or submit a pull request!


