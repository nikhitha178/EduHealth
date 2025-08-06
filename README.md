
# EduHealth

**EduHealth** is a web-based platform that provides users with **educational** and **healthcare** services, helping them book tutors and doctors easily.

## 📁 Project Structure
```
eduhealth/
├── doctor/             # Doctor service module
├── tutor/              # Tutor service module
├── eduhealth-main/     # Main interface (React)
├── my-admin-interface/ # Admin interface
├── node_modules/
├── README.md
├── package.json
```

## 🚀 Features
- Book appointments with **Doctors** 🏥
- Schedule sessions with **Tutors** 📚
- Online payments (Razorpay & Stripe)
- Media uploads (Cloudinary)
- Secure login/signup 🔐

## ⚙️ Tech Stack
- React.js, Tailwind CSS
- Node.js, Express.js
- MongoDB Atlas
- Razorpay, Stripe
- Cloudinary, Hygraph (GraphQL)

## 🛠️ Installation & Run
```bash
# Install dependencies for all projects
npm install

# Start all services together (Main Interface + Backend)
npm run start:all

# To run Admin interface separately
cd my-admin-interface
npm install
npm run start-all
```
