import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, ClipboardList, Calendar, Sparkles, ArrowRight, Star, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import genieHero from "@/assets/genie-hero.png";
import genieSmall from "@/assets/genie-small.png";

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
      <section className="gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Your AI Study Companion
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                <span className="text-gradient-primary">PrepGenie</span>
                <br />
                <span className="text-foreground">Your AI Study Assistant</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Notes, Tests, Timetables — all generated in seconds. Let the genie handle the hard work while you focus on learning.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button asChild size="lg" className="gradient-cta text-primary-foreground font-bold shadow-soft hover:shadow-glow transition-shadow">
                  <Link to="/notes">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Notes
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold border-primary/20 hover:bg-primary/5">
                  <Link to="/mock-test">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Create Mock Test
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="font-bold">
                  <Link to="/planner">
                    <Calendar className="w-4 h-4 mr-2" />
                    Build Study Plan
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src={genieHero}
                alt="PrepGenie - AI Study Assistant"
                className="w-72 md:w-96 animate-float drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-genie-gold animate-sparkle" />
        <div className="absolute top-32 right-20 w-2 h-2 rounded-full bg-genie-purple animate-sparkle delay-300" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-genie-pink animate-sparkle delay-700" />
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4">
              Everything You Need to <span className="text-gradient-primary">Ace Your Exams</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto">
              Three powerful tools, one magical assistant. PrepGenie adapts to your needs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
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
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground">Three simple steps to study smarter.</motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
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

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
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
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4">
              Ready to Study Smarter?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of students who trust PrepGenie for their exam preparation.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button asChild size="lg" className="gradient-cta text-primary-foreground font-bold shadow-soft hover:shadow-glow transition-shadow">
                <Link to="/notes">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started Free
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
