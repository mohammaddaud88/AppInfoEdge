# AppInfoEdge — Backend (mock Gemini)

This small Express server provides a mock implementation of the JD generator API used by the frontend.

Why mock?
- The frontend expects a structured response from an AI backend. This server returns a deterministic mock so you can develop the UI without external API keys.

How to run

1. Install dependencies

```bash
cd backend
npm install
```

2. Run the server

```bash
# development (auto-restart if you have nodemon)
npm run dev

# or run directly
npm start
```

The server listens on port 5000 by default. You can change the port with `PORT` env var.

Endpoints
- POST /api/generate-jd
  - Body: { jobTitle: string }
  - Response (200): { success: true, data: { title, department, location, experienceLevel, responsibilities:[], mustHave:[], goodToHave:[] } }

- GET /health
  - Response: { ok: true }

Enabling a real Gemini integration
- This project ships a mock by default. To wire a real provider:
  1. Implement the call inside `index.js` where the `USE_REAL_GEMINI` branch is.
 2. Set the following environment variables before running the server:

```bash
# Example (macOS / zsh)
export USE_REAL_GEMINI=true
export GEMINI_API_KEY="<YOUR_GOOGLE_API_KEY>" # the API key for Google Generative Language
export GEMINI_PROVIDER=google
# Example model: text-bison-001 (adjust if you have a different model)
export GEMINI_MODEL=text-bison-001
```

3. Follow the provider-specific API docs to construct prompts and parse responses.

Tip: Use the debug endpoint POST `/api/debug-gemini` (body: { jobTitle }) to retrieve the raw provider response for prompt tuning.

Security
- Don’t commit API keys. Use environment variables or secret managers when deploying.
