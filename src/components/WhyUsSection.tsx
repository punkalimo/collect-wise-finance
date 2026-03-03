import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import { motion } from "framer-motion";
import { Target, TrendingUp, Settings2, ShieldCheck, Award, PiggyBank } from "lucide-react";

const differentiators = [
  {
    icon: Target,
    title: "Specialised Credit Control Expertise",
    description: "Focused credit control and receivables management support designed to improve cash flow and strengthen debtor management.",
  },
  {
    icon: TrendingUp,
    title: "Tailored & Scalable Support",
    description: "Service delivery structured according to client size, transaction volumes, and operational complexity, allowing support to scale as business requirements evolve.",
  },
  {
    icon: Settings2,
    title: "Flexible Engagement Models",
    description: "Retainer-based and project-based engagements aligned to client operational needs.",
  },
  {
    icon: ShieldCheck,
    title: "Strong Compliance Focus",
    description: "Emphasis on accurate tax, statutory, and regulatory compliance, including PACRA filings and financial reporting obligations.",
  },
  {
    icon: Award,
    title: "Professional & Ethical Standards",
    description: "Services delivered in line with professional, ethical, and confidentiality standards, ensuring the integrity of financial information.",
  },
  {
    icon: PiggyBank,
    title: "Cost-Effective Outsourced Solution",
    description: "An efficient alternative to maintaining a full in-house finance function, providing experienced support without associated overhead costs.",
  },
];

const WhyWorkWithUs = () => {
  return (
    <section className="py-24 bg-section-alt">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Key Differentiators
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What sets CollectTech & Accounting Solutions apart
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-xl border border-border p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Accent top bar */}
              <div className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-accent" />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-3 leading-snug">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;