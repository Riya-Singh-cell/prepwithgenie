from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import boto3
import os
import uuid
from groq import Groq
from dotenv import load_dotenv


load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

app = FastAPI(title="PrepGenie Backend")

# CORS 
# Allows the React frontend (localhost:8080) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Clients
s3 = boto3.client("s3")
BUCKET_NAME = "prepgenie-storage"

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ── Home
@app.get("/")
def home():
    return {"message": "PrepGenie backend is running ✅"}


def generate_notes_with_llm(topic: str) -> str:
    """Call Groq API to generate real study notes for the given topic."""
    prompt = f"""You are an expert study tutor. Generate clear, well-structured study notes for the topic: "{topic}".

Format the notes like this:
- Start with a brief introduction (2-3 sentences)
- List 5-7 key concepts, each with a short explanation
- Add 3-5 important facts or formulas if applicable
- End with a quick summary / revision tips

Keep it concise, student-friendly, and easy to read. Use plain text only (no markdown symbols like ** or ##)."""

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=1024,
    )
    return response.choices[0].message.content.strip()


# ── Generate + Store Notes ────────────────────────────────────────────────────
@app.post("/generate-notes/")
def generate_and_store_notes(topic: str):
    """
    Flow: User topic → Groq LLM generates notes → saved to AWS S3 → URL returned
    """
    # 1. Generate real notes via Groq
    notes_content = generate_notes_with_llm(topic)

    # 2. Create unique filename
    filename = f"notes_{uuid.uuid4().hex[:8]}_{topic.replace(' ', '_')}.txt"

    # 3. Save to a temp local file
    with open(filename, "w", encoding="utf-8") as f:
        f.write(f"PrepGenie Study Notes\n")
        f.write(f"Topic: {topic}\n")
        f.write("=" * 50 + "\n\n")
        f.write(notes_content)

    # 4. Upload to S3
    s3.upload_file(filename, BUCKET_NAME, filename)

    # 5. Clean up local temp file
    os.remove(filename)

    # 6. Build public S3 URL
    url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{filename}"

    return {
        "message": "Notes generated and stored successfully",
        "url": url,
    }