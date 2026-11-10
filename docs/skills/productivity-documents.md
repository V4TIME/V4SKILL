# Productivity & Documents

[← Back to the skill catalog](../SKILLS.md) · [Main README](../../README.md)

Skills for creating, reading, editing, and automating documents and productivity workflows.

**pdf (PDF Create, Read, Merge, Fill, OCR, Edit)**
- **What it does:** Comprehensive PDF manipulation — create PDFs from scratch, read/extract text, merge multiple PDFs, fill forms, OCR scanned documents, edit existing text, split, stamp watermarks, page images, secure PDFs, and more.
- **Why use it:** When you need to work with PDF files — generate reports, extract data from PDFs, fill forms programmatically, OCR images to text, edit existing PDFs, or secure documents.
- **Main contents:** PDF creation with reportlab, reading with PyPDF2/pypdf and pdfplumber, merging/splitting, form filling, OCR with marker (layout-preserving PDF-to-Markdown) and pymupdf, text editing, page image generation, watermarking/stamping, security (password protection, redaction), extraction markers, rasterization, tests.
- **Keywords:** PDF, create, read, merge, fill, OCR, edit, text extraction, form filling, watermark, stamp, split, reportlab, pypdf, pdfplumber, pymupdf, marker, document processing, office automation.

**docx (Word DOCX Create, Read, Edit, Template, Review)**
- **What it does:** Create, read, edit, and review Microsoft Word .docx files. Supports templates, comments, revisions tracking, and common document operations via python-docx.
- **Why use it:** When you need to automate Word document workflows — generate reports from templates, read extracted text, add/edit content, track revisions, manage comments.
- **Main contents:** DOCX creation with python-docx, reading/extracting text, editing (add paragraphs, tables, images), template-based creation, revision and comments handling, validation, common scripts (docx_common, docx_create, docx_edit, docx_read, docx_revisions, docx_template, docx_validate), tests.
- **Keywords:** Word, DOCX, create, read, edit, template, review, python-docx, documents, office automation, revisions, comments, Microsoft Word.

**xlsx (Excel XLSX/CSV Create, Read, Edit, Restructure)**
- **What it does:** Create, read, edit, and restructure Excel .xlsx files and CSVs. Supports cell manipulation, formulas, formatting, sheet operations, and CSV conversion.
- **Why use it:** When you need to automate spreadsheet workflows — generate reports, read Excel data, edit cells, restructure sheets, convert between CSV and XLSX.
- **Main contents:** XLSX creation with openpyxl, reading cell data, editing cells/formulas/formatting, sheet operations (add, remove, reorder), restructuring (merge cells, split data), CSV to XLSX conversion, XLSX to CSV conversion, recalc, tests.
- **Keywords:** Excel, XLSX, CSV, spreadsheet, openpyxl, create, read, edit, restructure, convert, office automation, data processing, tables, formulas.

**powerpoint (PowerPoint PPTX Create, Read, Edit, Render)**
- **What it does:** Create, read, edit, and render PowerPoint .pptx presentations. Supports slide creation, text/images/tables, template-based generation, and rendering to images.
- **Why use it:** When you need to automate presentation generation — create slides from data, read existing presentations, edit content, render slides as images for previews.
- **Main contents:** PPTX creation with python-pptx, reading slide content, editing slides/text/images/tables, template-based creation, rendering to images, tests.
- **Keywords:** PowerPoint, PPTX, create, read, edit, presentation, slides, office automation, python-pptx, template, render, deck, slide deck.

**document-to-action-items (Extract Obligations, Deadlines, Tasks from Documents)**
- **What it does:** Extracts cited obligations, deadlines, and tasks from documents (PDFs, DOCX, text). Uses OCR when needed and produces cited action items with source references.
- **Why use it:** When you have a contract, agreement, policy document, or meeting notes and need to extract every actionable item with citations back to the source.
- **Main contents:** Document ingestion (multiple formats), OCR for scanned PDFs, obligation/deadline/task extraction with citations, output format for action items, integration with PDF, DOCX, and Notion skills.
- **Keywords:** document, action items, obligations, deadlines, tasks, extraction, OCR, cited, contract review, agreement analysis, policy extraction, meeting notes, productivity.

**meeting-action-items (Turn Meeting Notes into Decisions, Owners, Tickets)**
- **What it does:** Transforms meeting notes into cited decisions, action owners, and ticket-ready items. Produces structured output: what was decided, who owns each action, and what tickets need creating.
- **Why use it:** After a meeting, when you have raw notes and need structured follow-up: decisions documented, owners assigned, tickets created.
- **Main contents:** Note parsing, decision extraction, owner identification, ticket formatting, follow-up generation, integration with Teams meeting pipeline, Google Workspace, and Notion.
- **Keywords:** meeting, action items, decisions, owners, tickets, notes, follow-up, productivity, meeting summary, standup, retrospective, sprint planning.

**weekly-review-planning (Weekly Reset: Commitments, Stalled Work, Next-Week Plan)**
- **What it does:** Weekly review and planning workflow — reviews current commitments, identifies stalled work, and produces a next-week plan. Integrates with calendar and task systems.
- **Why use it:** At the end of each week, to reset: what's committed, what's stuck, and what's planned for next week.
- **Main contents:** Commitment review, stalled work identification, next-week planning, calendar integration, task system integration (Obsidian, Notion, Airtable, Google Workspace, email-inbox-triage).
- **Keywords:** weekly, review, plan, reset, commitment, tasks, calendar, productivity, weekly review, weekly planning, sprint planning, goal tracking.

**product-price-monitor (Watch Product, Flight, Listing Prices; Alert on Target)**
- **What it does:** Monitors product prices, flight prices, or listing prices over time and alerts when a target price is reached or availability changes.
- **Why use it:** When you're waiting to buy something (product, flight, rental) and want the AI agent to watch prices and notify you when they drop to your target.
- **Main contents:** Price tracking setup, target price configuration, availability monitoring, alerting, integration with maps for location-based products.
- **Keywords:** price, monitor, product, flight, alert, watch, shopping, travel, availability, price tracking, deal hunting, price drop alert.

**obsidian (Read, Search, Create, Edit Obsidian Vault Notes)**
- **What it does:** Filesystem-first Obsidian vault work — read, list, search, create, append, and edit notes, and add wikilinks.
- **Why use it:** When working with a local Obsidian vault and you need note read/search/create/edit operations without a GUI.
- **Main contents:** Vault path configuration, read a note, list notes, search, create a note, append content, targeted edits, wikilinks.
- **Keywords:** Obsidian, notes, vault, markdown, read, search, create, edit, wikilinks, note-taking.

**teams-meeting-pipeline (Teams Meeting Summaries, Job Replay, Graph Subscriptions)**
- **What it does:** Runs the Microsoft Teams meeting pipeline — scheduled summaries, job replay/debugging, and Microsoft Graph subscription management through the Hermes Teams gateway.
- **Why use it:** When operating Teams meeting summaries on the Teams gateway channel or in cron jobs, including re-running jobs and managing Graph subscriptions.
- **Main contents:** Status/inspection commands, job replay/debugging, subscription management, decision tree for common asks, and the 72-hour Graph subscription expiry pitfall. Requires MS Graph app credentials (`MSGRAPH_TENANT_ID`, `MSGRAPH_CLIENT_ID`, `MSGRAPH_CLIENT_SECRET`).
- **Keywords:** Teams, Microsoft Graph, meetings, summary, pipeline, job replay, subscriptions, cron, gateway, operations.

---

[← Back to the skill catalog](../SKILLS.md)
