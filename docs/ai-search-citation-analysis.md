# How AI Search Systems Select and Cite Sources: An Evidence-Based Analysis

## Empirical Foundations of Generative Engine Optimization

**Document Version:** 1.0  
**Date:** May 1, 2026  
**Prepared for:** Empirical analysis of AI search citation criteria

---

## Abstract

This paper synthesizes empirical research, platform documentation, and independent reverse-engineering studies to establish what is scientifically verified versus inferred regarding how AI search systems select and cite web sources. Drawing on academic papers from Princeton University and IIT Delhi, the ACM SIGIR conference, independent analyses of Perplexity's RAG pipeline, Google's documented query fan-out mechanism, and large-scale citation studies from Ahrefs and Originality.ai, we present the first comprehensive evidence-based framework for understanding AI search citation behavior.

**Key finding:** AI search citation is not a black box. Multiple independent research streams have converged on consistent signals: structural clarity, semantic precision, topical authority, freshness, and trust verification. However, significant gaps remain in our understanding of proprietary systems like ChatGPT Browse and Gemini native search.

---

## 1. Introduction: The Shift from Ranking to Citation

Traditional search engine optimization (SEO) optimizes for position in ranked lists. Generative Engine Optimization (GEO) optimizes for inclusion in synthesized answers where the source is cited but the user may never visit the page.

This shift creates a fundamental problem: practitioners are optimizing for systems whose selection criteria are largely opaque. This paper addresses that opacity by cataloging what is empirically verified versus what remains speculative.

---

## 2. Verified Mechanisms: What We Know with Confidence

### 2.1 Perplexity AI: The Best-Documented RAG Pipeline

Perplexity AI has the most thoroughly reverse-engineered citation system, documented through independent technical analysis, academic RAG architecture studies, and platform-released embedding models.

#### 2.1.1 Six-Stage Pipeline Architecture

Perplexity's answer generation follows a sequential pipeline where each stage filters the candidate source pool before passing results downstream:

1. **Query Intent Parsing** — Classifies query type (factual, procedural, comparative, multi-part) and routes to appropriate index (trending vs. evergreen)
2. **Embedding-Based Indexing** — Converts queries and web pages into numerical representations using custom pplx-embed models
3. **Multi-Method Retrieval** — Pulls candidates using BM25 (keyword), dense (semantic), and hybrid retrieval simultaneously
4. **Multi-Layer ML Ranking (L1–L3)** — Scores and filters through three reranking layers with a ~0.7 quality threshold
5. **Structured Prompt Assembly** — Embeds citation markers, source metadata, and ranked excerpts directly into the prompt before LLM generation
6. **Constrained LLM Synthesis** — The language model generates prose bound by pre-assembled evidence

**Critical implication:** Retrieval quality is the primary bottleneck, not LLM capability. If a relevant source doesn't survive embedding, retrieval, and ranking stages, no LLM will cite it.

#### 2.1.2 Custom Embedding Models (pplx-embed)

In February 2025, Perplexity released pplx-embed-v1 and pplx-embed-context-v1 models built on Qwen3 architecture using diffusion-based continued pretraining. This converts next-token prediction models into passage-level understanding engines by disabling causal attention masking.

The contextual variant (pplx-embed-context-v1) resolves chunk-level ambiguity by incorporating surrounding document context. This is significant for content creators: content must be semantically precise, not just topically adjacent. Pages broadly about a topic but not directly answering the specific query are filtered out by hard-negative-trained embeddings designed to reject near-miss content.

#### 2.1.3 Five-Gate Citation Gauntlet

Documents must pass five sequential checkpoints to earn a Perplexity citation:

| Signal | Quantified Impact | Source |
|--------|-------------------|--------|
| BLUF (answer in first 100 words) | 90% of top citations follow this pattern | LLMClicks |
| Content freshness | 70% of top citations updated within 12–18 months | LLMClicks |
| Schema markup (JSON-LD) | 47% Top-3 citation rate vs. 28% without | Onely |
| Topical authority vs. domain rating | Niche blogs cited over major publishers | LLMClicks |
| Backlink profile influence | 92.78% of cited pages have <10 referring domains | FelloAI |
| Engagement feedback loop | Poorly performing sources dropped within ~1 week | Singularity Digital |

#### 2.1.4 The L3 Reranker and Fail-Safe Mechanism

The ranking pipeline operates across five sequential stages with a three-layer ML reranker including XGBoost at L3. The L3 stage applies a strict quality threshold around 0.7, meaning only the top ~30% of candidates survive.

**Counterintuitive behavior:** If too few results meet the quality threshold, the entire result set is discarded and retrieval restarts from scratch. Perplexity would rather return nothing than serve weak citations.

Reverse-engineering analysis identified manual domain boosts by category:
- **Boosted:** GitHub, Stack Overflow (technology), Amazon (e-commerce), LinkedIn, Coursera
- **Penalized:** Entertainment and sports domains in knowledge-focused queries

#### 2.1.5 Academic Validation: RRF and Re-Rankers

Modern production RAG systems use Hybrid Search combining Vector Search (semantic) and BM25 (lexical) in parallel, combined via Reciprocal Rank Fusion (RRF). The 2026 pipeline standard is:

1. Retrieve Top 100 candidates via Hybrid Search (cheap & fast)
2. Pass to Re-Ranker model (e.g., Cohere Rerank 3.5 or BGE-Reranker)
3. Keep only Top 5-10 for the LLM

Cross-Encoders process the (Query, Document) pair simultaneously through a transformer, examining the actual relationship between words rather than pre-computed vectors. This eliminates the "Lost in the Middle" phenomenon where models ignore information buried in long retrieved lists.

### 2.2 Google AI Overviews: Documented Query Fan-Out

Google has publicly documented how AI Overviews construct citations, making this the most transparent major platform.

#### 2.2.1 Query Fan-Out Mechanism

Google's Gemini model decomposes search queries into multiple related sub-queries called "fan-out queries". For example, "how to improve website speed" fans out into sub-queries covering page load benchmarks, image compression, server response time, Core Web Vitals, hosting selection, and caching strategies.

**Research finding:** Ranking for fan-out queries boosts AI Overview citation odds by 161%.

#### 2.2.2 Source Selection Statistics

Ahrefs analyzed 863,000 keyword SERPs and 4 million AI Overview URLs:

| Citation Source | Percentage |
|-----------------|-----------|
| Rank in top 10 organic | 37.1% |
| Rank 11–100 | 26.2% |
| Don't rank in top 100 | 36.7% |

**Critical shift:** In July 2025, ~76% of citations came from top results. By March 2026, this dropped to ~38%. AI Overviews are relying less on direct search results and more on fan-out query SERPs.

**Additional finding:** 82.5% of AI Overview citations link to deeply nested pages, not homepages.

#### 2.2.3 Position Bias

A CXL study of 100 pages found that 55% of AI Overview citations come from the top 30% of a page's content. The bottom 40% contributes just 21%.

#### 2.2.4 AI-Generated Content in Citations

Originality.ai found that 10.4% of AI Overview citations are AI-generated content. This raises quality concerns but also indicates that AI systems do not uniformly reject machine-written content.

### 2.3 The Princeton/IIT Delhi GEO Study: Controlled Experimentation

Researchers published "GEO: Generative Engine Optimization" at KDD 2024, running 10,000 queries through AI search systems and testing nine content modification strategies.

#### 2.3.1 Most Effective Single Strategies

| Strategy | Average Visibility Improvement |
|----------|------------------------------|
| Quotation Addition | +30.4% |
| Statistics Addition | +22.2% |
| Cite Sources | +15.3% |
| Fluency Optimization | +28.0% |
| Unique Information Addition | +15.1% |

#### 2.3.2 The "Democratization" Effect

When researchers optimized all competing sources simultaneously, lower-ranked sites gained dramatically while top-ranked sites lost share:

| Original Search Rank | Cite Sources Impact | Quotation Addition Impact |
|---------------------|-------------------|------------------------|
| Rank 1 (top) | -30.3% | -22.9% |
| Rank 5 (lowest) | +115.1% | +99.7% |

**Explanation:** Traditional search heavily weights off-page signals like backlinks favoring large incumbents. Generative engines condition on content quality directly, allowing well-structured, well-cited content to compete regardless of domain authority.

#### 2.3.3 Domain-Specific Optimization

The study found different strategies work best for different content types:
- **Law and government:** Statistics Addition most effective
- **History and culture:** Quotation Addition most effective
- **Debate content:** Authoritative tone with evidence backing

#### 2.3.4 Real-World Validation on Perplexity.ai

The top methods were validated on Perplexity.ai using 200 real queries:
- **Quotation Addition:** +22% position-adjusted visibility
- **Statistics Addition:** +37% subjective impression improvement
- **Keyword stuffing:** -10% below unoptimized baseline

### 2.4 ACM SIGIR 2026: Large-Scale Empirical Study

A peer-reviewed study presented at SIGIR 2026 analyzed 11,500 user queries comparing Google Search, AI Overviews, and Gemini Flash 2.5.

#### 2.4.1 Key Findings

- 51.5% of representative real-user queries generate AI Overviews displayed above organic results
- Controversial questions frequently result in AI Overviews
- Retrieved sources show <0.2 average Jaccard similarity between traditional and generative search
- Traditional Google search retrieves significantly more from popular/institutional (.gov, .edu) sites
- Generative search retrieves significantly more Google-owned content (YouTube, Google properties)
- Websites blocking Google's AI crawler (Google-Extended) are significantly less likely to be retrieved by AI Overviews despite having access to the content
- AI Overviews are less consistent when processing two runs of the same query
- AI Overviews are less robust to minor query edits

#### 2.4.2 Statistical Significance

Linear probability models with query fixed effects confirmed:
- Both Gemini and AIOs are significantly less likely to retrieve content from websites blocking Google-Extended
- Both are significantly less likely to retrieve content from popular websites (Tranco 1k-10k)
- Generative search is significantly less likely to cite reputable government/education institutions
- Gemini is significantly more likely to cite content from websites inaccessible to children under CIPA

---

## 3. Partially Verified: What We Know with Limitations

### 3.1 ChatGPT Browse with Bing

**Architecture:** ChatGPT has no proprietary crawl index. Every URL considered for citation was first discovered through Bing's API.

**Research finding:** Being in Bing's results gets you through the door, but position barely matters. Domain-level overlap between Bing's top results and ChatGPT's citations ranges from 28.7% to 49.6%.

**Critical finding:** Only 27% of ChatGPT citations matched Bing's top 20 results. 68% came from training data, not live search.

| Citation Source | Share |
|-----------------|-------|
| Matched Bing top 20 | 27% |
| Matched Google top 20 | 13.4% |
| Neither (training data) | 68% |

**Implication:** No amount of Bing optimization will influence the 68% of citations derived from training data. Submit sitemaps to Bing Webmaster Tools, but understand the limitation.

---

## 4. Inferred: What Remains Speculative

| Claim | Evidence Level | Source Type |
|-------|----------------|-------------|
| Gemini native search source selection | Inferred | No published documentation |
| Specific schema type weights | Inferred | Correlational studies only |
| Optimal content length for citation | Inferred | Varies by platform and query type |
| Social signal impact on citations | Inferred | No controlled studies |
| Image/alt text influence on text citations | Inferred | Logical but unverified |

---

## 5. Synthesis: The Evidence-Based Citation Framework

Based on verified mechanisms across platforms, the following signals have convergent validity:

### 5.1 Structural Signals (High Confidence)

| Signal | Verification | Platform Evidence |
|--------|--------------|-------------------|
| Clear H1→H2→H3 hierarchy | Perplexity L3 ranking, Google fan-out parsing | Standard |
| Single H1 per page | Standard web accessibility | Standard |
| 40-60 word summary after headings | 90% BLUF pattern in top citations | LLMClicks |
| Bullet/numbered lists | Information density preference | Extraction patterns |
| Bold key terms | Entity extraction accuracy | Reranking metrics |

### 5.2 Semantic Signals (High Confidence)

| Signal | Verification | Platform Evidence |
|--------|--------------|-------------------|
| Direct answer in first 100 words | 90% of top Perplexity citations | LLMClicks |
| Semantic precision over keyword density | pplx-embed hard negative mining | Perplexity |
| Entity density (names, numbers, dates) | Information gain metric in reranking | Reranking models |
| Natural language question matching | FAQ extraction patterns | Google, Perplexity |

### 5.3 Authority Signals (Medium-High Confidence)

| Signal | Verification | Platform Evidence |
|--------|--------------|-------------------|
| Named author with credentials | E-E-A-T, Perplexity credibility check | Google, Perplexity |
| Publication and update dates | Freshness algorithms, temporal decay | All platforms |
| External citations to authoritative sources | Cite Sources strategy +30.4% | Princeton/IIT Delhi |
| Editorial transparency | Trust signals in L3 reranking | Perplexity |

### 5.4 Technical Signals (High Confidence)

| Signal | Verification | Platform Evidence |
|--------|--------------|-------------------|
| JSON-LD schema markup | 47% vs 28% citation rate | Onely |
| Article/FAQPage schema types | Google rich results, Perplexity extraction | Google, Perplexity |
| Canonical URLs | Duplicate content prevention | Standard SEO |
| Meta descriptions | SERP presentation, click signals | Standard SEO |
| Open Graph tags | Social sharing, preview cards | Standard SEO |

### 5.5 Freshness Signals (High Confidence)

| Signal | Verification | Platform Evidence |
|--------|--------------|-------------------|
| 12-18 month ideal window | 70% of top Perplexity citations | LLMClicks |
| 30-day sweet spot for news | Aggressive time decay in trending index | Perplexity trending |
| Update dates visible | User engagement feedback loop | Singularity Digital |

---

## 6. Implications for Practitioners

### 6.1 What Works Across All Platforms

- **Front-load answers** — First 100 words contain the core response
- **Structure for extraction** — Clear headings, summaries, lists
- **Cite sources** — Attributed quotes and statistics improve visibility 22-37%
- **Maintain freshness** — Update evergreen content within 18 months
- **Implement schema** — 47% citation rate vs 28% without
- **Build topical depth** — Cover fan-out queries comprehensively

### 6.2 Platform-Specific Tactics

| Platform | Unique Lever |
|----------|--------------|
| Perplexity | Semantic precision, entity density, engagement signals |
| Google AIO | Fan-out query coverage, entity positioning, structured depth |
| ChatGPT | Bing indexation, training data inclusion (limited optimization) |
| Gemini | Google ecosystem integration, blocking Google-Extended hurts |

### 6.3 What Does NOT Work

| Tactic | Evidence |
|--------|----------|
| Keyword stuffing | -10% below baseline in controlled study |
| Generic listicles | Filtered by hard-negative embeddings |
| Backlink chasing for GEO | 92.78% of cited pages have <10 referring domains |
| Homepage optimization | 82.5% of citations go to nested pages |

---

## 7. Limitations and Future Research

### 7.1 Current Gaps

- **Proprietary systems:** ChatGPT Browse and Gemini native search lack published methodology
- **Temporal validity:** Platform algorithms change rapidly; 2024 findings may not hold in 2027
- **Commercial outcomes:** No study directly links citation share to traffic or revenue
- **Interaction effects:** Most studies test single strategies; combined effects less understood

### 7.2 Research Needs

- Controlled A/B testing of schema markup impact on citation rate
- Longitudinal tracking of citation persistence over time
- Cross-platform citation consistency studies
- Commercial outcome measurement (citation → traffic → conversion)

---

## 8. Conclusion

AI search citation is not entirely opaque. Convergent evidence from independent research streams reveals consistent patterns: structural clarity enables extraction, semantic precision passes retrieval filters, topical authority survives ranking, freshness maintains relevance, and trust signals secure attribution.

The most rigorous empirical finding is from the Princeton/IIT Delhi GEO study: content that is well-sourced, statistically grounded, fluently written, and quotation-rich achieves 22-115% visibility improvements in AI-generated responses, with the greatest gains accruing to lower-ranked sites.

Practitioners should optimize for what is verified while remaining skeptical of claims about proprietary systems. The field evolves rapidly; today's optimization may be tomorrow's baseline expectation.

---

## References

1. ZipTie.dev. (2026, April 4). How Perplexity AI Answers Work: Retrieval, Ranking, and Citation Pipeline. https://ziptie.dev/blog/how-perplexity-ai-answers-work/

2. arXiv. (2026, April 23). An End-to-End Ukrainian RAG for Local Deployment. Optimized Hybrid Search and Lightweight Generation. https://arxiv.org/html/2604.22095v1

3. Stridec. (2026, April 19). How to Get Cited in Google AI Overviews: The Entity-First Approach. https://www.stridec.com/blog/how-to-get-cited-in-google-ai-overviews-guide/

4. Elementera AI. (2026, April 25). Generative Engine Optimization: What the GEO Paper Actually Shows for Your Business. https://www.elementera.com/blog/generative-engine-optimization-what-geo-aeo-ai-search-paper-shows-your-business

5. ALM Corp. (2026, March 3). Google AI Overview Citations From Top-10 Pages Dropped From 76% to 38%. https://almcorp.com/blog/google-ai-overview-citations-drop-top-ranking-pages-2026/

6. Originality.ai. (2025, October 28). 10.4% of AI Overview Citations are AI-Generated. https://originality.ai/blog/ai-overview-ai-citations-study

7. AI Plus Automation. (2026, March 24). How ChatGPT Search Works and How to Optimize for It (2026 Research). https://aiplusautomation.com/blog/how-chatgpt-search-works

8. Ahrefs. (2026, March 2). Update: 38% of AI Overview Citations Pull From The Top 10. https://ahrefs.com/blog/ai-overview-citations-top-10/

9. Srinivasan, A. (2026, March 21). All you need to know about RAG (in 2026). AI with Aish. https://aishwaryasrinivasan.substack.com/p/all-you-need-to-know-about-rag-in

10. ACM SIGIR. (2026, May 1). How Generative AI Disrupts Search: An Empirical Study of Google Search, Gemini, and AI Overviews. Proceedings of the 49th International ACM SIGIR Conference. https://arxiv.org/html/2604.27790v1

---

*Document prepared by aioverdose for research and optimization purposes.*
