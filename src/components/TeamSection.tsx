import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const teamImages = [
  { src: team1, alt: "Financial analyst reviewing client accounts", caption: "Accounts & Credit Analysis" },
  { src: team2, alt: "Senior accountant reviewing financial reports", caption: "Financial Reporting" },
  { src: team3, alt: "Team collaborating on tax compliance documents", caption: "Collaborative Advisory" },
  { src: team4, alt: "Data analyst monitoring financial dashboards", caption: "Data-Driven Insights" },
];

const TeamSection = () => {
  const header = useScrollAnimation();
  const grid = useScrollAnimation(0.05);

  return (
    <section className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={header.ref} className={`text-center mb-16 scroll-hidden ${header.isVisible ? "scroll-visible" : ""}`}>
          <span className="text-secondary font-body text-sm tracking-widest uppercase font-semibold">Our People</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3 mb-4">Dedicated Professionals at Work</h2>
          <div className="w-16 h-1 gold-gradient rounded mx-auto mb-6" />
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Our team combines deep expertise in credit control, accounting, and financial compliance to deliver structured, reliable support for every client.
          </p>
        </div>

        <div ref={grid.ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamImages.map((img, i) => (
            <div
              key={img.caption}
              className={`group relative rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 scroll-hidden ${grid.isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent pt-16 pb-5 px-4">
                <p className="text-primary-foreground font-display font-semibold text-sm">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
