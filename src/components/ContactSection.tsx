import { Phone, Mail } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const header = useScrollAnimation();
  const content = useScrollAnimation(0.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:collecttech.finance@gmail.com?subject=Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={header.ref} className={`text-center mb-16 scroll-hidden ${header.isVisible ? "scroll-visible" : ""}`}>
          <span className="text-secondary font-body text-sm tracking-widest uppercase font-semibold">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3 mb-4">Contact Us</h2>
          <div className="w-16 h-1 gold-gradient rounded mx-auto" />
        </div>

        <div ref={content.ref} className={`grid md:grid-cols-2 gap-12 scroll-hidden ${content.isVisible ? "scroll-visible" : ""}`}>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-body font-semibold text-foreground mb-1">Phone</p>
                <p className="text-muted-foreground font-body text-sm">+260 772 745 239</p>
                <p className="text-muted-foreground font-body text-sm">+260 968 721 369</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-body font-semibold text-foreground mb-1">Email</p>
                <p className="text-muted-foreground font-body text-sm">collecttech.finance@gmail.com</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" placeholder="Name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50" />
            <input type="email" placeholder="Email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50" />
            <textarea placeholder="Message" required maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-md border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none" />
            <button type="submit" className="gold-gradient text-secondary-foreground px-8 py-3 rounded-md font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity w-full sm:w-auto">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
