# Financial Health Pre-Assessment - Technical Specification

## 1. Project Overview

**Project Name:** Business Financial Health Pre-Assessment  
**Type:** Multi-step interactive form/webapp  
**Core Functionality:** A professional Google Forms-style assessment that evaluates business financial controls, governance practices, and cash flow discipline across 25 questions organized in 8 sections.  
**Target Users:** Business owners, financial managers, and executives seeking to evaluate their company's financial health.

---

## 2. UI/UX Specification

### 2.1 Layout Structure

**Page Sections:**
- **Header:** Compact navigation bar with logo, assessment title, and progress indicator
- **Hero/Intro:** Brief assessment description with time estimate and confidentiality notice
- **Main Content:** Multi-step form with questions organized by sections
- **Footer:** Navigation controls (Previous/Next), section indicator, and submit button

**Responsive Breakpoints:**
- Mobile: < 640px (single column, stacked layout)
- Tablet: 640px - 1024px (comfortable padding, side-by-side options)
- Desktop: > 1024px (centered content, max-width 800px for form)

### 2.2 Visual Design

**Color Palette:**
- Primary: `#1a1a2e` (deep navy - background)
- Secondary: `#16213e` (dark blue - cards)
- Accent: `#d4af37` (gold - CTAs, progress)
- Success: `#22c55e` (green - completed sections)
- Warning: `#f59e0b` (amber - partial progress)
- Text Primary: `#f8fafc` (off-white)
- Text Secondary: `#94a3b8` (slate gray)
- Border: `#334155` (slate-700)

**Typography:**
- Headings: Playfair Display (serif) - elegant, professional
- Body: Inter (sans-serif) - clean, readable
- Section titles: 24px/1.5rem, font-bold
- Question text: 16px/1rem, font-medium
- Option text: 14px/0.875rem, font-normal
- Helper text: 12px/0.75rem, font-light

**Spacing System:**
- Section padding: 32px (mobile: 24px)
- Question spacing: 24px between questions
- Option spacing: 12px between options
- Card padding: 24px
- Border radius: 12px (cards), 8px (buttons/inputs)

**Visual Effects:**
- Card shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.3)`
- Progress bar gradient: gold linear gradient
- Hover states: subtle scale(1.02) with transition
- Focus rings: 2px gold outline with 2px offset
- Page transitions: fade-in 300ms ease

### 2.3 Components

**1. AssessmentHeader**
- Logo (left-aligned)
- Assessment title "Financial Health Pre-Assessment"
- Overall progress bar (thin, 4px height)
- Estimated time remaining badge

**2. SectionNavigator**
- Vertical stepper showing all sections
- Current section highlighted with gold accent
- Completed sections show checkmark
- Click to navigate (if previous sections complete)

**3. QuestionCard**
- Question number and text
- Required indicator (*)
- Answer options (radio buttons or text input)
- "Other" option with text field when applicable

**4. ProgressBar**
- Section progress (X of Y questions)
- Visual progress fill
- Percentage label

**5. NavigationControls**
- Previous button (disabled on first section)
- Next button (becomes Submit on last section)
- Save & Continue Later link

**6. ResultsSummary**
- Total score display (large, centered)
- Score interpretation (Healthy/Monitoring/Attention Required)
- Category breakdown by section
- Recommendation based on score range

**7. ConsultationCTA**
- "Request Structured Consultation" button
- Brief value proposition
- Links to contact form

### 2.4 Component States

**Question Options:**
- Default: border-slate-700, bg-transparent
- Hover: border-slate-500, bg-slate-800/50
- Selected: border-gold, bg-gold/10, gold checkmark
- Disabled: opacity-50, cursor-not-allowed

**Navigation Buttons:**
- Default: gold gradient background
- Hover: opacity-90, slight scale
- Disabled: opacity-50, cursor-not-allowed
- Loading: spinner icon, disabled state

**Progress Indicators:**
- Complete: green checkmark
- Current: gold fill with pulse animation
- Pending: gray outline

---

## 3. Functionality Specification

### 3.1 Core Features

**Multi-Step Form Navigation:**
- Questions displayed one section at a time (not one at a time - better UX for 25 questions)
- Smooth transitions between sections
- Keyboard navigation (Enter to proceed, Shift+Enter for previous)
- URL hash updates for each section (#section-1, #section-2, etc.)

**Progress Tracking:**
- Overall progress bar (percentage complete)
- Per-section progress indicators
- Questions answered count
- Time spent tracking (optional display)

**Auto-Save:**
- Save to localStorage on every answer change
- Restore progress on page reload
- Clear data on successful submission
- "Resume Assessment" prompt if saved data exists

**Validation:**
- Require all questions to be answered before submit
- Visual validation errors for required fields
- Prevent navigation to next section if current incomplete

**Scoring System:**
- Each answer scored: a=1, b=2, c=3, d=4, e=5
- Total score range: 25-125 points
- Score interpretation:
  - 25-40: Excellent (Healthy)
  - 41-60: Good (Minor Improvements)
  - 61-80: Fair (Monitoring Needed)
  - 81-100: Poor (Attention Required)
  - 101-125: Critical (Immediate Action)

### 3.2 User Interactions and Flows

**Initial Load:**
1. Check localStorage for saved progress
2. If saved: Show "Resume Assessment?" modal
3. If not: Start fresh with intro screen

**Answering Questions:**
1. User clicks option or types in text field
2. Answer saved immediately to state and localStorage
3. Visual confirmation of selection
4. Auto-advance option (configurable)

**Navigation:**
1. Click "Next" to proceed (validates current section)
2. Click section in stepper to jump (if allowed)
3. Keyboard shortcuts (Arrow keys, Enter)

**Submission:**
1. Review all answers on final section
2. Click "Submit Assessment"
3. Show confirmation dialog
4. Send email with formatted results
5. Calculate score and display results summary
6. Clear localStorage
7. Offer consultation request

### 3.3 Data Handling

**Form Data Structure:**
```typescript
interface AssessmentData {
  answers: Record<number, string>; // questionId -> answer
  startedAt: string; // ISO timestamp
  lastUpdatedAt: string; // ISO timestamp
  timeSpent: number; // seconds
  completedSections: number[];
  currentSection: number;
}
```

**API Submission:**
```typescript
interface AssessmentSubmission {
  answers: Record<number, string>;
  score: number;
  interpretation: string;
  submittedAt: string;
  clientEmail?: string; // optional, for consultation follow-up
  clientName?: string; // optional
}
```

**localStorage Key:** `financial-health-assessment`

### 3.4 Edge Cases

- Browser refresh during assessment: Restore from localStorage
- Network failure on submit: Queue for retry, show error
- Invalid saved data: Clear and restart
- User closes browser mid-assessment: Resume prompt on return
- Very slow network: Optimistic UI updates

---

## 4. Section & Question Structure

### Section 1: Business & Operational Structure (Questions 1-5)
1. Business operating duration
2. Organisation size
3. Dedicated finance resource
4. Accounting system implementation
5. Financial records accessibility

### Section 2: Financial Records & Accounting Structure (Questions 6-7)
6. Bank reconciliation frequency
7. Accounting records currency

### Section 3: Receivables & Credit Control (Questions 8-13)
8. Credit control policy documentation
9. Invoice monitoring and collection
10. Receivables reconciliation
11. Customer credit terms
12. Payment term violations frequency
13. Debtor ageing report maintenance

### Section 4: Payables & Supplier Management (Questions 14-15)
14. Supplier payment management
15. Supplier accounts reconciliation

### Section 5: Tax & Statutory Compliance (Questions 16-17)
16. Statutory obligations management
17. Recent statutory penalties

### Section 6: Financial Reporting & Oversight (Questions 18-20)
18. Monthly management reports
19. Annual financial statements
20. Audit readiness

### Section 7: Financial Governance & Authorization Controls (Questions 21-23)
21. Signatory/dual-approval structure
22. Payment approval process
23. Business/personal funds separation

### Section 8: Cash Flow Management (Questions 24-25)
24. Cash flow management description
25. Cash flow projections/forecasts

---

## 5. Email & PDF Submission System

### 5.1 Submission Flow

1. User completes assessment and clicks Submit
2. System calculates score and generates interpretation
3. System generates unique Submission ID (format: `FH-YYYYMMDD-XXXX`)
4. API endpoint sends formatted HTML email to `RECEIVING_EMAIL`
5. Confirmation shown to user with submission ID
6. localStorage cleared
7. Submission logged to `submissions.json` for tracking

### 5.2 Email Format

**Subject Line:** `[Financial Health Assessment] Submission #FH-20260315-0001 - Score: 65/125`

**Email Body (Professional HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; color: white; }
    .header h1 { margin: 0 0 10px 0; font-size: 24px; }
    .header p { margin: 5px 0; opacity: 0.9; }
    .content { padding: 30px; background: white; }
    .score-card { background: linear-gradient(135deg, #d4af37 0%, #f5d76e 100%); padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px; }
    .score-card h2 { margin: 0 0 10px 0; color: #1a1a2e; font-size: 32px; }
    .score-card p { margin: 0; color: #1a1a2e; font-weight: 600; }
    .section-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .section-table th, .section-table td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
    .section-table th { background: #f9fafb; font-weight: 600; }
    .question-block { margin-bottom: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; }
    .question-block strong { color: #1a1a2e; }
    .question-block p { margin: 5px 0 0 0; color: #6b7280; }
    .footer { background: #1a1a2e; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; }
    .rating-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .rating-healthy { background: #d1fae5; color: #065f46; }
    .rating-monitor { background: #fef3c7; color: #92400e; }
    .rating-attention { background: #fee2e2; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Financial Health Pre-Assessment</h1>
      <p><strong>Submission ID:</strong> FH-20260315-0001</p>
      <p><strong>Submitted:</strong> March 15, 2026</p>
    </div>
    
    <div class="content">
      <div class="score-card">
        <h2>65 / 125</h2>
        <p>Rating: Fair - Monitoring Needed</p>
      </div>
      
      <h3>Section Breakdown</h3>
      <table class="section-table">
        <tr>
          <th>Section</th>
          <th style="text-align: center;">Score</th>
          <th>Rating</th>
        </tr>
        <tr>
          <td>Business & Operational Structure</td>
          <td style="text-align: center;">12/25</td>
          <td><span class="rating-badge rating-monitor">Fair</span></td>
        </tr>
        <!-- More sections... -->
      </table>
      
      <h3>Detailed Responses</h3>
      
      <h4>Section 1: Business & Operational Structure</h4>
      <div class="question-block">
        <strong>Q1. How long has your business been operating?</strong>
        <p>c) 3–5 years</p>
      </div>
      <!-- More questions... -->
    </div>
    
    <div class="footer">
      <p>CollectTech & Accounting Solutions</p>
      <p>This is an automated submission from the Financial Health Pre-Assessment tool.</p>
    </div>
  </div>
</body>
</html>
```

### 5.3 Submission Tracking System

**Submission ID Format:** `FH-YYYYMMDD-XXXX`
- `FH`: Fixed prefix for Financial Health
- `YYYYMMDD`: Date of submission
- `XXXX`: Sequential 4-digit number (padded with zeros)

**Submission Log File:** `api/submissions.json`
```json
[
  {
    "id": "FH-20260315-0001",
    "submittedAt": "2026-03-15T10:30:00Z",
    "score": 65,
    "interpretation": "Fair - Monitoring Needed",
    "sections": {
      "businessStructure": 12,
      "financialRecords": 8,
      "receivables": 18,
      "payables": 6,
      "taxCompliance": 6,
      "reporting": 7,
      "governance": 5,
      "cashFlow": 3
    },
    "clientEmail": null,
    "clientName": null,
    "status": "new",
    "notes": ""
  }
]
```

**Status Values:**
- `new` - Newly submitted, requires review
- `contacted` - Initial contact made
- `pending` - Awaiting client response
- `converted` - Client engaged services
- `closed` - No further action needed

### 5.4 API Endpoint

**Endpoint:** `POST /api/assessment`

**Request:**
```typescript
{
  answers: Record<number, string>,  // e.g., { "1": "c", "2": "b", ... }
  score: number,                      // 25-125
  interpretation: string,            // "Fair - Monitoring Needed"
  sectionScores: {
    businessStructure: number,
    financialRecords: number,
    receivables: number,
    payables: number,
    taxCompliance: number,
    reporting: number,
    governance: number,
    cashFlow: number
  },
  clientEmail?: string,   // optional - for follow-up
  clientName?: string     // optional
}
```

**Success Response:**
```typescript
{
  success: true,
  submissionId: "FH-20260315-0001",
  message: "Assessment submitted successfully"
}
```

**Error Response:**
```typescript
{
  success: false,
  message: "Failed to submit assessment. Please try again."
}
```

---

## 6. Technical Architecture

### File Structure
```
src/
├── components/
│   ├── assessment/
│   │   ├── AssessmentContainer.tsx    # Main form wrapper
│   │   ├── AssessmentHeader.tsx     # Header with progress
│   │   ├── AssessmentIntro.tsx      # Welcome/intro screen
│   │   ├── SectionNavigator.tsx      # Section stepper
│   │   ├── QuestionCard.tsx          # Question container
│   │   ├── RadioQuestion.tsx          # Radio button question
│   │   ├── TextQuestion.tsx           # Text input question
│   │   ├── ProgressBar.tsx           # Progress indicator
│   │   ├── NavigationControls.tsx    # Prev/Next/Submit
│   │   ├── ResultsSummary.tsx         # Score display
│   │   ├── ConsultationCTA.tsx       # Request consultation
│   │   ├── ResumeDialog.tsx          # Resume prompt
│   │   └── ConfirmationDialog.tsx     # Submit confirmation
│   └── ui/ (existing components)
├── hooks/
│   ├── useAssessment.ts              # Form state management
│   └── useAssessmentStorage.ts       # localStorage persistence
├── lib/
│   ├── assessment-data.ts            # Questions & sections data
│   ├── scoring.ts                    # Score calculation
│   ├── validation.ts                 # Form validation
│   └── email-template.ts              # HTML email template
├── types/
│   └── assessment.ts                 # TypeScript interfaces
├── pages/
│   └── Assessment.tsx               # Assessment page route
└── App.tsx (update routes)

api/
├── contact.js                        # Existing contact endpoint
├── assessment.js                     # NEW: Assessment submission
└── submissions.json                  # NEW: Submission tracking log
```

### Dependencies (All Already Installed)
- React Hook Form - form state management
- Zod - validation schema
- Framer Motion - animations/transitions
- localStorage API - persistence
- React Router - navigation
- nodemailer - email sending (already installed)

---

## 7. Accessibility Requirements

- WCAG 2.1 AA compliance
- Full keyboard navigation (Tab, Enter, Arrow keys)
- ARIA labels on all interactive elements
- Focus management between sections
- Screen reader announcements for progress
- High contrast support
- Reduced motion option via `prefers-reduced-motion`

---

## 8. Mobile Considerations

- Touch-friendly tap targets (minimum 44px height)
- Stacked radio buttons on mobile (not side-by-side)
- Collapsible section navigator on mobile (hamburger menu)
- Large progress indicator visible at all times
- Swipe gestures for section navigation (optional)
- Offline-capable after initial load
- Responsive typography scaling
