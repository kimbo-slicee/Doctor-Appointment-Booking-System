# 🩺 Medical Appointment System  

A comprehensive system for managing medical appointments, built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project provides a user-friendly platform for patients and doctors to manage appointments, with an **admin panel** for centralized management.  

---

## ✨ Features  

### 🔹 **1. User Panel (Patients & Doctors)**  
- 🧑‍⚕️ Patients can:  
  - 📅 Book, view, and cancel appointments.  
  - 📁 Upload and manage their medical documents.  
- 👨‍⚕️ Doctors can:  
  - 🗓️ View and manage their appointment schedules.  
  - 🔄 Update availability and consult patient details.  

### 🔹 **2. Admin Dashboard**  
- 👩‍💼 Manage doctors and patients.  
- 📊 Oversee and control all appointments.  
- 📈 View detailed analytics about appointments and system usage.  

### 🔹 **3. Core Functionality**  
- 🔐 **Authentication**:  
  - Secure user authentication using **JWT** (JSON Web Tokens).  
- 🌐 **State Management**:  
  - Frontend state management handled with **useContext** in React.  
- ☁️ **Cloud Storage**:  
  - Integration with **Cloudinary** for managing and storing user-uploaded files.  
- 💾 **Database**:  
  - Data stored in **MongoDB Atlas** for a scalable and reliable backend.  

---

## 🛠️ Tech Stack  

| **Category**        | **Technology**                      |  
|---------------------|------------------------------------|  
| **Frontend**        | React.js, TailwindCSS, useContext Hook |  
| **Backend**         | Node.js, Express.js                |  
| **Database**        | MongoDB Atlas                      |  
| **Authentication**  | JWT                                |  
| **Cloud Storage**   | Cloudinary                         |  

---

## ⚙️ Installation and Setup  

Follow these steps to set up the project locally:  

### 🔧 Prerequisites  
- 📥 Node.js installed on your machine.  
- 🌐 MongoDB Atlas account and cluster set up.  
- ☁️ Cloudinary account for file storage.  

### 📝 Steps  
1. Clone the repository:  

   ```bash  
   git clone https://github.com/your-username/medical-appointment-system.git  
   cd medical-appointment-system
   ```  
2. Install dependencies

```bash
npm install  
cd client && npm install  

```
3. Set up environment variables:
- Create a .env file in the root directory. Add the following:

```bash
PORT=5000  
MONGO_URI=your-mongodb-atlas-uri  
JWT_SECRET=your-jwt-secret  
CLOUDINARY_NAME=your-cloudinary-name  
CLOUDINARY_API_KEY=your-cloudinary-api-key  
CLOUDINARY_API_SECRET=your-cloudinary-api-secret  

```
4. Run the development server:
```bash
# Run backend  
npm run server  

# Run frontend  
cd client && npm start  

```
📸 Screenshots
🖥️ User Panel
<!--  -->
🖥️ Admin Dashboard
<!--  -->
