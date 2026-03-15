import type { AssessmentScore, ScoreRating, SectionScore, AnswerValue } from '@/types/assessment';
import { assessmentSections, getSectionForQuestion } from './assessment-data';

export const getScoreRating = (score: number): ScoreRating => {
  if (score <= 40) return 'excellent';
  if (score <= 60) return 'good';
  if (score <= 80) return 'fair';
  if (score <= 100) return 'poor';
  return 'critical';
};

export const getInterpretation = (rating: ScoreRating): string => {
  const interpretations: Record<ScoreRating, string> = {
    excellent: 'Excellent - Your financial controls are strong',
    good: 'Good - Minor improvements recommended',
    fair: 'Fair - Monitoring needed',
    poor: 'Poor - Attention required',
    critical: 'Critical - Immediate action recommended',
  };
  return interpretations[rating];
};

export const calculateScore = (answers: Record<number, string | AnswerValue | undefined>): AssessmentScore => {
  let totalScore = 0;
  const maxScore = 25 * 5; // 25 questions, max 5 points each
  const sectionScoresMap: Map<number, { score: number; maxScore: number }> = new Map();

  // Initialize section scores
  assessmentSections.forEach((section) => {
    sectionScoresMap.set(section.id, { score: 0, maxScore: section.questions.length * 5 });
  });

  // Calculate scores for each answered question
  Object.entries(answers).forEach(([questionId, answer]) => {
    const qId = parseInt(questionId, 10);
    const answerValue = answer as AnswerValue;
    
    if (answerValue && 'abcd'.includes(answerValue)) {
      const score = answerValue.charCodeAt(0) - 96; // a=1, b=2, c=3, d=4
      totalScore += score;

      const section = getSectionForQuestion(qId);
      if (section) {
        const current = sectionScoresMap.get(section.id) || { score: 0, maxScore: 0 };
        current.score += score;
        sectionScoresMap.set(section.id, current);
      }
    } else if (answerValue === 'e') {
      // "Other" option scores 5 (highest)
      totalScore += 5;
      
      const section = getSectionForQuestion(qId);
      if (section) {
        const current = sectionScoresMap.get(section.id) || { score: 0, maxScore: 0 };
        current.score += 5;
        sectionScoresMap.set(section.id, current);
      }
    }
  });

  const rating = getScoreRating(totalScore);
  const interpretation = getInterpretation(rating);

  // Build section scores
  const sectionScores: SectionScore[] = assessmentSections.map((section) => {
    const scores = sectionScoresMap.get(section.id) || { score: 0, maxScore: section.questions.length * 5 };
    const sectionRating = getScoreRating(Math.round((scores.score / scores.maxScore) * 40) || scores.score);
    
    return {
      sectionId: section.id,
      sectionTitle: section.title,
      score: scores.score,
      maxScore: scores.maxScore,
      rating: sectionRating,
    };
  });

  return {
    totalScore,
    maxScore,
    interpretation,
    rating,
    sectionScores,
  };
};

export const getRatingLabel = (rating: ScoreRating): string => {
  const labels: Record<ScoreRating, string> = {
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
    critical: 'Critical',
  };
  return labels[rating];
};

export const getRatingColor = (rating: ScoreRating): string => {
  const colors: Record<ScoreRating, string> = {
    excellent: 'text-green-500',
    good: 'text-lime-500',
    fair: 'text-yellow-500',
    poor: 'text-orange-500',
    critical: 'text-red-500',
  };
  return colors[rating];
};

export const getRatingBgColor = (rating: ScoreRating): string => {
  const colors: Record<ScoreRating, string> = {
    excellent: 'bg-green-500/10 border-green-500/30',
    good: 'bg-lime-500/10 border-lime-500/30',
    fair: 'bg-yellow-500/10 border-yellow-500/30',
    poor: 'bg-orange-500/10 border-orange-500/30',
    critical: 'bg-red-500/10 border-red-500/30',
  };
  return colors[rating];
};
