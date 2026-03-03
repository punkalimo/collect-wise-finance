import { Lock } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="hero-bg py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <img src={logo} alt="CollectTech & Accounting Solutions" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
        <h3 className="text-xl font-display font-bold text-primary-foreground mb-2">
          CollectTech & Accounting Solutions
        </h3>
        <div className="flex items-center justify-center gap-2 text-primary-foreground/60 text-sm font-body mb-4">
          <Lock className="w-3.5 h-3.5" />
          <span>Confidential & Professional Financial Support</span>
        </div>
        <div className="w-16 h-px bg-primary-foreground/20 mx-auto mb-4" />
        <p className="text-primary-foreground/50 text-xs font-body">
          © {new Date().getFullYear()} CollectTech & Accounting Solutions. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
