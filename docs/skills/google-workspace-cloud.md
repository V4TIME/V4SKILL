# Google Workspace & Cloud APIs

[← Back to the skill catalog](../SKILLS.md) · [Main README](../../README.md)

**google-workspace (Gmail, Calendar, Drive, Docs, Sheets via gws CLI or Python)**
- **What it does:** Interacts with Google Workspace services — Gmail, Calendar, Drive, Docs, Sheets, and Contacts — via the `gws` CLI bridge or direct Python API calls. Supports OAuth setup, daily brief generation, Gmail search syntax, and a Her Hermes home integration script.
- **Why use it:** When you need to automate Google Workspace tasks from Hermes — read/send Gmail, manage Calendar events, work with Drive files, read/edit Docs and Sheets.
- **Main contents:** gws CLI bridge (`scripts/gws_bridge.py`), Google API Python client (`scripts/google_api.py`), OAuth setup, daily brief generation (`references/daily-brief.md`), Gmail search syntax (`references/gmail-search-syntax.md`), `_hermes_home.py` for Hermes home integration, setup script, related to term-mail-cli for IMAP/SMTP fallbacks.
- **Keywords:** Google Workspace, Gmail, Calendar, Drive, Docs, Sheets, Google API, OAuth, gws CLI, email, calendar, cloud storage, documents, spreadsheets, Google, productivity, G Suite.

**maps (Geocode, POIs, Routes, Timezones via OpenStreetMap/OSRM)**
- **What it does:** Geocoding (address to coordinates and reverse), points of interest (POI) search, route planning and distance calculation, and timezone lookup via OpenStreetMap (Nominatim), OSRM (Open Source Routing Machine), and related services.
- **Why use it:** When you need location services — find coordinates for an address, get directions between points, find nearby places, determine timezones.
- **Main contents:** Nominatim geocoding (forward and reverse), OSRM route planning, POI search, distance calculation, timezone lookup, maps client script (`scripts/maps_client.py`).
- **Keywords:** map, geocode, POI, route, timezone, OSRM, OSM, OpenStreetMap, Nominatim, distance, directions, location, GPS, coordinates, mapping, geolocation.

**notion (Notion API + ntn CLI — Pages, Databases, Markdown, Workers)**
- **What it does:** Interacts with Notion's API for pages, databases, markdown content, and Notion Workers. Uses the `ntn` CLI for Notion operations.
- **Why use it:** When you need to read, create, or edit Notion pages and databases from Hermes — migrate content, sync data, automate Notion workflows.
- **Main contents:** Notion API integration, ntn CLI usage, page creation and reading, database operations, markdown content handling, Notion Workers, API authentication.
- **Keywords:** Notion, API, page, database, markdown, workers, ntn, CLI, productivity, notes, workspace, Notion integration, page creation, database CRUD.

**airtable (Airtable REST API — Records CRUD, Filters, Upserts)**
- **What it does:** Interacts with Airtable's REST API for record CRUD (create, read, update, delete), filtering, sorting, and upserts. Works via curl-based API calls.
- **Why use it:** When you need to read or write Airtable data from Hermes — pull records, create new entries, update existing ones, apply filters.
- **Main contents:** Airtable API authentication, base/Table identification, record CRUD operations, filter syntax, sorting, upsert patterns, rate limit handling.
- **Keywords:** Airtable, API, CRUD, record, filter, upsert, database, spreadsheet, productivity, no-code, base, table, field, formula.

**box (Box Cloud Files — Share, Search, Metadata, Content Workflows)**
- **What it does:** Interacts with Box's API for file management, sharing, search, metadata, content workflows, hubs, OAuth setup, SDK development, webhooks, and bulk operations.
- **Why use it:** When you need to manage files in Box cloud storage from Hermes — upload, download, share, search, manage metadata, set up webhooks.
- **Main contents:** Box API authentication (OAuth), file CRUD, folder management, sharing and collaboration, search, metadata management, content workflows, hubs, SDK development patterns, webhooks and events, bulk operations, CLI guide, troubleshooting, OAuth setup.
- **Keywords:** Box, cloud, file, share, search, metadata, content, collaboration, CLI, SDK, OAuth, webhooks, enterprise, storage, document management.

---

[← Back to the skill catalog](../SKILLS.md)
