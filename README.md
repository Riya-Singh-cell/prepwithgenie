## 🌐 Live Demo

👉 **[Try PrepGenie](https://prepwithgenie.vercel.app/)**

PrepGenie is an AI-powered web application designed to supercharge your study sessions. The system helps you learn faster by generating highly customized study notes, building personalized weekly timetables, and crafting dynamic interactive mock tests based on your exact syllabus.

The core of the application relies on the lightning-fast Groq API running the `llama-3.3-70b-versatile` model to provide structure, scheduling, and quizzing on-the-fly.

## 🚀 Project Objective
The goal of this project is to:
- Build an intelligent educational assistant
- Leverage Large Language Models (LLMs) to generate structured output (JSON)
- Create interactive UI components for studying and mock testing
- Deliver ultra-low latency AI interactions using Groq

## 🧠 Artificial Intelligence Approach
The system uses:
- The Groq SDK for near-instant inference
- The `llama-3.3-70b-versatile` model
- Strict JSON schematic prompting for predictable and structured outputs
- Prompt engineering targeted explicitly at educational content

The architecture features the following core modules:
- **Smart Study Notes:** Instant subject summaries and key tips
- **Study Timetable:** Customizable 7-day schedules depending on available hours
- **Mock Tests:** Interactive MCQ, True/False, Short Answer, and Essay grading with AI-provided "Ideal Answers".

## 📥 Input Features
The application takes in various parameters to fully customize the AI output:
- **Subject / Exam Name**
- **Exam Type** (Board, Competitive, Entrance, University)
- **Detailed Syllabus Content** 
- **Skill Level & Available Hours** (for planning)

These inputs are combined and sent as structured context into the LLM to yield personalized study aids.

## 🏗️ Tech Stack
- **Frontend Framework:** React, Vite, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, Framer Motion
- **AI Integration:** Groq API (`groq-sdk`)
- **Routing:** React Router
- **Icons:** Lucide React

## 🎯 Key Highlights
- Real-time dynamic JSON generation for complex UI rendering
- Subjective test evaluation and "Ideal Answer" reveal
- Beautiful, modern, and engaging user interface
- Ultra-fast responses powered by Groq's specialized inference engine

## ⚠️ Disclaimer
This project is developed for educational tools and productivity enhancement. It is highly recommended to always cross-verify AI-generated study material with your official course textbooks and resources.

## 👩‍💻 Author
**Riya Singh**  
AI/ML Engineer
