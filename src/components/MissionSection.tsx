import { Target, Eye, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const values = [
  "Integrity & Trust",
  "Accuracy",
  "Professionalism",
  "Confidentiality",
  "Client-Centred Service",
];

const MissionSection = () => {
  const header = useScrollAnimation();
  const cards = useScrollAnimation(0.1);

  return (
    <section className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={header.ref} className={`text-center mb-16 scroll-hidden ${header.isVisible ? "scroll-visible" : ""}`}>
          <span className="text-secondary font-body text-sm tracking-widest uppercase font-semibold">What Drives Us</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3">Mission • Vision • Values</h2>
        </div>

        <div ref={cards.ref} className={`grid md:grid-cols-3 gap-8 scroll-hidden ${cards.isVisible ? "scroll-visible" : ""}`}>
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              To empower SMEs and growing businesses with structured, compliant, and results-driven outsourced finance support that strengthens internal controls, improves cash flow performance, and promotes long-term financial stability.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-sm border border-border" style={{ transitionDelay: "0.15s" }}>
            <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              To become Zambia's leading outsourced finance partner for SMEs and growing enterprises.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-sm border border-border" style={{ transitionDelay: "0.3s" }}>
            <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mb-5">
              <Heart className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Core Values</h3>
            <ul className="space-y-2">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                  <span className="w-1.5 h-1.5 rounded-full gold-gradient inline-block flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
