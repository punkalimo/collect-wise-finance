import { Receipt, CreditCard, Wallet, BarChart3, FileCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  { icon: Receipt, title: "Accounts Receivable", description: "Strengthening receivables management through invoicing support, reconciliations, and debtor monitoring to improve cash flow." },
  { icon: CreditCard, title: "Credit Control", description: "Effective credit and debt management, including credit limit monitoring, collections support, and receivables follow-ups." },
  { icon: Wallet, title: "Accounts Payable", description: "Managing supplier invoices, payment processing, and vendor reconciliations while maintaining internal controls." },
  { icon: BarChart3, title: "Financial Reporting", description: "Preparation of management accounts, cash flow reports, profit & loss statements, and balance sheets." },
  { icon: FileCheck, title: "Tax & Statutory Compliance", description: "Support with VAT, PAYE, NAPSA, and statutory filings to ensure compliance and reduce regulatory risk." },
];

const ServicesSection = () => {
  const header = useScrollAnimation();
  const grid = useScrollAnimation(0.05);

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={header.ref} className={`text-center mb-16 scroll-hidden ${header.isVisible ? "scroll-visible" : ""}`}>
          <span className="text-secondary font-body text-sm tracking-widest uppercase font-semibold">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3 mb-4">Our Services</h2>
          <div className="w-16 h-1 gold-gradient rounded mx-auto" />
        </div>

        <div ref={grid.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group bg-card rounded-xl p-8 border border-border hover:shadow-lg hover:border-secondary/30 transition-all duration-300 scroll-hidden ${grid.isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg hero-bg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <service.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
