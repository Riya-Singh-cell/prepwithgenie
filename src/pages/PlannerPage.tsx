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
  topic: string;
  time: string;
}

interface DayPlan {
  date: string;
  slots: Slot[];
}


const quotes = [
  "You got this! 💪",
  "Every page you read is a step closer! 📖",
  "Consistency beats intensity! 🌟",
  "Believe in yourself, the genie believes in you! ✨",
];

const PlannerPage = () => {
  const [subjects, setSubjects] = useState("");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("17:00");
  const [endTime, setEndTime] = useState("21:00");
  const [hours, setHours] = useState([4]);
  const [level, setLevel] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<DayPlan[]>([]);
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!subjects || !startDate || !endDate || !level) {
      toast({ title: "Missing fields", description: "Please fill in all details.", variant: "destructive" });
      return;
    }
    
    setIsGenerating(true);
    try {
      const client = getGroqClient();
      const prompt = `Create a highly tailored study timetable strictly from ${startDate} to ${endDate}.
      Topics/Chapters requested: "${subjects}".
      CRITICAL INSTRUCTION: If broad chapters are provided (like "biology chapter cell"), YOU MUST smartly break them down into specific logical sub-topics (e.g., cell membrane, organelles, mitosis) and distribute them with sensible weightages across the dates. Do NOT endlessly repeat the exact same broad string.
      The student is available to study between ${startTime} and ${endTime} for a total of ${hours[0]} hours each day. Schedule the slots STRICTLY within this timeframe.
      Current level: ${level}.
      
      Return the response strictly as a JSON array where each object represents exactly one date in the range.
      Each object must have:
      - "date": string (e.g. "Mon, Mar 21")
      - "slots": array of objects having "topic" (string, the inferred specific sub-topic) and "time" (string, e.g., "17:00-18:30" matching within the ${startTime}-${endTime} timeframe).
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold mb-2 block">Start Date</label>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-bold mb-2 block">End Date (Target)</label>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold mb-2 block">Available From</label>
                    <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-bold mb-2 block">Available To</label>
                    <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold mb-3 block">Total Study Target (Hours/Day): {hours[0]}</label>
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

                  {/* Timetable */}
                  <div className="space-y-4">
                    {generatedPlan.map((day, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start border-b border-border/50 pb-4 last:border-0">
                        <span className="w-24 text-sm font-bold text-primary pt-1 flex-shrink-0">{day.date}</span>
                        <div className="flex flex-wrap gap-2 flex-1">
                          {day.slots.map((slot, si) => (
                            <div
                              key={si}
                              className="rounded-lg px-3 py-2 bg-secondary/50 border border-border/80 text-xs flex flex-col gap-1.5 shadow-sm hover:shadow transition-all"
                            >
                              <span className="font-bold text-foreground text-[13px]">{slot.topic}</span>
                              <span className="text-muted-foreground font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3 text-primary/70" /> {slot.time}
                              </span>
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
