import heroBg from "@/assets/hero-bg.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-bg opacity-85" />
      <div
        ref={ref}
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
      >
        <div className="inline-block mb-6 px-4 py-1.5 border border-secondary/40 rounded-full">
          <span className="text-secondary text-sm font-body tracking-widest uppercase">
            Professional Financial Support
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
          CollectTech &<br />
          <span className="gold-text">Accounting Solutions</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 font-body font-light max-w-2xl mx-auto mb-4">
          Your Trusted Partner in Credit Control & Accounting Support for Growing Businesses
        </p>
        <p className="text-sm text-primary-foreground/60 font-body max-w-xl mx-auto mb-10">
          Outsourced financial support delivered through structured retainer-based and project-based engagements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="gold-gradient text-secondary-foreground px-8 py-3 rounded-md font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity">
            Get Started
          </a>
          <a href="#services" className="border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-md font-body font-medium text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors">
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
