# Task Manager

A modern, secure task management application built with React, Firebase, and Vite. Features a beautiful UI with dark mode support and enhanced security through device-limited authentication.

![Task Manager](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![Firebase](https://img.shields.io/badge/Firebase-12.7-orange)

## ✨ Features

### Core Functionality

- ✅ **Task Management**: Create, edit, complete, and delete tasks
- 📅 **Deadlines**: Set date and time for task deadlines
- 🎯 **Task Categorization**: Organize tasks by "Created Today" and "Remaining"
- ✔️ **Task Completion**: Mark tasks as complete and view completed tasks separately
- 📊 **Statistics Dashboard**: View pending and completed task counts

### Security

- 🔐 **Device Limit Protection**: Limit account access to 2 devices maximum
- 🛡️ **Firebase Authentication**: Secure email/password authentication
- 🔑 **Password Reset**: Email-based password recovery
- 📱 **Device Management**: View and remove registered devices

### User Experience

- 🌓 **Dark/Light Mode**: Automatic system theme detection with manual toggle
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI**: Clean design with smooth animations using Framer Motion
- 🔔 **Toast Notifications**: Real-time feedback for all actions
- ⚠️ **Confirmation Dialogs**: Prevent accidental deletions
- ♿ **Accessible**: ARIA labels, keyboard navigation, and proper semantic HTML

### Progressive Web App (PWA)

- 📲 **Installable**: Install on laptop or smartphone without app stores
- 🔌 **Offline Support**: Works without internet connection
- ⚡ **Fast Performance**: Cached assets for instant loading
- 🖥️ **Standalone Mode**: Full-screen app experience (no browser UI)
- 🎯 **Native Feel**: Bottom navigation for thumb accessibility on mobile
- 🔄 **Auto-Updates**: Service worker updates automatically

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Firebase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Task Manager
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up Firebase**

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Email/Password authentication
   - Create a Firestore database
   - Get your Firebase configuration

4. **Configure environment variables**

   - Copy `.env.example` to `.env`

   ```bash
   cp .env.example .env
   ```

   - Fill in your Firebase credentials in `.env`:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**

   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
Task Manager/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable React components
│   │   ├── ConfirmDialog.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── TaskCard.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/        # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   ├── lib/            # Utility functions
│   │   ├── device.js
│   │   ├── firebase.js
│   │   ├── timeUtils.js
│   │   └── utils.js
│   ├── pages/          # Page components
│   │   ├── AddTask.jsx
│   │   ├── Completed.jsx
│   │   ├── DeviceManagement.jsx
│   │   ├── EditTask.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   └── Signup.jsx
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── .env                # Environment variables (DO NOT COMMIT)
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Security Features

### Device Limit Protection

This application implements a unique security feature that limits each account to **2 devices maximum**. This prevents unauthorized account sharing and enhances security.

- When logging in from a new device, it's automatically registered
- Once 2 devices are registered, login from a 3rd device will be blocked
- Users can manage their devices in the Device Management page
- Users can remove old devices to add new ones

### Best Practices

- ✅ `.env` file is gitignored (credentials never committed)
- ✅ Firebase Security Rules should be configured
- ✅ Input validation on all forms
- ✅ Secure password requirements (minimum 6 characters)
- ✅ Error messages don't expose sensitive information

## 🎨 Theme System

The app supports both light and dark themes:

- **Light Theme**: Fresh green color palette
- **Dark Theme**: Professional black color scheme
- **System Theme**: Automatically matches OS preference
- Manual theme toggle available in the header

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **PWA**: vite-plugin-pwa (Workbox)
- **Routing**: React Router DOM 7
- **Backend/Database**: Firebase (Auth + Firestore)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Date Handling**: date-fns
- **Utilities**: clsx, tailwind-merge, uuid

## 📱 Firestore Database Structure

### Collections

#### `users`

```javascript
{
  uid: "user_id",
  email: "user@example.com",
  createdAt: "2024-01-01T00:00:00.000Z",
  devices: [
    {
      deviceId: "uuid-v4",
      addedAt: "2024-01-01T00:00:00.000Z",
      userAgent: "Mozilla/5.0..."
    }
  ]
}
```

#### `tasks`

```javascript
{
  id: "task_id",
  title: "Task title",
  deadline: "2024-01-01T00:00:00.000Z", // optional
  completed: false,
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

## 🚀 Deployment

### Build for Production

```bash
pnpm run build
# or
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Install as PWA (Progressive Web App)

After deployment, users can install the app:

**Desktop (Chrome/Edge):**

1. Visit the deployed URL
2. Click the install button (⊕) in the address bar
3. Or use menu → "Install Task Manager"
4. App opens in standalone window

**Mobile (Android Chrome):**

1. Visit the deployed URL on Chrome mobile
2. Tap "Add to Home Screen" when prompted
3. Or use menu → "Add to Home Screen"
4. App icon appears on home screen
5. Opens full-screen like a native app

**Benefits:**

- 📱 Install without app store
- 🔌 Works offline
- ⚡ Faster loading
- 🖥️ No browser UI

### Firebase Security Rules

Make sure to configure Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Tasks collection (simplified - adjust based on your needs)
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Known Issues & Future Enhancements

- [ ] Add task categories/tags
- [ ] Add task search and filtering
- [ ] Add task priority levels
- [ ] Add recurring tasks
- [ ] Add task sharing/collaboration
- [ ] Add email notifications for deadlines
- [ ] Add PWA support for offline access
- [ ] Add data export/import functionality

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

Made with ❤️ using React and Firebase
