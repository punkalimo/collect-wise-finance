// Assessment Types

export type AnswerValue = 'a' | 'b' | 'c' | 'd' | 'e';

export interface QuestionOption {
  value: AnswerValue;
  label: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  allowOther: boolean;
  otherPlaceholder?: string;
}

export interface Section {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface AssessmentData {
  answers: Record<number, AnswerValue | string>;
  otherAnswers: Record<number, string>;
  startedAt: string;
  lastUpdatedAt: string;
  completedSections: number[];
  currentSection: number;
}

export interface SectionScore {
  sectionId: number;
  sectionTitle: string;
  score: number;
  maxScore: number;
  rating: ScoreRating;
}

export interface AssessmentScore {
  totalScore: number;
  maxScore: number;
  interpretation: string;
  rating: ScoreRating;
  sectionScores: SectionScore[];
}

export type ScoreRating = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

export interface SubmissionData {
  answers: Record<number, string>;
  score: number;
  interpretation: string;
  sectionScores: Record<string, number>;
  clientEmail?: string;
  clientName?: string;
}

export interface SubmissionResponse {
  success: boolean;
  submissionId?: string;
  message?: string;
}

export interface SubmissionLog {
  id: string;
  submittedAt: string;
  score: number;
  interpretation: string;
  sections: Record<string, number>;
  clientEmail?: string;
  clientName?: string;
  status: 'new' | 'contacted' | 'pending' | 'converted' | 'closed';
  notes: string;
}

export type AssessmentStep = 'intro' | 'form' | 'details' | 'submitting' | 'completed';

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
}
