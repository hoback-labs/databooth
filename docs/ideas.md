# DataBooth Ideas

> "The story your data is dying to tell."

## The Big Insight (November 29, 2025)

**Charts are commodities. Every tool makes charts. That's table stakes.**

DataBooth isn't a chart maker. It's a story writer that happens to use charts as supporting evidence.

What people actually need isn't a trend line - they already know that. It's boring. What they need:

| What They Get Now | What They Actually Need |
|-------------------|------------------------|
| Bar chart showing Q4 revenue | "Revenue grew 23% - here's why that matters and what it signals for Q1" |
| Pie chart of market share | "We're gaining ground in enterprise but losing SMB - here's the strategic implication" |
| Line graph of trends | "This inflection point in March correlates with the pricing change - here's what to do about it" |

**The output isn't a PNG. It's:**
- The headline insight
- The "so what" narrative
- The supporting visual (chart as evidence, not main event)
- The strategic implications
- The talking points for the keynote
- The analogies that make it land
- The trends, the future, what it means
- Recommended actions

As an executive doing keynotes: charts are 30% tops. The dialog, examples, analogies that get people to relate, the rest of the story, the trends, the future, the implications - THAT'S what matters.

---

## Positioning

**The line:**
> "DataBooth doesn't make charts. It writes the story your data is trying to tell - then packages it for whoever needs to hear it."

**Old tagline (deprecated):** "Ugly in, pretty out"
**New direction:** "The story your data is dying to tell."

**Candidates:**
- "From spreadsheets to storylines in minutes"
- "Your data has a story. We help you tell it."
- "Data storytelling for people who present, not program."

---

## Core Concept
Not a chart maker. A story writer that uses charts as supporting evidence.

Think photobooth but for data - walk in messy, walk out with a complete narrative package ready for your audience and medium.

---

## Naming / Branding (Smoldering)

**Current:** DataBooth - descriptive but forgettable, sounds like a kiosk

**The Insight:** Data tells stories. Stories teach lessons. Fables are stories with morals - they help people see truth and act on it.

### Fable Energy (Strong Pull)
- **DataFable** - "Every dataset has a story"
- **Fablecraft** - crafting fables from data
- **DataTeller** - the one who tells your data's story
- **Storyform** - data transformed into story
- **Plotline** - your data's story, visualized

### Transformation Metaphor
- **DataForge** - raw → refined
- **Clarity** - ugly → clear
- **Distill** - complex → simple

### Vibe Check
- "Fable" = warm, approachable, implies narrative and meaning
- "Booth" = transactional, kiosk, forgettable
- "Teller" = human, storyteller, guide

**Gut feel:** Something in the Fable/Teller space. Keep smoldering.

---

## Positioning Notes

**Photobooth Model:**
- Walk in ugly, walk out pretty
- Pay once, leave happy
- No subscription, no commitment
- Transactional, simple

**Story-First Differentiation:**
- Most tools: "Here's 47 chart types, good luck"
- DataBooth: "What's the story?" → work backward
- Audience-aware: "Who's looking at this?" changes the output

**vs. ChatGPT + Code Interpreter:**
- Guided story flow (not just "analyze this")
- Polished output packaging (not just code + charts)
- Non-technical UX (no prompting skill required)

---

## Ideas Backlog

*Capture raw ideas here - no filtering, just dump*

- MRR model later (subscription for teams, agencies)
- Connect to data sources beyond CSV (Google Sheets, Airtable, databases)
- Template library (pitch deck, nonprofit impact report, sales dashboard)
- White-label for agencies

---

### Tiered Visualization Quality (Credit Upsell)

**The Problem:** Recharts is functional but forgettable. "Honda Civic of dataviz."

**The Opportunity:** Offer premium viz as credit upsell.

| Tier | Credits | Library | Vibe |
|------|---------|---------|------|
| Standard | 1 | Recharts | Gets the job done, basic charts |
| Pro | +1 (2 total) | **Nivo** | Polished, animated, better defaults |
| Premium | +3 (4 total) | **D3 custom templates** | Storytelling layouts, infographic-style |

**Libraries to evaluate:**
- **Nivo** (https://nivo.rocks) - Built on D3, gorgeous defaults, motion built-in, React-friendly
- **Visx** (https://airbnb.io/visx) - Airbnb's D3 + React primitives. More control, beautiful results
- **Observable Plot** - Mike Bostock's (D3 creator) clean, modern library
- **ECharts** (Apache) - Extremely powerful, great for complex dashboards

**Premium tier unlock = presentation-ready outputs:**
- Branded color schemes
- Title/subtitle/annotation placement
- Export as high-res PNG/SVG for decks
- Animated GIFs for social

**Status:** Parked. Evaluate after core flow is solid.

---

### Missing from Leniolabs Original (Port to v2)

**1. Conversational AI Refinement**
- Original had chat-style interaction with the AI after initial generation
- User could ask follow-up questions: "Make the bars horizontal" / "Add a trend line" / "Focus on Q4"
- Need to verify this was real functionality vs demo theater
- Implementation: Vercel AI SDK `useChat` hook, maintain conversation context

**2. Real-time Display Controls**
- Original had toolbar at top of output panel
- Let user tweak viz without regenerating: color scheme, chart type, labels on/off
- Quick iteration without burning credits
- Implementation: Local state controls that modify chart props, not new AI calls

**Status:** Flag for CTO to investigate original codebase and port what's real.

---

### SPOK/CTO Ideas to Explore

**1. "Before/After" Showcase**
- Show ugly CSV on left, beautiful viz on right
- Visceral proof of value - instant "I need this" reaction
- Use on landing page, social proof, testimonials
- Could animate the transformation for extra punch

**2. Shareable Output Links**
- Generate unique URL for each dashboard
- User can share without downloading
- "Made with DataBooth" watermark on free tier (removable on paid)
- Adds virality - every share is marketing

**3. Dataset Templates for Cold Start**
- "Don't have data? Try these"
- Pre-loaded sample datasets (sales, survey, fitness, budget, etc.)
- Let people experience the magic before uploading their own
- Reduces friction to first "aha" moment

**4. Audience Presets**
- Instead of freeform "who's the audience?", offer presets:
  - Executive (high-level, KPIs only)
  - Technical (detailed, show the math)
  - Client (polished, branded feel)
  - Board (quarterly metrics, trends)
  - Social Media (bold, simple, shareable)
- Each triggers different viz density/complexity/styling

**5. "Surprise Me" Mode**
- Zero input from user
- AI analyzes data and picks the most interesting story
- Low friction, high delight
- Great for users who don't know what they want

---

### BYOAI (Bring Your Own AI) - Phase 4+

**Concept:** Let power users bring their own API key (OpenAI, Anthropic, etc.) and pay a lower platform fee instead of our markup.

| Tier | User Provides | They Pay | We Make |
|------|---------------|----------|---------|
| Standard | Nothing | $2/dashboard | ~$1.90 margin |
| BYOAI | Their API key | $0.50/dashboard | $0.50 pure margin |

**Why it works:**
- Power users want control over model choice
- We still provide value (prompts, viz, UX, output packaging)
- Lower price = lower barrier for developers
- Zero AI cost to us on BYOAI tier
- Aligns with Vercel AI SDK multi-provider capability

**Credit math option:** 1 credit = $1 value. Standard = 2 credits, BYOAI = 0.5 credits.

**Status:** Parked for Phase 4. Get basic payments working first.

---

## Parked Ideas

*Ideas we're not pursuing now but might revisit*

---

## Future Exploration (Post-MVP)

Lenio has related tools worth revisiting after MVP is solid:

| Tool | What It Does | Potential Use | Location |
|------|--------------|---------------|----------|
| **jsongraph-builder** | Conversational graph builder via LangGraph + React Flow | Visual workflow as output format | `/code/jsongraph-builder-develop` |
| **promptwizard** | Prompt evaluation/optimization library | Improve AI response quality | `/code/promptwizard-main` |

**Not relevant:**
- `lenio-research-main` - Their blog/marketing site boilerplate
- `soccer-json-db-main` - Demo data for a Messi goals viz

**Rule:** These are POST-MVP. Do not scope into modernization.

---
