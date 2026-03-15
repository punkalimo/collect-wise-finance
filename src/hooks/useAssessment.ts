import { useState, useCallback, useEffect } from 'react';
import type { AssessmentData, AssessmentScore, AnswerValue, AssessmentStep } from '@/types/assessment';
import { assessmentSections } from '@/lib/assessment-data';
import { calculateScore } from '@/lib/scoring';

const STORAGE_KEY = 'financial-health-assessment';

const createEmptyAssessment = (): AssessmentData => ({
  answers: {},
  otherAnswers: {},
  startedAt: new Date().toISOString(),
  lastUpdatedAt: new Date().toISOString(),
  completedSections: [],
  currentSection: 1,
});

export const useAssessment = () => {
  const [step, setStep] = useState<AssessmentStep>('intro');
  const [data, setData] = useState<AssessmentData>(createEmptyAssessment());
  const [score, setScore] = useState<AssessmentScore | null>(null);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
          setData(parsed);
          setHasSavedProgress(true);
        }
      }
    } catch (e) {
      console.error('Failed to load saved assessment:', e);
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading && step !== 'results') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoading, step]);

  const startAssessment = useCallback(() => {
    setData(createEmptyAssessment());
    setHasSavedProgress(false);
    setStep('form');
  }, []);

  const resumeAssessment = useCallback(() => {
    setHasSavedProgress(false);
    setStep('form');
  }, []);

  const clearProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(createEmptyAssessment());
    setHasSavedProgress(false);
    setScore(null);
    setStep('intro');
  }, []);

  const setAnswer = useCallback((questionId: number, answer: AnswerValue | string) => {
    setData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      lastUpdatedAt: new Date().toISOString(),
    }));
  }, []);

  const setOtherAnswer = useCallback((questionId: number, answer: string) => {
    setData((prev) => ({
      ...prev,
      otherAnswers: { ...prev.otherAnswers, [questionId]: answer },
      lastUpdatedAt: new Date().toISOString(),
    }));
  }, []);

  const getAnswer = useCallback((questionId: number): AnswerValue | string | undefined => {
    return data.answers[questionId];
  }, [data.answers]);

  const getOtherAnswer = useCallback((questionId: number): string => {
    return data.otherAnswers[questionId] || '';
  }, [data.otherAnswers]);

  const goToSection = useCallback((sectionId: number) => {
    setData((prev) => ({
      ...prev,
      currentSection: sectionId,
    }));
    // Scroll to top when changing sections
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }, []);

  const nextSection = useCallback(() => {
    setData((prev) => {
      const currentSection = prev.currentSection;
      const nextSectionId = currentSection + 1;
      const maxSection = assessmentSections.length;
      
      if (nextSectionId > maxSection) return prev;
      
      return {
        ...prev,
        currentSection: nextSectionId,
        completedSections: prev.completedSections.includes(currentSection)
          ? prev.completedSections
          : [...prev.completedSections, currentSection],
      };
    });
    // Scroll to top after navigation
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }, []);

  const prevSection = useCallback(() => {
    setData((prev) => {
      const prevSectionId = prev.currentSection - 1;
      if (prevSectionId < 1) return prev;
      return { ...prev, currentSection: prevSectionId };
    });
    // Scroll to top after navigation
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }, []);

  const isSectionComplete = useCallback((sectionId: number): boolean => {
    const section = assessmentSections.find((s) => s.id === sectionId);
    if (!section) return false;
    
    return section.questions.every((q) => {
      const answer = data.answers[q.id];
      // If "Other" is selected, check if other answer is provided
      if (answer === 'e' && q.allowOther) {
        return !!data.otherAnswers[q.id]?.trim();
      }
      return !!answer;
    });
  }, [data.answers, data.otherAnswers]);

  const canGoNext = useCallback((): boolean => {
    return isSectionComplete(data.currentSection) && data.currentSection < assessmentSections.length;
  }, [data.currentSection, isSectionComplete]);

  const canGoPrev = useCallback((): boolean => {
    return data.currentSection > 1;
  }, [data.currentSection]);

  const isLastSection = useCallback((): boolean => {
    return data.currentSection === assessmentSections.length;
  }, [data.currentSection]);

  const isFirstSection = useCallback((): boolean => {
    return data.currentSection === 1;
  }, [data.currentSection]);

  const getProgress = useCallback((): number => {
    const totalQuestions = assessmentSections.reduce((sum, s) => sum + s.questions.length, 0);
    const answeredQuestions = Object.keys(data.answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }, [data.answers]);

  const getCurrentSection = useCallback(() => {
    return assessmentSections.find((s) => s.id === data.currentSection) || null;
  }, [data.currentSection]);

  const getTotalAnswered = useCallback((): number => {
    return Object.keys(data.answers).length;
  }, [data.answers]);

  const submitAssessment = useCallback((): AssessmentScore => {
    const calculatedScore = calculateScore(data.answers);
    setScore(calculatedScore);
    setStep('results');
    localStorage.removeItem(STORAGE_KEY);
    return calculatedScore;
  }, [data.answers]);

  const getAllAnswers = useCallback((): Record<number, string> => {
    const result: Record<number, string> = {};
    
    Object.entries(data.answers).forEach(([qId, answer]) => {
      const questionId = parseInt(qId);
      if (answer === 'e' && data.otherAnswers[questionId]) {
        result[questionId] = data.otherAnswers[questionId];
      } else {
        result[questionId] = answer as string;
      }
    });
    
    return result;
  }, [data.answers, data.otherAnswers]);

  return {
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
  };
};

export type UseAssessmentReturn = ReturnType<typeof useAssessment>;
