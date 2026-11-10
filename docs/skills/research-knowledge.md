# Research & Knowledge

[← Back to the skill catalog](../SKILLS.md) · [Main README](../../README.md)

**arxiv (Search arXiv Papers by Keyword, Author, Category, or ID)**
- **What it does:** Searches arXiv for academic papers by keyword, author, category, or paper ID. Returns paper metadata, abstracts, and links for further reading or PDF download.
- **Why use it:** When you need to find academic papers on a topic — search by subject, find papers by a specific author, look up a known arXiv ID, or browse a category.
- **Main contents:** arXiv API search, keyword search, author search, category search, paper ID lookup, search script (`scripts/search_arxiv.py`), integration with PDF skill for downloading/reading papers.
- **Keywords:** arxiv, paper, search, academic, author, category, research, science, API, scholarly, literature search, CS papers, physics, mathematics, quantitative biology, quantitative finance, statistics, electrical engineering, economics.

**compound-wiki (Karpathy's LLM Wiki — Build/Query Interlinked Markdown Knowledge Base)**
- **What it does:** Builds and maintains a persistent, compounding knowledge base as interlinked markdown files, based on Andrej Karpathy's LLM Wiki pattern. Unlike RAG (which rediscovers knowledge from scratch per query), the wiki compiles knowledge once and keeps it current — cross-references are already there, contradictions already flagged.
- **Why use it:** When you want a persistent knowledge base that grows over time — ingest sources, create entity/concept/comparison pages, cross-reference everything, and query the compiled knowledge. Better than RAG for domains you repeatedly work in.
- **Main contents:** Three-layer architecture (raw sources immutable, wiki pages agent-owned, schema defines structure), wiki location (`WIKI_PATH` env var, defaults to `~/wiki`), resuming an existing wiki (always read SCHEMA.md + index.md + recent log.md before any operation), initializing a new wiki (create directory structure, write SCHEMA.md, index.md, log.md), SCHEMA.md template (domain, conventions, frontmatter format, tag taxonomy, page thresholds), tag taxonomy (define 10-20 top-level tags, add new tags before using them), page thresholds (create page when entity appears in 2+ sources or central to one source, don't create for passing mentions, split pages over 200 lines, archive superseded content), entity pages, concept pages, comparison pages, update policy (check dates, note contradictions with dates, mark in frontmatter, flag for review), core operations (ingest — capture raw source with frontmatter + sha256, discuss takeaways, check existing pages, write/update wiki pages with cross-references and tags, update navigation, report changes; query — read index, search for key terms, read relevant pages, synthesize answer with citations, file valuable answers, update log; lint — orphan pages, broken wikilinks, index completeness, frontmatter validation, stale content, contradictions, quality signals, source drift, page size, tag audit, log rotation), Obsidian integration (wiki directory works as Obsidian vault, wikilinks render, graph view, YAML frontmatter for Dataview, raw/assets for images), Obsidian headless (obsidian-headless for server-side sync via Obsidian Sync, systemd service for continuous background sync), pitfalls (never modify raw/ files, always orient first, always update index.md and log.md, don't create pages for passing mentions, don't create pages without cross-references, frontmatter required, tags from taxonomy, keep pages scannable, ask before mass-updating, rotate log, handle contradictions explicitly), llm-wiki-compiler reference (Node.js CLI from atomicmemory/llm-wiki-compiler for Node.js-based workflows).
- **Keywords:** wiki, Karpathy, LLM Wiki, knowledge base, interlinked markdown, compounding knowledge, RAG alternative, research, notes, Obsidian, schema, tag taxonomy, entity pages, concept pages, comparison pages, cross-reference, knowledge compilation, atomic memory, llm-wiki-compiler.

**grounded-citations (Ground Answers & Documents in Cited, Verifiable Sources)**
- **What it does:** Grounds answers and documents in cited, verifiable sources. Ensures every claim traces back to a source, with citation formats and grounding rationale documentation. Supports web search, arXiv, and PDF sources.
- **Why use it:** When you need answers that are backed by verifiable sources — every claim has a citation, every source is traceable, and the grounding logic is transparent.
- **Main contents:** Citation formats reference (`references/citation-formats.md`), grounding rationale (`references/grounding-rationale.md`), sources script (`scripts/sources.py`), `_hermes_home.py` for home integration, wiki/multi-page output patterns (llm-wiki, Obsidian), web search integration, arXiv integration, PDF integration.
- **Keywords:** citation, source, ground, verify, document, answer, research, web, reports, grounded citations, verifiable sources, citation formats, fact-checking, source attribution, academic citation, research integrity.

**competitor-news-monitor (Watch Named Companies for Material News; Cited Digests)**
- **What it does:** Monitors named companies for material news and produces cited digests. Tracks company mentions across news sources and surfaces relevant developments with citations.
- **Why use it:** When you need to track competitor or company news — get cited digests of material developments, market moves, product launches, executive changes.
- **Main contents:** Company watchlist configuration, news monitoring, cited digest generation, material event detection, integration with blogwatcher for broader content monitoring.
- **Keywords:** news, competitor, company, monitor, digest, cited, market research, competitive intelligence, company tracking, news monitoring, business intelligence, material news, cited digest.

---

[← Back to the skill catalog](../SKILLS.md)
