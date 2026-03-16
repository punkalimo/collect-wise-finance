import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="hero-bg py-20">
      <div ref={ref} className={`max-w-4xl mx-auto px-6 text-center scroll-hidden ${isVisible ? "scroll-visible" : ""}`}>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-8">
          Ready to strengthen your financial operations?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#contact" className="gold-gradient text-secondary-foreground px-8 py-3 rounded-md font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity">
            Get Started
          </a>
          <a href="/#contact" className="border-2 border-secondary text-secondary px-8 py-3 rounded-md font-body font-semibold text-sm tracking-wide hover:bg-secondary/10 transition-colors">
            Request a Quote
          </a>
          <a href="/#contact" className="border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-md font-body font-medium text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors">
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
