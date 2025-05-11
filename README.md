# 🎉 Eventopia

**Eventopia** is a centralized web platform built to discover, share, and manage upcoming engineering events across premier Indian institutes like IIITs, NITs, and IITs. It streamlines event exploration and participation for students, organizers, and academic communities.

## 🚀 Features

- 🔍 Explore events by type, date, and institute
- 📝 Submit your own events (for authorized users)
- 📅 Detailed event pages with registration links, rules, and contact info
- 📨 Email notifications for registered users
- 🔐 Secure login & signup with JWT authentication
- 🛠️ Admin dashboard for event/user management

## 📁 Project Structure

Eventopia/
│
├── frontend/
│ ├── index.html
│ ├── login.html
│ ├── register.html
│ ├── event-details.html
│ └── styles/
│ └── main.css
│
├── backend/
│ ├── app.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── config/
│
├── public/
│ └── images/
│
├── README.md
└── package.json



## ⚙️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT-based secure authentication
- **Tools:** Git, Postman, VS Code

## 🧪 Getting Started

 1. Clone the Repository
git clone https://github.com/vishnusindhal/eventopia.git
cd eventopia

3. Install Backend Dependencies
npm install

4. Create .env File in backend/

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

5. Run the Backend Server
node backend/app.js

6. Run the Frontend (Static)
Use a Live Server extension in VS Code or:
npx http-server frontend/

📈 Future Enhancements
Social logins (Google, GitHub)

Mobile app version (React Native)

Payment gateway for paid events

Event feedback and rating system

Personalized recommendations

🙌 Contributing
Contributions are welcome!
Fork the repo → Create a new branch → Make changes → Submit a Pull Request

📬 Contact
Developer: Vishnu
Institute: IIIT Surat
Email: vishnusindhal5040@gmail.com
GitHub: https://github.com/vishnusindhal
