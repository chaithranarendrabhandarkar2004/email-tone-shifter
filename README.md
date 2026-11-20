# ✉️ Email Tone Shifter

An AI-powered email rewriting application built with React, TypeScript, and Google Gemini. Transform rough, frustrated, or unstructured email drafts into polished, professional communications with your preferred tone and length.

## 🚀 Overview

Email Tone Shifter helps users communicate more effectively by transforming their original email drafts into clear, respectful, and well-structured messages.

Whether you need a professional workplace email, an empathetic response, a concise executive brief, or a sincere apology, this application uses Google Gemini AI to adapt your message while preserving its original meaning.

## ✨ Features

- **AI-Powered Email Transformation:** Uses Google Gemini to rewrite email drafts.
- **Multiple Writing Tones:** Choose from five available tones:
  - Professional
  - Empathetic
  - Direct & Concise
  - Executive Brief
  - Sincere Apology
- **Flexible Email Length:** Choose Short, Standard, or Detailed output.
- **Copy to Clipboard:** Copy the generated email easily.
- **Recent Transformation History:** Stores up to 20 recent transformations.
- **Restore Previous Drafts:** Reload previously transformed emails.
- **Clear History:** Remove saved transformation history.
- **Loading and Error States:** Provides feedback during AI processing.
- **Responsive Interface:** Clean, user-friendly email editing interface.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | User interface |
| TypeScript | Application logic and type safety |
| Vite | Development server and build tool |
| Google Gemini API | AI-powered email transformation |
| @google/genai | Gemini API integration |
| Lucide React | Icons |
| Browser Local Storage | Transformation history |

## 📁 Project Structure

```text
email-tone-shifter/
│
├── services/
│   └── geminiService.ts
│
├── App.tsx
├── index.tsx
├── types.ts
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/chaithranarendrabhandarkar2004/email-tone-shifter.git
```

### 2. Navigate to the Project

```bash
cd email-tone-shifter
```

### 3. Install Dependencies

Make sure Node.js and npm are installed.

```bash
npm install
```

### 4. Configure Google Gemini API

This project uses the Google Gemini API through the `@google/genai` package.

The current implementation reads the API key using:

```typescript
process.env.API_KEY
```

Configure the API key securely and ensure the application environment supports the variable expected by the code.

**Security note:** Do not commit API keys or secret credentials to GitHub. The current frontend implementation should be adapted to use a secure backend for production deployment rather than exposing an API key in browser code.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## 💻 Available Commands

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |

## 🔄 How It Works

1. Enter your original email draft in the input section.
2. Select your desired communication tone.
3. Choose the preferred email length.
4. Click **Professionalize Email**.
5. Google Gemini processes the draft and generates a rewritten email.
6. Review the generated result.
7. Copy the email or access previous transformations through the history section.

## 🧠 AI Transformation Guidelines

The Gemini integration is designed to:

- Preserve the original message and its intended meaning.
- Remove unnecessary aggression, sarcasm, and unprofessional language.
- Improve clarity, structure, and readability.
- Adapt the writing style to the selected tone.
- Follow the requested email length.
- Avoid inventing names, dates, or other missing information.

## 💾 Data Storage

The application uses browser Local Storage to maintain recent transformation history.

- Stores up to 20 recent transformations.
- Allows users to restore previous drafts.
- Provides an option to clear saved history.

Transformation history is stored locally in the browser.

## 🔐 Security and Privacy

- Never upload API keys or `.env.local` files to a public repository.
- Avoid entering confidential or sensitive information into the application.
- Use a secure backend for production API requests.
- Review the data-handling practices of the AI service before using it with private communications.

## 🎯 Project Objective

The objective of Email Tone Shifter is to demonstrate how generative AI can improve everyday professional communication through natural language processing, modern frontend development, and AI API integration.

## 👩‍💻 Author

**Chaithra Narendrabhandarkar**

GitHub: [@chaithranarendrabhandarkar2004](https://github.com/chaithranarendrabhandarkar2004)

---

⭐ If you find this project useful, consider giving the repository a star!
