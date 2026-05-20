# SkillSphere — Online Learning Platform

A modern online learning platform where users can explore courses, watch lessons, and enroll in skill-based programs like Web Development, Design, Marketing, and more.

## 🔗 Links

- **Live URL:** https://skillsphere-bice.vercel.app/
- **GitHub:** https://github.com/mrnafi1/skillsphere-application

## ✨ Key Features

- 🎓 Browse 8+ expert-led courses across Development, Design & Marketing
- 🔐 Secure authentication with BetterAuth (Email/Password + Google OAuth)
- 📋 Private routes for Course Details and My Profile
- 🔍 Search courses by title with live filtering
- 📂 Category sidebar filter (Development, Design, Marketing)
- 🎠 Hero banner with Swiper.js slider
- 📝 Course enrollment with history tracking
- 👤 Profile page with update name & avatar feature
- 📱 Fully responsive — mobile, tablet & desktop
- ⚡ Shimmer loading states across all data-fetching areas
- 🚫 Custom 404 not-found page

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | Framework (App Router) |
| Tailwind CSS | Styling |
| DaisyUI | UI Components |
| BetterAuth | Authentication |
| MongoDB Atlas | Database |
| Swiper.js | Hero Slider |
| react-hot-toast | Toast Notifications |
| react-icons | Icons |

## 📦 NPM Packages Used

```json
"better-auth":     "^1.0.0",
"mongodb":         "^6.21.0",
"next":            "14.2.35",
"react-hot-toast": "^2.4.1",
"react-icons":     "^5.1.0",
"swiper":          "^12.1.4"
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (optional, for social login)

### 1. Clone the repository

```bash
git clone https://github.com/mrnafi1/skillsphere-application.git
cd skillsphere-application
```

### 2. Install dependencies

```bash
npm install
```

**Live Site:** [https://skillsphere-bice.vercel.app/](https://skillsphere-bice.vercel.app/)

## 📁 Project Structure

```
skillsphere/
├── app/
│   ├── (auth)/login/       # Login page
│   ├── (auth)/register/    # Register page
│   ├── api/auth/           # BetterAuth handler
│   ├── api/courses/        # Courses API
│   ├── api/enroll/         # Enrollment API
│   ├── api/seed/           # Database seeder
│   ├── courses/[id]/       # Course detail (private)
│   ├── profile/            # My profile (private)
│   ├── profile/update/     # Update profile (private)
│   ├── not-found.jsx       # 404 page
│   └── page.jsx            # Home page
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PrivateRoute.jsx
│   ├── HeroBanner.jsx      # Swiper hero slider
│   ├── Marquee.jsx
│   ├── PopularCourses.jsx
│   ├── LearningTips.jsx
│   ├── TopInstructors.jsx
│   ├── TrendingCourses.jsx
│   └── CourseCard.jsx
└── lib/
    ├── auth.js             # BetterAuth server config
    ├── auth-client.js      # BetterAuth client
    └── mongodb.js          # MongoDB connection
```

