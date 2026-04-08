## PrepGenie

PrepGenie is an AI-powered full-stack web application designed to supercharge study sessions. It enables students to generate structured study notes, store them in the cloud, and download them anytime as files.

The system integrates AI-driven content generation with a scalable backend and cloud storage, making learning more efficient, accessible, and persistent.

---

## 🚀 Project Objective

The goal of this project is to:

- Build an intelligent AI-powered educational assistant  
- Integrate Large Language Models (LLMs) into a real-world application  
- Design a full-stack architecture with frontend, backend, and cloud  
- Enable persistent storage and downloadable study material  
- Create a scalable system using cloud technologies  

---

## 🧠 Artificial Intelligence Approach

The system uses:

- Groq API for fast LLM inference  
- `llama-3.3-70b-versatile` model  
- Prompt engineering to generate structured and concise notes  
- Optimized token usage for faster responses  

The AI generates:

- Short structured notes  
- Key concepts with explanations  
- Quick summaries for revision  

---

## ☁️ Cloud Integration (AWS S3)

- Implemented AWS S3 for persistent storage of generated notes  
- Files are uploaded using the `boto3` SDK  
- Each file is uniquely named using UUID to prevent overwriting  
- Public URLs are generated for instant access and download  
- Enables scalability and multi-user support  

---

## 📥 Features

- 📚 AI-generated study notes  
- ☁️ Cloud storage using AWS S3  
- ⬇️ Downloadable notes (Text File)  
- ⚡ Real-time API communication  
- 🎯 Clean and responsive UI  
- 🔁 End-to-end full-stack integration  

---

## 🏗️ Tech Stack

### Frontend
- React  
- Vite  
- TypeScript  
- Tailwind CSS  
- shadcn/ui  
- Framer Motion  

### Backend
- FastAPI (Python)  
- REST APIs  

### AI
- Groq API (LLMs)  

### Cloud
- AWS S3 (Object Storage)  

### Libraries / Tools
- boto3  
- python-dotenv  

---

## ⚙️ Key Implementation Details

- Built a REST API pipeline for AI-based note generation  
- Generated notes dynamically using LLMs  
- Integrated AWS S3 for cloud storage and retrieval  
- Managed environment variables securely using `.env`  
- Handled CORS for frontend-backend communication  
- Optimized performance by reducing token size and prompt complexity  

---

## 🚧 Challenges Faced

- Integrating frontend, backend, AI, and cloud into one system  
- Handling CORS and API connectivity issues  
- Managing Python environments and dependencies  
- Configuring AWS S3 permissions and bucket policies  
- Balancing LLM response quality with performance  

---

## 🔮 Future Improvements

- 🔐 Secure downloads using pre-signed URLs  
- 👤 User authentication system  
- 📊 User dashboard with saved notes  
- 📱 Mobile-friendly version  
- 🧠 Adaptive AI-based recommendations  

---

## ⚠️ Disclaimer

This project is developed for educational purposes. Always cross-check AI-generated content with official study material.

---

## 👩‍💻 Author

**Riya Singh**  
AI/ML Engineer  
