import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hero-bg border-b border-primary-foreground/10">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="CollectTech" className="h-8 w-auto" />
          <span className="font-display font-bold text-lg text-primary-foreground">
            Collect<span className="text-gradient-gold">Tech</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm px-5 py-2 rounded-md bg-accent text-accent-foreground font-semibold hover:bg-gold-dark transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden hero-bg border-t border-primary-foreground/10 px-6 pb-6 pt-4 space-y-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block text-center text-sm px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-semibold hover:bg-gold-dark transition-colors"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;