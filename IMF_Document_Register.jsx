import { useState } from "react";

const NAVY = "#1B2A4A";
const BLUE = "#2E5EA8";
const LTBLUE = "#D6E4F7";
const GREEN = "#1A7A4A";
const AMBER = "#B45309";
const GREY = "#6B7280";

const STATUS = {
  "Complete":   { bg: "#D1FAE5", text: "#065F46", dot: GREEN },
  "Draft":      { bg: "#FEF3C7", text: "#92400E", dot: AMBER },
  "Planned":    { bg: "#F3F4F6", text: "#374151", dot: GREY },
};

const LEVELS = {
  "Framework":  { color: "#1B2A4A", bg: "#D6E4F7" },
  "Policy":     { color: "#1B2A4A", bg: "#E0E7FF" },
  "SOP":        { color: "#1B2A4A", bg: "#FEF9C3" },
  "Work Instruction": { color: "#1B2A4A", bg: "#FCE7F3" },
  "Register":   { color: "#1B2A4A", bg: "#D1FAE5" },
};

const DOMAINS = [
  "All",
  "Governance",
  "Data Classification",
  "System Classification",
  "Data Governance",
  "Access & Identity",
  "Risk & Resilience",
  "Compliance & Audit",
  "Third Party",
  "Privacy",
  "Communications Security",
  "AI Governance",
  "People & Culture",
];

const docs = [
  // ── Framework ──────────────────────────────────────────────────────────────
  {
    id: "IMF-001",
    level: "Framework",
    domain: "Governance",
    title: "Information Management Framework",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: null,
    children: ["POL-001","POL-002","POL-003","POL-004","POL-005","POL-006","POL-007","POL-008","POL-009","POL-010","POL-011","POL-012","POL-013","POL-014","POL-015","POL-016","POL-017","POL-018","POL-019","POL-020","POL-021","POL-022","POL-023","GOV-001","PLAN-001"],
    purpose: "Defines the overarching information management schema, principles, and governance model. Establishes the two-axis classification system (Sensitivity + Criticality) and mandates all subordinate policies.",
    keyContents: [
      "Classification schema — 5 sensitivity tiers, 4 criticality tiers",
      "Dual-input system criticality model (data-derived + functional)",
      "Regulatory alignment map (ISO 27001, NIST, GxP, SOX, 21 CFR Part 11, GDPR)",
      "Governance model and ISSG charter",
      "Document hierarchy (Framework → Policy → SOP → WI)",
      "14 mandated policies listed",
    ],
    regulatoryRef: ["ISO 27001", "NIST CSF", "GxP", "SOX", "21 CFR Part 11", "GDPR"],
  },

  // ── Register & RACI ────────────────────────────────────────────────────────
  {
    id: "REG-001",
    level: "Register",
    domain: "Governance",
    title: "IMF Document Register",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "IMF-001",
    children: [],
    purpose: "Living index of all documents within the Information Management Framework suite. Tracks status, ownership, relationships, and purpose of every document across all levels.",
    keyContents: [
      "Document ID, title, level, domain, and status for all suite documents",
      "Parent-child relationships across Framework → Policy → SOP → WI",
      "Purpose and key contents summary per document",
      "Regulatory references per document",
      "Version and owner tracking",
    ],
    regulatoryRef: ["ISO 27001"],
  },
  {
    id: "RACI-001",
    level: "Register",
    domain: "Governance",
    title: "Roles, Responsibilities and Authorities Matrix",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "IMF-001",
    children: [],
    purpose: "Formally defines all roles in the IMF suite and maps every key activity and decision across all domains to those roles using the RACI model (Responsible, Accountable, Consulted, Informed). Single authoritative reference for accountability across the suite. Updated each time a new document is added.",
    keyContents: [
      "13 formally defined roles: Board, CIO, CISO, DPO, ISSG, Data Owner, System Owner, IT/Custodian, Information Security, Compliance/QA, Business Continuity, IT/Infrastructure, All Personnel",
      "Per-role: definition, typical title, authority level, accountability scope, key IMF obligations",
      "RACI legend with code definitions (A, R, A/R, C, I)",
      "Full RACI matrix across 10 domains: Framework Governance, Data Classification, System Classification, Access & Identity, Risk Management, BC/DR, Incident Response, Third Party Management, Compliance/GxP/Audit, Privacy",
      "~80 individual activity rows across all domains — colour-coded by RACI code",
      "Governance rules: update triggers, approval process, RACI integrity rules",
    ],
    regulatoryRef: ["ISO 27001", "GDPR", "GxP", "SOX"],
  },

  {
    id: "EXC-001",
    level: "Register",
    domain: "Governance",
    title: "Exception Management Policy and Register",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: [],
    purpose: "The capstone governance document that gives operational substance to every exception clause in the IMF suite. Defines what an exception is (formal, time-bounded, risk-assessed, approved deviation), the full exception lifecycle, approval authority by risk score, 6 non-approvable deviation types, compensating controls framework, and the live Exception Register. Uses the same 5×5 risk matrix as POL-010/DIRA/DPIA for direct comparability. All 15 policies have been retrofitted to reference EXC-001 in their exception sections.",
    keyContents: [
      "11 exception categories mapped to specific policies, specialist reviewers, and maximum durations — ranging from 3 months (Change Management, Access Control, Audit Trail) to 12 months (Data Classification, Risk Management)",
      "Approval authority matrix: Low (1–4) → InfoSec Manager; Medium (5–9) → CISO; High (10–14) → CISO + CIO + specialist reviewer; Critical (15–25) → CISO + CIO + CEO + Board notification within 5 days",
      "6 non-approvable deviations (Section 5): audit trail immutability on GxP systems; shared accounts for GxP activities; processing personal data without legal basis; international transfer without adequate mechanism; unvalidated GxP system in production; disabling change management on GxP systems. Each is non-approvable because no compensating control substitutes for the underlying regulatory requirement.",
      "6-stage lifecycle: Request (all fields mandatory — no partial submissions) → Risk Assessment (Information Security independent review, Compliance/QA for GxP) → Approval (written only, verbal not valid, conditional approval permitted) → Register Entry + Compensating Control Implementation (within 10 business days or suspended) → Ongoing Monitoring (ISSG quarterly) → Renewal or Closure (renewal requires demonstrated remediation progress)",
      "Compensating controls table: 6 deviation types with specific control examples — immutability (daily export to external immutable store + cryptographic hash verification), MFA gap (network-level IP restriction + enhanced monitoring), GxP validation overdue (freeze at last validated version + weekly audit trail review), vendor access before assessment (JIT with real-time supervision), data retention gap (access restriction + delete capability as remediation target), RTO/RPO gap (manual workaround procedures + enhanced monitoring)",
      "Reporting: ISSG quarterly summary; High/Critical notification within 2–5 business days; GxP exception notification within 5 days; Board report annually or immediately for Critical; regulatory notification assessment for GDPR/HIPAA/GxP implicating exceptions",
      "Exception Register (Section 11): 20-field register template with sequential IDs (EXC-001-001 etc.), status tracking (Open Active / Pending Controls / Renewal Pending / Closed), VMF reference for GxP, Board notified field. Retained 7 years from closure.",
    ],
    regulatoryRef: ["ISO 27001", "21 CFR Part 11", "EU Annex 11", "GDPR Art.5(2)", "SOX", "HIPAA", "ICH Q10"],
  },

  {
    id: "GOV-001",
    level: "Governance Instrument",
    domain: "Governance",
    title: "NIS2 Governance Instrument",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: [],
    purpose: "Establishes the formal governance framework required by NIS2 Articles 20 and 21. Creates mechanisms for management body formal approval of the cybersecurity programme, management body cybersecurity training (Art. 20(2) Tier 0), programme effectiveness reporting, IS assurance framework, and the Regulatory Authority Contact Register (REF-001) for all CSIRT/NCA/regulatory notification contacts.",
    keyContents: [
      "Annual management body formal programme approval — with quorum, evidence, and deferral requirements. This is the Art. 20(1) personal liability discharge mechanism.",
      "Tier 0 management body training: annual assessed module (60 min min), completion by 30 September, individually named LMS records, 5-year retention for supervision inspection.",
      "Annual Programme Effectiveness Report — 10-section content requirement aggregating KPIs/KRIs from all programme domains, presented to Board at annual approval meeting.",
      "12 programme KPIs/KRIs covering MTTD, MTTC, vulnerability SLA compliance, patch timeliness, training completion, phishing rates, vendor assessment currency, access review timeliness, backup test success, exception status, NIS2 notification timeliness.",
      "IS Programme Assurance Framework: annual external pen test (CREST-accredited), ISO 27001 surveillance, internal IS audit rolling cycle (100% coverage over 3 years), GxP IS audit, NIS2 self-assessment scorecard.",
      "REF-001 Regulatory Authority Register: national CSIRT, NCA, ICO, lead EU SA, US HHS OCR, FDA, EMA/MHRA, ENISA, H-ISAC, CISA — with contact details, submission portals, and SLA for each notification obligation.",
    ],
    regulatoryRef: ["NIS2 Art. 20", "NIS2 Art. 21(f)", "ISO 27001 A.5.35", "ISO 27001 A.5.5", "ISO 27001 A.5.6"],
  },
  {
    id: "REF-001",
    level: "Reference",
    domain: "Governance",
    title: "Regulatory Authority and Information Sharing Contact Register",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "GOV-001",
    children: [],
    purpose: "Master register of all regulatory authority and information sharing contacts for use during incident response and regulatory notification events. Published as Section 6 of GOV-001. Must be reviewed quarterly and updated within 5 business days of any contact change. Supports NIS2 Art. 23 notification (national CSIRT/NCA), GDPR Art. 33 (data protection supervisory authorities), HIPAA (HHS OCR), GxP regulatory authorities (FDA, EMA, MHRA), and voluntary information sharing (ENISA, H-ISAC, CISA).",
    keyContents: [
      "10 authority entries: national CSIRT, NCA, ICO, lead EU supervisory authority, US HHS OCR, FDA, EMA/MHRA, ENISA, H-ISAC, CISA.",
      "Per entry: jurisdiction, NIS2 role, contact type, primary contact, secondary contact, submission portal URL, notification SLA.",
      "NIS2 Art. 23 entries carry 24h/72h/1-month SLA markers aligned to SOP-012 Section 10.",
      "Quarterly review requirement; update within 5 business days of contact change; verified by Legal before first use.",
    ],
    regulatoryRef: ["NIS2 Art. 23", "GDPR Art. 33", "HIPAA", "21 CFR Part 11", "ISO 27001 A.5.5", "ISO 27001 A.5.6"],
  },
  {
    id: "PLAN-001",
    level: "Implementation Plan",
    domain: "Governance",
    title: "IMF Gap Remediation — Implementation Plan",
    status: "Complete",
    version: "1.0",
    owner: "CISO",
    parent: "IMF-001",
    children: [],
    purpose: "Documents the gap remediation plan following ISO 27001:2022 Annex A and NIS2 assessments. Maps 12 identified gaps (NIS2-G01 through NIS2-G06, ISO-G01 through ISO-G04, and two conditional gaps) to 13 primary deliverables across three phases. Includes implementation RACI, acceptance criteria, and the final suite state definition (55 documents post-Phase 3).",
    keyContents: [
      "Phase 1 (Weeks 1–3): NIS2 regulatory compliance — GOV-001, SOP-012 v1.1 Art.23 overlay, POL-020 v1.1 Tier 0 training.",
      "Phase 2 (Weeks 4–8): Material gap closure — POL-022/SOP-022 communications security, POL-023/SOP-023 AI governance, POL-017 v1.1 CVD, POL-010 v1.1 threat intelligence.",
      "Phase 3 (Weeks 9–12): Registry updates — REG-001 updated, RACI-001 v1.1, integrity scan clean pass.",
      "Conditional gaps — CLOSED: COND-G01 (SDLC) closed as not applicable — company does not develop software. COND-G02 (test data masking) implemented as POL-004 v1.1 amendment — precautionary policy in place.",
    ],
    regulatoryRef: ["NIS2", "ISO 27001:2022 Annex A"],
  },

  // ── Policies ───────────────────────────────────────────────────────────────
  {
    id: "POL-001",
    level: "Policy",
    domain: "Data Classification",
    title: "Data Classification Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: "IMF-001",
    children: ["SOP-001", "WI-001"],
    purpose: "Mandates classification of all data assets across five sensitivity tiers. Defines handling requirements, labelling standards, and controls per tier.",
    keyContents: [
      "5 sensitivity tiers: Public → Business Use → Sensitive → Sensitive Personal → Highly Confidential",
      "Per-tier handling matrix (access, encryption, external sharing, printing, disposal)",
      "Labelling requirements per tier",
      "Reclassification and declassification process",
      "Data Owner and Custodian responsibilities",
      "Third-party data handling obligations",
    ],
    regulatoryRef: ["ISO 27001", "GDPR", "HIPAA", "CCPA", "GxP", "SOX"],
  },
  {
    id: "POL-002",
    level: "Policy",
    domain: "Data Governance",
    title: "Data Retention and Disposal Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: "IMF-001",
    children: ["SOP-002"],
    purpose: "Defines mandatory minimum and maximum retention periods for all data categories and governs secure, verifiable disposal at end of retention. Establishes the legal hold process to suspend disposal during litigation or regulatory inspection.",
    keyContents: [
      "Retention schedule across 5 categories: GxP/regulated research, financial/SOX, HR/employment, general corporate, and privacy records",
      "GxP non-negotiable minimums: batch records (3yr+), clinical trial (15–25yr), CSV documentation (life of system + 5yr), regulatory submissions (life + 5yr)",
      "SOX retention: 7 years for financial statements, audit workpapers, ITGC evidence; board minutes permanent",
      "Legal hold process: trigger events, notice obligations, IT suspension of deletion schedules, register maintenance",
      "Secure disposal standards by sensitivity tier and media type — NIST 800-88, DIN 66399, cryptographic erasure for cloud",
      "Disposal certificate requirements for Tier 3+ and all GxP records",
      "Third-party disposal vendor approval requirements",
    ],
    regulatoryRef: ["GDPR", "SOX", "GxP", "21 CFR Part 11", "HIPAA", "CCPA"],
  },
  {
    id: "POL-003",
    level: "Policy",
    domain: "Data Governance",
    title: "Data Integrity Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO / QA",
    parent: "IMF-001",
    children: ["SOP-003"],
    purpose: "Mandates ALCOA+ as the governing standard for all GxP and regulated data. Defines audit trail, electronic records, electronic signature, access control, and data entry requirements. Establishes the Data Integrity Risk Assessment programme and incident response framework.",
    keyContents: [
      "Full ALCOA+ standard defined with practical obligations per attribute: Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available",
      "Audit trail requirements: user identity, system-generated timestamps, original/new values, immutability, tamper-evidence",
      "Electronic signature controls under 21 CFR Part 11 and EU Annex 11",
      "Prohibition of shared/generic logins in GxP systems",
      "Data entry rules: contemporaneous recording, paper correction method, electronic amendment controls",
      "Data Integrity Risk Assessment (DIRA) programme: process mapping, vulnerability identification, risk rating, remediation",
      "Data Integrity Officer role and governance structure",
      "4-tier incident severity framework (Critical → Low) with defined response obligations",
      "Training requirements: pre-work and annual for all GxP personnel",
    ],
    regulatoryRef: ["GxP", "21 CFR Part 11", "EU Annex 11", "ICH Q10", "MHRA DI Guidance", "FDA DI Guidance"],
  },
  {
    id: "POL-004",
    level: "Policy",
    domain: "Privacy",
    title: "Privacy Policy",
    status: "Complete",
    version: "1.1 DRAFT",
    owner: "DPO",
    parent: "IMF-001",
    children: ["SOP-004"],
    purpose: "Governs all personal data processing at [Company Name] under GDPR, UK GDPR, CCPA/CPRA, and HIPAA. Defines the 7 data protection principles, lawful bases, ROPA obligations, DPIA triggers, data subject rights (with timelines), cross-border transfer mechanisms, breach notification timelines, and third-party processor requirements.",
    keyContents: [
      "7 GDPR data protection principles with practical company obligations per principle",
      "6 lawful bases for processing with guidance on when each applies and key limitations — including employee consent limitations",
      "Special Category and clinical trial participant data controls: Art. 9 conditions, mandatory DPIA, pseudonymisation, enhanced third-party assessment",
      "ROPA ownership and mandatory fields per entry",
      "DPIA triggers, 6-step process, and supervisory authority consultation threshold",
      "Data subject rights table: 9 rights with response deadlines (GDPR 1 month, CCPA 45 days, HIPAA 30–60 days) and limitations",
      "International transfer mechanisms: adequacy decisions, SCCs + TIA, BCRs, IDTA (UK), derogations",
      "Breach notification timelines: 1hr DPO/CISO, 72hr supervisory authority (GDPR), 60 days HHS (HIPAA)",
      "HIPAA-specific obligations: BAA, minimum necessary, Privacy Officer, workforce training",
      "Children's data controls and DPO consultation requirement",
      "[v1.1] Test data management: default prohibition on production personal data in non-production environments. Approved approaches: synthetic (preferred) / anonymised (irreversible) / pseudonymised (restricted, DPO approval required). 5-step exceptional use process: business case → DPIA → DPO approval (max 30 days) → safeguards → confirmed deletion. Absolute prohibition on Special Category, PHI, and GxP batch/clinical data in non-production — no EXC-001 exception available.",
    ],
    regulatoryRef: ["GDPR", "UK GDPR", "HIPAA", "CCPA", "CPRA", "ISO 27001 A.8.11"],
  },
  {
    id: "POL-005",
    level: "Policy",
    domain: "System Classification",
    title: "System Classification Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: "IMF-001",
    children: ["SOP-005", "WI-005"],
    purpose: "Mandates classification of all information systems across four criticality tiers. Operationalises the dual-input model (data-derived + functional criticality) and drives RPO/RTO, architecture, monitoring, and validation requirements.",
    keyContents: [
      "4 criticality tiers: Extremely Critical → Critical → Standard → None",
      "Dual-input assessment model (Input A: data-derived; Input B: functional)",
      "Final classification rule: higher of A and B prevails",
      "Per-tier controls: RPO/RTO, architecture, backup, monitoring, patching, access review",
      "GxP-Regulated and SOX In-Scope system overlays",
      "Regulatory flags for Asset Register (GxP, 21 CFR Part 11, SOX, HIPAA, GDPR)",
      "8-step classification and approval process",
    ],
    regulatoryRef: ["ISO 27001", "NIST CSF", "GxP", "21 CFR Part 11", "EU Annex 11", "SOX"],
  },
  {
    id: "POL-006",
    level: "Policy",
    domain: "System Classification",
    title: "Computer System Validation and Qualification Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO / Head of Quality Assurance",
    parent: "IMF-001",
    children: ["SOP-006"],
    purpose: "Establishes proportionate assurance requirements for all computer systems based on their POL-005 classification. Defines four assurance tracks (Track A–D) covering GxP-validated systems through lightweight operational tools — ensuring full CSV/CSA rigour where required without imposing regulatory overhead on non-regulated systems.",
    keyContents: [
      "Four assurance tracks: Track A (Full CSV/CSA — GxP flag), Track B (SOX ITGC — SOX flag non-GxP), Track C (Structured Qualification — Tier 1/2 no regulatory flag), Track D (Lightweight Testing — Tier 3/4 no regulatory flag)",
      "Track A lifecycle: Supplier Assessment → URS → Risk Assessment → IQ/OQ/PQ (or CSA equivalent) → Formal Release Decision → Continued Process Verification",
      "GAMP 5 (2022) software categories (Cat 1/3/4/5) with validation approach per category",
      "Validation impact assessment matrix for Track A changes: No Impact / Minor / Major / System Replacement with corresponding re-validation obligations",
      "Validation Master File (VMF) requirements — retained life of system + 5 years",
      "21 CFR Part 11 / EU Annex 11 compliance requirements built into Track A URS and OQ",
      "Track B ITGC evidence domains: Change Management, Logical Access, Computer Operations, Program Development, Configuration Baseline",
      "Track C structured qualification: URS, test plan, test execution evidence, known issues register, formal sign-off",
      "Track D lightweight: acceptance testing + deployment approval documentation only",
      "Third-party / cloud additional obligations by track; decommissioning validation closure requirements",
    ],
    regulatoryRef: ["21 CFR Part 11", "EU Annex 11", "GAMP 5", "GxP", "SOX", "ISO 27001"],
  },
  {
    id: "POL-007",
    level: "Policy",
    domain: "System Classification",
    title: "Change Management Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: "IMF-001",
    children: ["SOP-007"],
    purpose: "Establishes mandatory requirements for planning, assessing, authorising, testing, implementing, and documenting all changes to information systems. Change rigour scales with system criticality tier and regulatory flags — highest controls for Track A GxP systems, proportionate controls for non-regulated systems.",
    keyContents: [
      "Four change types: Standard (pre-approved, logged only), Normal (full CAB process), Emergency (CISO + CIO pre-approval, retrospective documentation within 48 hours), Minor (System Owner approval for non-regulated Tier 3/4 only)",
      "No Minor Change category for Track A (GxP) systems — every change regardless of perceived impact requires validation impact assessment",
      "Standard impact assessment required for all Normal Changes (technical, service, security, data, rollback, test plan)",
      "Track A validation impact assessment matrix: audit trail changes → highest risk, immediate Compliance / QA escalation required",
      "Track B ITGC impact assessment for SOX-scoped systems",
      "Change Approval Authority Matrix by system type: Track A requires Compliance / QA approval; Tier 1 requires CIO; Emergency requires CISO + CIO",
      "CAB: weekly cadence, mandatory for Track A/B/C; Emergency CAB (ECAB) on demand",
      "Normal Change 7-step process including mandatory non-production testing and post-implementation verification (PIV)",
      "Emergency Change 7-step process with timed obligations (CR within 4 hours, ECAB within 48 hours, validation assessment within 5 business days)",
      "Change freeze periods: financial close (SOX), regulatory inspection, high-risk deployment, holiday windows",
    ],
    regulatoryRef: ["SOX", "ISO 27001", "GxP", "21 CFR Part 11", "EU Annex 11", "GAMP 5"],
  },
  {
    id: "POL-008",
    level: "Policy",
    domain: "Access & Identity",
    title: "Access Control Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-008"],
    purpose: "Establishes mandatory requirements for controlling access to all systems across the full identity lifecycle. Access controls — MFA requirements, review frequency, approval thresholds — scale with the system's POL-005 criticality tier and regulatory flags. Implements 21 CFR Part 11 / EU Annex 11 individual user account requirements as a regulatory compliance measure, not merely a security control.",
    keyContents: [
      "Six governing principles: Least Privilege, Need to Know, Individual Accountability, Separation of Duties, Default Deny, Access Proportionality",
      "Identity lifecycle: provisioning approval matrix by tier (Tier 1/GxP requires Compliance / QA training confirmation before access granted), RBAC mandatory for Tier 1/2 and all GxP, Joiners/Movers/Leavers table with specific timelines",
      "MFA requirements by tier: Tier 1 — FIDO2 mandatory, SMS OTP prohibited; Tier 2 — TOTP or FIDO2; Tier 3 remote — mandatory; Tier 4 — recommended. 90-day migration requirement for existing SMS OTP on Tier 1/2.",
      "Password standards table: minimum length 16 chars (Tier 1) to 10 chars (Tier 4); lockout thresholds; history requirements by tier",
      "Access review frequency: quarterly (Tier 1/GxP/SOX), semi-annual (Tier 2 non-SOX), annual (Tier 3/4); process requires authoritative system export — not cached lists",
      "Remote access: VPN/ZTNA mandatory; personal devices prohibited for Tier 1/2 and GxP; inactivity timeout 15 min (Tier 1) to 60 min (Tier 4); third-party persistent access prohibited",
      "Third-party access: named individuals only, time-limited, Sponsor accountability, DPA prerequisite for personal data systems",
      "GxP section: 21 CFR Part 11 / EU Annex 11 compliance table — individual accounts, operational authority checks, inactivity controls, audit trail of access changes, anomalous access monitoring",
      "SOX ITGC section: quarterly access review evidence, SoD matrix, deprovisioning records, 7-year retention",
    ],
    regulatoryRef: ["ISO 27001", "SOX", "HIPAA", "GDPR", "21 CFR Part 11", "EU Annex 11", "NIST SP 800-53"],
  },
  {
    id: "POL-009",
    level: "Policy",
    domain: "Access & Identity",
    title: "Privileged Access Management Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-009"],
    purpose: "Establishes mandatory controls for all privileged identities — human admins, service accounts, system accounts, break-glass accounts, and third-party privileged users. Supplements POL-008 with elevated controls proportionate to tier. Addresses the key insight that for GxP systems, any privileged action modifying audit trail configuration or access settings is a POL-007 change event — not an operational routine.",
    keyContents: [
      "Six core principles: separate privileged/standard accounts; JIT access; just-enough access; no standing privileged access to production GxP; all sessions logged; no privileged sharing",
      "Privileged Account Inventory: mandatory fields, quarterly reconciliation for Tier 1/GxP/SOX, discovery of unlisted accounts treated as unauthorised",
      "Tier-scaled requirements matrix: MFA (FIDO2 for Tier 1), JIT mandatory for Tier 1/2 via PAM platform, session recording mandatory for Tier 1 and SOX, monthly review for Tier 1/GxP, dual approval for audit trail config changes",
      "Service account controls: one purpose per account, documented ownership, no interactive login, credentials in approved secrets management platform, rotation schedule by tier (90 days Tier 1/2, annual Tier 3/4), API keys with expiry dates",
      "Break-glass process: physical sealed envelope storage, CISO pre-authorisation required, witness at envelope opening, immediate credential rotation post-use, 48-hour post-use review, all uses reported to ISSG",
      "Third-party privileged access: named individual accounts only, time-limited activation per maintenance window, mandatory supervision for Tier 1/GxP sessions, GxP change record required for configuration actions",
      "Privileged access review cadence: monthly (Tier 1/GxP/SOX), quarterly (Tier 2 + all service accounts), semi-annual (Tier 3 + break-glass)",
      "Monitoring alerts: out-of-hours privileged access, service account interactive login, GxP access outside change event, audit trail config change (Critical alert)",
    ],
    regulatoryRef: ["ISO 27001", "SOX", "21 CFR Part 11", "EU Annex 11", "HIPAA", "NIST SP 800-53", "CIS Controls v8"],
  },
  {
    id: "POL-010",
    level: "Policy",
    domain: "Risk & Resilience",
    title: "Information Security Risk Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-010"],
    purpose: "Establishes the overarching IS risk framework that all other IMF policies feed into. Defines risk appetite by category (GxP Data Integrity: near-zero tolerance; Regulatory Compliance: very low; Data Confidentiality: low; Operational Availability: low–medium; IS Operational: medium). Governs the Risk Register, annual ISRA, system-level risk assessments, vulnerability management SLAs, and Board-level risk reporting. DIRA (SOP-003) and DPIA (SOP-004) are domain-specific instances of this framework.",
    keyContents: [
      "Risk appetite and tolerance table: 5 categories with explicit residual risk thresholds — GxP data integrity Critical/High risks cannot be accepted; they must be treated",
      "5×5 likelihood × impact matrix — same scale as DIRA (SOP-003) and DPIA (SOP-004) for direct comparability across all risk domains",
      "Risk rating response table: Critical (5-day treatment plan, GxP system may not operate), High (30-day plan, CISO approval), Medium (90-day plan), Low/Very Low (document and monitor)",
      "Risk assessment process: system-level (pre-go-live Tier 1/2, GxP), annual ISRA (7-step process including Board reporting), trigger-based assessments (post-incident, regulatory change, M&A)",
      "Risk treatment options: Mitigate / Transfer / Accept / Avoid — with approval authority matrix. GxP risks: Compliance / QA must co-sign all risk acceptance decisions",
      "Vulnerability management SLA table: Critical CVSS ≥9.0 → 24hrs; High Tier 1/2 → 7 days; High Tier 3/4 → 30 days; Medium Tier 1/2 → 30 days. GxP patch/validation sequencing guidance.",
      "Risk Register structure: 17 mandatory fields including ISR-YYYY-NNN ID format, inherent vs residual scoring, treatment plan linkage, and 7-year retention for closed risks",
      "Risk Register governance: monthly (CISO, Critical/High), quarterly (ISSG), annual (ISRA + Board). DIRA↔Risk Register alignment confirmed quarterly.",
      "Domain-specific risk process integration table: DIRA, DPIA, vendor risk, SOX ITGC, system security — all sub-registers or feed into the IS Risk Register",
      "Three-way accountability separation: Risk Owner (business decision) ≠ Control Owner (technical implementation) ≠ Information Security (programme governance)",
    ],
    regulatoryRef: ["ISO 27001", "ISO 31000", "NIST SP 800-30", "SOX", "GDPR", "GxP", "21 CFR Part 11"],
  },
  {
    id: "POL-011",
    level: "Policy",
    domain: "Risk & Resilience",
    title: "Business Continuity Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: "IMF-001",
    children: ["SOP-011"],
    purpose: "Establishes BC/DR requirements scaled directly to POL-005 criticality tiers. Defines RTO/RPO targets, BIA requirements, DR plan content, and testing cadence. Contains a critical GxP-specific requirement absent from most BC policies: a restored GxP system must return to its validated state (not just operational state) before regulated activities can resume — untested DR is non-compliant with EU Annex 11 §16–17.",
    keyContents: [
      "RTO/RPO table by tier: Tier 1 — 2hr RTO / 1hr RPO (active-active/hot standby); Tier 2 — 8hr/4hr (warm); Tier 3 — 24hr/24hr; Tier 4 — 72hr/72hr. Cloud providers must contractually meet these targets.",
      "BIA requirements: 5 components including MTPD definition, dependency mapping (systems that depend on a Tier 2 inherit Tier 1 recovery priority), regulatory consequence assessment per tier and flag, and financial quantification for Tier 1.",
      "Mandatory BCP/DRP content: DR architecture, step-by-step recovery procedure by failure scenario, GxP validated state restoration procedure (5-step, requires Compliance/QA sign-off and VMF documentation), SOX evidence preservation, communication plan, escalation thresholds.",
      "DR testing table: full failover (Tier 1, annual — must meet RTO/RPO, GxP validated state restoration executed), tabletop (Tier 2 annual; Tier 1 semi-annual), backup restoration test (Tier 1/2 quarterly), plan review (Tier 3 biennial, Tier 4 triennial).",
      "GxP-specific section: DR provisions must be validated in OQ (Annex 11 §17 compliance); manual backup procedure mandatory for all GxP systems; audit trail continuity during DR is a data integrity obligation; VMF must document every DR event and test.",
      "SOX-specific: financial close calendar drives change freeze for DR tests; ITGC evidence preservation scope; loss of audit trail records in SOX system is a material ITGC finding.",
      "BC/DR activation handoff from POL-012: CIO assumes recovery command; CISO retains investigation command; dual workstreams with coordinated checkpoints.",
    ],
    regulatoryRef: ["ISO 22301", "ISO 27001", "EU Annex 11", "GxP", "SOX", "GDPR"],
  },
  {
    id: "POL-012",
    level: "Policy",
    domain: "Risk & Resilience",
    title: "Incident Response Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-012"],
    purpose: "Defines the complete incident response lifecycle for all incident types — security, data integrity, personal data breach, availability, and insider threat. The policy explicitly names the containment-vs-evidence-preservation tension and sequences them correctly: evidence preservation runs in parallel with containment, never after. Regulatory notification obligations (GDPR 72hr, HIPAA 60-day, GxP authority notification) are hard deadlines managed from the moment of awareness — not confirmation.",
    keyContents: [
      "Five incident types covered: security, GxP data integrity, personal data breach, service availability, insider threat.",
      "Universal reporting obligation: all staff, no minimum certainty threshold required. GDPR clock starts when Information Security logs the report — not when breach is confirmed.",
      "IRT composition table: Incident Commander, Technical Lead, CISO (P1/P2), CIO (BC/DR), GxP Incident Lead/Compliance QA (any GxP system), DPO (personal data), Legal (enforcement risk).",
      "Severity matrix: P1 Critical (ransomware Tier 1, confirmed exfiltration, audit trail manipulation, >1000 data subjects) → IC within 15min, IRT within 30min. P2 High (confirmed unauthorised access Tier 1/2, privileged account compromise) → IC within 30min.",
      "Six-stage lifecycle: Detect → Triage → Contain+Preserve (simultaneous — forensic images before remediation) → Eradicate → Recover (GxP validated state, Compliance/QA sign-off required) → Post-Incident Review.",
      "Regulatory notification table: GDPR Art.33 (72hr to supervisory authority), GDPR Art.34 (data subjects, high risk), HIPAA individual/HHS/media, GxP authority notification (FDA/EMA/MHRA assessment within 24–48hr), SOX ITGC evidence loss → CFO + external auditors.",
      "BC/DR handoff criteria: RTO breach, eradication > MTPD, or multi-system/site impact. CIO + CISO + IC jointly decide.",
      "Incident-specific requirements: GxP (no restart without validated state confirmation), ransomware (BC/DR immediate, assume all credentials compromised, DPO 24hr assessment), privileged account (disable immediately, all accessible systems treated as affected, session recording review).",
    ],
    regulatoryRef: ["ISO 27001", "NIST SP 800-61", "GDPR", "HIPAA", "21 CFR Part 11", "EU Annex 11", "SOX"],
  },
  {
    id: "POL-015",
    level: "Policy",
    domain: "Risk & Resilience",
    title: "IT Service Management and Operational Incident Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: "IMF-001",
    children: ["SOP-015"],
    purpose: "Governs operational IT incidents — unplanned service disruptions caused by hardware failure, software faults, infrastructure issues, or configuration error — where there is no malicious intent. Explicitly distinct from POL-012 (security incidents). Contains a critical GxP-specific requirement: any unplanned outage of a GxP system is a qualification event requiring VMF documentation, Compliance/QA involvement, and validated state sign-off before regulated activities resume.",
    keyContents: [
      "Scope boundary with POL-012: operational incidents transition to security incident process if malicious activity detected; both processes may run in parallel",
      "P1–P4 severity matrix by business impact and system tier: P1 → CIO within 15min, Compliance/QA within 30min (GxP), 4-hour resolution target",
      "Six-stage lifecycle: Detect/Log → Classify/Escalate → Investigate/Diagnose → Resolve (all production changes via POL-007 emergency change) → Confirm/Close (GxP: Compliance/QA sign-off required) → PIR and Problem Management",
      "Major Incident Process (P1): MIT composition, 30-minute stakeholder communication cadence, BC/DR escalation criteria (RTO breach or MTPD at risk → POL-011 activation)",
      "GxP section (Section 6): 7 mandatory requirements including — Compliance/QA notification for ALL GxP incidents regardless of severity, incident period documented in audit trail, validation status assessment before restart, Compliance/QA sign-off, VMF incident record, regulatory notification assessment, CAPA where validated state impact confirmed",
      "SOX section: Finance/Internal Audit notification for P1/P2, financial data integrity confirmation before restart, ITGC evidence loss = potential control deficiency",
      "Problem Management: Problem Record → RCA (5-Whys/Fishbone) → Known Error Register → POL-007 change request → closure only after 30-day monitoring with no recurrence (GxP: requires CAPA completion and VMF update)",
      "Decision table: 7 specific cross-policy trigger conditions with mandatory actions — covers security handoff (POL-012), BC/DR activation (POL-011), change management (POL-007), GxP validation (POL-006), privacy (SOP-004), risk register (POL-010), SOX evidence (POL-002)",
    ],
    regulatoryRef: ["ISO 20000", "ITIL 4", "EU Annex 11", "21 CFR Part 11", "GxP", "SOX"],
  },
  {
    id: "POL-013",
    level: "Policy",
    domain: "Third Party",
    title: "Third Party and Vendor Risk Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO / Legal",
    parent: "IMF-001",
    children: ["SOP-013"],
    purpose: "Governs the full lifecycle of third-party relationships — from pre-engagement assessment to offboarding — wherever a vendor accesses systems, processes data, or performs functions on [Company Name]'s behalf. Vendor risk tier is driven directly by the POL-005 tier of the systems they access: a vendor with admin access to a Tier 1 GxP system receives Tier A (Critical) scrutiny. No vendor may access systems or process data until all applicable requirements are satisfied — there is no provisional access exception.",
    keyContents: [
      "Vendor risk tier table (A–D): Tier A = access to Tier 1 or GxP system, or processes Special Category/PHI data; Tier B = Tier 2 or SOX system access; Tier C = Tier 3 access or contractor personnel; Tier D = no system/data access. Tier re-assessment required on any scope change.",
      "Pre-engagement assessment matrix: Tier A requires ISO 27001/SOC 2 Type II, penetration test within 12 months, full DPIA, GxP vendor qualification, sub-processor mapping, financial due diligence. Self-attestation acceptable for Tier C only.",
      "Contractual requirements table: DPA (GDPR Art. 28) mandatory for personal data processing at all tiers; BAA (HIPAA) mandatory for PHI; Right to audit mandatory Tier A/B; Incident notification SLA — 24hr (Tier A), 48hr (Tier B), 72hr (Tier C); data destruction within 30 days of termination with written certification.",
      "GxP vendor qualification (Section 7): 5-step process — vendor assessment, Technical Agreement (SDLC, change notification, sub-contracting obligations), ongoing change notification, annual qualification review, dequalification/Validation Closure Report on offboarding. All evidence in VMF.",
      "International transfer mechanisms: EU SCCs + Transfer Impact Assessment for high-risk jurisdictions; UK IDTA; adequacy decisions; BCRs. DPO must confirm mechanism before transfer begins.",
      "Ongoing monitoring: Tier A — annual full reassessment, SOC 2/ISO cert renewal confirmation, continuous threat intelligence monitoring, monthly privileged account review, annual contract review. Tier A vendor financial health reviewed annually.",
      "Vendor incident response: vendor breach notification triggers POL-012 IR; GDPR 72-hour clock runs from [Company Name]'s awareness; GxP vendors — Compliance/QA notified immediately; vendor access suspended pending investigation.",
      "Offboarding: access revoked end of last day (Tier 1 privileged: immediate), credential rotation, data destruction certification within 30 days, GxP Validation Closure Report, VMF archive.",
    ],
    regulatoryRef: ["ISO 27001", "ISO 27036", "GDPR Art.28", "HIPAA", "EU Annex 11", "21 CFR Part 11", "SOX", "GxP"],
  },
  {
    id: "POL-014",
    level: "Policy",
    domain: "Compliance & Audit",
    title: "Audit Trail and Monitoring Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO / DIO",
    parent: "IMF-001",
    children: ["SOP-014"],
    purpose: "The most technically specific document in the IMF suite. Defines what audit trail records must contain, and — most critically — that they must be technically immutable: unmodifiable and undeletable by any user including system administrators. This is a regulatory baseline for GxP systems (21 CFR Part 11 §11.10(e), EU Annex 11 §9), not a recommendation. Audit trail manipulation capability is the single most common Critical finding in global regulatory inspections. The Policy also defines the monitoring programme that turns log records into actionable security and compliance intelligence.",
    keyContents: [
      "Mandatory audit trail content: user identity (never shared/generic accounts), server-generated timestamp in UTC, event type, object affected, outcome. GxP additional fields: before/after values for every modification, reason for change, electronic signature reference.",
      "Immutability requirements (Section 4): technical controls mandatory — WORM storage, append-only tables with no UPDATE/DELETE for any DB role including DBA, cryptographic hash chaining, or immutable cloud audit services. Documented procedures prohibiting alteration are explicitly stated as NOT equivalent to technical controls.",
      "Time synchronisation: all systems NTP-synchronised; clock drift >1 second on GxP/Tier 1 generates alert; NTP validated in IQ/OQ; UTC stored (local time display permitted in UI).",
      "GxP-specific requirements (Section 5.1): audit trail scope is whole-system (no selective coverage); technically cannot be disabled by any user; must be validated in Track A OQ (5 test points); available in human-readable format for inspectors without vendor tooling; retention = life of system + GxP retention period (minimum 5 years; clinical trials typically 15–25 years).",
      "SIEM requirements (Section 6): all Tier 1/2 and GxP/SOX systems forward to SIEM within 5 minutes; log forwarding failure alerts within 15 minutes; SIEM storage itself is immutable; GxP logs in SIEM complement (not replace) system-level audit trail.",
      "Continuous automated monitoring alerts (Section 7.1): 5 categories — authentication anomalies (impossible geography, ≥5 failures in 10min), privileged access anomalies (immediate CISO alert), audit trail integrity gaps (immediate DIO + CISO alert, treated as simultaneous SOP-003 and POL-012 incident), data exfiltration indicators, vulnerability exploitation.",
      "Periodic review programme (Section 7.2): GxP audit trail review per SOP-003; access review quarterly (Tier 1/GxP/SOX); privileged access review monthly (Tier 1/GxP); SOX ITGC audit trail review quarterly; annual comprehensive log coverage review.",
      "Retention table: GxP = life of system + GxP period; SOX ITGC = 7 years; Security Tier 1/2 = 3 years; GDPR = underlying data retention + 3 years; HIPAA = 6 years; P1 forensic = 7 years. SIEM retention set to longest applicable period.",
    ],
    regulatoryRef: ["21 CFR Part 11 §11.10(e)", "EU Annex 11 §9", "ICH Q10", "GDPR Art.32", "HIPAA §164.312(b)", "SOX §404", "ISO 27001", "NIST SP 800-92"],
  },

  // ── SOPs ───────────────────────────────────────────────────────────────────
  {
    id: "SOP-001",
    level: "SOP",
    domain: "Data Classification",
    title: "Data Classification Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-001",
    children: ["WI-001"],
    purpose: "Operationalises POL-001. Defines the end-to-end process for classifying a data asset — from identification through labelling, controls implementation, Asset Register entry, and annual review.",
    keyContents: [
      "7 trigger events that initiate classification (creation, receipt, scope change, annual review, etc.)",
      "8-step classification workflow with named responsible party per step",
      "Callout-flagged GxP and third-party decision points",
      "Upward and downward reclassification requirements and approval thresholds",
      "5-step dispute escalation path (Data Owner → InfoSec → CISO)",
      "Records retention schedule for all classification evidence",
      "Non-compliance and incident reporting obligations",
    ],
    regulatoryRef: ["ISO 27001", "GDPR", "GxP", "SOX"],
  },
  {
    id: "SOP-005",
    level: "SOP",
    domain: "System Classification",
    title: "System Classification Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-005",
    children: ["WI-005"],
    purpose: "Operationalises POL-005. Defines the end-to-end process for classifying a system using the dual-input model — from trigger through Input A/B assessment, reconciliation, regulatory flag assignment, approval, Asset Register entry, and controls verification.",
    keyContents: [
      "Pre-conditions: System Owner, data classification, and vendor documentation requirements",
      "6 trigger events including procurement, development, material change, and regulatory scope change",
      "Input A (data-derived criticality) workflow — references SOP-001 outputs",
      "Input B (functional criticality) workflow — 5 structured assessment questions with guidance",
      "Final classification reconciliation table with real-world examples (DNS, ERP, CDMS)",
      "Regulatory flag assignment: GxP, 21 CFR Part 11, SOX, HIPAA, GDPR — with minimum tier uplift rules",
      "Tiered approval workflow (InfoSec for Tier 2–3; CISO co-approval for Tier 1)",
      "Controls verification matrix per tier across 7 domains",
      "Additional requirements for third-party and cloud-hosted systems",
    ],
    regulatoryRef: ["ISO 27001", "GxP", "21 CFR Part 11", "EU Annex 11", "SOX"],
  },

  // ── Work Instructions ──────────────────────────────────────────────────────
  {
    id: "SOP-002",
    level: "SOP",
    domain: "Data Governance",
    title: "Data Retention and Disposal Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-002",
    children: [],
    purpose: "Operationalises POL-002. Defines step-by-step processes for assigning retention periods at classification, executing scheduled disposal with certificates, managing legal holds (issue, maintain, lift, post-hold disposal), handling reclassification-triggered retention reviews, and managing data disposal on third-party offboarding and system decommissioning.",
    keyContents: [
      "6 trigger events mapped to 6 sub-processes (A–F)",
      "Process A — Retention Period Assignment: category identification, regulatory flag confirmation, trigger event determination, Asset Register recording, system control configuration",
      "Process B — Scheduled Disposal: 90-day notification, legal hold check, 4-criteria eligibility confirmation, method selection per sensitivity tier and media type, execution, disposal certificate production, Asset Register update",
      "Process C — Legal Hold: LH-YYYY-NNN reference format, notice within 1 business day, IT suspension within 1 business day, quarterly reviews, release notice, post-hold disposal within 30 days",
      "Process D — Reclassification-triggered retention review: uplift/downlift rules per flag type (GxP, SOX, personal data)",
      "Process E — Third-party and system decommissioning disposal",
      "Process F — Annual retention schedule review (6-step)",
      "Exception matrix: GxP disposal before regulatory minimum is not permitted under any circumstances",
    ],
    regulatoryRef: ["GDPR", "SOX", "GxP", "21 CFR Part 11", "HIPAA", "CCPA"],
  },
  {
    id: "SOP-003",
    level: "SOP",
    domain: "Data Governance",
    title: "Data Integrity Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Compliance / QA",
    parent: "POL-003",
    children: [],
    purpose: "Operationalises POL-003. Defines procedures for conducting Data Integrity Risk Assessments (DIRAs), configuring and reviewing audit trails in GxP systems, delivering data integrity training, reporting and investigating incidents with 4-tier severity, and conducting annual programme review including inspection readiness.",
    keyContents: [
      "5 processes (A–E): DIRA, Training, Audit Trail Review, Incident Response, Annual Review",
      "Process A — DIRA: 8-step process, risk matrix (Critical 15–25, High 8–14, Medium 4–7, Low 1–3), mandatory for new GxP systems before go-live, every 3 years minimum",
      "Process B — Training: pre-commencement requirement with 80% pass mark, annual refresher, non-compliance escalation pathway including access suspension",
      "Process C — Audit Trail Review: tiered schedule (monthly Tier 1, quarterly Tier 2, semi-annual Tier 3), anomaly taxonomy (timestamp, user account, data pattern, system configuration), 3-tier finding classification",
      "Process D — Incident: immediate preservation steps, 4-hour triage, root cause analysis, regulatory notification assessment (5 days for Critical/High), CAPA with effectiveness verification",
      "Process E — Annual Review: DIRA Register, incident log, audit trail log, training, regulatory landscape, SOP currency, inspection readiness checklist",
    ],
    regulatoryRef: ["GxP", "21 CFR Part 11", "EU Annex 11", "ICH Q10", "MHRA DI Guidance", "FDA DI Guidance"],
  },
  {
    id: "SOP-004",
    level: "SOP",
    domain: "Privacy",
    title: "Privacy Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "DPO",
    parent: "POL-004",
    children: [],
    purpose: "Operationalises POL-004. Defines procedures for ROPA registration, DPIA conduct (through to supervisory authority consultation), Data Subject Request handling for all 9 rights across GDPR/CCPA/HIPAA, personal data breach response (72-hour timeline), cross-border transfer assessment (TIA), and annual ROPA review.",
    keyContents: [
      "6 processes (A–F): ROPA, DPIA, DSR, Breach Response, Cross-Border Transfer, Annual Review",
      "Process A — ROPA: intake form, lawful basis review, DPIA screening, entry creation, privacy notice update check",
      "Process B — DPIA: mandatory trigger list, 6-step process, risk rating (High ≥15, Medium 8–14, Low 1–7), supplementary measures, supervisory authority consultation threshold",
      "Process C — DSR: response deadline table (GDPR 1 month, CCPA 45 days, HIPAA 30 days), identity verification standards by sensitivity, 7-step handling process, CCPA opt-out 15-day implementation",
      "Process D — Breach Response: timed obligation table (T+0 through T+72hrs and HIPAA 60 days), notification/no-notification assessment factors, GDPR Art. 33(3) content requirements, data subject notification plain language standard",
      "Process E — Cross-Border Transfer: adequacy check, mechanism selection (SCCs, IDTA, BCRs, Art. 49), TIA assessment framework (surveillance laws, SCC effectiveness, supplementary measures)",
      "Process F — Annual ROPA Review",
    ],
    regulatoryRef: ["GDPR", "UK GDPR", "HIPAA", "CCPA", "CPRA"],
  },

  // ── Work Instructions ──────────────────────────────────────────────────────
  {
    id: "WI-001",
    level: "Work Instruction",
    domain: "Data Classification",
    title: "Data Classification Questionnaire",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "SOP-001",
    children: [],
    purpose: "Operational classification tool used at SOP-001 Step 3. A person sits down with a data asset and works through Parts A–C in order to produce a definitive sensitivity tier and regulatory flag set. Applies the highest-applicable-tier rule throughout: a single YES to a higher-tier question is sufficient for that tier regardless of all other answers.",
    keyContents: [
      "Part A — Asset Identification: 10-field asset context form covering asset type, owner, custodian, storage location, access scope, and trigger for classification",
      "Part B — Sensitivity Classification: four sections (B1 SENSITIVE, B2 CONFIDENTIAL, B3 INTERNAL USE, B4 PUBLIC) with 21 questions in total; each question maps to a tier and carries a regulatory flag annotation (GDPR Art.9, HIPAA, GxP/21 CFR Part 11, SOX, IP, MNPI)",
      "Part B1 SENSITIVE indicators: 7 questions covering Special Category data (GDPR Art.9), PHI (HIPAA), GxP raw/audit trail data, unpublished IP/trade secrets, MNPI, authentication credentials for Tier 1 systems, and regulatory orders",
      "Part B2 CONFIDENTIAL indicators: 6 questions covering standard personal data (GDPR Art.4), employee/HR data, detailed financial data, NDA-bound third-party data, security documentation, and harm threshold assessment",
      "Part C — Output: sensitivity tier result with trigger question IDs; 8-flag regulatory table (GxP, GDPR Standard, GDPR Special Category, HIPAA/PHI, SOX, 21 CFR Part 11, IP/Trade Secret, MNPI) each with specific downstream control implication; handling controls matrix comparing all 4 tiers across 8 control dimensions; approval and Asset Register entry fields",
      "PUBLIC classification requires affirmative YES to all three of: already published, Data Owner explicit approval, Legal confirmation — 'probably fine to share' does not qualify",
    ],
    regulatoryRef: ["ISO 27001", "GDPR Art.4/9", "HIPAA", "21 CFR Part 11", "EU Annex 11", "SOX"],
  },
  {
    id: "WI-005",
    level: "Work Instruction",
    domain: "System Classification",
    title: "System Classification Questionnaire",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "SOP-005",
    children: [],
    purpose: "Operational classification tool used at SOP-005 Step 3. Produces two outputs: (1) Criticality Tier (Tier 1–4) as the higher of data-derived and functional criticality, applying dependency elevation where applicable; (2) Regulatory Flags (GxP, 21 CFR Part 11, EU Annex 11, SOX, GDPR, HIPAA, CCPA). Includes a worked example showing composite tier determination.",
    keyContents: [
      "Part A — System Identification: 11-field system context form covering system type, hosting model, owner, custodian, classification trigger, vendor, and integration dependencies",
      "Part B — Data Content Assessment: tabular assessment of all data assets held by the system with per-asset sensitivity tier (from WI-001), GxP/personal data/PHI/SOX flags, and data-derived criticality mapping (SENSITIVE→Tier 1, CONFIDENTIAL→Tier 2, INTERNAL→Tier 3, PUBLIC→Tier 4)",
      "Part C — Dependency Assessment: identifies dependency-driven tier elevation — a system that is a critical dependency of a Tier 1 system inherits Tier 1 classification for recovery priority",
      "Part D — Functional Criticality Scoring: five independent dimensions each scored 1–5: D1 Business Process Impact, D2 User Population, D3 Recovery Time Requirement, D4 Regulatory Process Involvement, D5 Financial Reporting and Revenue Impact. Tier determined by highest single dimension score, not average. Score 5 or 4 → Tier 1; Score 3 → Tier 2; Score 2 → Tier 3; Score 1 → Tier 4.",
      "Part E — Composite Tier: higher of data-derived (Part B) and functional (Part D), then dependency elevation applied. Tier reference table includes RTO/RPO targets and DR testing cadence for all four tiers.",
      "Part F — Regulatory Flag Determination: 7-flag assessment (GxP, 21 CFR Part 11, EU Annex 11, SOX, GDPR, HIPAA, CCPA) each with specific determining questions and consequences if flagged",
      "Part G — Output: classification summary, 13-item controls initiation checklist with owner and target date fields, multi-role approval section (System Owner, Information Security, Compliance/QA for GxP, DPO for GDPR/HIPAA), and a full worked example showing QMS composite tier determination across all five dimensions",
    ],
    regulatoryRef: ["ISO 27001", "GxP", "21 CFR Part 11", "EU Annex 11", "SOX", "GDPR", "HIPAA", "CCPA"],
  },

  // ── SOPs for Domains 2–6 ──────────────────────────────────────────────────
  {
    id: "SOP-006",
    level: "SOP",
    domain: "System / Validation",
    title: "Computer System Validation and Qualification Process",
    status: "Planned",
    version: "—",
    owner: "Compliance / QA",
    parent: "POL-006",
    children: [],
    purpose: "Operationalises POL-006. Defines the end-to-end validation lifecycle for GxP computer systems — project initiation through to validated state maintenance. Establishes the Validation Master File (VMF) structure, mandatory deliverables per track (A/B/C/D), and the process for managing changes and deviations within the validated state.",
    keyContents: [
      "Validation lifecycle stages: initiation → VMP → URS → risk assessment → design qualification → IQ → OQ → PQ → validation report → ongoing monitoring",
      "Track-specific deliverable matrices per POL-006 assurance tracks A–D",
      "VMF structure and mandatory contents",
      "Periodic review and re-qualification triggers",
      "Deviation and CAPA management within validated state",
      "Retirement and data migration from validated systems",
    ],
    regulatoryRef: ["21 CFR Part 11", "EU Annex 11", "GAMP 5", "ICH Q10"],
  },
  {
    id: "SOP-007",
    level: "SOP",
    domain: "System / Validation",
    title: "Change Management Process",
    status: "Planned",
    version: "—",
    owner: "Information Security",
    parent: "POL-007",
    children: [],
    purpose: "Operationalises POL-007. Defines the end-to-end change lifecycle from request through to post-implementation review, including CAB governance, GxP impact assessment, emergency change procedure, and the standard/normal/emergency category definitions that all other SOPs reference.",
    keyContents: [
      "Change categories: Standard / Normal / Emergency — criteria and approval paths for each",
      "Change lifecycle: Request → Categorisation → Impact Assessment → CAB Review → Approval → Implementation → PIR",
      "GxP impact assessment: change classification against validated state, test extent determination, VMF update requirements",
      "Emergency Change procedure: verbal authorisation, 24-hour retrospective CAB, mandatory documentation",
      "Change freeze periods and scheduling",
      "Failed change and back-out procedure",
    ],
    regulatoryRef: ["ISO/IEC 27001", "EU Annex 11", "21 CFR Part 11", "ITIL 4"],
  },
  {
    id: "SOP-008",
    level: "SOP",
    domain: "Access & Identity",
    title: "Access Control Process",
    status: "Planned",
    version: "—",
    owner: "Information Security",
    parent: "POL-008",
    children: [],
    purpose: "Operationalises POL-008. Defines the joiner/mover/leaver access lifecycle — provisioning, modification, and deprovisioning — including role-based access request, manager approval, Data Custodian (IT) implementation, and periodic access review cadence by system tier.",
    keyContents: [
      "Joiner process: request → role assignment → manager approval → Data Custodian (IT) provisioning → confirmation",
      "Mover process: HR-triggered role change → access delta assessment → approval → update",
      "Leaver process: HR trigger → access suspension within 24hr → full removal within 5 business days → confirmation",
      "Periodic access review: Tier 1/GxP monthly, Tier 2 quarterly, Tier 3/4 annually",
      "GxP system provisioning: named individual accounts mandatory, shared accounts prohibited",
      "Segregation of duties conflict detection",
    ],
    regulatoryRef: ["ISO/IEC 27001", "SOX", "GDPR", "EU Annex 11", "21 CFR Part 11"],
  },
  {
    id: "SOP-009",
    level: "SOP",
    domain: "Access & Identity",
    title: "Privileged Access Management Process",
    status: "Planned",
    version: "—",
    owner: "Information Security",
    parent: "POL-009",
    children: [],
    purpose: "Operationalises POL-009. Defines the operational workflow for requesting, approving, issuing, monitoring, and revoking privileged access — including the JIT (just-in-time) access model for Tier 1/GxP systems, break-glass emergency access procedure, and PAM session recording review cadence.",
    keyContents: [
      "Privileged access request and approval workflow",
      "JIT access issuance: time-bounded credentials, scope-limited, session-recorded",
      "Break-glass emergency access: CISO verbal authorisation, immediate recording, retrospective review within 24hr",
      "PAM vault management: credential rotation cadence by tier",
      "Session recording review: automated alerting + manual sampling",
      "Privileged access review: monthly for Tier 1/GxP, quarterly for Tier 2",
    ],
    regulatoryRef: ["ISO/IEC 27001", "SOX", "EU Annex 11", "21 CFR Part 11"],
  },
  {
    id: "SOP-010",
    level: "SOP",
    domain: "Risk Management",
    title: "Information Security Risk Assessment Process",
    status: "Planned",
    version: "—",
    owner: "Information Security",
    parent: "POL-010",
    children: [],
    purpose: "Operationalises POL-010. Defines the Information Security Risk Assessment (ISRA) methodology — asset identification, threat and vulnerability identification, likelihood/impact scoring using the 5×5 matrix, risk treatment selection, risk register maintenance, and the annual ISRA cycle.",
    keyContents: [
      "ISRA scope and trigger events (annual, new system, material change, incident, exception)",
      "Asset inventory as ISRA input — integration with System Register (SOP-005)",
      "Threat library and vulnerability source list",
      "5×5 likelihood × impact scoring with worked examples",
      "Risk treatment options: mitigate / accept / transfer / avoid — decision criteria and approval authority",
      "Risk Register maintenance and ISSG reporting cadence",
    ],
    regulatoryRef: ["ISO/IEC 27001", "ISO 31000", "NIST CSF"],
  },
  {
    id: "SOP-011",
    level: "SOP",
    domain: "Business Continuity",
    title: "Business Continuity and Disaster Recovery Process",
    status: "Planned",
    version: "—",
    owner: "CIO",
    parent: "POL-011",
    children: [],
    purpose: "Operationalises POL-011. Defines the BC/DR lifecycle — Business Impact Analysis (BIA), DR strategy design, DR plan development, testing cadence, and invocation/recovery procedure — including GxP validated state restoration requirements.",
    keyContents: [
      "BIA process: system criticality input from SOP-005, RTO/RPO determination, MTPD assessment",
      "DR strategy design per tier: active-active (Tier 1), warm standby (Tier 2), backup restore (Tier 3/4)",
      "DR plan structure: invocation criteria, recovery team roles, step-by-step recovery procedures",
      "DR testing: annual full failover (Tier 1), annual tabletop (Tier 2), quarterly backup restoration (Tier 1/2)",
      "GxP system recovery: validated state confirmation before GxP restart, Compliance/QA sign-off, VMF documentation",
      "BC/DR plan review and maintenance cadence",
    ],
    regulatoryRef: ["ISO 22301", "EU Annex 11", "21 CFR Part 11", "SOX"],
  },
  {
    id: "SOP-012",
    level: "SOP",
    domain: "Incident Response",
    title: "Security Incident Response Process",
    status: "Planned",
    version: "—",
    owner: "Information Security",
    parent: "POL-012",
    children: [],
    purpose: "Operationalises POL-012. Defines the 6-stage security incident lifecycle — Detection, Triage, Containment, Eradication, Recovery, and Post-Incident Review — including regulatory notification timelines (GDPR 72hr, HIPAA 60-day), GxP incident handling, and evidence preservation requirements.",
    keyContents: [
      "Incident detection sources: SIEM alerts, POL-015 operational incidents, third-party notification, user reports",
      "Triage: P1–P4 severity determination, CISO escalation thresholds, 15-minute acknowledgement for P1",
      "Containment playbooks by incident type: ransomware, data exfiltration, account compromise, insider threat",
      "Evidence preservation: chain of custody, forensic imaging, audit trail protection",
      "Regulatory notification: GDPR 72hr clock, HIPAA 60-day, GxP regulatory authority assessment",
      "Post-Incident Review: root cause, lessons learned, CAPA, risk register update",
    ],
    regulatoryRef: ["ISO/IEC 27001", "GDPR Art.33/34", "HIPAA", "EU Annex 11", "NIST SP 800-61"],
  },
  {
    id: "SOP-013",
    level: "SOP",
    domain: "Third Party & Vendor",
    title: "Third Party and Vendor Risk Assessment Process",
    status: "Planned",
    version: "—",
    owner: "Information Security",
    parent: "POL-013",
    children: [],
    purpose: "Operationalises POL-013. Defines the vendor risk assessment lifecycle — initial screening, tiered due diligence, contract requirement checklist, ongoing monitoring, and annual reassessment — including the GxP vendor qualification process and GDPR transfer mechanism assessment.",
    keyContents: [
      "Vendor tiering from POL-005 system classification: Tier A–D due diligence requirements",
      "Due diligence: questionnaire, evidence review, ISO 27001/SOC 2 certificate verification",
      "Contract checklist: DPA (personal data), BAA (PHI), Technical Agreement (GxP), right-to-audit",
      "GxP vendor qualification: 5-step process, audit programme, VMF documentation",
      "GDPR transfer mechanism assessment: adequacy, SCCs + TIA, UK IDTA",
      "Ongoing monitoring: annual reassessment, incident-triggered review, fourth-party risk",
    ],
    regulatoryRef: ["ISO/IEC 27001", "GDPR Art.28/44-49", "HIPAA", "EU Annex 11", "21 CFR Part 11"],
  },
  {
    id: "SOP-014",
    level: "SOP",
    domain: "Audit Trail & Monitoring",
    title: "Audit Trail Review and Monitoring Process",
    status: "Planned",
    version: "—",
    owner: "Information Security",
    parent: "POL-014",
    children: [],
    purpose: "Operationalises POL-014. Defines the routine audit trail review procedure for GxP systems, SIEM alert triage workflow, audit trail gap detection and response, and the periodic review cadence by system tier. This is the primary quality check for GxP data integrity and the operational link between POL-014 and SOP-003.",
    keyContents: [
      "GxP audit trail review: weekly review cadence, review scope (all create/modify/delete events), reviewer qualification",
      "SIEM alert triage: 5 alert categories, priority matrix, escalation thresholds",
      "Audit trail gap detection: automated monitoring, gap alert response within 15 minutes, simultaneous SOP-003 and POL-012 invocation",
      "Periodic review schedule: Tier 1 continuous + monthly report, Tier 2 monthly, Tier 3/4 quarterly",
      "Review documentation: GxP review records are quality records, retained per POL-002",
      "Immutability verification: periodic hash-chain validation for systems using cryptographic controls",
    ],
    regulatoryRef: ["21 CFR Part 11", "EU Annex 11", "SOX", "HIPAA", "ISO/IEC 27001"],
  },
  {
    id: "SOP-015",
    level: "SOP",
    domain: "IT Service Management",
    title: "IT Service Management and Operational Incident Process",
    status: "Planned",
    version: "—",
    owner: "CIO",
    parent: "POL-015",
    children: [],
    purpose: "Operationalises POL-015. Defines the end-to-end operational incident lifecycle — detection through problem management — including the Major Incident process, GxP restart procedure, Known Error Register, and the boundary handoff to POL-012 for security incidents.",
    keyContents: [
      "Incident detection, logging, and categorisation: P1–P4 by business impact",
      "Major Incident process: MIT formation within 15min, CIO command, Compliance/QA within 30min for GxP",
      "GxP restart procedure: validated state confirmation, Compliance/QA sign-off, VMF documentation, CAPA assessment",
      "Boundary with POL-012: criteria for security incident handoff, parallel process management",
      "Problem Management: RCA workflow, Known Error Register maintenance, change request initiation via SOP-007",
      "BC/DR escalation: RTO breach detection and POL-011 activation trigger",
    ],
    regulatoryRef: ["EU Annex 11", "21 CFR Part 11", "SOX", "ITIL 4"],
  },
  {
    id: "POL-016",
    level: "Policy",
    domain: "Risk & Resilience",
    title: "Backup Management Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: "IMF-001",
    children: ["SOP-016"],
    purpose: "Establishes mandatory requirements for backup configuration, scheduling, encryption, monitoring, access control, retention, and restoration testing across all [Company Name] systems. Closes the gap between the RPO targets in POL-011 and the operational controls that must exist to deliver them. Backup infrastructure is classified Tier 1 regardless of the tier of systems it protects.",
    keyContents: [
      "Backup schedule and type requirements by tier: Tier 1 (hourly/continuous, 3-2-1 rule, offsite mandatory), GxP (audit trail backup on same schedule as application data), Tier 2 (4-hourly minimum), SOX (period-close snapshots retained 7 years)",
      "Encryption requirements: AES-256 at rest and TLS 1.2+ in transit mandatory for all tiers. Backup encryption keys managed separately from primary systems — ransomware on primary must not compromise backup keys.",
      "Offsite and cross-region: 3-2-1 rule mandatory for Tier 1/GxP. Air-gap or immutable (WORM) cloud copy required for Tier 1/GxP — inaccessible from primary environment.",
      "GxP-specific requirements: backup configuration is a validated parameter (SOP-006 VMF). Restoration testing is a validation activity. Long-term archive integrity reviewed annually. Metadata preservation required for ALCOA+ Attributable/Contemporaneous compliance.",
      "Backup retention: 30-day operational window, 90-day weekly, 12-month monthly, annual archive per POL-002 schedule. Incident preservation backups under legal hold (7 years or until legal proceedings conclude).",
      "Access controls: backup configuration and encryption key access restricted to CIO and Data Custodian (IT). All restore operations require System Owner plus CIO authorisation for Tier 1. Vendor access is JIT per SOP-009.",
      "Monitoring: every backup job generates a completion event. Missed jobs (no completion event) generate alerts within 15 minutes. Replication lag monitored — alert at 50% of RPO target.",
      "Restoration testing programme: annual full restore test (Tier 1), quarterly partial test (Tier 1/GxP), monthly integrity verification (Tier 1/GxP). Failed tests are IS Risk Register entries and SOP-006 deviations for GxP.",
      "Exceptions: offsite backup for Tier 1/GxP is non-approvable. AES-256 is non-approvable. GxP backup config change without VIA is non-approvable.",
    ],
    regulatoryRef: ["ISO 27001 A.12.3", "EU Annex 11", "21 CFR Part 11", "NIST CSF PR.IP-4", "SOX", "GDPR Art.32"],
  },
  {
    id: "SOP-016",
    level: "SOP",
    domain: "Risk & Resilience",
    title: "Backup and Restore Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CIO",
    parent: "POL-016",
    children: [],
    purpose: "Operationalises POL-016. Defines the step-by-step procedures for backup configuration and change management, daily monitoring and backup failure response, RPO exposure assessment, restoration testing (annual full, quarterly partial, monthly integrity), restore execution (standard, incident recovery, GxP post-restore validated state assessment), backup infrastructure decommission, and the annual backup programme review.",
    keyContents: [
      "New system onboarding: backup configuration checklist — schedule, scope (including audit trail data for GxP), encryption, offsite replication, air-gap, retention, monitoring alerts, SIEM forwarding. GxP: configuration documented in VMF, IQ/OQ includes backup test.",
      "Backup failure response: P1–P4 priority classification. P1 (Tier 1/GxP failure): CIO and Compliance/QA notified immediately. RPO exposure assessment: confirms gap between last successful backup and current time vs. RPO target.",
      "Restoration testing procedure: annual full restore to isolated environment with RTO/RPO confirmation and GxP ALCOA+ check. Quarterly partial restore with random sample. Monthly hash integrity verification.",
      "Standard point-in-time restore: System Owner + CIO authorisation for Tier 1. GxP: Compliance/QA notified before execution, post-restore audit trail review, GxP Restart Authorisation from Compliance/QA Director.",
      "Incident recovery restore: restore source must pre-date the compromise. Confirmed clean before use. Isolated restore environment before production cutover.",
      "GxP post-restore validated state assessment (Section 7.3): 5-step process — technical confirmation, scope assessment, audit trail review, GxP Restart Authorisation (Compliance/QA Director). Non-delegable. Cannot be abbreviated under time pressure.",
      "Backup infrastructure decommission: final full backup before decommission. GxP: full audit trail for life of system confirmed. Decommission archive registered with DPO-confirmed retention expiry.",
      "Annual backup programme review: 10-item assessment covering coverage completeness, schedule compliance, restoration test outcomes, encryption status, offsite/air-gap status, retention compliance, media viability, capacity planning, GxP programme health, IS Risk Register.",
    ],
    regulatoryRef: ["EU Annex 11", "21 CFR Part 11", "NIST CSF PR.IP-4", "SOX", "GDPR Art.32"],
  },
  {
    id: "POL-017",
    level: "Policy",
    domain: "Risk & Resilience",
    title: "Vulnerability Management Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-017"],
    purpose: "Establishes mandatory requirements for identifying, assessing, prioritising, and remediating vulnerabilities across all [Company Name] systems. Governs vulnerability scanning cadence by tier, CVSS v3.1-based severity classification with contextual adjustment, remediation SLAs (Critical 72hr, High 14 days, Medium 30 days), patch management, penetration testing, threat intelligence integration, and the GxP validated system patching framework — explicitly resolving the tension between vulnerability SLAs and validated state obligations.",
    keyContents: [
      "CVSS v3.1 base score with contextual escalation factors: CISA KEV status, Tier 1/GxP system, unauthenticated RCE, or PAM/backup key store impact escalates any High to Critical regardless of CVSS.",
      "Remediation SLAs: Critical 72hr, High 14 days, Medium 30 days, Low 90 days. SLA clock starts at vulnerability log date. Mitigating control within SLA is acceptable where patch is not yet available or GxP revalidation is required.",
      "Scanning requirements by type: weekly authenticated network scan (Tier 1/2/GxP), monthly DAST for internet-facing apps, continuous CSPM for cloud, weekly endpoint agent. Annual internal pentest (Tier 1/GxP) and external pentest (internet-facing). Scan credentials in PAM; GxP scans pre-authorised as SOP-007 Standard Changes.",
      "GxP validated system patching framework (Section 5): three pathways — (A) patch with no validated state impact (apply within SLA, Compliance/QA concurrence), (B) patch with validated state impact (mitigating control within SLA, full VIA + patch within 30 days), (C) no patch available (mitigating control + EXC-001 exception + IS risk register + Board notification at 90 days).",
      "Penetration testing requirements: CREST-certified provider, provider rotation in alternate years, rules of engagement preventing production data access, GxP pre-authorisation as SOP-007 change, Critical/High findings re-tested by provider post-remediation.",
      "Exception and risk acceptance framework: Critical on GxP requiring revalidation — CISO + CIO + Compliance/QA Director, max 90 days. Formal risk acceptance requires Board approval. EOL systems require funded replacement roadmap at Board.",
      "Threat intelligence: CISA KEV monitored weekly — KEV entry escalates to Critical from publication date. Sector ISAC participation. Vendor advisories processed within 24 hours.",
    ],
    regulatoryRef: ["ISO 27001 A.12.6", "NIST CSF ID.RA", "EU Annex 11", "21 CFR Part 11", "SOX", "GDPR Art.32", "NIST SP 800-40"],
  },
  {
    id: "SOP-017",
    level: "SOP",
    domain: "Risk & Resilience",
    title: "Vulnerability Management Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-017",
    children: [],
    purpose: "Operationalises POL-017. Defines step-by-step procedures for: vulnerability register management (mandatory fields, VUL-YYYY-NNN format), scan scheduling and pre-authorisation (including GxP SOP-007 Standard Change pre-authorisation), scan results triage, GxP patching decision workflow (VIPA pre-assessment and three-pathway process), standard remediation workflow, monthly and quarterly patch cycle management, penetration test commissioning and findings management, CISA KEV monitoring, exception process, and annual programme review.",
    keyContents: [
      "Vulnerability register: 18 mandatory fields including VUL-YYYY-NNN ID, contextual severity with documented rationale, GxP/SOX flags, SLA date, status, mitigating control, patch change record, IS Risk Register reference.",
      "GxP patching decision workflow: VIPA (Validation Impact Pre-Assessment) completed within 24hr (Critical) or 3 days (High). Three pathways: A (no validated state impact — apply within SLA), B (validated state impact — mitigating control within SLA + full VIA + patch within 30 days), C (no patch — mitigating control + exception + risk register).",
      "Pathway B detail: Phase 1 mitigating control satisfies SLA. Phase 2 full VIA within 30 days, patch in staging first, OQ re-execution per VIA, Compliance/QA GxP Restart Authorisation if system offline, VMF updated.",
      "Penetration test process: statement of work and rules of engagement before testing. GxP systems pre-authorised as SOP-007 change. Emergency stop contact confirmed with provider. SIEM Category 5 alerts expected and noted during test window. Pre-existing compromise discovery pauses test and activates SOP-012.",
      "CISA KEV monitoring: weekly review. KEV entry affecting Company systems → Critical escalation from KEV publication date. SLA recalculated immediately even if vulnerability previously classified lower.",
      "Exception process: request must be submitted before SLA expiry. Monthly confirmation mitigating control remains active. No exception renewable more than twice without escalation to formal risk acceptance.",
      "Annual programme review: 9-item assessment covering SLA compliance, scan coverage, penetration test outcomes, GxP programme health, exception volume, EOL inventory, threat intelligence integration, tooling adequacy, IS Risk Register alignment.",
    ],
    regulatoryRef: ["ISO 27001 A.12.6", "NIST CSF ID.RA-1", "EU Annex 11", "21 CFR Part 11", "NIST SP 800-40"],
  },
  {
    id: "POL-018",
    level: "Policy",
    domain: "Security Operations",
    title: "Cryptography and Key Management Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-018"],
    purpose: "Establishes mandatory requirements for cryptographic controls: approved algorithms (symmetric, asymmetric, hashing, TLS), the key lifecycle (generation, storage, rotation, destruction), certificate management, and HSM governance. Fills the gap where POL-016 (backup encryption), POL-009 (PAM secrets), and POL-014 (audit trail integrity tokens) all impose encryption requirements without a governing framework defining approved algorithms, key management standards, or certificate inventory obligations.",
    keyContents: [
      "Approved algorithm table: AES-256-GCM preferred for symmetric; RSA-4096 or ECDSA P-384 for asymmetric; SHA-256 minimum for hashing; TLS 1.2 minimum (TLS 1.3 preferred). Prohibited: 3DES, DES, RC4, RSA<2048, SHA-1 for security functions, MD5 for security functions. Prohibited algorithm on any in-scope system = High vulnerability (POL-017).",
      "Key lifecycle: Tier 1 and GxP keys generated on HSM using two-person integrity. Keys must not leave the HSM in plaintext. Cloud KMS (AWS CloudHSM, Azure Dedicated HSM) acceptable for cloud deployments. Annual rotation minimum for Tier 1/GxP keys; emergency rotation on suspected compromise.",
      "Certificate management: certificate inventory in Key Register; maximum 1-year validity; renewal initiated at 60 days (Tier 1/GxP) or 30 days (all others); automated expiry alerting at 90/60/30/14 days; self-signed certificates prohibited in production; wildcard certificates prohibited for Tier 1 and GxP.",
      "GxP cryptographic controls: algorithm and key length are validated parameters documented in VMF System Description. Algorithm change requires VIA. Annual key rotation is a Standard Change if procedure is in validated ops procedures with no algorithm change.",
      "HSM administration: two-person integrity for all HSM administrative actions. HSM admin accounts in PAM. All HSM access logged and forwarded to SIEM. HSM decommission: zeroised per manufacturer specification.",
      "Exception framework: prohibited algorithm on Tier 1/GxP requires CISO+CIO+Board notification; maximum 6-month exception with network isolation mandatory.",
    ],
    regulatoryRef: ["ISO 27001 A.10", "NIST SP 800-57", "FIPS 140-2", "EU Annex 11", "21 CFR Part 11", "GDPR Art.32", "NIST SP 800-175B"],
  },
  {
    id: "SOP-018",
    level: "SOP",
    domain: "Security Operations",
    title: "Cryptography and Key Management Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-018",
    children: [],
    purpose: "Operationalises POL-018. Defines Key Register fields (KEY-YYYY-NNN format, 15 mandatory fields), key provisioning, scheduled and emergency key rotation, key destruction with two-person integrity verification, certificate discovery and renewal process, HSM administration procedures, and the algorithm deprecation process when NIST or vendor guidance changes the approved algorithm list.",
    keyContents: [
      "Key Register: 15 mandatory fields including KEY-YYYY-NNN ID, algorithm and key length, storage location (HSM ID or KMS ARN), key custodians (minimum 2 for Tier 1/GxP), generation date, rotation schedule, status lifecycle (Active/Superseded/Destroyed). No key placed in production without a register entry.",
      "Key rotation: scheduled rotation from Key Register calendar; emergency rotation for compromise/custodian change/HSM migration. GxP key rotation: Standard Change in SOP-007 if procedure is in validated ops with no algorithm change; Normal Change with VIA if algorithm or key length changes.",
      "Certificate management: monthly discovery scan across all network ranges. Certificates found in scan but not in register investigated within 5 business days. Expiry escalation: 14 days before expiry triggers emergency renewal and SOP-015 P2 incident.",
      "HSM administration: two-person integrity for all admin actions. HSM firmware updates = Major Change in SOP-007 (may affect validated state of GxP keys). HSM backup tested annually.",
      "Algorithm deprecation: affected systems identified from Key Register query. Vulnerability register entries raised. GxP systems: Compliance/QA notified; algorithm upgrade requires VIA.",
    ],
    regulatoryRef: ["ISO 27001 A.10", "NIST SP 800-57", "FIPS 140-2", "EU Annex 11", "21 CFR Part 11"],
  },
  {
    id: "POL-019",
    level: "Policy",
    domain: "Security Operations",
    title: "Network Security Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-019"],
    purpose: "Defines the network architecture principles and mandatory controls that multiple other policies depend on. POL-017 network isolation mitigating controls, POL-016 backup infrastructure segregation, and POL-006 GxP system boundary protections all presuppose a documented network architecture with enforceable zone boundaries. This policy defines the six-zone model, firewall and perimeter requirements, remote access standards, wireless security, and device hardening baselines.",
    keyContents: [
      "Six-zone architecture: Zone 0 (Internet/untrusted), Zone 1 (DMZ/internet-facing), Zone 2 (Corporate), Zone 3 (Tier 1/high-trust), Zone 4 (GxP/validated), Zone 5 (Backup/isolated), Zone 6 (Management/out-of-band). All inter-zone traffic blocked by default — explicit permit rules only.",
      "GxP Zone (Zone 4): network boundary is a validated parameter. Any firewall rule change affecting Zone 4 requires a VIA under SOP-007. No direct internet access from GxP Zone. Backup Zone (Zone 5): isolated from production — ransomware in Zone 2 or Zone 3 must not reach Zone 5.",
      "Firewall: default-deny on all firewalls. No 'permit any any' rules without CISO approval. All rules created via SOP-007. Annual rule review — rules without response suspended after 60 days. Inbound internet traffic terminates in Zone 1 only.",
      "Remote access: corporate VPN with MFA mandatory. Split tunnelling: CISO approval required. Privileged remote access via PAM jump host (SOP-009) only. Direct SSH/RDP to Tier 1 or GxP systems from end-user workstations prohibited.",
      "Network device hardening: CIS Benchmarks applied to all device types. Management interfaces bound to Zone 6 only. Telnet/HTTP management disabled. SNMPv3 required. All devices forward security logs to SIEM.",
      "Wireless: WPA3 Enterprise required; 802.1X authentication. Guest wireless: internet-only, isolated VLAN. GxP environment wireless: validated parameter, changes require VIA.",
    ],
    regulatoryRef: ["ISO 27001 A.13", "NIST CSF PR.AC-5", "EU Annex 11", "21 CFR Part 11", "SOX", "NIST SP 800-41"],
  },
  {
    id: "SOP-019",
    level: "SOP",
    domain: "Security Operations",
    title: "Network Security Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-019",
    children: [],
    purpose: "Operationalises POL-019. Defines Network Device Inventory (NET-NNN format, 11 mandatory fields), Firewall Rule Register (FWR-NNN format, 16 mandatory fields including GxP flag and VMF reference), firewall rule change process including GxP Zone assessment and VIA trigger, annual rule review process, hardening baseline management and periodic compliance scanning, and annual network security review.",
    keyContents: [
      "Firewall Rule Register: FWR-NNN identifier, source/destination with specificity requirements, business justification, rule owner, SOP-007 change reference, review due date (12-month maximum), GxP flag, VMF reference for GxP rules.",
      "GxP Zone rule changes: any rule where source or destination is a GxP system triggers VIPA. Adding any new inbound access to a GxP system treated as affecting validated state unless Compliance/QA explicitly confirms otherwise.",
      "Annual rule review: owners notified 60 days before review due. No response within 30 days escalated to system owner and CIO. No confirmation within 60 days: rule suspended. Orphaned rules (departed owner): removed within 30 days.",
      "Hardening compliance scanning: quarterly scans of all network devices. Configuration drift logged as vulnerability register entries. GxP Zone device drift correction: VIA if the correction changes validated network configuration.",
      "Annual network security review: 8-item assessment covering device inventory completeness, firewall rule hygiene, zone architecture integrity, GxP Zone integrity, hardening compliance, remote access review, wireless security, and monitoring coverage.",
    ],
    regulatoryRef: ["ISO 27001 A.13", "NIST CSF PR.AC-5", "EU Annex 11", "21 CFR Part 11", "NIST SP 800-41"],
  },
  {
    id: "POL-020",
    level: "Policy",
    domain: "People & Culture",
    title: "Security Awareness and Training Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-020"],
    purpose: "Establishes the mandatory requirements for the security awareness and training programme. Multiple SOPs reference training as a prerequisite or obligation (SOP-008 access prerequisites, SOP-003 ALCOA+ training, SOP-013 vendor training evidence) without a governing framework defining the programme, curriculum, completion tracking, or consequences. This policy closes that gap.",
    keyContents: [
      "Four-tier structure: Tier 1 (all staff — baseline awareness, data classification, AUP, privacy fundamentals, insider threat); Tier 2 (information handlers — secure data handling, email security, clean desk); Tier 3 (GxP personnel — ALCOA+, 21 CFR Part 11/EU Annex 11, audit trail obligations, GxP incident reporting); Tier 4 (technical/security staff — hardening, secure development, incident response, PAM obligations, cryptographic controls).",
      "Training prerequisites: Tier 1 must be complete before any system access is granted. Tier 3 GxP training must be recorded in the LMS before SOP-008 processes GxP system access. GxP training currency is a regulatory requirement — expired GxP training is an inspection finding.",
      "Phishing simulation: minimum quarterly campaigns. 5% click rate target. Click event triggers immediate teachable moment and remedial module enrolment. Three or more click events in 12 months escalated to manager and HR.",
      "Non-completion consequences: Tier 3 GxP access suspended at 30 days overdue. Tier 1/2 Restricted data access may be suspended at 60 days overdue. Repeated non-completion escalated to HR under POL-021 disciplinary process.",
      "GxP training records: quality records subject to 21 CFR Part 11/EU Annex 11. Retained minimum 5 years. Available for regulatory inspection. Cannot be deleted or altered after completion.",
    ],
    regulatoryRef: ["ISO 27001 A.7.2", "NIST CSF PR.AT", "EU Annex 11", "21 CFR Part 11 §11.10(i)", "GDPR Art.39", "SOX"],
  },
  {
    id: "SOP-020",
    level: "SOP",
    domain: "People & Culture",
    title: "Security Awareness and Training Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-020",
    children: [],
    purpose: "Operationalises POL-020. Defines tier assignment at onboarding and role change, annual renewal scheduling and non-completion escalation timeline, GxP qualification recording procedures (online and classroom), phishing simulation campaign planning and execution, results reporting and escalation triggers, and training content update triggers.",
    keyContents: [
      "Onboarding tier assignment: HR notifies IS of new starter; IS assigns tiers based on role; LMS plan activated with deadlines. GxP tier assigned by Compliance/QA at role assignment.",
      "Non-completion timeline: Day 1-14 automated reminders; Day 15 manager notified; Day 30 CISO notified for Tier 3 and GxP access suspended; Day 60 CISO decision on Tier 1/2 Restricted data access suspension; Day 60+ HR escalation.",
      "GxP qualification recording: online modules via LMS with 80% pass mark. Classroom training: Training Record form uploaded to LMS within 5 business days. LMS entry is the quality record — corrections require new entry, original retained. Monthly GxP training currency report to Compliance/QA.",
      "Phishing campaign scenarios: Q1 generic credential harvesting, Q2 spear-phishing, Q3 BEC simulation, Q4 advanced combined scenario. Click rate above 20% per department triggers direct briefing to department head. Programme-wide click rate above 10% for three consecutive campaigns triggers external training provider assessment.",
      "Content management: annual review of all modules; material policy change triggers out-of-cycle update within 30 days; significant new threat triggers targeted awareness communication within 5 business days; regulatory guidance update triggers Tier 3 module update within 60 days.",
    ],
    regulatoryRef: ["ISO 27001 A.7.2", "NIST CSF PR.AT", "EU Annex 11", "21 CFR Part 11"],
  },
  {
    id: "POL-021",
    level: "Policy",
    domain: "People & Culture",
    title: "HR Security and Acceptable Use Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "HR Director",
    parent: "IMF-001",
    children: ["SOP-021","WI-021"],
    purpose: "Establishes HR security controls and individual obligations throughout the employment and contractor lifecycle. Provides the enforcement framework that makes individual obligations across the suite legally actionable — the data classification obligations (POL-001), access control obligations (POL-008), and incident reporting obligations (POL-012) are exercised by individuals who must have acknowledged them in writing. Covers pre-employment screening, onboarding prerequisites, acceptable use obligations, offboarding controls, and the disciplinary framework for policy breach.",
    keyContents: [
      "Pre-employment screening: Standard check (all roles — identity, right to work, 5-year employment history, criminal record); Enhanced check (Tier 1, GxP, financial, Restricted data roles — plus credit check, qualifications verification, 2 professional referees). Repeat Enhanced check every 3 years for Tier 1/GxP roles.",
      "Onboarding prerequisites: background check + NDA + WI-021 acknowledgement + Tier 1 training = all required before system access is granted. GxP system access: additionally requires Tier 3 training qualification recorded in LMS.",
      "Acceptable use obligations (referenced from WI-021): business use requirement, no credential sharing, screen locking, data classification compliance, incident reporting. Prohibited: unauthorised access, shadow IT, security control circumvention, audit trail manipulation, data exfiltration.",
      "Offboarding: voluntary departure — all access revoked by end of last working day, HR notifies IT minimum 5 business days in advance. Involuntary/dismissal — access revoked simultaneously with or before the dismissal conversation. Garden leave — Tier 1/GxP/Restricted access revoked at start regardless of duration.",
      "Disciplinary framework: four categories (Minor/Moderate/Serious/Gross Misconduct) with proportional responses from manager conversation to dismissal and police referral. GxP audit trail manipulation = Gross Misconduct. Post-departure confidentiality obligations survive indefinitely.",
    ],
    regulatoryRef: ["ISO 27001 A.7", "NIST CSF PR.IP-11", "EU Annex 11", "21 CFR Part 11", "GDPR Art.32", "SOX"],
  },
  {
    id: "SOP-021",
    level: "SOP",
    domain: "People & Culture",
    title: "HR Security Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "HR Director",
    parent: "POL-021",
    children: [],
    purpose: "Operationalises POL-021. Defines the pre-employment screening initiation and adverse finding assessment process, the onboarding sequence (8 mandatory steps in order with access provisioning blocked until prerequisites confirmed), standard offboarding, high-risk/emergency offboarding for involuntary terminations and security incidents, and the joint IS/HR policy breach investigation process.",
    keyContents: [
      "Onboarding sequence: 8 steps in mandatory order — background check, contract, NDA, WI-021 acknowledgement, Tier 1 training, Tier 3 training (GxP roles), access request, IT provisioning. SOP-008 will not process a request without confirmation of steps 1-5 (plus step 6 for GxP access).",
      "Emergency access before check: EXC-001 exception required (CISO + HR Director). No Tier 1/GxP/Restricted access until check complete. Check expedited — 5 business days.",
      "Standard offboarding: HR notifies IS and IT minimum 5 business days before last day. SOP-008 de-provisioning initiated on notification. GxP users: Compliance/QA notified for handover confirmation of open GxP activities.",
      "Involuntary termination: accounts suspended at the moment of dismissal conversation. IT on-call available for out-of-hours. CISO assesses data exfiltration risk. All actions timestamped for potential legal proceedings.",
      "Policy breach investigation: Information Security leads technical fact-finding (audit trail, SIEM evidence); HR leads employee-facing process. GxP breaches: Compliance/QA assesses regulatory notification requirement. Corrective action tracked in SOP-010 IS Risk Register.",
    ],
    regulatoryRef: ["ISO 27001 A.7", "NIST CSF PR.IP-11", "EU Annex 11", "21 CFR Part 11", "GDPR Art.88"],
  },
  {
    id: "WI-021",
    level: "Work Instruction",
    domain: "People & Culture",
    title: "Acceptable Use Policy (User-Facing)",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "HR Director",
    parent: "POL-021",
    children: [],
    purpose: "The user-facing Acceptable Use Policy that all personnel read and sign before system access is granted. Written in plain language to ensure genuine comprehension rather than compliance theatre. Includes a signed acknowledgement form retained in the personnel file. The signature makes individual obligations legally enforceable and is confirmed by SOP-008 before any account is created.",
    keyContents: [
      "System and data use: business use requirement with incidental personal use acceptable. No credential sharing under any circumstances — self-reporting is encouraged and penalty-free.",
      "Security incident reporting: report immediately to IS. Good-faith reporting is penalty-free. 'Waiting to see if it resolves' is explicitly discouraged.",
      "Prohibited activities: unauthorised access, shadow IT/unauthorised software installation, security control circumvention, Confidential/Restricted data to personal accounts, illegal/offensive content, regulated system record manipulation.",
      "Remote working: VPN mandatory outside office. No public Wi-Fi without VPN. No leaving devices unattended in public. Privacy screen for Confidential/Restricted data in public spaces.",
      "Disciplinary consequences: clearly stated in plain language. Accidental self-reported breaches treated very differently from deliberate concealed breaches.",
      "Acknowledgement form: countersigned with full name, job title, employee/contractor ID, date, signature. Contractor fields: company name and contracting manager. Retained in personnel file.",
    ],
    regulatoryRef: ["ISO 27001 A.7.2.3", "21 CFR Part 11", "GDPR Art.32", "EU Annex 11"],
  },
  {
    id: "POL-022",
    level: "Policy",
    domain: "Communications Security",
    title: "Communications Security Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-022"],
    purpose: "Governs the security of all voice, video, text, and messaging communications used by [Company Name] personnel. Addresses NIS2 Art. 21(j) — the only Art. 21 element without an ISO 27001 analogue. Defines the approved platform framework, encryption standards, emergency out-of-band communications channel, GxP communications obligations, and email security controls.",
    keyContents: [
      "Communications classification framework: 4 tiers (Public / Internal Use / Restricted / Special Category) mapped to permitted channels and encryption requirements.",
      "Approved Communications Platform Register: criteria for approval (MFA, SSO, E2E encryption for Restricted, data residency, access control, DLP integration, vendor assessment under POL-013).",
      "Prohibited channels: personal email, personal consumer messaging apps for business content, unencrypted PSTN for Restricted discussions, any unapproved platform for Internal Use and above.",
      "Email security: TLS, S/MIME for external Restricted email, SPF/DKIM/DMARC (quarantine minimum), email gateway anti-phishing, DLP rules, external forwarding block.",
      "Out-of-band emergency communications: platform must be independent of corporate cloud tenant, E2E encrypted, accessible from personal devices, tested quarterly, physical copy in security vault. SLA independent of primary cloud provider.",
      "GxP communications: AI-approved systems with electronic signature for regulated decisions; email not the authoritative record for GxP data.",
    ],
    regulatoryRef: ["NIS2 Art. 21(j)", "ISO 27001 A.8.26", "GDPR Art. 32"],
  },
  {
    id: "SOP-022",
    level: "SOP",
    domain: "Communications Security",
    title: "Communications Security Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-022",
    children: [],
    purpose: "Operational procedures for: communications platform approval workflow (6 steps from request through register publication); email security configuration and maintenance standards; out-of-band emergency channel setup and quarterly testing; and communications security violation investigation.",
    keyContents: [
      "Platform approval workflow: request → GxP trigger check → data/privacy assessment → vendor assessment (SOP-013) → security configuration review → approval decision (CISO for Restricted) → register update.",
      "Email security configuration standard: SPF hard fail preferred, DKIM 2048-bit annual rotation, DMARC quarantine minimum (target reject), monthly DMARC report review, gateway anti-phishing/DLP, external forwarding block.",
      "Out-of-band channel: quarterly unannounced test, annual full-DR integration, 15-minute authentication target from outside corporate network.",
      "Violation severity tiers: Critical (Restricted data to external via prohibited channel) → High (Restricted internal via unapproved) → Medium (Internal Use to personal email) → Low (education opportunity).",
    ],
    regulatoryRef: ["NIS2 Art. 21(j)", "ISO 27001 A.8.26"],
  },
  {
    id: "POL-023",
    level: "Policy",
    domain: "AI Governance",
    title: "AI Governance and Acceptable Use Policy",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "CISO",
    parent: "IMF-001",
    children: ["SOP-023"],
    purpose: "Governs the use of AI tools by all [Company Name] personnel and the organisation's use and development of AI. Addresses the ISO-G03 gap (no AI governance policy), emerging EU AI Act obligations, FDA AI/ML guidance trajectory, and EMA AI considerations for GxP-regulated processes. Introduces a 4-category AI tool framework and integrates GxP AI validation requirements with POL-005/POL-006.",
    keyContents: [
      "4-category AI tool framework: Category A (approved corporate — pre-approved); Category B (assessed external — approved with conditions); Category C (shadow AI — prohibited for Internal Use and above); Category D (GxP context — requires validation under POL-006 before deployment).",
      "Data classification rules for AI: Restricted data only in Category A with confirmed controls; Special Category/PHI prohibited in Categories B and C; GxP records require Category D assessment regardless of platform approval.",
      "Staff obligations: approved tools only for business content; disclose AI-assisted outputs in regulated contexts; independently verify AI-generated content; report AI incidents; no AI to circumvent controls.",
      "AI risk assessment framework: 7 dimensions (data exposure, IP/confidentiality, GxP data integrity, accuracy/bias, regulatory compliance, security, vendor dependency).",
      "EU AI Act assessment pathway for AI systems placed on the EU market, including high-risk AI registration obligations for healthcare/regulated product systems.",
      "Governance: Approved AI Tool Register, quarterly CISO report to ISSG, annual policy review, GxP AI monitoring with model version change control under SOP-007.",
    ],
    regulatoryRef: ["ISO 27001 A.5.10", "ISO 27001 A.8.19", "EU AI Act", "FDA AI/ML guidance", "GDPR Art. 22/25", "21 CFR Part 11"],
  },
  {
    id: "SOP-023",
    level: "SOP",
    domain: "AI Governance",
    title: "AI Governance Process",
    status: "Complete",
    version: "1.0 DRAFT",
    owner: "Information Security",
    parent: "POL-023",
    children: [],
    purpose: "Operational procedures for: AI tool approval (Category A/B — 7-step workflow including GxP trigger assessment, data exposure assessment, vendor assessment under SOP-013, security configuration review, CISO approval); AI tool assessment in GxP contexts (Category D — 5-step process including system classification under WI-005, VIPA, full validation under SOP-006, ongoing performance monitoring); Approved AI Tool Register maintenance; and AI-related incident investigation.",
    keyContents: [
      "7-step Category A/B approval: request → GxP trigger check → data/privacy assessment → SOP-013 vendor assessment (Tier A for Restricted) → security config review → approval decision → register publication.",
      "Category D GxP pathway: mandatory, cannot be bypassed even for approved Category A tools. Validation covers model version, training data, output range, human oversight mechanism.",
      "AI incident severity tiers: Critical (Restricted/PHI in unapproved tool; AI error affecting GxP quality/patient safety) → High (Restricted in unapproved; AI isolation failure) → Medium (Internal Use in unapproved) → Low (education).",
      "Quarterly AI register review at ISSG; annual vendor terms monitoring; 30-day advance decommissioning notice.",
    ],
    regulatoryRef: ["EU AI Act", "FDA AI/ML guidance", "21 CFR Part 11", "GDPR Art. 25"],
  },

 = ["Framework", "Register", "Policy", "SOP", "Work Instruction"];

export default function IMFRegister() {
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("All");
  const [filterLevel, setFilterLevel] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("table"); // table | tree

  const filtered = docs.filter(d => {
    const matchSearch = search === "" ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.purpose.toLowerCase().includes(search.toLowerCase());
    const matchDomain = filterDomain === "All" || d.domain === filterDomain;
    const matchLevel = filterLevel === "All" || d.level === filterLevel;
    const matchStatus = filterStatus === "All" || d.status === filterStatus;
    return matchSearch && matchDomain && matchLevel && matchStatus;
  });

  const selectedDoc = selected ? docs.find(d => d.id === selected) : null;

  const statCounts = {
    Complete: docs.filter(d => d.status === "Complete").length,
    Draft: docs.filter(d => d.status === "Draft").length,
    Planned: docs.filter(d => d.status === "Planned").length,
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: NAVY, padding: "24px 32px 20px" }}>
        <div style={{ fontSize: 11, color: LTBLUE, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>
          Information Management Framework
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
          Document Register — REG-001
        </div>
        <div style={{ fontSize: 13, color: "#94A3B8" }}>
          Living index of the IMF document suite · v1.0 DRAFT
        </div>
        {/* Stats */}
        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
          {[
            { label: "Total Documents", val: docs.length, color: LTBLUE },
            { label: "Complete", val: statCounts.Complete, color: "#6EE7B7" },
            { label: "Draft", val: statCounts.Draft, color: "#FDE68A" },
            { label: "Planned", val: statCounts.Planned, color: "#CBD5E1" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 18px", minWidth: 90 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#E2E8F0", height: 6 }}>
        <div style={{ background: GREEN, height: 6, width: `${(statCounts.Complete / docs.length) * 100}%`, transition: "width 0.5s" }} />
      </div>

      {/* Toolbar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "12px 32px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input
          placeholder="Search documents..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ border: "1px solid #CBD5E1", borderRadius: 6, padding: "7px 12px", fontSize: 13, width: 220, outline: "none" }}
        />
        {[
          { label: "Domain", val: filterDomain, set: setFilterDomain, opts: DOMAINS },
          { label: "Level", val: filterLevel, set: setFilterLevel, opts: ["All", ...levelOrder] },
          { label: "Status", val: filterStatus, set: setFilterStatus, opts: ["All", "Complete", "Draft", "Planned"] },
        ].map(f => (
          <select key={f.label} value={f.val} onChange={e => f.set(e.target.value)}
            style={{ border: "1px solid #CBD5E1", borderRadius: 6, padding: "7px 12px", fontSize: 13, background: "#fff", cursor: "pointer" }}>
            {f.opts.map(o => <option key={o}>{o === "All" ? `All ${f.label}s` : o}</option>)}
          </select>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {["table", "tree"].map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid #CBD5E1", fontSize: 12, fontWeight: 600,
                background: view === v ? NAVY : "#fff", color: view === v ? "#fff" : "#374151", cursor: "pointer", textTransform: "capitalize" }}>
              {v === "table" ? "📋 Table" : "🌳 Tree"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 240px)" }}>
        {/* Main content */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {view === "table" ? (
            <TableView docs={filtered} selected={selected} onSelect={setSelected} />
          ) : (
            <TreeView docs={docs} onSelect={setSelected} selected={selected} />
          )}
        </div>

        {/* Detail panel */}
        {selectedDoc && (
          <div style={{ width: 380, borderLeft: "1px solid #E2E8F0", background: "#fff", overflow: "auto" }}>
            <DetailPanel doc={selectedDoc} allDocs={docs} onSelect={setSelected} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

function TableView({ docs, selected, onSelect }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: NAVY, color: "#fff" }}>
          {["ID", "Level", "Domain", "Title", "Status", "Owner", "Parent"].map(h => (
            <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {docs.map((d, i) => {
          const levelStyle = LEVELS[d.level] || {};
          const statusStyle = STATUS[d.status] || {};
          const isSelected = d.id === selected;
          return (
            <tr key={d.id} onClick={() => onSelect(d.id === selected ? null : d.id)}
              style={{ background: isSelected ? LTBLUE : i % 2 === 0 ? "#fff" : "#F8FAFC",
                cursor: "pointer", borderBottom: "1px solid #E2E8F0", transition: "background 0.1s" }}>
              <td style={{ padding: "10px 12px", fontWeight: 700, color: BLUE, whiteSpace: "nowrap" }}>{d.id}</td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ background: levelStyle.bg, color: levelStyle.color, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
                  {d.level}
                </span>
              </td>
              <td style={{ padding: "10px 12px", color: "#475569", fontSize: 12 }}>{d.domain}</td>
              <td style={{ padding: "10px 12px", fontWeight: 500, color: "#1E293B" }}>{d.title}</td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ background: statusStyle.bg, color: statusStyle.text, padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
                  ● {d.status}
                </span>
              </td>
              <td style={{ padding: "10px 12px", color: "#475569", fontSize: 12, whiteSpace: "nowrap" }}>{d.owner}</td>
              <td style={{ padding: "10px 12px", color: BLUE, fontSize: 12, fontWeight: 600 }}>{d.parent || "—"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TreeView({ docs, onSelect, selected }) {
  const topLevel = docs.filter(d => !d.parent);
  return (
    <div>
      {topLevel.map(d => <TreeNode key={d.id} doc={d} allDocs={docs} onSelect={onSelect} selected={selected} depth={0} />)}
    </div>
  );
}

function TreeNode({ doc, allDocs, onSelect, selected, depth }) {
  const [open, setOpen] = useState(depth < 2);
  const children = allDocs.filter(d => d.parent === doc.id);
  const levelStyle = LEVELS[doc.level] || {};
  const statusStyle = STATUS[doc.status] || {};
  const isSelected = doc.id === selected;

  return (
    <div style={{ marginLeft: depth * 24 }}>
      <div onClick={() => { onSelect(doc.id === selected ? null : doc.id); if (children.length) setOpen(!open); }}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 4, borderRadius: 8,
          background: isSelected ? LTBLUE : "#fff", border: `1px solid ${isSelected ? BLUE : "#E2E8F0"}`,
          cursor: "pointer", transition: "all 0.1s" }}>
        {children.length > 0 && (
          <span style={{ color: "#94A3B8", fontSize: 11, width: 14 }}>{open ? "▼" : "▶"}</span>
        )}
        {children.length === 0 && <span style={{ width: 14 }} />}
        <span style={{ fontWeight: 700, color: BLUE, minWidth: 68, fontSize: 13 }}>{doc.id}</span>
        <span style={{ background: levelStyle.bg, color: levelStyle.color, padding: "1px 7px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{doc.level}</span>
        <span style={{ flex: 1, fontSize: 13, color: "#1E293B", fontWeight: 500 }}>{doc.title}</span>
        <span style={{ background: statusStyle.bg, color: statusStyle.text, padding: "1px 7px", borderRadius: 10, fontSize: 10, fontWeight: 600 }}>● {doc.status}</span>
      </div>
      {open && children.map(c => <TreeNode key={c.id} doc={c} allDocs={allDocs} onSelect={onSelect} selected={selected} depth={depth + 1} />)}
    </div>
  );
}

function DetailPanel({ doc, allDocs, onSelect, onClose }) {
  const levelStyle = LEVELS[doc.level] || {};
  const statusStyle = STATUS[doc.status] || {};
  const parentDoc = doc.parent ? allDocs.find(d => d.id === doc.parent) : null;
  const childDocs = allDocs.filter(d => d.parent === doc.id);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4 }}>{doc.domain}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: NAVY }}>{doc.id}</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#94A3B8", padding: 4 }}>✕</button>
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, color: "#1E293B", marginBottom: 12, lineHeight: 1.4 }}>{doc.title}</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ background: levelStyle.bg, color: levelStyle.color, padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 700 }}>{doc.level}</span>
        <span style={{ background: statusStyle.bg, color: statusStyle.text, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700 }}>● {doc.status}</span>
        <span style={{ background: "#F1F5F9", color: "#475569", padding: "3px 10px", borderRadius: 5, fontSize: 11 }}>v{doc.version}</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: 6 }}>Purpose</div>
        <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, background: "#F8FAFC", padding: 12, borderRadius: 8, borderLeft: `3px solid ${BLUE}` }}>
          {doc.purpose}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: 8 }}>Key Contents</div>
        {doc.keyContents.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
            <span style={{ color: BLUE, fontWeight: 700, marginTop: 1 }}>·</span>
            <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: 8 }}>Regulatory References</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {doc.regulatoryRef.map(r => (
            <span key={r} style={{ background: "#EFF6FF", color: BLUE, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{r}</span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: 8 }}>Document Owner</div>
        <div style={{ fontSize: 12, color: "#374151" }}>{doc.owner}</div>
      </div>

      {parentDoc && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: 8 }}>Parent Document</div>
          <div onClick={() => onSelect(parentDoc.id)}
            style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", background: "#F8FAFC",
              border: "1px solid #E2E8F0", borderRadius: 6, cursor: "pointer" }}>
            <span style={{ fontWeight: 700, color: BLUE, fontSize: 12 }}>{parentDoc.id}</span>
            <span style={{ fontSize: 12, color: "#374151" }}>{parentDoc.title}</span>
          </div>
        </div>
      )}

      {childDocs.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: 8 }}>
            Subordinate Documents ({childDocs.length})
          </div>
          {childDocs.map(c => {
            const cs = STATUS[c.status] || {};
            return (
              <div key={c.id} onClick={() => onSelect(c.id)}
                style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", background: "#F8FAFC",
                  border: "1px solid #E2E8F0", borderRadius: 6, cursor: "pointer", marginBottom: 5 }}>
                <span style={{ fontWeight: 700, color: BLUE, fontSize: 12, minWidth: 60 }}>{c.id}</span>
                <span style={{ flex: 1, fontSize: 12, color: "#374151" }}>{c.title}</span>
                <span style={{ background: cs.bg, color: cs.text, padding: "1px 6px", borderRadius: 8, fontSize: 10, fontWeight: 600 }}>
                  {c.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
