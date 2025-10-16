# 🤖 Code Review Assistant

An intelligent, web-based tool that uses the power of **Large Language Models (LLMs)** to automate code reviews.  
Upload a source code file, and the assistant will provide a detailed analysis covering readability, modularity, potential bugs, and suggestions for improvement — all in a clean, conversational UI.

---

## ✨ Features

- 🔍 **AI-Powered Code Analysis:** Leverages **Google’s Gemini Pro** model to provide expert-level insights into your code.  
- 💬 **Chatbot-Style Interface:** View review reports in a clean, modern, conversational chat UI.  
- 🕓 **Review History:** Automatically saves all past reviews for quick and easy access.  
- 🧭 **Dashboard View:** Browse, select, and manage your review history from a persistent sidebar.  
- 🗑️ **Secure Deletion:** Delete past reviews with a custom in-app confirmation modal.  
- 📱 **Responsive Design:** Sleek and functional UI built with **Tailwind CSS**.  

---

## 🛠️ Tech Stack

### **Backend**
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **LLM Integration:** [google-generativeai](https://pypi.org/project/google-generativeai/) for Gemini API  
- **Database:** SQLite  
- **ORM:** SQLAlchemy  
- **Server:** Uvicorn  

### **Frontend**
- **Framework:** [React](https://react.dev/) (with [Vite](https://vitejs.dev/))
- **Styling:** Tailwind CSS + Typography plugin  
- **API Client:** Axios  
- **UI Components:** React Icons, React Markdown  

### **Development**
- **Languages:** Python 3.10+, JavaScript (ES6+)  
- **Package Management:** `pip` (backend), `npm` (frontend)

---

## 🚀 Getting Started

Follow these steps to get the project running locally.

### **Prerequisites**
- Python 3.8+  
- Node.js v16+ and npm  
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

---

### **Installation & Setup**

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/code-reviewer.git
cd code-reviewer
````

#### 2️⃣ Backend Setup

Navigate to the project root:

```bash
cd code_reviewer
```

Create and activate a Python virtual environment:

```bash
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the root directory and add your API key:

```bash
GOOGLE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
```

#### 3️⃣ Frontend Setup

Navigate into the frontend directory:

```bash
cd frontend
```

Install the required npm packages:

```bash
npm install
```

Return to the root directory:

```bash
cd ..
```

---

## ▶️ Running the Application

You’ll need to run **two servers simultaneously** — backend and frontend — in separate terminals.

### **Start the Backend Server**

```bash
# From the project root
uvicorn main:app --reload
```

Backend will be running at:
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

### **Start the Frontend Server**

```bash
# From the frontend directory
npm run dev
```

Frontend will be available at:
👉 [http://localhost:5173](http://localhost:5173)

Open the URL in your browser to start using the app!

---

## 📝 API Endpoints

| Method     | Endpoint               | Description                     |
| ---------- | ---------------------- | ------------------------------- |
| **POST**   | `/review/`             | Upload a code file for analysis |
| **GET**    | `/reviews/`            | Retrieve all past reviews       |
| **GET**    | `/reviews/{review_id}` | Retrieve a single review by ID  |
| **DELETE** | `/reviews/{review_id}` | Delete a specific review by ID  |

---

## 📂 Project Structure

```
code-reviewer/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── requirements.txt
├── package.json
├── .env
└── README.md
```

---

## 🧑‍💻 Contributing

Contributions are welcome!
Feel free to open issues, suggest features, or submit pull requests.

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

**Developed with ❤️ using FastAPI, React, and Gemini Pro** 
