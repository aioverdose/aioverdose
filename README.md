# AI Search Readiness Audit Tool

A production-ready Next.js application that analyzes web pages for compatibility with AI search systems (ChatGPT, Perplexity, Google AI Overviews, Gemini) and provides actionable recommendations for improvement.

## Features

### 📊 Comprehensive Analysis
Analyzes 6 critical categories with 50+ automated checks:

1. **Structure & Hierarchy** (20% weight)
   - H1 tag validation
   - Logical heading flow (H2→H3)
   - Section length optimization
   - Table of contents detection

2. **Schema Markup** (20% weight)
   - JSON-LD validation
   - Article/NewsArticle/BlogPosting schemas
   - FAQ schema detection
   - HowTo schema support
   - Organization/Person schema
   - BreadcrumbList detection

3. **Content Extractability** (20% weight)
   - First paragraph analysis (ideal: 40-60 words)
   - Summary block detection
   - Bullet point usage
   - Bold key term highlighting
   - Paragraph length optimization

4. **FAQ & Q&A Blocks** (15% weight)
   - FAQ section detection
   - Question-answer pair extraction
   - Natural question phrasing
   - Answer length validation
   - FAQPage schema implementation

5. **Trust & Authority Signals** (15% weight)
   - Author credentials
   - Publication/update dates
   - External citations
   - Authority link detection
   - E-E-A-T signal validation

6. **Technical Readability** (10% weight)
   - Meta description (120-160 chars)
   - Open Graph tags
   - Page title optimization
   - Canonical URL
   - Image alt text coverage
   - Internal/external links
   - Mobile viewport tag
   - HTTPS/SSL validation

### 🎯 AI Readiness Scoring
- **A (90-100)**: AI systems will likely cite this page
- **B (70-89)**: Good foundation, minor improvements needed
- **C (50-69)**: Mixed signals, significant gaps
- **D (30-49)**: Poor AI readiness
- **F (0-29)**: Not AI-readable

### 🚀 User Experience
- **Instant Analysis**: Real-time scanning and scoring
- **Two Input Methods**: URL analysis or HTML paste
- **Interactive Dashboard**: Expandable category cards
- **Prioritized Recommendations**: Quick wins, high-impact, long-term
- **Export & Share**: Copy, PDF, Twitter, LinkedIn
- **Dark Mode Support**: Theme switcher included
- **Responsive Design**: Mobile-optimized interface

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **HTML Parsing**: Cheerio (server-side), node-html-parser (fallback)
- **SEO**: next-seo
- **Icons**: Lucide React

## Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Usage

### Access the Application

1. **Home Page**: http://localhost:3000
2. **Audit Tool**: http://localhost:3000/tools/audit

### Analyze a Page

**Method 1: URL Analysis**
1. Enter a website URL in the "URL Audit" tab
2. Click "Analyze Page"
3. Wait for real-time analysis (2-5 seconds)
4. Review your AI Readiness score and recommendations

**Method 2: Paste HTML** (useful for local testing or CORS issues)
1. Switch to the "Paste HTML" tab
2. Paste raw HTML content
3. Click "Analyze Page"
4. View results immediately

### Understand Your Report

**Overall Score**
- Large circular indicator showing 0-100 score
- Color-coded: green (80+), yellow (50-79), red (0-49)
- Grade letter (A-F) for quick reference

**Category Cards**
- Click to expand detailed check results
- Pass/fail indicators for each check
- Specific improvement recommendations
- Current vs. ideal values shown

**Action Plan**
- Prioritized list of 15 top improvement opportunities
- Filter by: All, Quick Wins (<10 min), High Impact, Long Term
- Estimated time to fix each item
- Impact level (High/Medium/Low)

**Export & Share**
- Copy summary to clipboard
- Share on Twitter/LinkedIn
- PDF report option (coming soon)

## API Endpoints

### POST /api/audit
Analyze a webpage or HTML content.

**Request:**
```json
{
  "url": "https://example.com",
  // OR
  "html": "<html>...</html>"
}
```

**Response:**
```json
{
  "id": "audit-id",
  "url": "https://example.com",
  "timestamp": "2026-04-29T...",
  "overallScore": 75,
  "grade": "B",
  "categories": {
    "structure": { "score": 80, "checks": [...], "recommendations": [...] },
    "schema": { "score": 65, ... },
    "content": { "score": 75, ... },
    "faq": { "score": 70, ... },
    "trust": { "score": 85, ... },
    "technical": { "score": 90, ... }
  },
  "actionPlan": [
    {
      "id": "action-1",
      "title": "Add FAQPage schema to FAQ section",
      "category": "Schema",
      "estimatedTime": "5-10 min",
      "impact": "high",
      "completed": false
    }
  ],
  "metadata": {
    "title": "Example Page",
    "wordCount": 1200,
    "readingTime": 6,
    "fetchStatus": "success"
  }
}
```

## Project Structure

```
app/
├── tools/audit/
│   ├── page.tsx              # Main audit dashboard
│   └── layout.tsx
├── api/
│   └── audit/
│       └── route.ts          # Audit analysis endpoint
├── layout.tsx                # Root layout
└── page.tsx                  # Home page

components/audit/
├── AuditForm.tsx             # URL/HTML input
├── ScoreCircle.tsx           # Animated score display
├── CategoryCard.tsx          # Expandable check results
├── CheckItem.tsx             # Individual check display
├── ActionPlan.tsx            # Prioritized todo list
├── LoadingScanner.tsx        # Analysis animation
├── ErrorState.tsx            # Error handling
├── ExportMenu.tsx            # Share/export options
└── ReportHeader.tsx          # Metadata summary

lib/audit/
├── analyzer.ts               # Main orchestrator
├── scoring.ts                # Weighted scoring
└── checks/
    ├── structure.ts          # Structure & Hierarchy checks
    ├── schema.ts             # Schema Markup checks
    ├── content.ts            # Content Extractability checks
    ├── faq.ts                # FAQ & Q&A checks
    ├── trust.ts              # Trust & Authority checks
    └── technical.ts          # Technical Readiness checks

types/
└── audit.ts                  # TypeScript interfaces

public/                        # Static assets
```

## Key Features Explained

### Smart Caching
- Analysis results cached for 1 hour
- GET `/api/audit?url=example.com` retrieves cached results
- Reduces API calls and improves performance

### Error Handling
- CORS issues: Suggests HTML paste fallback
- Timeouts: 10-second limit per page
- JavaScript-heavy sites: Graceful degradation with note
- Large pages: Auto-truncate at 1MB

### Scoring Algorithm
Each category receives a score (0-100) based on weighted check results:
- **Critical**: 3x weight (major SEO/AI factors)
- **Important**: 2x weight (content quality)
- **Suggestion**: 1x weight (nice-to-have)

Overall score = weighted average of all categories

### AI System Considerations
The tool evaluates content readiness for:
- **ChatGPT**: Content extraction, source attribution
- **Perplexity**: FAQ extraction, schema markup
- **Google AI Overviews**: E-E-A-T signals, article structure
- **Gemini**: Schema compliance, content freshness

## Performance

- **Page Analysis**: 2-5 seconds (depends on page size)
- **Score Calculation**: <100ms
- **Frontend Load**: <1 second (optimized bundle)
- **Cache Hit**: Instant (memory-cached)

## Best Practices for AI Readiness

1. **Structure First**
   - One H1 per page
   - Clear H2/H3 hierarchy
   - 3-5 main sections

2. **Schema Everything**
   - Always use Article schema
   - FAQ schema for Q&A sections
   - Organization schema in footer

3. **Content Optimization**
   - 40-60 word summary after H1
   - 150-300 words per section
   - Bold key terms (5+ per page)

4. **Trust Signals**
   - Author name + credentials
   - Publication date + update date
   - 3+ external citations
   - Links to .edu, .gov, .org

5. **Technical Excellence**
   - Meta description: 120-160 chars
   - Image alt text: 100% coverage
   - Mobile viewport: Always present
   - Canonical URL: If duplicates exist

## Troubleshooting

### "CORS Error" or "Cannot fetch URL"
- Switch to the "Paste HTML" tab
- Copy/paste the page source directly
- Local pages and auth-required pages work better this way

### "Low schema score" despite having markup
- Ensure JSON-LD is in `<script type="application/ld+json">`
- Validate syntax at [schema.org](https://schema.org)
- Use Google's [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

### "Content extractability low"
- Expand first paragraph to 40-60 words
- Add bold tags around key terms
- Use bullet points for lists
- Break up long sections (150-300 word ideal)

## Future Enhancements

- [ ] PDF report generation
- [ ] Batch URL analysis
- [ ] Historical score tracking
- [ ] A/B comparison mode
- [ ] Custom scoring weights
- [ ] Integration with Google Search Console
- [ ] Real-time monitoring dashboard
- [ ] Team collaboration features
- [ ] API key for programmatic access
- [ ] Chrome extension

## License

MIT License - Feel free to use, modify, and distribute.

## Contributing

Contributions are welcome! Please submit issues and pull requests to improve the tool.

## Support

For questions or issues, please contact: support@ai-search-audit.com

---

**Built with ❤️ to help creators optimize for AI search systems**
