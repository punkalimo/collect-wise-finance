import type { AssessmentScore, SubmissionLog } from '@/types/assessment';
import { assessmentSections, getQuestionById } from './assessment-data';

export const generateSubmissionId = (): string => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `FH-${dateStr}-${random}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getRatingColorHex = (rating: string): string => {
  const colors: Record<string, string> = {
    excellent: '#22c55e',
    good: '#84cc16',
    fair: '#eab308',
    poor: '#f97316',
    critical: '#ef4444',
  };
  return colors[rating] || '#6b7280';
};

export const generateEmailHtml = (
  submissionId: string,
  answers: Record<number, string>,
  score: AssessmentScore,
  clientName?: string,
  clientEmail?: string
): string => {
  const ratingColor = getRatingColorHex(score.rating);

  let questionsHtml = '';
  
  assessmentSections.forEach((section) => {
    questionsHtml += `
      <h3 style="margin-top: 24px; margin-bottom: 12px; color: #1a1a2e; font-size: 16px;">${section.title}</h3>
    `;
    
    section.questions.forEach((question) => {
      const answer = answers[question.id] || 'Not answered';
      let answerText = answer;
      
      // Find the option label if it's a single letter
      if (answer.length === 1 && 'abcde'.includes(answer)) {
        const option = question.options.find((o) => o.value === answer);
        if (option) {
          answerText = option.label;
        }
      }
      
      questionsHtml += `
        <div style="background: #f9fafb; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px;">
          <p style="margin: 0; color: #1a1a2e; font-weight: 500; font-size: 14px;">
            Q${question.id}. ${question.text}
          </p>
          <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">
            ${answerText}
          </p>
        </div>
      `;
    });
  });

  let sectionRowsHtml = '';
  score.sectionScores.forEach((section) => {
    sectionRowsHtml += `
      <tr>
        <td style="border: 1px solid #e5e7eb; padding: 12px; font-size: 14px;">${section.sectionTitle}</td>
        <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; font-size: 14px;">${section.score}/${section.maxScore}</td>
        <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; font-size: 14px;">
          <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background: ${getRatingColorHex(section.rating)}20; color: ${getRatingColorHex(section.rating)};">
            ${section.rating.charAt(0).toUpperCase() + section.rating.slice(1)}
          </span>
        </td>
      </tr>
    `;
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Financial Health Assessment</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background: #f5f5f5;">
  <div style="max-width: 800px; margin: 0 auto; background: white;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; color: white;">
      <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700;">Financial Health Pre-Assessment</h1>
      <p style="margin: 5px 0; opacity: 0.9; font-size: 14px;"><strong>Submission ID:</strong> ${submissionId}</p>
      <p style="margin: 5px 0; opacity: 0.9; font-size: 14px;"><strong>Submitted:</strong> ${formatDate(new Date().toISOString())}</p>
      ${clientName ? `<p style="margin: 5px 0; opacity: 0.9; font-size: 14px;"><strong>Client:</strong> ${clientName}</p>` : ''}
      ${clientEmail ? `<p style="margin: 5px 0; opacity: 0.9; font-size: 14px;"><strong>Email:</strong> ${clientEmail}</p>` : ''}
    </div>
    
    <!-- Score Card -->
    <div style="padding: 30px;">
      <div style="background: linear-gradient(135deg, ${ratingColor}20 0%, ${ratingColor}10 100%); border: 2px solid ${ratingColor}30; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
        <h2 style="margin: 0 0 10px 0; color: ${ratingColor}; font-size: 36px; font-weight: 700;">${score.totalScore} / ${score.maxScore}</h2>
        <p style="margin: 0; color: #1a1a2e; font-size: 18px; font-weight: 600;">${score.interpretation}</p>
      </div>
      
      <!-- Section Breakdown -->
      <h3 style="color: #1a1a2e; font-size: 18px; margin-bottom: 16px;">Section Breakdown</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr>
            <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left; background: #f9fafb; font-size: 14px;">Section</th>
            <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; background: #f9fafb; font-size: 14px;">Score</th>
            <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; background: #f9fafb; font-size: 14px;">Rating</th>
          </tr>
        </thead>
        <tbody>
          ${sectionRowsHtml}
        </tbody>
      </table>
      
      <!-- Detailed Responses -->
      <h3 style="color: #1a1a2e; font-size: 18px; margin-bottom: 16px;">Detailed Responses</h3>
      ${questionsHtml}
    </div>
    
    <!-- Footer -->
    <div style="background: #1a1a2e; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0;">CollectTech & Accounting Solutions</p>
      <p style="margin: 5px 0 0 0;">This is an automated submission from the Financial Health Pre-Assessment tool.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

export const createSubmissionLog = (
  submissionId: string,
  score: AssessmentScore,
  clientEmail?: string,
  clientName?: string
): SubmissionLog => {
  const sections: Record<string, number> = {};
  score.sectionScores.forEach((s) => {
    sections[s.sectionTitle] = s.score;
  });

  return {
    id: submissionId,
    submittedAt: new Date().toISOString(),
    score: score.totalScore,
    interpretation: score.interpretation,
    sections,
    clientEmail,
    clientName,
    status: 'new',
    notes: '',
  };
};
