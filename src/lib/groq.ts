import Groq from "groq-sdk";

export const getGroqClient = () => {
  // Uses Vercel environment variables directly!
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || localStorage.getItem("GROQ_API_KEY");

  if (!apiKey) {
    throw new Error("API Key not found. Please set VITE_GROQ_API_KEY in your Vercel Environment Variables.");
  }
  return new Groq({ apiKey, dangerouslyAllowBrowser: true });
};
