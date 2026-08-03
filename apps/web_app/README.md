# LexAI Web Client ⚖️

The React + Vite production web workspace for the LexAI platform. It is fully integrated with Firebase services for hosting, authentication, and database storage, and queries the containerized Cloud Run search backend directly.

---

## 🚀 Live Demo
Access the live web deployment at: **[https://lexai-3fd1a.web.app](https://lexai-3fd1a.web.app)**

---

## 🏛️ System Features

* **Cinematic Landing Page & Legal Veil Overlay**: A landing page featuring interactive service previews, role entry points (Client vs. Lawyer), live background particle canvas (`ParticleCanvas`), and custom legal-themed transition veil (`LegalVeil`) page animations.
* **Real-time Legal Consultation**: A conversational interface leveraging Gemini's retrieval-augmented synthesis pipeline for answering case queries with precedent citations.
* **Firebase Authentication & Google Sign-In**: Support for secure Email/Password registration/login and native **Google Sign-In**.
* **Auto-Provisioning User & Advocate Profiles**: Automatically spins up database records in Firestore (`/users/{uid}`) upon first sign-in (for both Google and email users) to track active roles, sessions, and verification statuses.
* **Environment-Aware Core API**: Automatically directs API traffic to local serverless proxy (`/core-api`) in development mode, and connects directly to live serverless Cloud Run domain in production.
* **Dynamic Cases & P2P Inbox**: Fully functional, real-time message inbox and case workflow management interfaces communicating with FastAPI WebSocket and REST APIs (removing static mocks).

---

## 📂 Project Structure

* `/src/api/firebase.js`: Firebase client initialization (Auth and Firestore DB).
* `/src/api/legal.js`: Interface to backend RAG API, resolving base URLs dynamically based on environment.
* `/src/context/AuthContext.jsx`: Authentication context provider handling Firebase triggers, login status, and auto-profiling.
* `/src/components/PageTransition/LegalVeil.jsx`: Legal-themed cinematic transition veil animation.
* `/src/components/ParticleCanvas.jsx`: Dynamic background particle canvas.
* `/src/pages/LandingPage.jsx`: Full-screen product landing page with feature cards, statistics, and role selection.
* `/src/pages/AuthPage.jsx`: Glassmorphic login and registration layout for client users.
* `/src/pages/LawyerAuthPage.jsx`: Dedicated advocate authentication and onboarding portal.
* `/src/pages/LexAIChatPage.jsx`: Responsive RAG chat console with source precedents and legal citations.
* `/src/pages/InboxPage.jsx`: Real-time peer-to-peer workspace messaging console.
* `/src/pages/CasesPage.jsx`: Case history tracker showing current case status and workflow state transitions.
* `/src/pages/LawyerFeed.jsx`: Interactive advocate directory and public cases feed.

---

## ⚙️ Development & Deployment

### 1. Run Locally
Install dependencies and run the Vite server locally:
```bash
npm install
npm run dev
```

### 2. Build and Deploy to Firebase
Build the static distribution files and upload them to Firebase Hosting:
```bash
npm run build
firebase deploy --only hosting
```
