# 💬 ChatApp Backend

**A powerful, real-time chat application backend built with Spring Boot**

---

## 🌟 Overview

ChatApp Backend is a robust, scalable real-time chat application server built with **Spring Boot** and **WebSocket** technology. It provides seamless real-time messaging capabilities with MongoDB Atlas for data persistence and cloud deployment support.

### ✨ Key Highlights

- 🚀 **Real-time Messaging** - WebSocket with SockJS for instant communication
- 🏗️ **RESTful APIs** - Complete chat room management system
- 🌩️ **Cloud-Ready** - MongoDB Atlas integration with cloud deployment
- 🔒 **Secure** - CORS configuration and environment-based security
- 📱 **Cross-Platform** - Works seamlessly with web and mobile frontends

---

## 🚀 Features

### Core Functionality
- ✅ **Chat Room Management** - Create, join, and manage chat rooms
- ✅ **Real-time Messaging** - Instant message delivery via WebSocket
- ✅ **User Management** - Handle multiple users per room
- ✅ **Message Persistence** - All messages stored in MongoDB
- ✅ **Cross-Origin Support** - Secure CORS configuration

### Technical Features
- ✅ **MongoDB Atlas Integration** - Cloud database with high availability
- ✅ **Environment Configuration** - Secure credential management
- ✅ **Production Ready** - Optimized for cloud deployment

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Spring Boot** | Backend Framework | Latest |
| **Java** | Programming Language | 21+ |
| **MongoDB Atlas** | Cloud Database | Latest |
| **Maven** | Build Tool | 3.6+ |
| **WebSocket** | Real-time Communication | - |
| **Render** | Backend Hosting | - |
| **Vercel** | Frontend Hosting | - |

---

## ⚡ Quick Start

### Prerequisites

- ☑️ **Java 21+** installed
- ☑️ **Maven 3.6+** installed
- ☑️ **MongoDB Atlas** account

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/keerthanpoojary/chatapp-backend.git
   cd chatapp-backend
   ```

2. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   touch .env
   ```
   
   Add your MongoDB connection string:
   ```env
   SPRING_DATA_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   ```

3. **Build the application**
   ```bash
   mvn clean install
   ```

4. **Run locally**
   ```bash
   mvn spring-boot:run
   ```

The server will start on `http://localhost:8080` 🎉

---

## 🌍 Cloud Deployment

### Deploy to Render

1. **Create a new Web Service** on [Render.com](https://render.com)

2. **Connect your GitHub repository**

3. **Configure deployment settings:**
   - **Build Command:** `./mvnw clean install`
   - **Start Command:** `java -jar target/chat-app-backend-0.0.1-SNAPSHOT.jar`
   - **Environment Variable:** `SPRING_DATA_MONGODB_URI` = Your MongoDB Atlas URI

4. **Deploy!** 🚀

---

## 🔌 API Endpoints

### WebSocket Connection
```
WS: /ws/chat
```

### REST API Endpoints
```
GET    /api/rooms          # Get all chat rooms
POST   /api/rooms          # Create new room
GET    /api/rooms/{id}     # Get room details
POST   /api/rooms/{id}/join # Join a room
```

---

## 🔒 Security Configuration

### CORS Setup
```java
@CrossOrigin("https://chatappspring.vercel.app")
// OR use constants (recommended)
@CrossOrigin(AppConstants.FRONT_END_BASE_URL)
```

### WebSocket Configuration
```java
registry.addEndpoint("/chat")
    .setAllowedOrigins(AppConstants.FRONT_END_BASE_URL)
    .withSockJS();
```

### Environment Security
- ❌ **Never commit** `.env` files
- ✅ **Use environment variables** for all sensitive data
- ✅ **Whitelist specific origins** in CORS configuration

---

## 📁 Project Structure

```
chatapp-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/chatapp/
│   │   │       ├── config/         # Configuration classes
│   │   │       ├── controller/     # REST controllers
│   │   │       ├── model/          # Data models
│   │   │       ├── repository/     # Data repositories
│   │   │       └── service/        # Business logic
│   │   └── resources/
│   │       └── application.properties
├── .env                            # Environment variables
├── .gitignore
└── pom.xml
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌟 Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **💾 Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **📤 Push** to the branch (`git push origin feature/AmazingFeature`)
5. **🔀 Open** a Pull Request

### Development Guidelines
- Follow Java coding standards
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Keerthan P Poojary

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Author

**Keerthan P Poojary**

- GitHub: [@keerthanpoojary](https://github.com/PoojaryKeerthan)

*Building scalable, real-time applications with modern technologies*

---

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- MongoDB team for Atlas cloud services
- Render and Vercel for hosting services

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Keerthan P Poojary](https://github.com/PoojaryKeerthan)

</div>
