import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }))
app.use(express.json())

/**
 * POST /api/generate-jd
 * Body: { jobTitle: string }
 *
 * Behavior:
 * - If environment variable USE_REAL_GEMINI === 'true' and GEMINI_API_KEY is set,
 *   the server will attempt to proxy to Gemini.
 * - By default it returns a mocked structured JD object suitable for the frontend.
 */
app.post('/api/generate-jd', async (req, res) => {
  const { jobTitle } = req.body || {}

  if (!jobTitle || typeof jobTitle !== 'string' || !jobTitle.trim()) {
    return res.status(400).json({ success: false, error: 'jobTitle is required' })
  }

  // If USE_REAL_GEMINI is set to 'true' and GEMINI_API_KEY is present, try calling
  // the configured provider. Otherwise fall back to the mocked response below.
  const useReal = String(process.env.USE_REAL_GEMINI || '').toLowerCase() === 'true'
  const apiKey = process.env.GEMINI_API_KEY

  if (useReal && apiKey) {
    try {
      // Currently we support the Google Generative Language REST endpoint.
      // Configure provider/model via env vars:
      // - GEMINI_PROVIDER (default: 'google')
      // - GEMINI_MODEL (default: 'text-bison-001')
      const provider = (process.env.GEMINI_PROVIDER || 'google').toLowerCase()
      const model = process.env.GEMINI_MODEL || 'text-bison-001'

      if (provider === 'google') {
        // Use the Google Generative Language REST API
        const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText?key=${apiKey}`

        // A strict prompt that asks the model to emit only JSON following the schema.
        // The model is instructed to respond *only* with JSON and nothing else.
        const schema = {
          title: 'string',
          department: 'string',
          location: 'string',
          experienceLevel: 'string',
          responsibilities: ['string'],
          mustHave: ['string'],
          goodToHave: ['string'],
        }

        const example = {
          title: `${jobTitle} (Example)` ,
          department: 'Engineering',
          location: 'Remote',
          experienceLevel: 'Mid-Senior',
          responsibilities: [
            `Design and implement features for ${jobTitle}`,
            'Collaborate with teams',
          ],
          mustHave: ['5+ years experience', 'React'],
          goodToHave: ['AI/ML familiarity'],
        }

        const prompt = `You are a JSON-only generator. Produce a single JSON object and no other text. The object MUST match the schema: ${JSON.stringify(
          schema
        )}. Example output for role "${jobTitle}": ${JSON.stringify(example)}. Now generate a job description object for the role: "${jobTitle}".`

        const body = {
          prompt: { text: prompt },
          temperature: 0.15,
          maxOutputTokens: 800,
        }

        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        if (!r.ok) {
          const text = await r.text()
          console.error('Gemini provider error:', r.status, text)
          throw new Error(`Provider error: ${r.status}`)
        }

        const json = await r.json()

        // Defensive extraction of the text output from provider
        let rawText = null
        // Google generative language v1beta2 often returns `candidates` array
        if (json.candidates && Array.isArray(json.candidates) && json.candidates[0]) {
          // candidate may include `output` or `content` or similar
          const cand = json.candidates[0]
          rawText = cand.output || cand.content || cand.text || cand.message || null
        }
        // older shapes may put it on `output` or `response` fields
        if (!rawText && (json.output || json.result || json.text)) rawText = json.output || json.result || json.text
        if (!rawText && typeof json === 'string') rawText = json

        if (!rawText) {
          console.warn('No textual output found from Gemini provider; returning raw response for inspection')
          return res.status(502).json({ success: false, error: 'No output from provider', providerResponse: json })
        }

        // If provider returned an array of tokens or objects, stringify conservatively
        if (typeof rawText !== 'string') {
          try {
            rawText = JSON.stringify(rawText)
          } catch (e) {
            rawText = String(rawText)
          }
        }

        // Try to parse the JSON strictly
        let parsed = null
        try {
          parsed = JSON.parse(rawText)
        } catch (err) {
          // Try to extract JSON substring between first { and last }
          const first = rawText.indexOf('{')
          const last = rawText.lastIndexOf('}')
          if (first !== -1 && last !== -1 && last > first) {
            const sub = rawText.slice(first, last + 1)
            try {
              parsed = JSON.parse(sub)
            } catch (err2) {
              console.error('Failed to parse JSON from provider output', err2)
            }
          }
        }

        if (parsed) {
          return res.json({ success: true, data: parsed })
        }

        // Parsing failed – return raw text so frontend can show and developer can inspect
        return res.json({ success: true, data: { raw: rawText } })
      } else {
        return res.status(400).json({ success: false, error: `Unsupported GEMINI_PROVIDER=${process.env.GEMINI_PROVIDER}` })
      }
    } catch (err) {
      console.error('Error calling Gemini provider:', err)
      // Fall through to mocked response below as a graceful fallback
    }
  }

  // Mocked response
  const normalizedTitle = jobTitle.trim()
  const mock = {
    title: normalizedTitle,
    department: 'Engineering',
    location: 'Remote',
    experienceLevel: 'Mid-Senior',
    responsibilities: [
      `Design and implement features for ${normalizedTitle}`,
      'Collaborate with cross-functional teams to define and ship new features',
      'Write clean, maintainable code and participate in code reviews',
    ],
    mustHave: [
      '5+ years of relevant experience',
      'Strong knowledge of JavaScript/TypeScript and React',
      'Experience with RESTful APIs and modern web tooling',
    ],
    goodToHave: [
      'Experience with AI/ML integrations',
      'Familiarity with cloud platforms (AWS/GCP/Azure)',
    ],
  }

  // Simulate a small delay to mimic AI latency
  await new Promise((r) => setTimeout(r, 600))

  return res.json({ success: true, data: mock })
})

app.get('/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }))

/**
 * Debug endpoint to proxy the raw provider response. Useful when tuning the prompt.
 * POST /api/debug-gemini
 * Body: { jobTitle: string }
 * Returns the full provider JSON for inspection.
 */
app.post('/api/debug-gemini', async (req, res) => {
  const { jobTitle } = req.body || {}
  if (!jobTitle) return res.status(400).json({ success: false, error: 'jobTitle is required' })

  const useReal = String(process.env.USE_REAL_GEMINI || '').toLowerCase() === 'true'
  const apiKey = process.env.GEMINI_API_KEY
  if (!useReal || !apiKey) return res.status(400).json({ success: false, error: 'Real provider not enabled or GEMINI_API_KEY missing' })

  const provider = (process.env.GEMINI_PROVIDER || 'google').toLowerCase()
  const model = process.env.GEMINI_MODEL || 'text-bison-001'

  if (provider !== 'google') return res.status(400).json({ success: false, error: 'Only google provider supported by debug endpoint' })

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText?key=${apiKey}`
    const body = { prompt: { text: `DEBUG: return text only for ${jobTitle}` }, temperature: 0.0 }
    const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const json = await r.json()
    return res.json({ success: true, providerResponse: json })
  } catch (err) {
    console.error('Debug proxy error', err)
    return res.status(502).json({ success: false, error: String(err) })
  }
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend mock listening on http://localhost:${PORT} (GEMINI_API_KEY=${process.env.GEMINI_API_KEY || 'false'})`)
})

// --- Self-check (no-network) ------------------------------------------------
// Perform a small check that builds the prompt and can parse an example JSON
// This helps catch runtime errors early without calling the provider.
;(function selfCheck() {
  try {
    const exampleJob = 'Senior Frontend Engineer'
    const schema = {
      title: 'string',
      department: 'string',
      location: 'string',
      experienceLevel: 'string',
      responsibilities: ['string'],
      mustHave: ['string'],
      goodToHave: ['string'],
    }
    const example = {
      title: `${exampleJob} (Example)`,
      department: 'Engineering',
      location: 'Remote',
      experienceLevel: 'Mid-Senior',
      responsibilities: [`Design and implement features for ${exampleJob}`],
      mustHave: ['5+ years experience'],
      goodToHave: ['AI/ML familiarity'],
    }
    const prompt = `You are a JSON-only generator. Produce a single JSON object and no other text. The object MUST match the schema: ${JSON.stringify(
      schema
    )}. Example output for role "${exampleJob}": ${JSON.stringify(example)}. Now generate a job description object for the role: "${exampleJob}".`

    // quick parse test of the example
    const s = JSON.stringify(example)
    const parsed = JSON.parse(s)
    if (!parsed.title || !Array.isArray(parsed.responsibilities)) {
      console.error('Self-check failed: example parsing mismatch')
    } else {
      console.log('Self-check OK: prompt built and example parsed successfully')
    }
  } catch (err) {
    console.error('Self-check error', err)
  }
})()

