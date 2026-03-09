# pacemente-infomgt

**Production URL:** https://infomgt.pacemente.ch  
**Purpose:** Public-facing website hosting the Information Management Framework (IMF) for Pacemente — a publicly traded life-sciences company.

---

## What this project is

This site publishes the Pacemente Information Management Framework (IMF): a suite of 56 information governance documents covering policy, procedure, and work instruction layers across 9 security and compliance domains.

The framework was purpose-built for a life-sciences company operating under:

- **ISO 27001:2022** (ISMS — primary structural framework)
- **NIS2 Directive** (EU 2022/2555 — Essential Entity, health sector, Annex I)
- **21 CFR Part 11 / EU Annex 11** (GxP electronic records)
- **GDPR / UK GDPR** (personal data and privacy)
- **HIPAA** (PHI in clinical/commercial operations)
- **SOX ITGC** (publicly traded company IT general controls)
- **EU AI Act / FDA AI/ML guidance** (AI governance)
- **GAMP 5 / ALCOA+** (GxP data integrity)

---

## Document suite — 56 documents

### Framework & Governance layer (7 documents)

| ID | Title | Type |
|----|-------|------|
| IMF-001 | Information Management Framework | Framework |
| GOV-001 | NIS2 Governance Instrument | Governance Instrument |
| RACI-001 | Roles, Responsibilities & Authorities Matrix | RACI |
| EXC-001 | Exception Management Policy & Register | Companion |
| REG-001 | IMF Document Register | Register |
| PLAN-001 | IMF Gap Remediation Implementation Plan | Plan |
| REF-001 | Regulatory Authority Contact Register | Reference |

### Policy domains (8 domains — 23 policies, 23 SOPs, 3 work instructions)

| Domain | Policies | SOPs | WIs | Key regulations |
|--------|----------|------|-----|-----------------|
| Data Governance | POL-001–004 | SOP-001–004 | WI-001 | GDPR, HIPAA, CCPA, 21 CFR Pt.11, ALCOA+ |
| System & Change | POL-005–007 | SOP-005–007 | WI-005 | 21 CFR Pt.11, EU Annex 11, GAMP 5 |
| Access & Identity | POL-008–009 | SOP-008–009 | — | ISO 27001, SOX ITGC, HIPAA |
| Risk & Resilience | POL-010–011, 016 | SOP-010–011, 016 | — | ISO 27001, NIS2 Art.21(a/c) |
| Security Operations | POL-012, 014–015, 017–019 | SOP-012, 014–015, 017–019 | — | ISO 27001, NIS2 Art.21, GDPR Art.33 |
| Third Party & Vendor | POL-013 | SOP-013 | — | ISO 27001, NIS2 Art.21(d), GDPR Art.28 |
| People & Culture | POL-020–021 | SOP-020–021 | WI-021 | NIS2 Art.20(2)/21(g), ISO 27001 |
| Communications & AI | POL-022–023 | SOP-022–023 | — | NIS2 Art.21(j), EU AI Act, GDPR Art.22 |

### Recently amended documents (v1.1)
- **POL-004 v1.1** — Privacy Policy: added test data management & masking section (GDPR Art.25 / ISO 27001 A.8.11)
- **POL-010 v1.1** — IS Risk Policy: added threat intelligence programme (Section 9)
- **POL-017 v1.1** — Vulnerability Management: added coordinated vulnerability disclosure (Section 9, conditional — company does not develop software for external use, but CVD outbound obligations apply)
- **POL-020 v1.1** — Security Awareness & Training: added Tier 0 management body training (NIS2 Art.20(2))
- **SOP-012 v1.1** — Security Incident Response: added NIS2 Art.23 three-stage reporting overlay (Section 10)

---

## Source documents

All 56 source `.docx` files were generated during the IMF build sessions in Claude.ai. They are the authoritative source of truth.

> **If the source `.docx` files are not yet in this repo:** they need to be copied from the Claude.ai outputs directory before any site build work begins. There are 56 `.docx` files plus one `IMF_Document_Register.jsx` and one `IMF_Visual_Overview.jsx`.

---

## Intended site structure

The site at `infomgt.pacemente.ch` should present the IMF as a navigable, professional reference. Suggested structure:

```
/                        → Overview / landing (document hierarchy, stats, regulatory scope)
/framework               → IMF-001 and governance layer documents
/domains/[domain-slug]   → Per-domain page listing policies and SOPs
/documents/[doc-id]      → Individual document viewer (or download)
/register                → Full document register (IMF_Document_Register.jsx)
```

The `IMF_Visual_Overview.jsx` React component is a complete interactive overview of the entire framework (three tabs: Document Map, Domain Detail, Regulatory Scope) — it is a natural candidate for the landing page or an embedded `/overview` route.

---

## Technical context

### Document register
`IMF_Document_Register.jsx` is a React component containing structured metadata for all 56 documents — IDs, titles, owners, versions, purposes, key contents, regulatory references, and parent/child relationships. It is the single source of truth for document metadata and should be used to drive any dynamic navigation or search on the site.

### Visual overview
`IMF_Visual_Overview.jsx` is a self-contained React component with:
- Dark blueprint aesthetic (background `#080E1A`, accent `#4FC3F7`)
- Three tabs: Document Map (expandable domain cards), Domain Detail (full hierarchy), Regulatory Scope (per-framework cards)
- No external dependencies beyond React

### Document IDs and naming convention
```
POL-NNN   Policy
SOP-NNN   Standard Operating Procedure (always paired with a POL-NNN)
WI-NNN    Work Instruction (subordinate to an SOP)
IMF-NNN   Framework document
GOV-NNN   Governance instrument
RACI-NNN  Responsibility matrix
EXC-NNN   Exception register
REG-NNN   Document register
PLAN-NNN  Implementation plan
REF-NNN   Reference document
```

---

## Pending actions (known before site build)

Before the site goes live, the following items require action by the Pacemente legal/compliance team:

1. **REF-001 contact details** — all 10 regulatory authority entries in GOV-001 Appendix A (REF-001) need legal verification and population of actual contact details, portal URLs, and reporting SLAs before GOV-001 can be approved and published.

2. **NIS2 financial threshold** — CFO and Legal must define the financial impact threshold for NIS2-G06 Trigger 2 in SOP-012 Section 10.3 (significant incident determination). The field is currently marked `[INSERT: CFO/Legal to define financial impact threshold]`.

3. **RACI-001 v1.1** — the RACI matrix has not yet been regenerated to add rows for GOV-001, POL-022, POL-023, and the Board/management body NIS2 Art.20 obligations. The current RACI-001 covers the original 48-document suite.

4. **All `[Company Name]` and `[INSERT...]` placeholders** — every document contains placeholder text for company-specific values (legal entity name, registered address, DPO contact, CISO contact, Board Chair name, financial thresholds, etc.). These must be resolved before any document is published externally.

5. **Document approval** — all documents are currently at `DRAFT` status. The formal approval workflow defined in IMF-001 must be completed (document owner review → CISO review → DPO review where applicable → ISSG/Board approval per GOV-001) before publishing.

---

## Conditional decisions (resolved)

- **COND-G01 (SDLC policy POL-024/SOP-024):** CLOSED — Pacemente does not develop software internally. No SDLC policy required.
- **COND-G02 (Test data masking):** IMPLEMENTED — POL-004 v1.1 includes a test data management section as a precautionary control. Production data is not currently used in non-production environments, but the policy governs any future instance.

---

## Build notes for Claude Code

- The site is static-friendly — all documents can be rendered from the `.docx` files or from the metadata in `IMF_Document_Register.jsx`.
- The `IMF_Visual_Overview.jsx` component is production-ready as-is; it uses only React hooks (`useState`) and Tailwind-compatible inline styles — no external UI library dependencies.
- If building with a framework (Next.js, Astro, etc.), the document register JSX data can be imported directly as a data source.
- The domain colour palette from the visual overview should be carried through the site for visual consistency:

| Domain | Colour |
|--------|--------|
| Data Governance | `#4FC3F7` |
| System & Change | `#81C784` |
| Access & Identity | `#FFB74D` |
| Risk & Resilience | `#F06292` |
| Security Operations | `#BA68C8` |
| Third Party & Vendor | `#4DB6AC` |
| People & Culture | `#FFD54F` |
| Communications & AI | `#CE93D8` |
| Framework / Governance | `#4FC3F7` (same as Data Governance) |

- Background: `#080E1A` | Grid lines: `rgba(79,195,247,0.025)` | Body text: `#E2E8F0` | Muted: `#64748B`
