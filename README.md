# Rebyte | Advanced URL Shortener & Analytics Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-v18%2B-green)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green)

**Rebyte** is a full-stack URL management platform designed not just to shorten links, but to provide granular analytics on user engagement. It features real-time tracking of click data, including geo-location, device types, and operating systems, visualized through an interactive dashboard.

---

## 🚀 Key Features

* **🔗 Smart URL Shortening:** Instantly generate short, shareable links.
* **📊 Comprehensive Analytics:**
    * **Geo-Location Tracking:** Identify top performing cities and countries.
    * **Device Fingerprinting:** Analyze traffic sources (Mobile vs. Desktop, OS type).
    * **Temporal Data:** Visualize click frequency over time.
* **📱 QR Code Generation:** Automatic QR code generation for every shortened link.
* **🔐 Secure Authentication:** User registration and login protected by JWT (JSON Web Tokens) and secure cookie management.
* **📧 Email Integration:** Automated email services using Nodemailer for account verification and password resets.
* **📈 Interactive Dashboard:** dynamic data visualization using **Chart.js**.
* **⚡ High Performance:** Optimized MongoDB aggregation pipelines for fast data retrieval.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Chart.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |

---

## ⚙️ Installation & Setup

### Prerequisites
* Node.js (v16+)
* MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/BhavyaRI/Rebyte.git
cd Rebyte
```
### 2. Install frontend Dependencies
```bash
cd frontend 
npm install
```
### 3. Install Backend Dependencies
```bash
cd backend 
npm install
```

**Create a `.env` file in the `/server` directory:**
```env
# Server Configuration
PORT=3000
BASE_URL=http://localhost:3000

# Database
MONGO_URI=your_mongodb_connection_string

# Security (JWT)
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRY=7d

# Email Service (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
```
## Running the application

### 1.Start the frontend 
```bash
cd frontend 
npm run dev
```
### 2.Start the backend 
```bash
cd backend
npm run dev
