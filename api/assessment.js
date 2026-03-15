import nodemailer from "nodemailer";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

function escapeHtml(input) {
  if (!input) return "";
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateSubmissionId() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `FH-${dateStr}-${random}`;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getRatingColor(rating) {
  const colors = {
    excellent: "#22c55e",
    good: "#84cc16",
    fair: "#eab308",
    poor: "#f97316",
    critical: "#ef4444",
  };
  return colors[rating] || "#6b7280";
}

// Questions data (mirrored from frontend for email generation)
const sections = [
  {
    id: 1,
    title: "Business & Operational Structure",
    questions: [
      { id: 1, text: "How long has your business been operating?", options: ["Less than 1 year", "1–3 years", "3–5 years", "Over 5 years", "Other – Please specify"] },
      { id: 2, text: "What is the approximate size of your organisation?", options: ["1–10 employees", "11–25 employees", "26–50 employees", "Over 50 employees", "Other – Please specify"] },
      { id: 3, text: "Do you have a dedicated internal finance or accounting resource?", options: ["Yes (Full-time)", "Yes (Part-time)", "No", "Other – Please specify"] },
      { id: 4, text: "Is your accounting system fully implemented and regularly maintained?", options: ["Yes – fully implemented and regularly maintained", "Implemented but not consistently maintained", "Partially implemented", "No formal accounting system", "Other – Please specify"] },
      { id: 5, text: "Are financial records easily accessible when needed?", options: ["Yes – records are well organised and easily accessible", "Mostly accessible but sometimes require time to locate", "Accessible but not well organised", "Records are often difficult to locate when needed", "Other – Please specify"] },
    ],
  },
  {
    id: 2,
    title: "Financial Records & Accounting Structure",
    questions: [
      { id: 6, text: "How frequently are bank accounts reconciled?", options: ["Monthly", "Quarterly", "Occasionally when required", "Rarely or never", "Other – Please specify"] },
      { id: 7, text: "How up-to-date are your accounting records?", options: ["Fully up to date", "Slightly behind but manageable", "Several months behind", "Significantly behind or unclear", "Other – Please specify"] },
    ],
  },
  {
    id: 3,
    title: "Receivables & Credit Control",
    questions: [
      { id: 8, text: "Do you have a documented credit control policy?", options: ["Yes – documented and actively applied", "Informal process followed internally", "No formal credit control policy", "Other – Please specify"] },
      { id: 9, text: "How are customer invoices currently monitored and collected?", options: ["Structured credit control system with regular follow-ups", "Follow-ups occur but not consistently", "Follow-ups occur only when payments delay", "No structured follow-up process exists", "Other – Please specify"] },
      { id: 10, text: "How regularly are customer receivables reconciled?", options: ["Reconciled regularly with accurate and updated debtor balances", "Reconciled periodically but not consistently", "Reconciled occasionally when issues arise", "Rarely or never reconciled", "Other – Please specify"] },
      { id: 11, text: "Do you have clearly defined customer credit terms and limits?", options: ["Yes – credit terms and limits are clearly defined and consistently enforced", "Credit terms exist but enforcement is not always consistent", "Credit terms exist but are often ignored or relaxed", "No formal credit terms or limits are applied", "Other – Please specify"] },
      { id: 12, text: "How often do customers exceed their payment terms?", options: ["Rarely", "Occasionally", "Frequently", "Very frequently", "Other – Please specify"] },
      { id: 13, text: "Do you maintain an updated debtor ageing report?", options: ["Yes – reviewed regularly", "Yes – reviewed occasionally", "Exists but rarely reviewed", "No debtor ageing maintained", "Other – Please specify"] },
    ],
  },
  {
    id: 4,
    title: "Payables & Supplier Management",
    questions: [
      { id: 14, text: "How are supplier payments currently managed?", options: ["Structured approval and payment schedule", "Payments scheduled but occasionally delayed", "Payments made as funds become available", "Payments are largely reactive", "Other – Please specify"] },
      { id: 15, text: "How frequently are supplier accounts reconciled?", options: ["Monthly", "Occasionally", "Rarely", "Never", "Other – Please specify"] },
    ],
  },
  {
    id: 5,
    title: "Tax & Statutory Compliance",
    questions: [
      { id: 16, text: "How are statutory obligations managed?", options: ["All submissions are accurate and on time", "Mostly compliant with occasional delays", "Some submissions are late", "Compliance issues occur regularly", "Other – Please specify"] },
      { id: 17, text: "Have you incurred statutory penalties in the past 12 months?", options: ["No", "Yes (Once)", "Yes (Multiple times)", "Other – Please specify"] },
    ],
  },
  {
    id: 6,
    title: "Financial Reporting & Oversight",
    questions: [
      { id: 18, text: "Do you receive structured monthly management reports?", options: ["Yes – structured monthly management reports are prepared", "Occasionally", "No", "Other – Please specify"] },
      { id: 19, text: "Are annual financial statements prepared and reviewed?", options: ["Yes – prepared and reviewed annually", "Partially prepared but not fully reviewed", "No", "Other – Please specify"] },
      { id: 20, text: "Have your financial records been audit-ready within the past year?", options: ["Yes – records are audit-ready", "Not fully audit-ready", "No", "Other – Please specify"] },
    ],
  },
  {
    id: 7,
    title: "Financial Governance & Authorization Controls",
    questions: [
      { id: 21, text: "Is there a defined signatory or dual-approval structure for payments?", options: ["Yes – structured dual approval system", "Single approver structure", "No defined approval structure", "Other – Please specify"] },
      { id: 22, text: "Is there a formal approval process for payments and significant expenditures?", options: ["Yes – documented and consistently followed", "Informal but generally followed", "No formal approval structure", "Other – Please specify"] },
      { id: 23, text: "Are business funds clearly separated from personal or owner expenses?", options: ["Yes – fully separated", "Mostly separated", "Sometimes mixed", "Often mixed", "Other – Please specify"] },
    ],
  },
  {
    id: 8,
    title: "Cash Flow Management",
    questions: [
      { id: 24, text: "How would you describe your organisation's cash flow management?", options: ["Cash flow is well monitored and predictable", "Generally stable but occasionally tight", "Cash flow fluctuations occur regularly", "Cash flow challenges occur frequently", "Other – Please specify"] },
      { id: 25, text: "Do you prepare cash flow projections or forecasts?", options: ["Yes – regularly", "Occasionally", "Rarely", "Never", "Other – Please specify"] },
    ],
  },
];

function getOptionLabel(questionId, answer) {
  for (const section of sections) {
    const question = section.questions.find((q) => q.id === questionId);
    if (question && answer.length === 1 && "abcde".includes(answer)) {
      const index = answer.charCodeAt(0) - 97;
      return question.options[index] || answer;
    }
  }
  return answer;
}

function generateEmailHtml(submissionId, answers, score, interpretation, sectionScores, clientName, clientEmail, clientPhone, companyName) {
  const ratingColor = getRatingColor(score.rating);

  let questionsHtml = "";
  sections.forEach((section) => {
    questionsHtml += `<h3 style="margin-top: 24px; margin-bottom: 12px; color: #1a1a2e; font-size: 16px;">${section.title}</h3>`;
    section.questions.forEach((question) => {
      const answer = answers[question.id] || "Not answered";
      const answerText = getOptionLabel(question.id, answer);
      questionsHtml += `
        <div style="background: #f9fafb; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px;">
          <p style="margin: 0; color: #1a1a2e; font-weight: 500; font-size: 14px;">
            Q${question.id}. ${question.text}
          </p>
          <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">
            ${escapeHtml(answerText)}
          </p>
        </div>
      `;
    });
  });

  let sectionRowsHtml = "";
  if (sectionScores) {
    Object.entries(sectionScores).forEach(([title, scoreValue]) => {
      sectionRowsHtml += `
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 12px; font-size: 14px;">${escapeHtml(title)}</td>
          <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; font-size: 14px;">${scoreValue}</td>
        </tr>
      `;
    });
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: #f5f5f5;">
  <div style="max-width: 800px; margin: 0 auto; background: white;">
    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; color: white;">
      <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700;">Financial Health Pre-Assessment</h1>
      <p style="margin: 5px 0; opacity: 0.9; font-size: 14px;"><strong>Submission ID:</strong> ${submissionId}</p>
      <p style="margin: 5px 0; opacity: 0.9; font-size: 14px;"><strong>Submitted:</strong> ${formatDate(new Date().toISOString())}</p>
    </div>
    
    <div style="padding: 30px;">
      <!-- User Details Section -->
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h3 style="color: #1a1a2e; font-size: 16px; margin-bottom: 12px;">Contact Information</h3>
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280; width: 140px;"><strong>Name:</strong></td>
            <td style="padding: 6px 0; color: #1a1a2e;">${escapeHtml(clientName)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Email:</strong></td>
            <td style="padding: 6px 0; color: #1a1a2e;">${escapeHtml(clientEmail)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Phone:</strong></td>
            <td style="padding: 6px 0; color: #1a1a2e;">${escapeHtml(clientPhone)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Company:</strong></td>
            <td style="padding: 6px 0; color: #1a1a2e;">${escapeHtml(companyName)}</td>
          </tr>
        </table>
      </div>
      
      <div style="background: ${ratingColor}15; border: 2px solid ${ratingColor}30; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
        <h2 style="margin: 0 0 10px 0; color: ${ratingColor}; font-size: 36px; font-weight: 700;">${score.total} / ${score.max}</h2>
        <p style="margin: 0; color: #1a1a2e; font-size: 18px; font-weight: 600;">${escapeHtml(interpretation)}</p>
      </div>
      
      <h3 style="color: #1a1a2e; font-size: 18px; margin-bottom: 16px;">Section Breakdown</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr>
            <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left; background: #f9fafb; font-size: 14px;">Section</th>
            <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; background: #f9fafb; font-size: 14px;">Score</th>
          </tr>
        </thead>
        <tbody>
          ${sectionRowsHtml}
        </tbody>
      </table>
      
      <h3 style="color: #1a1a2e; font-size: 18px; margin-bottom: 16px;">Detailed Responses</h3>
      ${questionsHtml}
    </div>
    
    <div style="background: #1a1a2e; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0;">CollectTech & Accounting Solutions</p>
      <p style="margin: 5px 0 0 0;">Automated submission from Financial Health Pre-Assessment tool.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { answers, score, interpretation, sectionScores, userDetails } = req.body || {};

  if (!answers || !score || !interpretation) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Extract user details
  const clientName = userDetails?.name || 'Not provided';
  const clientEmail = userDetails?.email || 'Not provided';
  const clientPhone = userDetails?.phone || 'Not provided';
  const companyName = userDetails?.companyName || 'Not provided';

  const submissionId = generateSubmissionId();

  // Create transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || "true") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send email
    const htmlContent = generateEmailHtml(
      submissionId,
      answers,
      { total: score, max: 125 },
      interpretation,
      sectionScores,
      clientName,
      clientEmail,
      clientPhone,
      companyName
    );

    await transporter.sendMail({
      from: `"CollectTech Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVING_EMAIL,
      replyTo: clientEmail || undefined,
      subject: `[Financial Health Assessment] Submission #${submissionId} - Score: ${score}/125`,
      text: `New Financial Health Assessment Submission\n\nSubmission ID: ${submissionId}\nScore: ${score}/125\nRating: ${interpretation}\n\nClient: ${clientName || "Not provided"}\nEmail: ${clientEmail || "Not provided"}\n\nPlease review the detailed responses in the HTML email.`,
      html: htmlContent,
    });

    // Try to log submission to file (non-critical - don't fail if this errors)
    try {
      const submissionsFile = join(process.cwd(), "api", "submissions.json");
      let submissions = [];

      if (existsSync(submissionsFile)) {
        try {
          const fileContent = readFileSync(submissionsFile, "utf-8");
          submissions = JSON.parse(fileContent);
        } catch (e) {
          submissions = [];
        }
      }

      const newSubmission = {
        id: submissionId,
        submittedAt: new Date().toISOString(),
        score,
        interpretation,
        sections: sectionScores || {},
        clientName: clientName || null,
        clientEmail: clientEmail || null,
        clientPhone: clientPhone || null,
        companyName: companyName || null,
        status: "new",
        notes: "",
      };

      submissions.push(newSubmission);
      writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));
    } catch (logError) {
      // Log to console but don't fail the request
      console.error("Failed to log submission:", logError);
    }

    return res.status(200).json({
      success: true,
      submissionId,
      message: "Assessment submitted successfully",
    });
  } catch (e) {
    console.error("Assessment submission error:", e);
    return res.status(500).json({ message: "Failed to submit assessment. Please try again or contact support." });
  }
}
