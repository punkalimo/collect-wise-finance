import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const links = [
  { label: "About", href: "#about", isRoute: false },
  { label: "Services", href: "#services", isRoute: false },
  { label: "Assessment", href: "/assessment", isRoute: true },
  { label: "Contact", href: "#contact", isRoute: false },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const NavLink = ({ link }: { link: typeof links[0] }) => {
    if (link.isRoute) {
      return (
        <Link
          to={link.href}
          className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
      >
        {link.label}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hero-bg border-b border-primary-foreground/10">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CollectTech" className="h-8 w-auto" />
          <span className="font-display font-bold text-lg text-primary-foreground">
            Collect<span className="text-gradient-gold">Tech</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink key={link.label} link={link} />
          ))}
          <Link
            to="/assessment"
            className="text-sm px-5 py-2 rounded-md bg-accent text-accent-foreground font-semibold hover:bg-gold-dark transition-colors"
          >
            Free Assessment
          </Link>
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
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          ))}
          <Link
            to="/assessment"
            onClick={() => setOpen(false)}
            className="block text-center text-sm px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-semibold hover:bg-gold-dark transition-colors"
          >
            Free Assessment
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;