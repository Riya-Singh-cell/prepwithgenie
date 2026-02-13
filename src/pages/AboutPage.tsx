import { motion } from "framer-motion";
import { Users, Sparkles, Heart, Target, BookOpen } from "lucide-react";
import genieHero from "@/assets/genie-hero.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Users className="w-4 h-4" />
              About Us
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">About PrepGenie</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">We're on a mission to make studying magical for every student.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex justify-center mb-10">
            <img src={genieHero} alt="PrepGenie" className="w-48 animate-float" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Target, title: "Our Mission", desc: "Empower students with AI-powered study tools that adapt to their unique learning needs." },
              { icon: Heart, title: "Our Values", desc: "Accessibility, simplicity, and a belief that every student deserves the best resources." },
              { icon: Sparkles, title: "Our Vision", desc: "A world where personalized education is available to everyone, everywhere." },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
