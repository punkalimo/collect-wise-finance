import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, AlertCircle, Mail, Phone, Building } from 'lucide-react';
import { assessmentSections } from '@/lib/assessment-data';
import type { UseAssessmentReturn } from '@/hooks/useAssessment';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 font-body">Progress</span>
        <span className="text-sm font-semibold text-[#b8962e]">
          {progress}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #d4af37 0%, #f5d76e 100%)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

interface SectionNavigatorProps {
  currentSection: number;
  completedSections: number[];
  onGoToSection: (sectionId: number) => void;
}

export const SectionNavigator = ({
  currentSection,
  completedSections,
  onGoToSection,
}: SectionNavigatorProps) => {
  return (
    <div className="hidden lg:flex flex-col gap-2 w-64 flex-shrink-0">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Sections</h3>
      {assessmentSections.map((section) => {
        const isCompleted = completedSections.includes(section.id);
        const isCurrent = currentSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => onGoToSection(section.id)}
            className={`
              flex items-center gap-3 p-3 rounded-lg text-left transition-all
              ${isCurrent 
                ? 'bg-[#d4af37]/10 border border-[#d4af37]/30' 
                : 'hover:bg-gray-100 border border-transparent'
              }
            `}
          >
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold
                ${isCompleted 
                  ? 'bg-green-100 text-green-700' 
                  : isCurrent 
                    ? 'bg-[#d4af37]/20 text-[#b8962e]' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                section.id
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>
                {section.title}
              </p>
              <p className="text-xs text-gray-400">{section.questions.length} questions</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

interface QuestionOptionProps {
  value: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const QuestionOption = ({ value, label, isSelected, onClick }: QuestionOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-lg border-2 text-left transition-all duration-200
        flex items-start gap-4
        ${isSelected 
          ? 'border-[#d4af37] bg-[#d4af37]/15' 
          : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
        }
      `}
    >
      <div
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
          ${isSelected ? 'border-[#d4af37] bg-[#d4af37]' : 'border-slate-400'}
        `}
      >
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
      </div>
      <span className={`text-base font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
        <span className="font-bold mr-2">{value}).</span>
        {label}
      </span>
    </button>
  );
};

interface QuestionCardProps {
  questionId: number;
  questionText: string;
  options: { value: string; label: string }[];
  selectedValue?: string;
  otherValue?: string;
  allowOther: boolean;
  onSelect: (value: string) => void;
  onOtherChange: (value: string) => void;
}

export const QuestionCard = ({
  questionId,
  questionText,
  options,
  selectedValue,
  otherValue,
  allowOther,
  onSelect,
  onOtherChange,
}: QuestionCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <span className="bg-[#d4af37]/15 text-[#b8962e] px-3 py-1.5 rounded-lg text-base font-bold">
          Q{questionId}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-5">{questionText}</h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <QuestionOption
            key={option.value}
            value={option.value}
            label={option.label}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>

      {allowOther && selectedValue === 'e' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-5"
        >
          <label className="block text-base font-medium text-gray-700 mb-2">
            Please specify:
          </label>
          <textarea
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Enter your response..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] text-base"
          />
        </motion.div>
      )}
    </div>
  );
};

interface NavigationControlsProps {
  currentSection: number;
  totalSections: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLastSection: boolean;
  isAllComplete: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const NavigationControls = ({
  currentSection,
  totalSections,
  canGoNext,
  canGoPrev,
  isLastSection,
  isAllComplete,
  onPrev,
  onNext,
  onSubmit,
}: NavigationControlsProps) => {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all
          ${canGoPrev 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-gray-400 cursor-not-allowed'
          }
        `}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Section {currentSection} of {totalSections}</span>
      </div>

      {isLastSection ? (
        <button
          onClick={onSubmit}
          disabled={!isAllComplete}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all
            ${isAllComplete 
              ? 'bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-gray-900 hover:opacity-90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Submit Assessment
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all
            ${canGoNext 
              ? 'bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-gray-900 hover:opacity-90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center py-12 px-6"
    >
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f5d76e] flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-white" style={{ color: '#1a1a2e' }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Business Financial Health Pre-Assessment
        </h1>
        <p className="text-lg text-gray-600">
          CollectTech & Accounting Solutions
        </p>
      </div>

      <div className="text-left bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About This Assessment</h2>
        <p className="text-gray-600 mb-4">
          Understanding the financial health of your business is the first step toward structured growth 
          and stability. This pre-assessment helps identify areas where accounting oversight, compliance 
          alignment, cash flow management, or governance structures may benefit from strengthening.
        </p>
        
        <div className="flex items-center gap-3 text-gray-500 mb-4">
          <Clock className="w-5 h-5" />
          <span>This short assessment takes approximately 5–7 minutes to complete</span>
        </div>

        <div className="flex items-start gap-3 text-gray-500">
          <CheckCircle className="w-5 h-5 mt-0.5 text-green-500" />
          <span>All information submitted through this pre-assessment is treated with strict confidentiality 
          and used solely for the purpose of evaluating potential financial oversight support.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">8 Sections</h3>
          <p className="text-sm text-gray-500">Comprehensive coverage of all financial control areas</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">25 Questions</h3>
          <p className="text-sm text-gray-500">Detailed evaluation of your financial practices</p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-gray-900 font-semibold text-lg hover:opacity-90 transition-opacity"
      >
        Begin Assessment
      </button>
    </motion.div>
  );
};

interface ResultsSummaryProps {
  score: {
    totalScore: number;
    maxScore: number;
    interpretation: string;
    rating: string;
    sectionScores: {
      sectionId: number;
      sectionTitle: string;
      score: number;
      maxScore: number;
      rating: string;
    }[];
  };
  submissionId: string;
}

export const ResultsSummary = ({ score, submissionId }: ResultsSummaryProps) => {
  const getRatingColor = (rating: string) => {
    const colors: Record<string, string> = {
      excellent: 'text-green-600',
      good: 'text-lime-600',
      fair: 'text-yellow-600',
      poor: 'text-orange-600',
      critical: 'text-red-600',
    };
    return colors[rating] || 'text-gray-600';
  };

  const getRatingBg = (rating: string) => {
    const colors: Record<string, string> = {
      excellent: 'bg-green-100 border-green-300',
      good: 'bg-lime-100 border-lime-300',
      fair: 'bg-yellow-100 border-yellow-300',
      poor: 'bg-orange-100 border-orange-300',
      critical: 'bg-red-100 border-red-300',
    };
    return colors[rating] || 'bg-gray-100 border-gray-300';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-8 px-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Assessment Complete
        </h1>
        <p className="text-gray-500">
          Submission ID: <span className="font-mono text-[#b8962e]">{submissionId}</span>
        </p>
      </div>

      {/* Score Card */}
      <div className={`rounded-xl border-2 p-8 mb-8 text-center ${getRatingBg(score.rating)}`}>
        <div className="text-6xl font-bold mb-2" style={{ color: score.rating === 'excellent' ? '#16a34a' : score.rating === 'good' ? '#65a30d' : score.rating === 'fair' ? '#ca8a04' : score.rating === 'poor' ? '#ea580c' : '#dc2626' }}>
          {score.totalScore}
          <span className="text-2xl text-gray-500">/{score.maxScore}</span>
        </div>
        <p className={`text-xl font-semibold ${getRatingColor(score.rating)}`}>
          {score.interpretation}
        </p>
      </div>

      {/* Section Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Section Breakdown</h2>
        <div className="space-y-3">
          {score.sectionScores.map((section) => {
            const percentage = Math.round((section.score / section.maxScore) * 100);
            return (
              <div key={section.sectionId} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700 truncate">{section.sectionTitle}</span>
                    <span className="text-sm text-gray-500">{section.score}/{section.maxScore}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: section.rating === 'excellent' ? '#16a34a' : section.rating === 'good' ? '#65a30d' : section.rating === 'fair' ? '#ca8a04' : section.rating === 'poor' ? '#ea580c' : '#dc2626',
                      }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${getRatingBg(section.rating)}`}>
                  {section.rating}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#d4af37]/20 to-[#f5d76e]/20 rounded-xl border border-[#d4af37]/30 p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Request a Structured Consultation
        </h3>
        <p className="text-gray-600 mb-4">
          Get a professional review of your responses and structured recommendations 
          aligned to your operational needs.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-gray-900 font-semibold hover:opacity-90 transition-opacity"
        >
          Request Consultation
        </a>
      </div>
    </motion.div>
  );
};

interface ResumeDialogProps {
  onResume: () => void;
  onStartFresh: () => void;
}

export const ResumeDialog = ({ onResume, onStartFresh }: ResumeDialogProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl border border-gray-200 p-6 max-w-md w-full shadow-xl"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Resume Assessment?
        </h2>
        <p className="text-gray-600 mb-6">
          You have saved progress from a previous session. Would you like to continue where you left off?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onStartFresh}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Start Fresh
          </button>
          <button
            onClick={onResume}
            className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-gray-900 font-semibold hover:opacity-90 transition-opacity"
          >
            Resume
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface UserDetailsFormProps {
  onSubmit: (details: { name: string; email: string; phone: string; companyName?: string }) => void;
  isSubmitting: boolean;
}

export const UserDetailsForm = ({ onSubmit, isSubmitting }: UserDetailsFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    onSubmit({ name, email, phone, companyName: companyName || undefined });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto py-8 px-6"
    >
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f5d76e] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Almost Done!
          </h1>
          <p className="text-gray-600">
            Please provide your contact details so we can follow up with your assessment results.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number (optional)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name (optional)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] text-base"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f5d76e] text-gray-900 font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

interface CompletionScreenProps {}

export const CompletionScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-12 px-6"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Assessment Completed
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for completing the Business Financial Health Pre-Assessment.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <p className="text-gray-600 mb-4">
          Your responses provide a high-level view of your financial control environment, compliance positioning, receivables oversight, and governance structure. 
        </p>
        <p className="text-gray-600">
          If you would like a professional review of your responses and a structured recommendation aligned to your operational needs, you are welcome to request a consultation through our contact page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="/#contact"
          className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[#d4af37] bg-[#d4af37]/5 hover:bg-[#d4af37]/10 transition-colors"
        >
          <Mail className="w-8 h-8 text-[#b8962e]" />
          <span className="font-semibold text-gray-900">Request Consultation</span>
          <span className="text-sm text-gray-500 text-center">Get a professional review of your assessment</span>
        </a>
        
        <Link
          to="/"
          className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <Building className="w-8 h-8 text-gray-600" />
          <span className="font-semibold text-gray-900">Back to Home</span>
          <span className="text-sm text-gray-500 text-center">Explore our services</span>
        </Link>
      </div>
    </motion.div>
  );
};
