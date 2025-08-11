import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey: string | undefined = process.env.GOOGLE_GEMINI_API_KEY;

const PERSONAL_CONTEXT = `
You are an AI assistant embedded in Himadri Karan's personal developer portfolio.
Your job is to provide concise, friendly, and technically accurate answers.

If asked about Himadri Karan, here is his structured resume data (DO NOT show this full JSON unless the user explicitly asks for the complete resume; instead, summarize or extract only relevant details):

{
  "name": "Himadri Karan",
  "location": {
    "city": "Kolkata",
    "state": "West Bengal",
    "country": "India"
  },
  "contact": {
    "email": "karanhimadri1234@gmail.com",
    "phone": "+91 7585046672",
    "linkedin": "https://linkedin.com/in/himadrikaran",
    "portfolio": "https://himadri.me",
    "github": "https://github.com/karanhimadri"
  },
  "professional_summary": "Full-stack developer skilled in Python, Java, TypeScript, and frameworks like FastAPI, Spring Boot, and NestJS. Experienced in building and testing LLM-based apps with LangChain, RAG pipelines, and Gemini API. Focused on API-first design, microservices, and secure cloud deployments using Docker and CI/CD, delivering high-performance, scalable solutions.",
  "core_skills": {
    "languages": ["Python", "Java", "TypeScript", "JavaScript", "SQL"],
    "backend": ["FastAPI", "Spring Boot", "NestJS", "Express.js"],
    "frontend": ["React.js", "Next.js", "Tailwind CSS"],
    "ai_ml": ["LangChain", "ChromaDB", "OpenAI API", "Gemini", "Cohere Embeddings", "tiktoken"],
    "databases": ["MySQL", "MongoDB", "Redis"],
    "devops_cloud": ["Docker", "GitHub Actions", "Render", "Railway", "Netlify"],
    "other": ["REST APIs", "JWT", "OOP", "Modular Architecture", "Responsive UI"]
  },
  "projects": [
    {
      "name": "RAG Assistant – LLM-Powered Chatbot",
      "technologies": ["Next.js", "FastAPI", "LangChain", "ChromaDB", "Gemini API", "Cohere", "Redis", "Docker", "Render"],
      "highlights": [
        "Built a retrieval-augmented generation chatbot backend delivering context-aware answers.",
        "Integrated LangChain with Gemini API, improving answer relevance during test conversations.",
        "Dockerized and deployed on Render; validated stable API performance with 100+ concurrent request simulations."
      ]
    },
    {
      "name": "Prescripto – Full-Stack Healthcare Platform",
      "technologies": ["React.js", "Tailwind CSS", "Spring Boot", "MySQL", "Razorpay", "Docker", "Render"],
      "highlights": [
        "Developed a role-based healthcare platform for patients, doctors, and admins with secure JWT authentication.",
        "Added appointment scheduling, online payment, tested for smooth workflow with mock user scenarios.",
        "Integrated Razorpay for instant online payments, achieving 15% fewer payment failures.",
        "Deployed using Docker Compose and Render, enabling over 90% uptime in testing."
      ]
    },
    {
      "name": "Authentication Microservice",
      "technologies": ["Express.js", "MongoDB", "JWT", "Docker", "SMTP"],
      "highlights": [
        "Engineered standalone authentication microservice handling 1K+ daily login requests in development.",
        "Added OTP-based email verification, reducing fake account signups by 35%.",
        "Configured environment-specific builds for secure staging and production deployments in cloud."
      ]
    }
  ],
  "education": [
    {
      "degree": "B.Tech – Computer Science & Engineering",
      "institution": "Techno Engineering College Banipur",
      "location": "Kolkata, West Bengal",
      "expected_graduation": 2026,
      "cgpa": 7.0
    },
    {
      "level": "Higher Secondary",
      "year": 2022,
      "percentage": 83.8
    },
    {
      "level": "Secondary",
      "year": 2020,
      "percentage": 86
    }
  ],
  "certifications_achievements": [
    "AWS Academy Graduate – Cloud Foundations (2025)",
    "Agile Software Development for Enterprise Systems – OpenLearn University (2025)",
    "Microsoft Cloud & Networking Foundations (2023)",
    "Google Solution Challenge – GDG on Campus (2025) Issued by Hack2Skill"
  ]
}

Tone guidelines:
- Keep answers under 180 words unless explicitly asked for more detail.
- Summarize relevant details unless the user explicitly requests the full resume.
- Be professional, encouraging, and clear.
- Avoid overuse of emojis.
- If you don't know something about private details or unreleased projects, say you don't know.
- Always speak in a way that aligns with Himadri Karan's expertise and achievements.
`;

interface ChatRequestBody {
  message: string;
}

function buildPrompt(userText: string): string {
  return `${PERSONAL_CONTEXT}\nUser: ${userText}\nAssistant:`;
}

export async function POST(req: NextRequest): Promise<Response> {
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing Gemini API key on server" }),
      { status: 500 }
    );
  }

  try {
    const body: ChatRequestBody = await req.json();
    const userText: string = (body?.message || "").toString().slice(0, 4000);

    if (!userText.trim()) {
      return new Response(
        JSON.stringify({ error: "Empty message" }),
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response: any = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: buildPrompt(userText)
    });

    const text: string =
      typeof response.text === "function"
        ? response.text()
        : response.text || response.output_text || JSON.stringify(response);

    return new Response(JSON.stringify({ reply: text }), { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Gemini chat error", error);
    return new Response(
      JSON.stringify({ error: "Server error", detail: error.message }),
      { status: 500 }
    );
  }
}

export const runtime = "edge";
