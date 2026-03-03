import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <>
      <Seo
        title="CollectTech & Accounting Solutions - Professional Financial Support"
        description="CollectTech provides professional outsourced finance services including accounts receivable, credit control, accounts payable, financial reporting, and tax compliance for growing businesses and SMEs in Zambia."
        path="/"
      />
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ServicesSection />
        <TeamSection />
        <WhyUsSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
