const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI with your API key
// console.log(process.env.GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate JD endpoint
const JDCreation = async (req, res) => {
  try {
    const { jobTitle } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ error: "Job title is required" });
    }

    // Use the correct model configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `You are an expert HR professional and job description writer. 
    Create a comprehensive and professional job description for the position: "${jobTitle}".

    Please provide the response in the following JSON format:

    {
      "title": "${jobTitle}",
      "department": "relevant department name",
      "location": "Remote / Hybrid / On-site",
      "experienceLevel": "Entry Level / Mid Level / Senior Level",
      "responsibilities": [
        "responsibility 1",
        "responsibility 2",
        "responsibility 3",
        "responsibility 4",
        "responsibility 5",
        "responsibility 6"
      ],
      "mustHave": [
        "must-have skill 1",
        "must-have skill 2",
        "must-have skill 3",
        "must-have skill 4",
        "must-have skill 5",
        "must-have skill 6"
      ],
      "goodToHave": [
        "good-to-have skill 1",
        "good-to-have skill 2",
        "good-to-have skill 3",
        "good-to-have skill 4",
        "good-to-have skill 5",
        "good-to-have skill 6"
      ]
    }`;

    // ✅ Correct content generation call for v1
    const result = await model.generateContent([prompt]);
    const text = result.response.text();

    // Remove unwanted markdown code fences
    const cleanText = text.replace(/```json|```/g, "").trim();

    const jdData = JSON.parse(cleanText);
    jdData.createdAt = new Date().toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    res.json({ success: true, data: jdData });
  } catch (error) {
    console.error("Error generating JD:", error);
    res.status(500).json({
      error: "Failed to generate job description",
      details: error.message,
    });
  }
};

module.exports = JDCreation;
