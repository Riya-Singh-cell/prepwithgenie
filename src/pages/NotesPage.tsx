import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import genieSmall from "@/assets/genie-small.png";
import { useToast } from "@/hooks/use-toast";

interface Note {
  topic: string;
  notes: string;
  tip: string;
}

const NotesPage = () => {
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<Note[]>([]);
  const [downloadUrl, setDownloadUrl] = useState(""); // ✅ NEW

  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!subject || !examType) {
      toast({
        title: "Missing fields",
        description: "Please enter your subject and exam type.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // ✅ CALL BACKEND (NOT GROQ DIRECTLY)
      const response = await fetch(
        `http://127.0.0.1:8000/generate-notes/?topic=${subject}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (data.url) {
        setDownloadUrl(data.url);

        // Optional UI notes (since actual notes are in file)
        setGeneratedNotes([
          {
            topic: subject,
            notes:
              "Your notes have been generated and stored in the cloud successfully.",
            tip: "Click the download button below to access full notes.",
          },
        ]);

        setShowResults(true);
      } else {
        throw new Error("No URL returned from backend");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <FileText className="w-4 h-4" />
              Notes Generator
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              Generate Smart Study Notes
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Enter your details and let PrepGenie create comprehensive notes for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INPUT FORM */}
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
              <h2 className="text-lg font-bold">
                Tell us what you're studying
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Syllabus along with subject name
                </label>
                <Input
                  placeholder="e.g., DBMS"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Exam Type
                </label>
                <Select value={examType} onValueChange={setExamType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="board">Board Exam</SelectItem>
                    <SelectItem value="entrance">Entrance Exam</SelectItem>
                    <SelectItem value="competitive">Competitive Exam</SelectItem>
                    <SelectItem value="university">University Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <Sparkles className="mr-2" />
                )}
                {isGenerating ? "Generating..." : "Generate Notes"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESULTS */}
      {showResults && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-6">
              Your Notes Are Ready 🚀
            </h2>

            {generatedNotes.map((note, i) => (
              <div key={i} className="p-6 border rounded-lg mb-4">
                <h3 className="font-bold text-lg">{note.topic}</h3>
                <p>{note.notes}</p>
                <p className="text-sm mt-2">💡 {note.tip}</p>
              </div>
            ))}

            {/* ✅ DOWNLOAD BUTTON */}
            {downloadUrl && (
              <div className="text-center mt-6">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
                >
                  ⬇ Download Notes
                </a>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default NotesPage;