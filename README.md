<img src="https://i.ibb.co.com/7NrtB6Vv/image.png" />

# Forkathon 2026: [Your Project Name] by [KUET_KUMROPOTASH]

> Built for ForkedArch Freshers Hackathon 2026

## 👥 Teama

| Name              | Roll     | Department | GitHub           |
| ------------------| -------- | ---------- | --------------   |
| Durja Das         | 52507021 | CSE        | durjadas12-eng   |
| Farha Afsin Mahi  | 52507048 | CSE        | mahioops         |
| M. Sunzid Haque   | 52507012 | CSE        | sunzid874-code   |
| Md. Siam Ahmmed   | 52507073 | CSE        | ahmmedsiam287-bot|               |

---

## ❔ Problem

### Problem Statement

> Here is the Problem Statement for  KUET_Kumropotash,

The Last Plate

At the end of the day, a cafeteria has trays of untouched food. Meanwhile, somewhere nearby, students are wondering whether they should order something because they don't know what will be available later.

Every day, food is prepared based on guesses. Some days there isn't enough. Other days, far too much remains.

Maybe we create a technology-driven approach to reduce unnecessary food waste while improving the experience for both food providers and consumers?

Your system could help predict demand, track consumption, redistribute surplus, communicate availability, or encourage better decisions.

And also maybe a solution if somehow leftover foods are there, the leftover foods should not have been wasted.


Brainstorming twist: Don't focus only on reducing food. Think about the entire journey from prediction → preparation → consumption → leftovers.

### 🤔 [KUET_KUMROPOTASH]'s Understanding

Explain the problem in your own words. You may say a story mentioning your team member names!

What is the actual problem?
Who experiences it?
Why does it matter?

---

## 💡 Our Solution
Predict before preparing. Rescue before wasting.

### Overview

Describe your proposed solution.

### How It Works

Explain the complete flow of your system.

1.
2.
3.

---

## 🏗️ Architecture

🍽️ Food Loop — System Architecture

Food Loop is a smart campus cafeteria management platform designed to reduce food waste through data-driven meal planning, student meal intentions, reservations, and surplus food rescue.

The system connects students, cafeteria administrators, and the database through a centralized backend. Students can log in, select their meal intentions, reserve meals, and discover discounted surplus food. Administrators can monitor real-time demand, manage meals, publish rescue offers, and track cafeteria performance.

Technology Stack:
HTML • CSS • JavaScript • Python Flask • REST API • MongoDB Atlas

🔄 Core Data Flow

Student → Frontend → Flask API → MongoDB → Admin Dashboard

Admin → Flask API → MongoDB → Real-time Offer → Student


                    🍽️ FOOD LOOP
                 KUET Campus Food System
                           │
                           ▼
                  ┌─────────────────┐
                  │   FRONTEND      │
                  │ HTML / CSS / JS │
                  └────────┬────────┘
                           │
                    HTTPS API Requests
                           │
                           ▼
                  ┌─────────────────┐
                  │  FLASK BACKEND  │
                  │     Python      │
                  │    REST API     │
                  └────────┬────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
   Student Login      Meal Choice      Admin Stats
   /api/student/      /api/meal-choice  /api/admin/
      login                              stats
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                  ┌─────────────────┐
                  │  MongoDB Atlas  │
                  │    Database     │
                  └────────┬────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
          Students      Meals        Reservations
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                    📊 ADMIN PORTAL
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        Meal Demand    Food Rescue   Analytics
        Prediction       Offer        & Stats
                           │
                           ▼
                    🎟️ STUDENT
                  Rescue Meal Offer
<b>Forkathon: Freshers Hackathon 2026 presented by ForkedArch powered by XtendArena</b>
