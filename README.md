# 🏠 Property Listing System

A backend system for managing property listings, supporting authentication, CRUD operations, advanced filtering, user favorites, and property recommendations.

> 🔗 **Deployed URL:** [https://property-listing-system-pixt.onrender.com](https://property-listing-system-pixt.onrender.com)

---

## 📌 Features

- ✅ User Signup & Login (JWT-based Authentication)
- ✅ Property CRUD Operations (with ownership restrictions)
- ✅ Advanced Property Filtering (10+ fields supported)
- ✅ Favorite Properties Management
- ✅ Property Recommendation System
- ✅ Redis Caching for Optimized Read/Write
- ✅ Input Validation using Zod
- ✅ Deployed on Render

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Cache**: Redis (ioredis)
- **Validation**: Zod
- **Authentication**: JWT
- **Deployment**: Render

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <https://github.com/Aaryan1311/Property-Listing-System>
cd property-listing-system
```


### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables
Create a .env file in the root directory:

```bash
PORT=3000
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
REDIS_URL=<your-redis-url>
```

### 4. Run the Server

```bash
npm run dev
```

### 5. Folder Structure

```bash

src/
├── config/            # DB and Redis configuration
├── controllers/       # Route handlers
├── middlewares/       # Auth, validation, 
├── models/            # Mongoose models (User, Property)
├── routes/
│   └── v1/
│       ├── authRoutes.js
│       ├── propertyRoutes.js
│       ├── favouriteRoutes.js
│       └── recommendationRoutes.js
├── services/          # Business logic
├── utils/             # Helper functions
└── index.js           # Server entry point

```
### 6. Authentication

JWT is used for authentication. Include the token in the Authorization header like this:

```bash
Authorization: Bearer <your_token>
```

## API Overview

### 🧑‍💼 Auth Routes

- POST /signup – Register a new user

- POST /signin – Login and receive JWT token

### 🏡 Property Routes

- GET /properties – Get all properties

- GET /properties/:id – Get property by ID

- GET /properties/filter – Get properties with filters

- POST /properties – Create new property (auth required)

- PUT /properties/:id – Update property (only creator)

- DELETE /properties/:id – Delete property (only creator)

### ❤️ Favourite Routes
- GET /favourites – Get your favorite properties

- POST /favourites – Add a property to your favorites

- DELETE /favourites/:propertyId – Remove property from favorites

### 📢 Recommendation Routes
- GET /recommendations – View properties recommended to you

- POST /recommendations – Recommend a property to someone via email


### 📦 Dataset
The dataset used in this project was imported into MongoDB from the assignment:

🔗 **Dataset:** [https://cdn2.gro.care/db424fd9fb74_1748258398689.csv](https://cdn2.gro.care/db424fd9fb74_1748258398689.csv)


### Deployment
This project is deployed on Render.


 **🌐 Live API URL:** [https://property-listing-system-pixt.onrender.com](https://property-listing-system-pixt.onrender.com)






## Author
### Aaryan Tripathi