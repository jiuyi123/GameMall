# GameMall

A web-based game marketplace system developed as part of the **Software Engineering Course Design**.  
The project provides a platform for **players, game creators, and administrators**, enabling game trading, publishing, and management.

---

## ✨ Features

### 👤 Players
- **Login & Register**: WeChat-based login or account registration.  
- **Browse Games**: View game details, trailers, reviews, and ratings.  
- **Purchase Games**: Add games to personal library with one-time purchase restriction.  
- **Game Reviews**: Post comments and ratings (one per user per game).  
- **Friend System & Chat**: Add/remove friends, send messages, check what games friends are playing.  
- **Manage Owned Games**: View or remove purchased games.  

### 🎨 Creators
- **Upload Games**: Submit new games for admin review.  
- **Update Games**: Release new versions after approval.  

### 🛠️ Administrators
- **Game & Comment Review**: Check uploaded games for content and copyright.  
- **User & Game Management**: Maintain user accounts and platform data.  

---

## 🏗️ System Architecture

- **Architecture**: B/S client-server model:contentReference[oaicite:3]{index=3}  
- **Frontend**: WeChat Mini Program (user-facing UI)  
- **Backend**: Web server for business logic  
- **Database**: Store user, game, and platform-related data  

**Module Overview**:
- **User Module**: Login/Register, profile management, chat  
- **Marketplace Module**: Game display, purchase, reviews  
- **Admin Module**: Review & management tools  
- **Database**: FAT-style relational storage for user/game data  

---

## 🛠️ Tech Stack

- **Frontend**: WeChat Mini Program (JavaScript / WXML / WXSS)  
- **Backend**: Node.js / Java (configurable)  
- **Database**: MySQL / SQL Server  
- **Version Control**: Git & GitHub/Gitee  
- **Modeling**: UML diagrams (use case, data flow, architecture)  

---

## 🚀 Installation & Usage

### Prerequisites
- Node.js or Java environment (depending on backend choice)  
- MySQL / SQL Server  
- WeChat Developer Tools  

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/gamemall.git
cd gamemall

# Install backend dependencies
npm install   # if Node.js backend
# or configure build if Java backend

# Setup database (MySQL)
mysql -u root -p < docs/schema.sql

# Run backend server
npm start   # or java -jar backend.jar

# Open in WeChat Developer Tools
