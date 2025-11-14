# Routes & Controllers Structure

This document explains the standard routes and controllers structure used in this project.

## Structure Overview

```
src/
├── controllers/          # Business logic layer
│   ├── auth.controller.js
│   ├── users.controller.js
│   └── ...
├── routes/              # Route definitions
│   ├── index.js         # Central route registry
│   ├── auth.routes.js
│   ├── users.routes.js
│   └── ...
└── index.js             # Main server file
```

## Key Principles

### 1. **Separation of Concerns**

- **Routes**: Define endpoints and HTTP methods only
- **Controllers**: Handle business logic, database operations, and responses

### 2. **Consistent Response Format**

All responses follow this structure:

```javascript
// Success
{
    success: true,
    data: {...},      // or count, message, etc.
}

// Error
{
    success: false,
    message: "Error message",
    error: "Detailed error"  // Optional, for development
}
```

### 3. **Route Naming Convention**

- Use resource-based naming: `users.routes.js`, `auth.routes.js`
- Use RESTful conventions: GET, POST, PUT, DELETE

## Example Files

### Controller Example (`controllers/users.controller.js`)

```javascript
import { User } from "../models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
```

### Route Example (`routes/users.routes.js`)

```javascript
import express from "express";
import { getAllUsers, getUserById } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
```

### Route Registry (`routes/index.js`)

```javascript
import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
```

### Main Server (`index.js`)

```javascript
import routes from "./routes/index.js";

app.use("/api", routes);
```

## API Endpoints

With this structure, your endpoints will be:

- `GET /api/users` - Get all users
- `GET /api/users/count` - Get user count
- `GET /api/users/:id` - Get user by ID
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/admin/login` - Admin login

## Migration from Old Structure

**Old way:**

```javascript
// routes/getDataRoutes.js
router.get("/users", async (req, res) => {
  // Logic here
});
```

**New way:**

```javascript
// controllers/users.controller.js
export const getAllUsers = async (req, res) => {
  // Logic here
};

// routes/users.routes.js
router.get("/", getAllUsers);
```

## Benefits

1. **Maintainability**: Logic separated from routing
2. **Testability**: Controllers can be tested independently
3. **Reusability**: Controllers can be reused across routes
4. **Scalability**: Easy to add new routes and controllers
5. **Consistency**: Standardized response format
