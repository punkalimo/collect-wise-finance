import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessment } from '@/hooks/useAssessment';
import { calculateScore } from '@/lib/scoring';
import { generateSubmissionId, generateEmailHtml } from '@/lib/email-template';
import {
  ProgressBar,
  SectionNavigator,
  QuestionCard,
  NavigationControls,
  AssessmentIntro,
  ResultsSummary,
  ResumeDialog,
} from './AssessmentComponents';

interface AssessmentContainerProps {
  onRequestConsultation?: () => void;
}

export const AssessmentContainer = ({ onRequestConsultation }: AssessmentContainerProps) => {
  const [submissionId, setSubmissionId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    step,
    data,
    score,
    hasSavedProgress,
    isLoading,
    startAssessment,
    resumeAssessment,
    clearProgress,
    setAnswer,
    setOtherAnswer,
    getAnswer,
    getOtherAnswer,
    goToSection,
    nextSection,
    prevSection,
    isSectionComplete,
    canGoNext,
    canGoPrev,
    isLastSection,
    isFirstSection,
    getProgress,
    getCurrentSection,
    getTotalAnswered,
    submitAssessment,
    getAllAnswers,
  } = useAssessment();

  const currentSection = getCurrentSection();
  const progress = getProgress();
  const totalAnswered = getTotalAnswered();
  const isAllComplete = totalAnswered === 25;

  // Handle submission
  const handleSubmit = useCallback(async () => {
    if (!isAllComplete) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Calculate score
      const calculatedScore = calculateScore(data.answers);
      const newSubmissionId = generateSubmissionId();
      setSubmissionId(newSubmissionId);

      // Get all answers with text
      const allAnswers = getAllAnswers();

      // Send to API (relative path like contact form)
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: allAnswers,
          score: calculatedScore.totalScore,
          interpretation: calculatedScore.interpretation,
          sectionScores: calculatedScore.sectionScores.reduce(
            (acc, s) => ({ ...acc, [s.sectionTitle]: s.score }),
            {}
          ),
        }),
      });

      if (!response.ok) {
        const message = await response.text().catch(() => 'Failed to submit assessment');
        throw new Error(message || 'Failed to submit assessment');
      }

      // Submit and show results
      submitAssessment();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [isAllComplete, data.answers, getAllAnswers, submitAssessment]);

  // Show loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]" />
      </div>
    );
  }

  // Show resume dialog
  if (hasSavedProgress && step === 'intro') {
    return (
      <ResumeDialog
        onResume={resumeAssessment}
        onStartFresh={clearProgress}
      />
    );
  }

  // Show intro
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-white">
        <AssessmentIntro onStart={startAssessment} />
      </div>
    );
  }

  // Show results
  if (step === 'results' && score) {
    return (
      <div className="min-h-screen bg-white py-12">
        <ResultsSummary score={score} submissionId={submissionId} />
      </div>
    );
  }

  // Show form
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-display font-bold text-gray-900">
                Financial Health Assessment
              </h1>
              <p className="text-sm text-gray-500">
                {totalAnswered} of 25 questions answered
              </p>
            </div>
            <div className="w-48">
              <ProgressBar progress={progress} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Section Navigator - Desktop */}
          <SectionNavigator
            currentSection={data.currentSection}
            completedSections={data.completedSections}
            onGoToSection={goToSection}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {currentSection && (
                <motion.div
                  key={currentSection.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Section Header */}
                  <div className="mb-6">
                    <span className="text-sm font-medium text-[#b8962e]">
                      Section {currentSection.id} of 8
                    </span>
                    <h2 className="text-2xl font-display font-bold text-gray-900 mt-1">
                      {currentSection.title}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      {currentSection.description}
                    </p>
                  </div>

                  {/* Questions */}
                  {currentSection.questions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      questionId={question.id}
                      questionText={question.text}
                      options={question.options.map((o) => ({
                        value: o.value,
                        label: o.label,
                      }))}
                      selectedValue={getAnswer(question.id)}
                      otherValue={getOtherAnswer(question.id)}
                      allowOther={question.allowOther}
                      onSelect={(value) => setAnswer(question.id, value as 'a' | 'b' | 'c' | 'd' | 'e')}
                      onOtherChange={(value) => setOtherAnswer(question.id, value)}
                    />
                  ))}

                  {/* Navigation */}
                  <NavigationControls
                    currentSection={data.currentSection}
                    totalSections={8}
                    canGoNext={canGoNext()}
                    canGoPrev={canGoPrev()}
                    isLastSection={isLastSection()}
                    isAllComplete={isAllComplete}
                    onPrev={prevSection}
                    onNext={nextSection}
                    onSubmit={handleSubmit}
                  />

                  {submitError && (
                    <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                      {submitError}
                    </div>
                  )}

                  {isSubmitting && (
                    <div className="mt-4 flex items-center gap-3 text-gray-500">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#d4af37]" />
                      Submitting your assessment...
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentContainer;
