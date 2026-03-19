import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles, Clock, BookOpen, Target, Settings2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import genieSmall from "@/assets/genie-small.png";
import { getGroqClient } from "@/lib/groq";
import { useToast } from "@/hooks/use-toast";

interface Slot {
  subject: string;
  time: string;
}

interface DayPlan {
  day: string;
  slots: Slot[];
}

const subjectColors: Record<string, string> = {
  Biology: "bg-genie-green/20 text-foreground border-genie-green/40",
  Mathematics: "bg-genie-blue/20 text-foreground border-genie-blue/40",
  Chemistry: "bg-genie-gold/20 text-foreground border-genie-gold/40",
  Physics: "bg-genie-purple/20 text-foreground border-genie-purple/40",
  English: "bg-genie-pink/20 text-foreground border-genie-pink/40",
  Revision: "bg-primary/10 text-foreground border-primary/30",
};



const quotes = [
  "You got this! 💪",
  "Every page you read is a step closer! 📖",
  "Consistency beats intensity! 🌟",
  "Believe in yourself, the genie believes in you! ✨",
];

const PlannerPage = () => {
  const [subjects, setSubjects] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hours, setHours] = useState([4]);
  const [level, setLevel] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<DayPlan[]>([]);
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!subjects || !examDate || !level) {
      toast({ title: "Missing fields", description: "Please fill in all details.", variant: "destructive" });
      return;
    }
    
    setIsGenerating(true);
    try {
      const client = getGroqClient();
      const prompt = `Create a 7-day study timetable (Mon-Sun) for a student preparing for an exam on ${examDate}.
      Subjects to study: ${subjects}. Daily available hours: ${hours[0]}. Current level: ${level}.
      Return the response as a JSON array where each object represents a day.
      Each object should have "day" (short string like "Mon", "Tue") and "slots".
      "slots" is an array of objects with "subject" (string) and "time" (string, e.g., "9-11 AM").
      Output ONLY raw JSON format, no markdown tags and nothing else.`;
      
      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });
      
      const textResponse = response.choices[0]?.message?.content || "[]";
      const cleanJson = textResponse.replace(/^```json\n|\n```$/g, "").trim();
      const plan = JSON.parse(cleanJson);
      
      setGeneratedPlan(plan);
      setShowPlan(true);
    } catch (error: any) {
      toast({ title: "Generation Failed", description: error.message || "Failed to create plan. Check your API key.", variant: "destructive" });
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Calendar className="w-4 h-4" />
              Study Planner
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Build Your Study Plan</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Get a personalized timetable that works with your schedule.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border/50"
            >
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold mb-2 block">Subjects to Study</label>
                  <Textarea
                    placeholder="e.g., Biology, Chemistry, Physics"
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-bold mb-2 block">Exam Date</label>
                  <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-bold mb-3 block">Daily Available Hours: {hours[0]}</label>
                  <Slider
                    value={hours}
                    onValueChange={setHours}
                    min={1}
                    max={12}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 hour</span>
                    <span>12 hours</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold mb-2 block">Current Level</label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCreate}
                  disabled={isGenerating}
                  className="w-full font-bold text-primary-foreground shadow-soft hover:scale-[1.02] transition-all bg-gradient-to-r from-genie-gold to-destructive"
                  size="lg"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Settings2 className="w-4 h-4 mr-2" />}
                  {isGenerating ? "Creating Plan..." : "Create Study Plan"}
                </Button>
              </div>
            </motion.div>

            {/* Right: Results or placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {!showPlan ? (
                <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 flex flex-col items-center justify-center h-full text-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                    <Calendar className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Ready to Create Your Study Plan?</h3>
                  <p className="text-muted-foreground mb-6">Fill out the form on the left to get started. Your personalized study schedule will appear here!</p>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Target className="w-4 h-4" /> Goal-Oriented</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Time-Managed</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Comprehensive</span>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                  {/* Genie motivational */}
                  <div className="flex items-center gap-3 bg-accent/20 rounded-xl px-4 py-3 mb-6">
                    <img src={genieSmall} alt="Genie" className="w-7 h-7" />
                    <p className="text-sm font-semibold text-accent-foreground">{randomQuote}</p>
                  </div>

                  <h3 className="text-lg font-extrabold text-center mb-4">Your Weekly Plan 📅</h3>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {Object.entries(subjectColors).map(([subject, classes]) => (
                      <span key={subject} className={`px-2 py-1 rounded-full text-xs font-semibold border ${classes}`}>
                        {subject}
                      </span>
                    ))}
                  </div>

                  {/* Timetable */}
                  <div className="space-y-2">
                    {generatedPlan.map((day) => (
                      <div key={day.day} className="flex gap-2 items-start">
                        <span className="w-10 text-xs font-bold text-primary pt-1 flex-shrink-0">{day.day}</span>
                        <div className="flex flex-wrap gap-1.5 flex-1">
                          {day.slots.map((slot, si) => (
                            <div
                              key={si}
                              className={`rounded-lg px-3 py-1.5 border text-xs ${subjectColors[slot.subject] || "bg-secondary border-border"}`}
                            >
                              <span className="font-bold">{slot.subject}</span>
                              <span className="text-muted-foreground ml-1">{slot.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <Button onClick={() => setShowPlan(false)} variant="outline" size="sm" className="font-semibold">
                      Create New Plan
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlannerPage;
