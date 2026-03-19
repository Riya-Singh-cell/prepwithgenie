import Groq from "groq-sdk";

export const getGroqClient = () => {
  // You can directly paste your Groq API Key here!
  // Example: const HARDCODED_KEY = "gsk_abcd1234...";
  const HARDCODED_KEY = "";

  const apiKey = HARDCODED_KEY || localStorage.getItem("GROQ_API_KEY");

  if (!apiKey) {
    throw new Error("API Key not found. Please paste it inside src/lib/groq.ts or set it in the Navbar.");
  }
  return new Groq({ apiKey, dangerouslyAllowBrowser: true });
};
