# Backend Documentation

This document explains how the backend for **Hapsay 360** is structured, configured, and consumed by the admin and mobile applications.

---

## 1. Platform Overview

- **Runtime**: Node.js + Express 5
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT tokens (2-day expiry)
- **Data models**: `User`, `Officer`, `ClearanceApplication`, `Blotter`, `PoliceStation`, `SOSRequest`, `Announcement`
- **Primary responsibilities**:
  - Citizen + admin authentication
  - Profile and clearance application CRUD
  - Data feeds for admin dashboards (user counts, clearance lists, etc.)

---

## 2. Directory Structure

```
backend/
├── package.json
├── src
│   ├── index.js               # Express bootstrap + middleware + DB connection
│   ├── lib
│   │   └── db.js              # Mongo connection helper
│   ├── routes                 # REST entry points
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── clearance.routes.js
│   │   └── policeStation.routes.js
│   ├── controllers            # Business logic per resource
│   │   ├── auth.controller.js
│   │   ├── users.controller.js
│   │   └── clearance.controller.js
│   └── models                 # Mongoose schemas (aggregated in models/index.js)
└── Backend Documentation.md   # You are here
```

Key conventions:

- Routes only define HTTP verbs & URL paths.
- Controllers perform validation, persistence, and shape responses.
- All API responses follow `{ success: boolean, data|message|count, error? }`.

---

## 3. Getting Started

### Prerequisites

- Node.js 20+
- MongoDB cluster/URI

### Installation

```bash
cd hapsay360mobile/backend
npm install
```

### Environment Variables (`.env`)

| Variable          | Required | Description                    | Example                                       |
| ----------------- | -------- | ------------------------------ | --------------------------------------------- |
| `PORT`            | No       | HTTP port (defaults to `3000`) | `4000`                                        |
| `MONGO_URI`       | Yes      | MongoDB connection string      | `mongodb+srv://...`                           |
| `JWT_SECRET`      | Yes      | Secret used to sign JWT tokens | `super-secret`                                |
| `ALLOWED_ORIGINS` | No       | Comma-separated list for CORS  | `http://localhost:5173,http://localhost:3000` |

> Restart the server whenever `.env` changes.

### Local Development

```bash
npm run dev
```

- Starts the Express server with `nodemon`.
- Auto-connects to MongoDB and mounts all routes under `/api`.

---

## 4. Request Lifecycle

1. `src/index.js` bootstraps Express, applies CORS + JSON middleware, and mounts `/api`.
2. `routes/index.js` fans out to resource routers (auth, users, clearances, police stations).
3. Route handlers delegate to controllers.
4. Controllers interact with Mongoose models and return the standard response payloads.

Error handling:

- 4xx for validation/auth failures.
- 5xx for unexpected exceptions (with `error` details during development).
- Controllers log errors to aid debugging.

---

## 5. API Reference

### 5.1 Authentication (`/api/auth`)

| Method | Path              | Description                                          | Controller      |
| ------ | ----------------- | ---------------------------------------------------- | --------------- |
| POST   | `/register`       | Citizen sign-up using personal info + email/password | `register`      |
| POST   | `/login`          | Citizen login; returns JWT + profile                 | `login`         |
| POST   | `/admin/register` | Officer/admin account creation                       | `registerAdmin` |
| POST   | `/admin/login`    | Officer/admin login (used by web admin UI)           | `loginAdmin`    |

Common request body:

```json
{
  "email": "user@email.com",
  "password": "secret"
}
```

Success response:

```json
{
  "success": true,
  "token": "<jwt>",
  "user": { "_id": "...", "given_name": "...", "surname": "..." }
}
```

Errors return `success: false` with a descriptive `message`.

---

### 5.2 Users (`/api/users`)

| Method | Path     | Description                                                              |
| ------ | -------- | ------------------------------------------------------------------------ |
| GET    | `/`      | List all users (password removed). Response includes `count` + `data[]`. |
| GET    | `/count` | Lightweight aggregate used by dashboards.                                |
| GET    | `/:id`   | Fetch single user by ObjectId.                                           |
| PUT    | `/:id`   | Update user fields (password updates blocked).                           |
| DELETE | `/:id`   | Remove a user.                                                           |

These endpoints power the admin `UserDatabasePage` and dashboard metrics. Consumers should expect nested shapes such as `user.personal_info.given_name`.

---

### 5.3 Clearance Applications (`/api/clearance`)

| Method | Path             | Description                                                          |
| ------ | ---------------- | -------------------------------------------------------------------- |
| POST   | `/create`        | Create a new clearance application for a user (`userId`, `purpose`). |
| GET    | `/getClearances` | Retrieve all applications with populated `user_id` references.       |

Response shape:

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "user_id": { "_id": "...", "personal_info": { ... } },
      "purpose": "Employment",
      "status": "pending"
    }
  ]
}
```

---

### 5.4 Police Stations (`/api/police-stations`)

Routes are scaffolded but currently empty (`policeStation.routes.js`). Add handlers here when station CRUD is ready. Follow the same controller/route separation pattern.

---

## 6. Models Snapshot

| Model                                                    | Key Fields                                                | Notes                                                  |
| -------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| `User`                                                   | `personal_info`, `email`, `password`, `address`, `status` | Passwords hashed via Mongoose middleware (see schema). |
| `Officer`                                                | `first_name`, `last_name`, `email`, `password`            | Used for admin logins.                                 |
| `ClearanceApplication`                                   | `user_id`, `purpose`, `status`, `created_at`              | Populated when fetched for dashboards.                 |
| `Blotter`, `PoliceStation`, `SOSRequest`, `Announcement` | Schemas defined for future endpoints.                     |

All schemas are exported through `models/index.js` for easy importing within controllers.

---

## 7. Coding Standards

- **Validation first**: guard clauses at the top of controllers.
- **Return early** for error paths to keep functions readable.
- **Never leak passwords**: controllers use `.select('-password')` or rely on schema-level `select: false`.
- **Consistent casing**: request bodies use `snake_case` for nested info (mirrors current database structure).
- **Logging**: unexpected errors are logged via `console.error` before returning 500 responses.

---

## 8. Adding New Endpoints

1. Create schema fields (if needed) in `src/models`.
2. Add controller with validation, data access, and standardized responses.
3. Create a route file or extend an existing one to point at the controller.
4. Register the route in `routes/index.js`.
5. Document the endpoint in this file and notify frontend consumers.

---

## 9. Troubleshooting

| Symptom                                 | Likely Cause                     | Fix                                                 |
| --------------------------------------- | -------------------------------- | --------------------------------------------------- |
| Server boots but no DB logs             | Missing/invalid `MONGO_URI`      | Verify `.env`, ensure Atlas IP allowlist            |
| CORS errors from admin UI               | `ALLOWED_ORIGINS` not set        | Add `http://localhost:5173` (Vite) or deployed host |
| JWT-related 500s                        | `JWT_SECRET` undefined           | Provide a long random value                         |
| Dashboard shows “Loading…” indefinitely | Backend endpoint returning error | Check server logs for stack trace                   |

---

## 10. Release Checklist

- [ ] Update documentation and clients when new endpoints are added.
- [ ] Run `npm run dev` locally and verify `/health` (if added) or main endpoints.
- [ ] Confirm Mongo migrations/seeds when schema changes occur.
- [ ] Tag backend releases alongside admin/mobile app versions.

---

For questions or backend contributions, ping the platform team or open a PR with proposed changes plus updates to this document.
