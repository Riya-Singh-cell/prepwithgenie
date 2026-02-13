import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import genieSmall from "@/assets/genie-small.png";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const subjectColors: Record<string, string> = {
  Biology: "bg-genie-green/20 text-foreground border-genie-green/40",
  Mathematics: "bg-genie-blue/20 text-foreground border-genie-blue/40",
  Chemistry: "bg-genie-gold/20 text-foreground border-genie-gold/40",
  Physics: "bg-genie-purple/20 text-foreground border-genie-purple/40",
  English: "bg-genie-pink/20 text-foreground border-genie-pink/40",
  Revision: "bg-primary/10 text-foreground border-primary/30",
};

const samplePlan = [
  { day: "Mon", slots: [{ subject: "Biology", time: "9-11 AM" }, { subject: "Mathematics", time: "2-4 PM" }, { subject: "Revision", time: "7-8 PM" }] },
  { day: "Tue", slots: [{ subject: "Chemistry", time: "9-11 AM" }, { subject: "Physics", time: "2-4 PM" }, { subject: "English", time: "7-8 PM" }] },
  { day: "Wed", slots: [{ subject: "Mathematics", time: "9-11 AM" }, { subject: "Biology", time: "2-4 PM" }, { subject: "Revision", time: "7-8 PM" }] },
  { day: "Thu", slots: [{ subject: "Physics", time: "9-11 AM" }, { subject: "Chemistry", time: "2-4 PM" }, { subject: "English", time: "7-8 PM" }] },
  { day: "Fri", slots: [{ subject: "Biology", time: "9-11 AM" }, { subject: "Mathematics", time: "2-4 PM" }, { subject: "Revision", time: "7-8 PM" }] },
  { day: "Sat", slots: [{ subject: "Chemistry", time: "9-11 AM" }, { subject: "Physics", time: "2-4 PM" }] },
  { day: "Sun", slots: [{ subject: "Revision", time: "10 AM-12 PM" }] },
];

const quotes = [
  "You got this! 💪",
  "Every page you read is a step closer! 📖",
  "Consistency beats intensity! 🌟",
  "Believe in yourself, the genie believes in you! ✨",
];

const PlannerPage = () => {
  const [subjects, setSubjects] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hours, setHours] = useState("6");
  const [showPlan, setShowPlan] = useState(false);

  const handleCreate = () => {
    if (subjects && examDate) {
      setShowPlan(true);
    }
  };

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-12">
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

      {!showPlan ? (
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
                  <label className="text-sm font-semibold mb-2 block">Subjects</label>
                  <Textarea placeholder="List your subjects, one per line (e.g., Biology, Mathematics, Chemistry...)" value={subjects} onChange={(e) => setSubjects(e.target.value)} rows={3} />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Exam Date</label>
                  <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Daily Available Hours</label>
                  <Input type="number" min="1" max="16" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="e.g., 6" />
                </div>
                <Button onClick={handleCreate} className="w-full gradient-cta text-primary-foreground font-bold shadow-soft hover:shadow-glow transition-shadow" size="lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create My Study Plan
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Genie motivational */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-accent/20 rounded-xl px-5 py-3 mb-8">
              <img src={genieSmall} alt="Genie" className="w-8 h-8" />
              <p className="text-sm font-semibold text-accent-foreground">{randomQuote}</p>
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-extrabold text-center mb-8">
              Your Weekly Study Plan 📅
            </motion.h2>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {Object.entries(subjectColors).map(([subject, classes]) => (
                <span key={subject} className={`px-3 py-1 rounded-full text-xs font-semibold border ${classes}`}>
                  {subject}
                </span>
              ))}
            </div>

            {/* Timetable */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {samplePlan.map((day, di) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: di * 0.08 }}
                  className="gradient-card rounded-2xl p-4 shadow-card border border-border/50"
                >
                  <h3 className="text-center font-bold text-primary mb-3">{day.day}</h3>
                  <div className="space-y-2">
                    {day.slots.map((slot, si) => (
                      <div
                        key={si}
                        className={`rounded-xl px-3 py-2 border text-center ${subjectColors[slot.subject] || "bg-secondary text-foreground border-border"}`}
                      >
                        <p className="text-xs font-bold">{slot.subject}</p>
                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          {slot.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 text-center">
              <Button onClick={() => setShowPlan(false)} variant="outline" className="font-semibold">
                Create New Plan
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PlannerPage;
