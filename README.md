<img src="https://i.ibb.co.com/7NrtB6Vv/image.png" />

# Forkathon 2026: FOOD LOOP by [KUET_KUMROPOTASH]

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


## 🏗️ System Architecture

```mermaid
flowchart TD

    A[🎓 Student] --> B[🌐 Frontend<br/>HTML · CSS · JavaScript]

    B -->|HTTPS API| C[⚙️ Flask Backend<br/>Python REST API]

    C --> D[(🍃 MongoDB Atlas)]

    D --> E[📊 Admin Portal]

    E --> F[🤖 Demand Prediction]
    E --> G[♻️ Food Rescue]
    E --> H[📈 Analytics & Stats]

    G -->|Discounted Offer| B

    A --> I[🍽️ Meal Intention]
    I --> B

    B --> J[🎟️ Meal Reservation]
    J --> C

    C --> K[📦 Surplus Food]
    K --> G
```

### 🔄 Core Data Flow

**Student → Frontend → Flask API → MongoDB → Admin Portal**

**Admin → Flask API → MongoDB → Food Rescue Offer → Student**

### 🧠 How Food Loop Works

Food Loop collects student meal intentions to estimate cafeteria demand before food is prepared. This helps cafeteria administrators prepare a more appropriate amount of food and reduce unnecessary waste.

When surplus food remains, administrators can create a **time-limited discounted Food Rescue offer**. The offer is then displayed prominently on the student portal so students can rescue the available food before it becomes waste.

### 🛠️ Technology Stack

`HTML` · `CSS` · `JavaScript` · `Python Flask` · `REST API` · `MongoDB Atlas`

> **Predict before preparing. Rescue before wasting. 🌱**


                 
