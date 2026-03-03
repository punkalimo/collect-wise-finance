import { motion } from "framer-motion";
import { Building2, TrendingUp, FileCheck, Handshake } from "lucide-react";

const highlights = [
  { icon: Building2, label: "External Finance Partner" },
  { icon: TrendingUp, label: "Cash Flow & Liquidity Focus" },
  { icon: FileCheck, label: "Regulatory Alignment" },
  { icon: Handshake, label: "Retainer & Project-Based" },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              About CollectTech & Accounting Solutions
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg text-center max-w-4xl mx-auto">
            <p>
              CollectTech & Accounting Solutions is a professional outsourced finance firm providing structured accounting, compliance, and financial oversight services to growing businesses and SMEs.
            </p>
            <p>
              We operate as an external finance partner, supporting clients across the full finance function — from reconciliations, payables management, and statutory compliance to payroll administration, financial reporting, and audit support. Our objective is to ensure businesses maintain accurate records, disciplined financial systems, and regulatory alignment without the cost of maintaining a full in-house finance department.
            </p>
            <p>
              In addition to comprehensive accounting support, we maintain specialised expertise in receivables management and structured credit control — a critical function directly impacting liquidity and cash flow stability. Through disciplined debtor monitoring and proactive credit processes, we help businesses protect revenue while strengthening overall financial performance.
            </p>
            <p className="font-medium text-foreground">
              Services are delivered through clearly defined retainer or project-based engagements, aligned to professional standards, accountability, and measurable outcomes.
            </p>
          </div>

          {/* Highlight pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 bg-card border border-border rounded-full px-5 py-2.5 shadow-card"
              >
                <item.icon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
