# ✉️ Email Tone Shifter

An AI-powered email rewriting application that transforms rough email drafts into clear, polished, and professional messages using Google Gemini.

## 🚀 Overview

Email Tone Shifter helps users improve their email communication by adjusting the tone and length of their drafts. Whether you need a professional message, an empathetic response, or a concise executive brief, the application helps turn your original text into a more suitable email.

## ✨ Features

- **AI-Powered Transformation:** Uses Google Gemini to rewrite email drafts.
- **Multiple Tone Options:** Choose from five tones:
  - Professional
  - Empathetic
  - Direct & Concise
  - Executive Brief
  - Sincere Apology
- **Flexible Length:** Select Short, Standard, or Detailed.
- **Copy to Clipboard:** Easily copy the generated email.
- **Recent History:** Stores up to 20 recent transformations.
- **Restore Previous Drafts:** Reload an earlier email transformation.
- **Clear History:** Remove saved transformation history.

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- Google Gemini API
- Lucide React

## 📁 Project Structure

```text
email-tone-shifter/
├── services/
│   └── geminiService.ts
├── App.tsx
├── index.tsx
├── types.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/chaithranarendrabhandarkar2004/email-tone-shifter.git
cd email-tone-shifter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Gemini API key

Create a `.env.local` file and configure the environment variable expected by `services/geminiService.ts`.

Do not commit API keys or `.env.local` to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🏗️ Build for Production

```bash
npm run build
```

To preview the production build
