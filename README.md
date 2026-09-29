# NotesTodo

A full-stack mobile application for managing notes and todo tasks, built with React Native (frontend) and Node.js + Express + MongoDB (backend). Users can register, log in, organize notes into categories, and attach checklist-style todos to each note.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Why NotesTodo](#2-why-notestodo)
3. [Architecture](#3-architecture)
4. [Tech Stack](#4-tech-stack)
5. [Project Structure](#5-project-structure)
6. [Getting Started](#6-getting-started)
7. [Configuration](#7-configuration)
8. [How It Works](#8-how-it-works)
9. [Database Schema](#9-database-schema)
10. [API Reference](#10-api-reference)
11. [Extending NotesTodo](#11-extending-notestodo)
12. [Testing](#12-testing)
13. [Roadmap](#13-roadmap)
14. [Contributing](#14-contributing)
15. [License](#15-license)

---

## 1. Overview

NotesTodo is a cross-platform mobile app (Android & iOS) that combines note-taking with lightweight task management. Each note can hold a title, a description, and a checklist of todos — all organized under user-defined categories. Authentication is handled with JWT access/refresh tokens and includes a full forgot-password flow via email OTP.

**Key capabilities at a glance:**

- Secure signup / login with hashed passwords and JWT
- Forgot password via 6-digit OTP sent to email (valid 5 minutes)
- Create, read, update, and delete notes
- Attach checklist todos to any note
- Organize notes by category; deleting a category also removes its notes
- Persistent login state via AsyncStorage
- Token-based request authorization on protected routes

---

## 2. Why NotesTodo

Most note apps treat tasks as an afterthought. NotesTodo was built to keep notes and actionable todos in the same place — under a flexible category system — while handling the full auth lifecycle (registration, login, and password recovery) securely out of the box.

- **Secure by default** — passwords hashed with bcrypt (cost factor 10), OTPs hashed before storage, refresh tokens stored in DB for single-device invalidation
- **Offline-first session** — JWT stored in AsyncStorage so the user stays logged in across restarts
- **Clean separation** — auth, categories, and notes each have their own route/controller/model; easy to maintain and extend
- **Typed frontend** — TypeScript on the React Native side catches issues at compile time

---

## 3. Architecture

```
┌──────────────────────────────────────────────┐
│              React Native (Mobile)            │
│  AuthContext  ←→  AsyncStorage (token/userId) │
│  Axios client with JWT interceptor            │
│  React Navigation (Auth stack / Main stack)   │
└───────────────────┬──────────────────────────┘
                    │ HTTP / REST
                    ▼
┌──────────────────────────────────────────────┐
│          Node.js + Express (REST API)         │
│  /api/auth   → authController                 │
│  /api/categories → CategoryControllers        │
│  /api/notes  → notsController                 │
│  authMiddleware (JWT protect)                 │
└───────────────────┬──────────────────────────┘
                    │ Mongoose ODM
                    ▼
┌──────────────────────────────────────────────┐
│        MongoDB Atlas (Cloud Database)         │
│  Collections: users · categories · nots      │
└──────────────────────────────────────────────┘
                    │
          Nodemailer + Gmail SMTP
          (OTP emails for password reset)
```

The frontend and backend are completely decoupled. The mobile app communicates only through the REST API. Navigation is split into an **Auth stack** (Login, Signup, ForgotPassword, OTP, RecreatePassword) and a **Main stack** (Bottom tabs + Card + Settings), switched automatically based on the presence of a JWT in AsyncStorage.

---

## 4. Tech Stack

### Backend (`/Backend`)

| Package | Version | Purpose |
|---|---|---|
| `express` | ^5.2.1 | HTTP server and routing |
| `mongoose` | ^9.9.1 | MongoDB ODM |
| `bcryptjs` | ^2.4.3 | Password and OTP hashing |
| `jsonwebtoken` | ^9.0.3 | JWT access & refresh tokens |
| `nodemailer` | ^9.0.5 | OTP email delivery via Gmail SMTP |
| `cors` | ^2.8.6 | Cross-origin resource sharing |
| `dotenv` | ^17.4.2 | Environment variable loading |
| `nodemon` | ^3.1.14 | Dev auto-restart (devDependency) |

### Frontend (`/MyAuthApp`)

| Package | Version | Purpose |
|---|---|---|
| `react-native` | 0.86.2 | Cross-platform mobile framework |
| `react` | 19.2.3 | UI library |
| `@react-navigation/native` | ^7.3.18 | Navigation container |
| `@react-navigation/native-stack` | ^7.18.6 | Stack navigator |
| `@react-navigation/bottom-tabs` | ^7.18.18 | Bottom tab navigator |
| `axios` | ^1.19.0 | HTTP client with interceptors |
| `@react-native-async-storage/async-storage` | ^3.1.1 | Persistent local token storage |
| `react-native-screens` | ^4.27.0 | Native screen optimizations |
| `react-native-safe-area-context` | ^5.9.1 | Safe area handling |
| `react-native-linear-gradient` | ^2.8.3 | Gradient UI elements |
| `react-native-svg` | ^15.15.5 | SVG asset support |
| `react-native-svg-transformer` | ^1.5.3 | Import SVGs as components |
| `react-native-vector-icons` | ^10.3.0 | Icon library |
| `lucide-react-native` | ^1.39.0 | Lucide icon set for React Native |
| `react-native-responsive-screen` | ^1.4.2 | Responsive sizing helpers |
| `formik` | ^2.4.9 | Form state management |
| `react-hook-form` | ^7.84.0 | Lightweight form handling |
| `yup` | ^1.7.1 | Schema-based form validation |
| `typescript` | ^5.8.3 | Static typing (devDependency) |
| `jest` | ^29.6.3 | Testing framework (devDependency) |

---

## 5. Project Structure

```
NotesTodo/
├── Backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection via Mongoose
│   ├── controllers/
│   │   ├── authController.js      # signup, Login, forgotPassword, verifyOTP, resetPassword
│   │   ├── CategoryControllers.js # getCategories, createCategory, deleteCategory
│   │   └── notsController.js      # getAllNotes, getNotesByCategory, createNote, updateNote, deleteNote
│   ├── middlewares/
│   │   └── authMiddleware.js      # JWT protect middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Category.js            # Category schema
│   │   └── note.js                # Note + todos schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   ├── categoryRoutes.js      # /api/categories/*
│   │   └── notesRoutes.js         # /api/notes/*
│   ├── utils/
│   │   └── sendEmail.js           # Nodemailer Gmail helper
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── MyAuthApp/
    ├── Src/
    │   ├── Api/
    │   │   ├── apiClint.js         # Axios instance + JWT interceptor
    │   │   ├── AuthClients.js      # Auth API calls (signup/login/OTP/reset)
    │   │   ├── CategoryClint.js    # Category API calls
    │   │   └── NotsClients.js      # Notes API calls (get/post/update/delete)
    │   ├── Assets/
    │   │   └── Image/              # App images and SVG assets
    │   ├── Components/
    │   │   ├── CustomButton.js
    │   │   ├── CustomInput.js
    │   │   ├── CustomSnackbar.js
    │   │   ├── Errortext.js
    │   │   ├── NoteCardAll.js
    │   │   ├── NotesCard.js
    │   │   ├── OTPInput.js
    │   │   ├── SearchBar.js
    │   │   ├── SocialButton.js
    │   │   └── index.js
    │   ├── ComponentsStartup/
    │   │   ├── CustomInput.js
    │   │   └── GoogleButton.js
    │   ├── Context/
    │   │   ├── AuthContext.js      # Token state, login(), logout()
    │   │   └── NumberContext.js    # Shared counter/answer state
    │   ├── Navigation/
    │   │   ├── Router.js           # Root navigator (auth vs main)
    │   │   ├── AuthNavigation.js   # Auth stack navigator
    │   │   └── MainNavigation.js   # Main stack + bottom tabs
    │   └── Screen/
    │       ├── AuthScreen/
    │       │   ├── LoginScreen/
    │       │   ├── SignupScreen/
    │       │   ├── ForgotPasswordScreen/
    │       │   ├── OTPScreen/
    │       │   └── RecreatePasswordScreen/
    │       └── MainScreen/
    │           ├── HomeScreen/
    │           ├── NoteScreen/
    │           ├── AddNoteScreen/
    │           ├── AllNotsScreen/
    │           ├── CardScreen/
    │           ├── SettingScreen/
    │           └── BottomTabNavigator/
    ├── App.tsx                     # Root component (AuthProvider + Router)
    ├── index.js                    # RN entry point
    ├── package.json
    └── tsconfig.json
```

---

## 6. Getting Started

### Prerequisites

- Node.js >= 22.11.0
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Android Studio (for Android) or Xcode (for iOS)
- React Native CLI environment set up — follow the [official guide](https://reactnative.dev/docs/set-up-your-environment)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd NotesTodo
```

### 2. Set up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file (see [Configuration](#7-configuration)), then start the server:

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:5000`.

### 3. Set up the Frontend

```bash
cd MyAuthApp
npm install
```

Update the `BASE_URL` in `Src/Api/apiClint.js` to point to your machine's local IP (e.g., `http://192.168.x.x:5000`) so the Android/iOS device can reach the backend on the same network.

**Android:**

```bash
npm run android
# or
npx react-native run-android
```

**iOS:**

```bash
cd ios && pod install && cd ..
npm run ios
# or
npx react-native run-ios
```

**Start Metro bundler (if not auto-started):**

```bash
npm start
```

---

## 7. Configuration

Create a `.env` file in the `Backend/` directory with the following variables:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0

# JWT Secrets (use long random strings in production)
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>

# Email (Gmail + App Password for OTP delivery)
EMAIL_USER=yourapp@gmail.com
EMAIL_APP_PASSWORD=<your_gmail_app_password>
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `ACCESS_TOKEN_SECRET` | Secret used to sign JWT access tokens (expires in 15 minutes) |
| `REFRESH_TOKEN_SECRET` | Secret used to sign JWT refresh tokens (expires in 7 days) |
| `EMAIL_USER` | Gmail address used to send OTP emails |
| `EMAIL_APP_PASSWORD` | Gmail App Password (not your regular Google account password) |

> **Important:** Never commit your `.env` file. It is already listed in `.gitignore`.

**Frontend — Base URL:**  
Edit `MyAuthApp/Src/Api/apiClint.js` and update `BASE_URL` to match your backend host:

```js
const BASE_URL = 'http://<your-local-ip>:5000';
```

---

## 8. How It Works

### Authentication Flow

1. **Signup** — User submits firstName, lastName, email, password, phoneNumber. Backend validates fields, hashes the password with bcrypt, creates the user, and returns both an `accessToken` (15 min) and a `refreshToken` (7 days). Both are stored in MongoDB (refresh) and AsyncStorage (access).
2. **Login** — Credentials validated, new tokens issued, refreshToken updated in DB.
3. **Protected requests** — The Axios interceptor in `apiClint.js` reads `userToken` from AsyncStorage and attaches it as `Authorization: Bearer <token>` on every request. The `protect` middleware on the backend verifies the token and attaches the user object to `req.user`.
4. **Forgot Password** — User submits email → backend generates a 6-digit OTP, hashes it, stores it with a 5-minute expiry, and sends the plaintext OTP via Nodemailer/Gmail. User submits OTP → backend compares with hash. User submits new password → backend hashes and saves it, clears OTP fields, and invalidates the refresh token.

### Navigation Flow

- On app start, `AuthContext` checks AsyncStorage for a saved token. While checking, a loading spinner is shown.
- If a token exists → `MainNavigation` (bottom tabs: Home, Notes, All Notes, Settings) is rendered.
- If no token → `AuthNavigation` (Login screen by default) is rendered.
- Logout clears the token and userData from AsyncStorage, sending the user back to the Auth stack.

### Notes & Categories

- Notes belong to a `user_id` and optionally a `category_id`.
- Each note has a `todos` array of `{ task_text, is_completed }` objects for checklist functionality.
- `GET /api/notes/all` is protected and returns only the authenticated user's notes with category names populated.
- Deleting a category also cascades and deletes all notes in that category.

---

## 9. Database Schema

### `users` collection — `Backend/models/User.js`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `firstName` | String | Required |
| `lastName` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Required, `select: false` (bcrypt hash) |
| `phoneNumber` | String | Required, unique (10-digit Indian format) |
| `refreshToken` | String | `select: false`, updated on each login |
| `resetPasswordOTP` | String | `select: false`, bcrypt-hashed OTP |
| `resetPasswordOTPExpiry` | Date | `select: false`, 5-min window |
| `createdAt` | Date | Mongoose timestamps |
| `updatedAt` | Date | Mongoose timestamps |

### `categories` collection — `Backend/models/Category.js`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `category_name` | String | Required |

### `nots` collection — `Backend/models/note.js`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `title` | String | Required |
| `description` | String | Required |
| `todos` | Array | Array of todo subdocuments |
| `todos[].task_text` | String | Required, the task label |
| `todos[].is_completed` | Boolean | Default: `false` |
| `category_id` | ObjectId (ref: Category) | Optional, default: `null` |
| `user_id` | ObjectId (ref: User) | Required |

---

## 10. API Reference

Base URL: `http://localhost:5000`

Endpoints marked 🔒 require `Authorization: Bearer <accessToken>` header.

### All Endpoints at a Glance

| # | Method | Endpoint | Auth | Description |
|---|---|---|---|---|
| 1 | `POST` | `/api/auth/signup` | ❌ | Register a new user |
| 2 | `POST` | `/api/auth/Login` | ❌ | Login and receive tokens |
| 3 | `POST` | `/api/auth/forgot-password` | ❌ | Send OTP to email |
| 4 | `POST` | `/api/auth/Otp` | ❌ | Verify OTP |
| 5 | `POST` | `/api/auth/resetpassword` | ❌ | Reset password with OTP |
| 6 | `GET` | `/api/categories/` | ❌ | Fetch all categories |
| 7 | `POST` | `/api/categories/` | ❌ | Create a new category |
| 8 | `DELETE` | `/api/categories/:id` | ❌ | Delete category + its notes |
| 9 | `GET` | `/api/notes/all` | 🔒 | Get all notes of logged-in user |
| 10 | `GET` | `/api/notes/:categoryId` | ❌ | Get notes by category |
| 11 | `POST` | `/api/notes/` | ❌ | Create a new note |
| 12 | `PUT` | `/api/notes/:id` | ❌ | Update a note |
| 13 | `DELETE` | `/api/notes/:id` | ❌ | Delete a note |

---

### Auth Endpoints — `/api/auth`

---

#### 1. `POST /api/auth/signup`

Register a new user account.

**Request body:**
```json
{
  "firstName": "Raj",
  "lastName": "Kumar",
  "email": "raj@example.com",
  "password": "secret123",
  "phoneNumber": "9876543210"
}
```

**Validations:**
- All fields required
- Valid email format
- Password minimum 8 characters
- Phone must be a 10-digit Indian number (starts with 6–9)
- Email and phoneNumber must be unique

**Success `201`:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "id": "<userId>",
    "firstName": "Raj",
    "lastName": "Kumar",
    "email": "raj@example.com",
    "phoneNumber": "9876543210",
    "accessToken": "<jwt_15min>",
    "refreshToken": "<jwt_7days>"
  }
}
```

**Error responses:** `400` missing/invalid fields · `409` email or phone already exists

---

#### 2. `POST /api/auth/Login`

Log in with email and password.

**Request body:**
```json
{
  "email": "raj@example.com",
  "password": "secret123"
}
```

**Success `200`:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "<userId>",
    "firstName": "Raj",
    "lastName": "Kumar",
    "email": "raj@example.com",
    "phoneNumber": "9876543210",
    "accessToken": "<jwt_15min>",
    "refreshToken": "<jwt_7days>"
  }
}
```

**Error responses:** `400` missing fields · `401` invalid email or password

---

#### 3. `POST /api/auth/forgot-password`

Generates a 6-digit OTP, hashes it, saves it to the user record with a 5-minute expiry, and sends the plaintext OTP to the user's email via Gmail SMTP.

**Request body:**
```json
{ "email": "raj@example.com" }
```

**Success `200`:**
```json
{ "success": true, "message": "OTP sent successfully to your email" }
```

**Error responses:** `400` missing/invalid email · `404` email not found · `500` email delivery failed

---

#### 4. `POST /api/auth/Otp`

Verify the 6-digit OTP sent to the user's email. The OTP is compared against its bcrypt hash stored in the database.

**Request body:**
```json
{
  "email": "raj@example.com",
  "otp": "482910"
}
```

**Success `200`:**
```json
{ "success": true, "message": "OTP verified successfully" }
```

**Error responses:** `400` missing fields · `400` no OTP request found · `400` OTP expired · `400` invalid OTP · `404` user not found

---

#### 5. `POST /api/auth/resetpassword`

Reset the password after OTP verification. Re-verifies the OTP, hashes the new password, clears OTP fields, and invalidates the existing refresh token.

**Request body:**
```json
{
  "email": "raj@example.com",
  "otp": "482910",
  "newPassword": "newSecret456"
}
```

**Success `200`:**
```json
{
  "success": true,
  "message": "Password reset successfully. Please login with your new password."
}
```

**Error responses:** `400` missing fields · `400` password too short · `400` OTP expired or invalid · `404` user not found

---

### Category Endpoints — `/api/categories`

---

#### 6. `GET /api/categories/`

Fetch all categories stored in the database.

**No request body required.**

**Success `200`:**
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    { "_id": "<categoryId>", "category_name": "Work" },
    { "_id": "<categoryId>", "category_name": "Personal" }
  ]
}
```

**Error responses:** `500` server error

---

#### 7. `POST /api/categories/`

Create a new category.

**Request body:**
```json
{ "category_name": "Study" }
```

**Success `201`:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": { "_id": "<categoryId>", "category_name": "Study" }
}
```

**Error responses:** `400` `category_name` is missing or empty

---

#### 8. `DELETE /api/categories/:id`

Delete a category by its ID. Also cascades and deletes **all notes** that belong to this category (`Note.deleteMany({ category_id: id })`).

**URL parameter:** `:id` — the MongoDB ObjectId of the category

**No request body required.**

**Success `200`:**
```json
{ "success": true, "message": "Category and linked notes deleted successfully" }
```

**Error responses:** `404` category not found · `400` invalid ID format

---

### Notes Endpoints — `/api/notes`

---

#### 9. `GET /api/notes/all` 🔒

Fetch all notes belonging to the currently authenticated user across all categories. Category name is populated via Mongoose `populate`.

**Headers required:**
```
Authorization: Bearer <accessToken>
```

**Success `200`:**
```json
{
  "success": true,
  "message": "All notes fetched successfully",
  "user": {
    "_id": "<userId>",
    "firstName": "Raj",
    "lastName": "Kumar",
    "email": "raj@example.com"
  },
  "NotesDeta": [
    {
      "_id": "<noteId>",
      "title": "Grocery List",
      "description": "Weekly shopping items",
      "todos": [
        { "_id": "<todoId>", "task_text": "Buy milk", "is_completed": false },
        { "_id": "<todoId>", "task_text": "Buy eggs", "is_completed": true }
      ],
      "category_id": { "_id": "<catId>", "category_name": "Personal" },
      "user_id": "<userId>"
    }
  ]
}
```

**Error responses:** `401` missing or invalid token · `500` server error

---

#### 10. `GET /api/notes/:categoryId`

Fetch all notes for a specific category that belong to the authenticated user.

**URL parameter:** `:categoryId` — the MongoDB ObjectId of the category

**Success `200`:**
```json
{
  "success": true,
  "message": "Notes fetched successfully",
  "data": [
    {
      "_id": "<noteId>",
      "title": "Meeting Notes",
      "description": "Q3 planning session",
      "todos": [],
      "category_id": "<categoryId>",
      "user_id": "<userId>"
    }
  ]
}
```

**Error responses:** `500` server error

---

#### 11. `POST /api/notes/`

Create a new note. The `todos` array is optional; if omitted it defaults to an empty array.

**Request body:**
```json
{
  "title": "Grocery List",
  "description": "Weekly shopping",
  "todos": [
    { "task_text": "Buy eggs", "is_completed": false },
    { "task_text": "Buy bread", "is_completed": false }
  ],
  "category_id": "<categoryId>",
  "user_id": "<userId>"
}
```

**Success `201`:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "<noteId>",
    "title": "Grocery List",
    "description": "Weekly shopping",
    "todos": [
      { "_id": "<todoId>", "task_text": "Buy eggs", "is_completed": false },
      { "_id": "<todoId>", "task_text": "Buy bread", "is_completed": false }
    ],
    "category_id": "<categoryId>",
    "user_id": "<userId>"
  }
}
```

**Error responses:** `400` missing required fields (`title`, `description`, `user_id`)

---

#### 12. `PUT /api/notes/:id`

Update any fields of an existing note. Only pass the fields you want to change.

**URL parameter:** `:id` — the MongoDB ObjectId of the note

**Request body (any subset of note fields):**
```json
{
  "title": "Updated Title",
  "todos": [
    { "task_text": "Buy milk", "is_completed": true }
  ]
}
```

**Success `200`:**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "_id": "<noteId>",
    "title": "Updated Title",
    "description": "Weekly shopping",
    "todos": [
      { "_id": "<todoId>", "task_text": "Buy milk", "is_completed": true }
    ],
    "category_id": "<categoryId>",
    "user_id": "<userId>"
  }
}
```

**Error responses:** `404` note not found · `400` validation error

---

#### 13. `DELETE /api/notes/:id`

Delete a single note by its ID.

**URL parameter:** `:id` — the MongoDB ObjectId of the note

**No request body required.**

**Success `200`:**
```json
{ "success": true, "message": "Note deleted successfully" }
```

**Error responses:** `404` note not found · `400` invalid ID format

---

### Common Error Response Shape

All error responses follow this structure:

```json
{ "success": false, "message": "Human-readable error description" }
```

| HTTP Status | When it occurs |
|---|---|
| `400` | Validation failed — missing or invalid fields |
| `401` | No token provided, or token is invalid / expired |
| `404` | Requested resource (user, note, category) not found |
| `409` | Conflict — email or phone number already registered |
| `500` | Unexpected server error |

---

## 11. Extending NotesTodo

### Add a new API route

1. Create a controller file in `Backend/controllers/`.
2. Add a route file in `Backend/routes/` using `express.Router()`.
3. Mount the router in `Backend/server.js` with `app.use('/api/<resource>', require('./routes/<file>'))`.
4. Add a corresponding API client function in `MyAuthApp/Src/Api/`.

### Add a new screen

1. Create a folder under `MyAuthApp/Src/Screen/MainScreen/` or `AuthScreen/`.
2. Add it to the appropriate navigator (`AuthNavigation.js` or `MainNavigation.js`).
3. Export it from the relevant `index.js` if needed.

### Add a new model

1. Define a Mongoose schema in `Backend/models/`.
2. Reference it in the appropriate controller with `require('../models/<Model>')`.

### Swap email provider

The `sendEmail` utility in `Backend/utils/sendEmail.js` uses Nodemailer. Change the `service` field (or use a full SMTP config) and update `EMAIL_USER` / `EMAIL_APP_PASSWORD` in `.env` to switch to SendGrid, Mailgun, SES, etc.

### Add Google / social login

A `GoogleButton` component already exists in `MyAuthApp/Src/ComponentsStartup/`. Wire it up with a library like `@react-native-google-signin/google-signin` and add a corresponding `/api/auth/google` route on the backend.

---

## 12. Testing

### Backend

The backend does not currently have an automated test suite. Manual testing can be done with any REST client (Postman, Insomnia, curl).

```bash
# Example: test the health check endpoint
curl http://localhost:5000/
# → "API is running and MongoDB connected!"
```

### Frontend

The React Native project uses **Jest** with `@react-native/jest-preset`.

```bash
cd MyAuthApp

# Run all tests
npm test

# Run with coverage
npx jest --coverage
```

A basic smoke test lives at `MyAuthApp/__tests__/App.test.tsx`. To add more tests, create `*.test.tsx` or `*.test.js` files alongside the component or screen under test, or add them to the `__tests__` directory.

---

## 13. Roadmap

- [ ] Refresh token endpoint — automatically renew expired access tokens without re-login
- [ ] Search notes by title or description
- [ ] Note pinning / favourites
- [ ] Offline support — queue creates/updates locally, sync when back online
- [ ] Push notifications for todo reminders
- [ ] Google / social login (component shell already exists)
- [ ] Note sharing between users
- [ ] Dark mode
- [ ] Unit and integration test coverage for backend controllers
- [ ] CI/CD pipeline (GitHub Actions)

---

## 14. Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: describe your change"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`.

**Code style:**
- Backend: CommonJS modules, consistent `async/await` error handling
- Frontend: functional components with hooks, TypeScript where possible
- Run `npm run lint` in the frontend before submitting

**Reporting bugs:** Open an issue with steps to reproduce, expected behavior, and actual behavior.

---

## 15. License

This project is licensed under the **ISC License** (as declared in `Backend/package.json`).

```
ISC License

Copyright (c) 2024 NotesTodo Contributors

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
OF THIS SOFTWARE.
```
