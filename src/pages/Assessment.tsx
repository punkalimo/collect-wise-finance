import AssessmentContainer from '@/components/assessment/AssessmentContainer';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Seo } from '@/components/Seo';

const Assessment = () => {
  return (
    <>
      <Seo
        title="Financial Health Pre-Assessment - CollectTech & Accounting Solutions"
        description="Evaluate your business financial controls, governance practices, and cash flow discipline with our comprehensive pre-assessment tool."
        path="/assessment"
      />
      <Navbar />
      <div id="main-content">
        <AssessmentContainer />
        <ContactSection />
      </div>
      <Footer />
    </>
  );
};

export default Assessment;
