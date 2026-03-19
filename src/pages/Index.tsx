import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, ClipboardList, Calendar, Sparkles, ArrowRight, Star, BookOpen, Lightbulb } from "lucide-react";
import genieSmall from "@/assets/genie-small.png";
import genieHero from "@/assets/genie-hero.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
};

const features = [
  {
    icon: FileText,
    title: "Smart Notes",
    description: "Generate comprehensive study notes tailored to your syllabus and exam type.",
    color: "bg-genie-lavender text-genie-purple",
    link: "/notes",
  },
  {
    icon: ClipboardList,
    title: "Mock Tests",
    description: "Create practice tests with MCQs, True/False, and more — customized for you.",
    color: "bg-accent/30 text-accent-foreground",
    link: "/mock-test",
  },
  {
    icon: Calendar,
    title: "Study Planner",
    description: "Build a personalized timetable that fits your schedule and goals.",
    color: "bg-genie-pink/30 text-genie-purple",
    link: "/planner",
  },
];

const steps = [
  { number: "1", title: "Tell Us Your Goal", description: "Enter your subject, exam, and syllabus details.", icon: BookOpen },
  { number: "2", title: "Let the Genie Work", description: "Our AI generates notes, tests, or plans in seconds.", icon: Sparkles },
  { number: "3", title: "Study & Succeed", description: "Use your materials to ace your exams!", icon: Lightbulb },
];

const testimonials = [
  { name: "Priya S.", quote: "PrepGenie made my exam prep so much easier. The notes were spot on!", rating: 5 },
  { name: "Arjun K.", quote: "The mock tests helped me identify my weak areas. Scored 95% in my finals!", rating: 5 },
  { name: "Sarah M.", quote: "The study planner kept me organized throughout the semester. Love it!", rating: 5 },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Decorative circles */}
        <div className="absolute top-8 -left-8 w-28 h-28 rounded-full bg-genie-gold/40" />
        <div className="absolute bottom-8 right-4 w-20 h-20 rounded-full bg-genie-lavender/60" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-genie-gold animate-sparkle" />

        <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold italic text-gradient-primary mb-6">
              PrepGenie
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              Your AI Study Assistant
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
              Generate personalized notes, create mock tests, and build custom study plans with the power of AI
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Link
                to="/notes"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-primary-foreground bg-gradient-to-r from-genie-purple to-primary shadow-soft hover:shadow-glow transition-all text-sm md:text-base"
              >
                <FileText className="w-5 h-5" />
                Generate Notes
              </Link>
              <Link
                to="/mock-test"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-primary-foreground bg-gradient-to-r from-success to-genie-green shadow-soft hover:scale-105 transition-all text-sm md:text-base"
              >
                <ClipboardList className="w-5 h-5" />
                Create Mock Test
              </Link>
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-primary-foreground bg-gradient-to-r from-genie-gold to-destructive shadow-soft hover:scale-105 transition-all text-sm md:text-base"
              >
                <Calendar className="w-5 h-5" />
                Build Study Plan
              </Link>
            </div>

            {/* Genie illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center"
            >
              <img src={genieHero} alt="PrepGenie mascot" className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4">
              Everything You Need to <span className="text-gradient-primary">Ace Your Exams</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto">
              Three powerful tools, one magical assistant.
            </motion.p>
          </motion.div>

          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeUp}>
                <Link to={feature.link} className="block group">
                  <div className="gradient-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 h-full border border-border/50 group-hover:-translate-y-1">
                    <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-5`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                      Try it now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4">How It Works</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground">Three simple steps to study smarter.</motion.p>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeUp} className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl gradient-cta flex items-center justify-center shadow-soft">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4">
              Students Love <span className="text-gradient-primary">PrepGenie</span>
            </motion.h2>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <div className="gradient-card rounded-2xl p-8 shadow-card border border-border/50 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-genie-gold text-genie-gold" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={genieSmall} alt="Student" className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-sm">{t.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Study Smarter?</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of students who trust PrepGenie for their exam preparation.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/notes"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-primary-foreground gradient-cta shadow-soft hover:shadow-glow transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
