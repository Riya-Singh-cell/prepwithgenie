import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles, BookOpen, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import genieSmall from "@/assets/genie-small.png";

const sampleNotes = [
  { topic: "Cell Structure & Organization", notes: "Cells are the fundamental unit of life. Key organelles include the nucleus (stores DNA), mitochondria (energy production), endoplasmic reticulum (protein synthesis), and Golgi apparatus (packaging & transport).", tip: "Revise this first!" },
  { topic: "Photosynthesis", notes: "The process by which green plants convert light energy into chemical energy. Occurs in chloroplasts. Light reactions happen in thylakoids, Calvin cycle in the stroma. Overall equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", tip: "Draw the diagram for better retention" },
  { topic: "DNA Replication", notes: "Semi-conservative process where DNA unwinds at the origin of replication. Helicase unzips the double helix. DNA polymerase III synthesizes the new strand in the 5' to 3' direction. Leading strand is continuous, lagging strand forms Okazaki fragments.", tip: "Focus on enzyme names" },
];

const NotesPage = () => {
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    if (subject && examType) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <FileText className="w-4 h-4" />
              Notes Generator
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Generate Smart Study Notes</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Enter your details and let PrepGenie create comprehensive notes for you.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="gradient-card rounded-2xl p-8 shadow-card border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Tell us what you're studying</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold mb-2 block">Subject</label>
                <Input placeholder="e.g., Biology, Mathematics, History" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Exam Type</label>
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
              <div>
                <label className="text-sm font-semibold mb-2 block">Syllabus / Topics</label>
                <Textarea placeholder="Paste your syllabus or list the topics you need notes for..." value={syllabus} onChange={(e) => setSyllabus(e.target.value)} rows={4} />
              </div>
              <Button onClick={handleGenerate} className="w-full gradient-cta text-primary-foreground font-bold shadow-soft hover:shadow-glow transition-shadow" size="lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Notes
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {showResults && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h2 className="text-2xl font-extrabold text-center mb-2">Your Notes Are Ready! ✨</h2>
              <p className="text-center text-muted-foreground">Here are your AI-generated study notes for {subject}.</p>
            </motion.div>

            <div className="space-y-5">
              {sampleNotes.map((note, i) => (
                <motion.div
                  key={note.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="gradient-card rounded-2xl p-6 shadow-card border border-border/50 relative"
                >
                  <h3 className="text-lg font-bold mb-3 text-primary">{note.topic}</h3>
                  <p className="text-foreground leading-relaxed mb-4">{note.notes}</p>
                  <div className="flex items-center gap-2 bg-accent/20 rounded-lg px-4 py-2">
                    <img src={genieSmall} alt="Genie tip" className="w-6 h-6" />
                    <span className="text-sm font-semibold text-accent-foreground">💡 {note.tip}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NotesPage;
