import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Sparkles, Timer, CheckCircle2, XCircle, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import genieSmall from "@/assets/genie-small.png";
import { getGroqClient } from "@/lib/groq";
import { useToast } from "@/hooks/use-toast";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  type: string;
  idealAnswer?: string;
};



const questionTypeCards = [
  { id: "mcq", label: "Multiple Choice Questions", color: "border-genie-gold bg-genie-gold/10", textColor: "text-genie-gold font-bold", desc: "Quick assessment" },
  { id: "truefalse", label: "True/False Questions", color: "border-destructive bg-destructive/10", textColor: "text-destructive font-bold", desc: "Quick assessment" },
  { id: "short", label: "Short Answer Questions", color: "border-genie-green bg-genie-green/10", textColor: "text-genie-green font-bold", desc: "Brief responses" },
  { id: "essay", label: "Essay Questions", color: "border-genie-purple bg-genie-purple/10", textColor: "text-genie-purple font-bold", desc: "Detailed answers" },
];

const MockTestPage = () => {
  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [questionCounts, setQuestionCounts] = useState<Record<string, string>>({
    mcq: "5", truefalse: "3", short: "2", essay: "1"
  });
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!examName || !examType) {
      toast({ title: "Incomplete details", description: "Please provide an exam name and type.", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const client = getGroqClient();
      const prompt = `Generate a mock test for the exam "${examName}" (Type: ${examType}).
      Syllabus/Topics to cover: ${syllabus || "General topics for this exam."}
      Generate ${questionCounts.mcq || 0} Multiple Choice Questions, ${questionCounts.truefalse || 0} True/False Questions, ${questionCounts.short || 0} Short Answer Questions, and ${questionCounts.essay || 0} Essay Questions.
      Return the response strictly as a JSON array where each object represents a question with the following keys:
      - "id": an integer starting from 1
      - "question": the question text
      - "options": an array of string choices (2 choices for True/False, 4 choices for MCQ). For Short/Essay, use an empty array [].
      - "correct": the 0-indexed integer position of the correct option for MCQ/TF. For Short/Essay, use -1.
      - "type": EXACTLY one of "MCQ", "True/False", "Short Answer", or "Essay"
      - "idealAnswer": (Optional) Include a suggested answer or key points for Short Answer and Essay questions.
      Output ONLY raw JSON format, no markdown tags and nothing else.`;

      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      const textResponse = response.choices[0]?.message?.content || "[]";
      const cleanJson = textResponse.replace(/^```json\n|\n```$/g, "").trim();
      const questions = JSON.parse(cleanJson);

      setGeneratedQuestions(questions);
      setAnswers({});
      setSubmitted(false);
      setShowTest(true);
    } catch (error: any) {
      toast({ title: "Generation Failed", description: error.message || "Failed to generate mock test. Check your API key.", variant: "destructive" });
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (questionId: number, answerVal: string | number) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: answerVal }));
    }
  };

  const handleSubmit = () => setSubmitted(true);
  
  const scorableQuestions = generatedQuestions.filter(q => q.type === "MCQ" || q.type === "True/False");
  const score = submitted ? scorableQuestions.filter((q) => answers[q.id] === q.correct).length : 0;
  const handleRetake = () => { setAnswers({}); setSubmitted(false); };

  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <ClipboardList className="w-4 h-4" />
              Mock Test Generator
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Create Your Mock Test</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Customize your practice test and challenge yourself.</p>
          </motion.div>
        </div>
      </section>

      {!showTest ? (
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border/50"
            >
              {/* Basic Information */}
              <h2 className="text-xl font-extrabold mb-6">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-sm font-bold mb-2 block">Exam Name</label>
                  <Input placeholder="e.g., Biology Chapter 1 Test" value={examName} onChange={(e) => setExamName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-bold mb-2 block">Exam Type</label>
                  <Select value={examType} onValueChange={setExamType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="board">Board Exam</SelectItem>
                      <SelectItem value="entrance">Entrance Exam</SelectItem>
                      <SelectItem value="competitive">Competitive Exam</SelectItem>
                      <SelectItem value="university">University Exam</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Syllabus */}
              <h2 className="text-xl font-extrabold mb-4">Syllabus & Topics</h2>
              <div className="mb-2">
                <label className="text-sm font-bold mb-2 block">Syllabus Content</label>
                <Textarea
                  placeholder={`Enter the topics and syllabus content for your test. For example:\n\n• Cell Biology: Cell structure, organelles, cell membrane\n• Genetics: DNA, RNA, protein synthesis\n• Evolution: Natural selection, adaptation\n\nOr paste your complete syllabus here...`}
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                  rows={6}
                />
              </div>
              <p className="text-sm text-muted-foreground mb-8">Provide detailed topics and subtopics to generate more relevant questions</p>

              {/* Question Types */}
              <h2 className="text-xl font-extrabold mb-6">Question Types & Quantities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {questionTypeCards.map((qt) => (
                  <div key={qt.id} className={`rounded-xl border-2 p-4 ${qt.color}`}>
                    <p className={`text-sm mb-3 ${qt.textColor}`}>{qt.label}</p>
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      value={questionCounts[qt.id]}
                      onChange={(e) => setQuestionCounts((prev) => ({ ...prev, [qt.id]: e.target.value }))}
                      className="mb-1"
                    />
                    <p className="text-xs text-muted-foreground">{qt.desc}</p>
                  </div>
                ))}
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full gradient-cta text-primary-foreground font-bold shadow-soft hover:shadow-glow transition-shadow" size="lg">
                {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {isGenerating ? "Generating Mock Test..." : "Generate My Mock Test"}
              </Button>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-accent/20 rounded-xl px-5 py-3 mb-8">
              <img src={genieSmall} alt="Genie" className="w-8 h-8" />
              <p className="text-sm font-semibold text-accent-foreground">
                <Timer className="w-3 h-3 inline mr-1" />
                Tip: Try to answer within 1 minute per question for best practice!
              </p>
            </motion.div>

            {submitted && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-8 bg-card rounded-2xl p-8 shadow-card border border-border/50">
                <h2 className="text-2xl font-extrabold mb-2">Automated Score: {score}/{scorableQuestions.length}</h2>
                <p className="text-muted-foreground mb-4">
                  {scorableQuestions.length > 0 && score === scorableQuestions.length ? "🎉 Perfect score on objective questions!" : "💪 Keep studying! Review your subjective answers below."}
                </p>
                <Button onClick={handleRetake} variant="outline" className="font-semibold">
                  <RotateCcw className="w-4 h-4 mr-2" /> Retake Test
                </Button>
              </motion.div>
            )}

            <div className="space-y-5">
              {generatedQuestions.map((q, i) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg gradient-cta flex items-center justify-center text-primary-foreground text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-muted-foreground">{q.type}</span>
                      <p className="font-semibold">{q.question}</p>
                    </div>
                  </div>
                  
                  {q.type === "MCQ" || q.type === "True/False" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-11">
                      {q.options.map((opt, idx) => {
                        const isSelected = answers[q.id] === idx;
                        const isCorrect = submitted && idx === q.correct;
                        const isWrong = submitted && isSelected && idx !== q.correct;
                        return (
                          <button key={idx} onClick={() => handleAnswer(q.id, idx)} className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                            isCorrect ? "border-success bg-success/10" : isWrong ? "border-destructive bg-destructive/10" : isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/40 hover:bg-secondary/50"
                          }`}>
                            <span className="flex items-center gap-2">
                              {isCorrect && <CheckCircle2 className="w-4 h-4 text-success" />}
                              {isWrong && <XCircle className="w-4 h-4 text-destructive" />}
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="ml-11">
                      <Textarea 
                        placeholder="Write your answer here..." 
                        value={answers[q.id] as string || ""} 
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        disabled={submitted}
                        rows={q.type === "Essay" ? 6 : 3}
                        className="mb-4"
                      />
                      {submitted && q.idealAnswer && (
                        <div className="mt-4 p-4 rounded-xl bg-accent/20 border border-border">
                          <p className="text-sm font-semibold mb-2">💡 Ideal Answer / Key Points:</p>
                          <p className="text-sm text-foreground leading-relaxed">{q.idealAnswer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {!submitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
                <Button onClick={handleSubmit} className="gradient-cta text-primary-foreground font-bold shadow-soft hover:shadow-glow transition-shadow" size="lg">
                  Submit Test
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default MockTestPage;
