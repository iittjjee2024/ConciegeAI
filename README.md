# 🤖 ConciergeAI — Multi-Agent Personal Concierge Assistant

<div align="center">

![ConciergeAI Banner](src/assets/hero.png)

**An advanced multi-agent concierge system that visualizes planning, scheduling, travel itineraries, task prioritization, and safety auditing — all in real-time.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://concierge-ai.vercel.app)
[![Version](https://img.shields.io/badge/version-1.2.0-blue?style=for-the-badge)]()
[![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)]()

</div>

---

## 📖 Overview

ConciergeAI is a front-end simulation of a **parallelized multi-agent AI system** that acts as a personal concierge. It demonstrates how multiple specialized AI agents (Intent Classifier, Context Agent, Planning Agent, Scheduling Agent, etc.) can collaborate in a pipeline to handle complex user requests — from trip planning to task prioritization.

The application features a 3-column dashboard layout with an **Agent Monitor Panel**, an **Interactive Chat Terminal**, and a **Workspace Dashboard** with multiple tabbed tools.

---

## ✨ Features

- **9 Specialized Agent Nodes** — Each agent handles a distinct responsibility (intent classification, context extraction, planning, scheduling, productivity, travel, memory, safety, response)
- **Real-time Agent Pipeline Visualization** — Watch agents activate sequentially with live console logs and a phase progress tracker
- **Chat Terminal** — Submit natural language queries or use prompt presets to trigger the multi-agent system
- **Task Prioritization Board (P1–P4)** — Drag-and-drop task management classified by urgency
- **Time-Blocking Calendar** — Visual schedule with deep work, breaks, meetings, and routine blocks
- **Travel Itinerary Planner** — Day-by-day stop explorer with budget tracking and packing checklists
- **Document Summarizer** — Extracts action items, decisions, and deadlines from raw notes
- **Consensual Memory Bank** — Stores user preferences only with explicit permission via consent dialogs
- **Privacy & Safety Auditing** — Simulated compliance checks before response delivery

---

## 🖼️ Live Demo & Preview

<div align="center">

### Dashboard Overview

![ConciergeAI Dashboard](src/assets/hero.png)

</div>

| Agent Monitor | Chat Terminal | Workspace Tabs |
|:---:|:---:|:---:|
| ![Agents](src/assets/hero.png) | ![Chat](src/assets/hero.png) | ![Workspace](src/assets/hero.png) |

> 💡 *Replace the placeholder images above with actual screenshots of the running application.*

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Vanilla JavaScript (ES Modules)** | Core application logic & DOM rendering |
| **HTML5** | Semantic structure & accessibility |
| **CSS3** | Custom styling with CSS variables, glassmorphism effects, animations |
| **Vite** | Lightning-fast dev server & production build tool |
| **Lucide Icons** | Lightweight SVG icon library (via CDN) |
| **Google Fonts** | Typography — Outfit, Plus Jakarta Sans, JetBrains Mono |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/iittjjee2024/ConciegeAI.git

# Navigate to the project
cd concierge-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
concierge-ai/
├── index.html              # Main HTML with full UI layout
├── package.json            # Project metadata & scripts
├── public/
│   ├── favicon.svg         # App favicon
│   └── icons.svg           # Custom SVG icons
├── src/
│   ├── main.js             # App entry — state, rendering, event handling
│   ├── agentSimulator.js   # Agent pipeline simulation & preset data
│   ├── style.css           # Full application styles
│   └── assets/
│       └── hero.png        # Hero/banner image
└── dist/                   # Production build output
```

---

## 🧠 How It Works

1. **User submits a query** via the chat terminal or preset chips
2. **Intent Classifier** categorizes the request (travel, schedule, tasks, summary)
3. **Context Agent** extracts key parameters (dates, locations, constraints)
4. **Planning Agent** breaks the goal into milestones
5. **Scheduling Agent** maps tasks to time blocks
6. **Productivity Agent** prioritizes actions (P1–P4 framework)
7. **Travel Agent** generates itineraries & checklists (if applicable)
8. **Memory Agent** checks/stores user preferences (with consent)
9. **Safety Agent** audits for privacy compliance
10. **Response Agent** compiles the final structured output

All stages are visualized in real-time with progress indicators, agent console logs, and system event feeds.

---

## 🎨 Design Highlights

- **Dark theme** with glassmorphism panels and subtle glow effects
- **3-column responsive layout** — Agent Monitor, Chat, and Workspace
- **Animated phase tracker** showing pipeline progress
- **Color-coded priority system** (P1 Red → P4 Gray)
- **Consent-first memory** — never stores data without user approval

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ☕ and curiosity.**

</div>
