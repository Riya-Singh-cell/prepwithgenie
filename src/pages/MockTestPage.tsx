import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Sparkles, Timer, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import genieSmall from "@/assets/genie-small.png";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  type: string;
};

const sampleQuestions: Question[] = [
  { id: 1, question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], correct: 1, type: "MCQ" },
  { id: 2, question: "DNA replication is semi-conservative.", options: ["True", "False"], correct: 0, type: "True/False" },
  { id: 3, question: "Which enzyme unzips the DNA double helix?", options: ["DNA Polymerase", "Ligase", "Helicase", "Primase"], correct: 2, type: "MCQ" },
  { id: 4, question: "Photosynthesis occurs in the mitochondria.", options: ["True", "False"], correct: 1, type: "True/False" },
  { id: 5, question: "What is the main pigment involved in photosynthesis?", options: ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"], correct: 1, type: "MCQ" },
];

const questionTypes = [
  { id: "mcq", label: "MCQ" },
  { id: "truefalse", label: "True/False" },
  { id: "match", label: "Match the Following" },
  { id: "output", label: "Output-Based" },
  { id: "qa", label: "Q&A" },
];

const MockTestPage = () => {
  const [examName, setExamName] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["mcq"]);
  const [numQuestions, setNumQuestions] = useState("5");
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleGenerate = () => {
    if (examName) {
      setShowTest(true);
      setAnswers({});
      setSubmitted(false);
    }
  };

  const handleAnswer = (questionId: number, optionIdx: number) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    }
  };

  const handleSubmit = () => setSubmitted(true);

  const score = submitted
    ? sampleQuestions.filter((q) => answers[q.id] === q.correct).length
    : 0;

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-12">
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
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="gradient-card rounded-2xl p-8 shadow-card border border-border/50"
            >
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Exam Name</label>
                  <Input placeholder="e.g., Biology Final, JEE Main" value={examName} onChange={(e) => setExamName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Syllabus / Topics</label>
                  <Textarea placeholder="List the topics for the test..." value={syllabus} onChange={(e) => setSyllabus(e.target.value)} rows={3} />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-3 block">Question Types</label>
                  <div className="flex flex-wrap gap-4">
                    {questionTypes.map((qt) => (
                      <label key={qt.id} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox
                          checked={selectedTypes.includes(qt.id)}
                          onCheckedChange={(checked) => {
                            setSelectedTypes((prev) =>
                              checked ? [...prev, qt.id] : prev.filter((t) => t !== qt.id)
                            );
                          }}
                        />
                        {qt.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Number of Questions</label>
                  <Input type="number" min="1" max="50" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
                </div>
                <Button onClick={handleGenerate} className="w-full gradient-cta text-primary-foreground font-bold shadow-soft hover:shadow-glow transition-shadow" size="lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate My Mock Test
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Genie tip */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-accent/20 rounded-xl px-5 py-3 mb-8">
              <img src={genieSmall} alt="Genie" className="w-8 h-8" />
              <div>
                <p className="text-sm font-semibold text-accent-foreground">
                  <Timer className="w-3 h-3 inline mr-1" />
                  Tip: Try to answer within 1 minute per question for best practice!
                </p>
              </div>
            </motion.div>

            {submitted && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-8 gradient-card rounded-2xl p-8 shadow-card border border-border/50">
                <h2 className="text-2xl font-extrabold mb-2">
                  Your Score: {score}/{sampleQuestions.length}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {score === sampleQuestions.length ? "🎉 Perfect score! You're amazing!" : score >= 3 ? "👏 Great job! Keep practicing!" : "💪 Keep studying, you'll get there!"}
                </p>
                <Button onClick={handleRetake} variant="outline" className="font-semibold">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Test
                </Button>
              </motion.div>
            )}

            <div className="space-y-5">
              {sampleQuestions.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="gradient-card rounded-2xl p-6 shadow-card border border-border/50"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg gradient-cta flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground">{q.type}</span>
                      <p className="font-semibold">{q.question}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-11">
                    {q.options.map((opt, idx) => {
                      const isSelected = answers[q.id] === idx;
                      const isCorrect = submitted && idx === q.correct;
                      const isWrong = submitted && isSelected && idx !== q.correct;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(q.id, idx)}
                          className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                            isCorrect
                              ? "border-success bg-success/10 text-foreground"
                              : isWrong
                              ? "border-destructive bg-destructive/10 text-foreground"
                              : isSelected
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border hover:border-primary/40 hover:bg-secondary/50"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isCorrect && <CheckCircle2 className="w-4 h-4 text-success" />}
                            {isWrong && <XCircle className="w-4 h-4 text-destructive" />}
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
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
