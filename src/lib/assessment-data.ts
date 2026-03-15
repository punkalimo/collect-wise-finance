import type { Section, AnswerValue } from '@/types/assessment';

const createOptions = (labels: string[]): { value: AnswerValue; label: string; score: number }[] => {
  return labels.map((label, index) => ({
    value: String.fromCharCode(97 + index) as AnswerValue,
    label,
    score: index + 1,
  }));
};

export const assessmentSections: Section[] = [
  {
    id: 1,
    title: 'Business & Operational Structure',
    description: 'Understanding your business foundation and resources',
    questions: [
      {
        id: 1,
        text: 'How long has your business been operating?',
        options: createOptions([
          'Less than 1 year',
          '1–3 years',
          '3–5 years',
          'Over 5 years',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other duration',
      },
      {
        id: 2,
        text: 'What is the approximate size of your organisation?',
        options: createOptions([
          '1–10 employees',
          '11–25 employees',
          '26–50 employees',
          'Over 50 employees',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other size',
      },
      {
        id: 3,
        text: 'Do you have a dedicated internal finance or accounting resource?',
        options: createOptions([
          'Yes (Full-time)',
          'Yes (Part-time)',
          'No',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other arrangement',
      },
      {
        id: 4,
        text: 'Is your accounting system fully implemented and regularly maintained?',
        options: createOptions([
          'Yes – fully implemented and regularly maintained',
          'Implemented but not consistently maintained',
          'Partially implemented',
          'No formal accounting system',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other status',
      },
      {
        id: 5,
        text: 'Are financial records easily accessible when needed for operational, reporting, or compliance purposes?',
        options: createOptions([
          'Yes – records are well organised and easily accessible',
          'Mostly accessible but sometimes require time to locate',
          'Accessible but not well organised',
          'Records are often difficult to locate when needed',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other situation',
      },
    ],
  },
  {
    id: 2,
    title: 'Financial Records & Accounting Structure',
    description: 'Evaluating your day-to-day financial management',
    questions: [
      {
        id: 6,
        text: 'How frequently are bank accounts reconciled?',
        options: createOptions([
          'Monthly',
          'Quarterly',
          'Occasionally when required',
          'Rarely or never',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other frequency',
      },
      {
        id: 7,
        text: 'How up-to-date are your accounting records?',
        options: createOptions([
          'Fully up to date',
          'Slightly behind but manageable',
          'Several months behind',
          'Significantly behind or unclear',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other status',
      },
    ],
  },
  {
    id: 3,
    title: 'Receivables & Credit Control',
    description: 'Managing customer payments and credit risk',
    questions: [
      {
        id: 8,
        text: 'Do you have a documented credit control policy?',
        options: createOptions([
          'Yes – documented and actively applied',
          'Informal process followed internally',
          'No formal credit control policy',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other arrangement',
      },
      {
        id: 9,
        text: 'How are customer invoices currently monitored and collected?',
        options: createOptions([
          'Structured credit control system with regular follow-ups',
          'Follow-ups occur but not consistently',
          'Follow-ups occur only when payments delay',
          'No structured follow-up process exists',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other method',
      },
      {
        id: 10,
        text: 'How regularly are customer receivables reconciled to ensure outstanding balances are accurate?',
        options: createOptions([
          'Reconciled regularly with accurate and updated debtor balances',
          'Reconciled periodically but not consistently',
          'Reconciled occasionally when issues arise',
          'Rarely or never reconciled',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other frequency',
      },
      {
        id: 11,
        text: 'Do you have clearly defined customer credit terms and limits that are consistently enforced?',
        options: createOptions([
          'Yes – credit terms and limits are clearly defined and consistently enforced',
          'Credit terms exist but enforcement is not always consistent',
          'Credit terms exist but are often ignored or relaxed',
          'No formal credit terms or limits are applied',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other situation',
      },
      {
        id: 12,
        text: 'How often do customers exceed their payment terms?',
        options: createOptions([
          'Rarely',
          'Occasionally',
          'Frequently',
          'Very frequently',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other frequency',
      },
      {
        id: 13,
        text: 'Do you maintain an updated debtor ageing report?',
        options: createOptions([
          'Yes – reviewed regularly',
          'Yes – reviewed occasionally',
          'Exists but rarely reviewed',
          'No debtor ageing maintained',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other status',
      },
    ],
  },
  {
    id: 4,
    title: 'Payables & Supplier Management',
    description: 'Managing supplier relationships and payments',
    questions: [
      {
        id: 14,
        text: 'How are supplier payments currently managed?',
        options: createOptions([
          'Structured approval and payment schedule',
          'Payments scheduled but occasionally delayed',
          'Payments made as funds become available',
          'Payments are largely reactive',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other method',
      },
      {
        id: 15,
        text: 'How frequently are supplier accounts reconciled?',
        options: createOptions([
          'Monthly',
          'Occasionally',
          'Rarely',
          'Never',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other frequency',
      },
    ],
  },
  {
    id: 5,
    title: 'Tax & Statutory Compliance',
    description: 'Meeting regulatory and tax obligations',
    questions: [
      {
        id: 16,
        text: 'How are statutory obligations managed (ZRA, NAPSA, NHIMA, PAYE, VAT)?',
        options: createOptions([
          'All submissions are accurate and on time',
          'Mostly compliant with occasional delays',
          'Some submissions are late',
          'Compliance issues occur regularly',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other status',
      },
      {
        id: 17,
        text: 'Have you incurred statutory penalties in the past 12 months?',
        options: createOptions([
          'No',
          'Yes (Once)',
          'Yes (Multiple times)',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify details',
      },
    ],
  },
  {
    id: 6,
    title: 'Financial Reporting & Oversight',
    description: 'Information for decision-making and accountability',
    questions: [
      {
        id: 18,
        text: 'Do you receive structured monthly management reports?',
        options: createOptions([
          'Yes – structured monthly management reports are prepared',
          'Occasionally',
          'No',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other arrangement',
      },
      {
        id: 19,
        text: 'Are annual financial statements prepared and reviewed?',
        options: createOptions([
          'Yes – prepared and reviewed annually',
          'Partially prepared but not fully reviewed',
          'No',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other status',
      },
      {
        id: 20,
        text: 'Have your financial records been audit-ready within the past year?',
        options: createOptions([
          'Yes – records are audit-ready',
          'Not fully audit-ready',
          'No',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other status',
      },
    ],
  },
  {
    id: 7,
    title: 'Financial Governance & Authorization Controls',
    description: 'Internal controls and decision-making processes',
    questions: [
      {
        id: 21,
        text: 'Is there a defined signatory or dual-approval structure for payments?',
        options: createOptions([
          'Yes – structured dual approval system',
          'Single approver structure',
          'No defined approval structure',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other structure',
      },
      {
        id: 22,
        text: 'Is there a formal approval process for payments and significant expenditures?',
        options: createOptions([
          'Yes – documented and consistently followed',
          'Informal but generally followed',
          'No formal approval structure',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other process',
      },
      {
        id: 23,
        text: 'Are business funds clearly separated from personal or owner expenses?',
        options: createOptions([
          'Yes – fully separated',
          'Mostly separated',
          'Sometimes mixed',
          'Often mixed',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other situation',
      },
    ],
  },
  {
    id: 8,
    title: 'Cash Flow Management',
    description: 'Managing liquidity and financial planning',
    questions: [
      {
        id: 24,
        text: 'How would you describe your organisation\'s cash flow management?',
        options: createOptions([
          'Cash flow is well monitored and predictable',
          'Generally stable but occasionally tight',
          'Cash flow fluctuations occur regularly',
          'Cash flow challenges occur frequently',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other description',
      },
      {
        id: 25,
        text: 'Do you prepare cash flow projections or forecasts?',
        options: createOptions([
          'Yes – regularly',
          'Occasionally',
          'Rarely',
          'Never',
          'Other – Please specify',
        ]),
        allowOther: true,
        otherPlaceholder: 'Specify other frequency',
      },
    ],
  },
];

export const getTotalQuestions = (): number => {
  return assessmentSections.reduce((total, section) => total + section.questions.length, 0);
};

export const getQuestionById = (id: number) => {
  for (const section of assessmentSections) {
    const question = section.questions.find((q) => q.id === id);
    if (question) return question;
  }
  return null;
};

export const getSectionById = (id: number) => {
  return assessmentSections.find((s) => s.id === id) || null;
};

export const getSectionForQuestion = (questionId: number): Section | null => {
  return assessmentSections.find((s) => s.questions.some((q) => q.id === questionId)) || null;
};
