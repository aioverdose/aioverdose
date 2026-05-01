# Admin Dashboard Implementation Roadmap

## ✅ COMPLETED (Phases 1-5)

### Phase 1: Auth System
- [x] `lib/admin-auth.ts` — Session management with iron-session
- [x] `app/api/admin/auth/route.ts` — Login/logout endpoints
- [x] `middleware.ts` — Route protection
- [x] `app/admin/login/page.tsx` — Login UI

### Phase 2: Admin Shell
- [x] `components/admin/Sidebar.tsx` — Navigation
- [x] `components/admin/StatsCard.tsx` — Stat cards
- [x] `app/admin/layout.tsx` — Admin wrapper layout
- [x] `app/admin/page.tsx` — Dashboard with stats

### Data Files Seeded
- [x] `data/guides.json` — Guide content storage
- [x] `data/submissions.json` — Contact form inbox
- [x] `data/site-content.json` — Hero, FAQs, CTA copy
- [x] `data/audit-config.json` — Audit weights and thresholds

### CMS: Guides API
- [x] `app/api/admin/guides/route.ts` — GET list, POST create
- [x] `app/admin/cms/guides/page.tsx` — Guide list UI with delete

### Phase 3: CMS Guides
- [x] `app/api/admin/guides/[slug]/route.ts` — GET/PUT/DELETE single guide
- [x] `components/admin/GuideEditor.tsx` — SimpleMDE markdown editor with preview
- [x] `app/admin/cms/guides/new/page.tsx` — Create new guide form
- [x] `app/admin/cms/guides/[slug]/page.tsx` — Edit guide form

### Phase 4: CMS Site Content, Audit Config, Submissions
- [x] `app/api/admin/content/route.ts` — GET/PUT site-content.json
- [x] `app/admin/cms/content/page.tsx` — Form editor for site copy
- [x] `app/api/admin/audit-config/route.ts` — GET/PUT audit-config.json
- [x] `components/admin/WeightSlider.tsx` — Slider component
- [x] `app/admin/cms/audit-config/page.tsx` — Weight sliders and thresholds
- [x] `app/api/admin/submissions/route.ts` — GET/PATCH/DELETE submissions
- [x] `components/admin/SubmissionRow.tsx` — Single submission row
- [x] `app/admin/cms/submissions/page.tsx` — Inbox UI
- [x] `app/admin/cms/page.tsx` — CMS landing with card links

### Phase 5: Development Agent
- [x] `lib/github.ts` — Octokit wrapper for GitHub API
- [x] `lib/claude.ts` — Anthropic SDK wrapper with system prompt
- [x] `app/api/admin/dev-agent/chat/route.ts` — Claude integration
- [x] `app/api/admin/dev-agent/apply/route.ts` — GitHub commit endpoint
- [x] `components/admin/ChatMessage.tsx` — User/agent message bubble
- [x] `components/admin/DiffViewer.tsx` — File diff viewer
- [x] `app/admin/dev-agent/page.tsx` — Full chat + diff interface

---

## 🔑 Environment Variables Checklist

```bash
# Authentication
ADMIN_PASSWORD=your-secret-password
ADMIN_SESSION_SECRET=32-character-random-string

# Dev Agent - OpenRouter API
OPENROUTER_API_KEY=sk-or-...

# GitHub API
GITHUB_TOKEN=ghp_...
GITHUB_REPO_OWNER=aioverdose
GITHUB_REPO_NAME=aioverdose
```

---

## 🚀 Testing Checklist

### Auth System
- [ ] Visit `/admin` → redirected to `/admin/login`
- [ ] Enter wrong password → error shown
- [ ] Enter correct password → redirected to `/admin`
- [ ] Dashboard loads with stats
- [ ] Click logout → redirected to `/admin/login`

### CMS: Guides
- [ ] Navigate to `/admin/cms/guides` → see existing guides
- [ ] Click "New Guide" → create form opens
- [ ] Write markdown in editor → preview updates live
- [ ] Save guide → appears in list
- [ ] Click edit → form populates with guide data
- [ ] Update guide → changes saved
- [ ] Toggle publish → status changes
- [ ] Delete guide → confirm dialog → removed from list

### CMS: Content
- [ ] Navigate to `/admin/cms/content`
- [ ] Edit hero title → changes appear in form
- [ ] Add FAQ → new row appears
- [ ] Delete FAQ → confirm → removed
- [ ] Save → changes committed to GitHub → Vercel redeploys

### CMS: Audit Config
- [ ] Navigate to `/admin/cms/audit-config`
- [ ] Adjust weight sliders → sum to 100% enforced
- [ ] Toggle checks → persists
- [ ] Save → changes committed

### CMS: Submissions
- [ ] Navigate to `/admin/cms/submissions`
- [ ] See contact form entries (from website submissions)
- [ ] Mark as read → status changes
- [ ] Click reply → mailto link opens
- [ ] Delete → confirm → removed

### Dev Agent
- [ ] Navigate to `/admin/dev-agent`
- [ ] Type: "Add a dark mode toggle to the homepage"
- [ ] Claude responds with files and explanations
- [ ] View diffs → before/after side-by-side
- [ ] Click "Apply Changes" → commits to GitHub
- [ ] Vercel auto-deploys → live in ~30s

---

## 📊 Data Files Structure

### guides.json
```json
[
  {
    "id": "1",
    "slug": "guide-slug",
    "title": "Guide Title",
    "excerpt": "Short excerpt",
    "author": "Author Name",
    "datePublished": "2026-04-15",
    "dateModified": "2026-04-30",
    "published": true,
    "body": "# Markdown content here..."
  }
]
```

### submissions.json
```json
[
  {
    "id": "1",
    "name": "User Name",
    "email": "user@example.com",
    "message": "Inquiry text",
    "createdAt": "2026-04-30T12:00:00Z",
    "read": false
  }
]
```

### site-content.json
```json
{
  "hero": {
    "title": "...",
    "subtitle": "...",
    "cta": "..."
  },
  "faqs": [
    { "question": "...", "answer": "..." }
  ]
}
```

### audit-config.json
```json
{
  "weights": {
    "structure": 0.2,
    "schema": 0.2,
    "content": 0.2,
    "faq": 0.15,
    "trust": 0.15,
    "technical": 0.1
  },
  "thresholds": {
    "pass": 70,
    "warning": 50,
    "fail": 0
  }
}
```

---

## 💡 Implementation Tips

### File Writing on Vercel
**Critical:** Vercel functions are read-only at runtime. To write files:
1. Read from local `data/` dir (bundled into function)
2. Write changes via GitHub API (create commit)
3. GitHub push triggers Vercel rebuild
4. New version of `data/` files gets re-bundled

### Dev Agent System Prompt
Should include:
- Full directory tree (generated at runtime)
- Contents of 10 key files (app/page.tsx, layout.tsx, key components, etc.)
- Instruction to return JSON: `{ explanation: string, files: [{ path, action: 'create'|'update'|'delete', content }] }`
- Note: "Do not modify lib/admin-auth.ts or middleware.ts without permission"

### SimpleMDE Configuration
```tsx
<SimpleMDE
  value={body}
  onChange={setBody}
  options={{
    spellChecker: false,
    autoDownloadFontAwesome: false,
    toolbarButtonClassPrefix: 'mde-button',
  }}
/>
```

---

## ✅ Implementation Complete

All phases are now complete. The admin dashboard includes:
- ✅ Password-protected authentication system
- ✅ Full CMS for managing guides, site content, audit configuration, and form submissions
- ✅ Development agent with Claude integration and GitHub commit support
- ✅ Markdown editor with live preview for guides
- ✅ Dynamic weight sliders for audit configuration
- ✅ Contact form submission inbox with read/unread tracking

**Next steps:**
1. Test all functionality thoroughly (see Testing Checklist below)
2. Configure environment variables (see Environment Variables Checklist below)
3. Deploy to Vercel and verify automatic deployments work
