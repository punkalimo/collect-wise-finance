import AssessmentContainer from '@/components/assessment/AssessmentContainer';
import { Seo } from '@/components/Seo';

const Assessment = () => {
  return (
    <>
      <Seo
        title="Financial Health Pre-Assessment - CollectTech & Accounting Solutions"
        description="Evaluate your business financial controls, governance practices, and cash flow discipline with our comprehensive pre-assessment tool."
        path="/assessment"
      />
      <AssessmentContainer />
    </>
  );
};

export default Assessment;
