# NutriSnap – Project Documentation

## 1. Project Overview

**App Name:** NutriSnap  
**Description:**  
NutriSnap is an AI-powered smart nutrition web app that simplifies healthy eating. Users can snap a picture of their meal, get instant nutritional analysis, and receive personalized AI-driven dietary advice. The app also provides recipe suggestions, health insights, and a modern, visually engaging user interface.  

**Goal:**  
Make nutrition tracking easy, personalized, and engaging.

---

## 2. Tech Stack

- **Frontend:** React.js / Next.js  
- **Backend:** Next.js / SSR  
- **Database:** Neon (Serverless Postgres) with Prisma  
- **AI & ML:** Gemini AI for image recognition and features  
- **UI/UX:** Tailwind CSS and custom CSS  
- **Deployment:** Vercel  

---

## 3. Major Features

### 3.1 Snap & Analyze Meals 📷
- Users can upload or snap a meal photo.  
- AI-powered Gemini Vision API instantly detects food items.  
- Provides nutritional breakdown: calories, protein, carbs, fats.  
- AI evaluates the meal against user goals (e.g., weight loss, muscle gain).  

### 3.2 Top Meals Explorer 🍽
- Dedicated Top Meals page showcasing trending or recommended meals.  
- Meal cards show photos, nutrition highlights, and brief insights.  
- Tap to expand: Opens a detailed meal card with recipe, ingredients, preparation steps, and nutrition value.  
  - **Ask AI Feature:** Users can interact with AI to modify recipes, get ingredient substitutes, and ask health-related questions about the dish.  

### 3.3 Progress Wheels & Tracking 📊
- **Home Page:** Interactive circular progress wheels for calories, protein, carbs & fats.  
- Users instantly see daily progress vs. goals.  
- **Insights Section:** Tracks long-term nutrition performance, provides a NutriScore, and AI suggests adjustments for better balance.  
- **My Meals Page:** Comprehensive manual meal logging and tracking (or choose from a wide range of preset foods).  

### 3.4 Medicines & Health AI 🩺
- Users can log medicines and chronic conditions.  
- AI tracks patterns and provides lifestyle tips.  
- Helps in preventive healthcare with AI-powered recommendations.  

### 3.5 Profile & Personalized Setup 🩺⚕
- User profile includes weight, height, BMI, age, and health goals.  
- AI uses this data to tailor recommendations, calorie targets, and alerts.  

### 3.6 Authentication and Profile 🔐
- Robust custom user authentication system.  
- Profile building tailored to the user in the "Profile" tab in the navigation bar.  
- Ensures data privacy and secure user sessions.  
