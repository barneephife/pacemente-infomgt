import { useState } from "react";

// ── NIS2 mapping — document ID → article references ──────────────────────
const NIS2 = {
  "GOV-001":  ["Art.20(1)","Art.20(2)","Art.21(f)"],
  "REF-001":  ["Art.23"],
  "PLAN-001": ["Art.20","Art.21"],
  "EXC-001":  ["Art.21(f)"],
  "POL-004":  ["Art.21(e)"],
  "POL-010":  ["Art.21(a)"],
  "SOP-010":  ["Art.21(a)"],
  "POL-011":  ["Art.21(c)"],
  "SOP-011":  ["Art.21(c)"],
  "POL-016":  ["Art.21(c)"],
  "SOP-016":  ["Art.21(c)"],
  "POL-012":  ["Art.21(b)"],
  "SOP-012":  ["Art.21(b)","Art.23"],
  "POL-014":  ["Art.21(e)"],
  "SOP-014":  ["Art.21(e)"],
  "POL-015":  ["Art.21(e)"],
  "POL-017":  ["Art.21(b)"],
  "SOP-017":  ["Art.21(b)"],
  "POL-018":  ["Art.21(h)"],
  "SOP-018":  ["Art.21(h)"],
  "POL-019":  ["Art.21(e)"],
  "SOP-019":  ["Art.21(e)"],
  "POL-013":  ["Art.21(d)"],
  "SOP-013":  ["Art.21(d)"],
  "POL-020":  ["Art.20(2)","Art.21(g)"],
  "SOP-020":  ["Art.20(2)","Art.21(g)"],
  "POL-021":  ["Art.21(g)","Art.21(i)"],
  "SOP-021":  ["Art.21(g)","Art.21(i)"],
  "POL-008":  ["Art.21(i)"],
  "SOP-008":  ["Art.21(i)"],
  "POL-009":  ["Art.21(i)"],
  "SOP-009":  ["Art.21(i)"],
  "POL-006":  ["Art.21(e)"],
  "SOP-006":  ["Art.21(e)"],
  "POL-007":  ["Art.21(e)"],
  "SOP-007":  ["Art.21(e)"],
  "POL-022":  ["Art.21(j)"],
  "SOP-022":  ["Art.21(j)"],
  "POL-023":  ["Art.21(e)"],
  "SOP-023":  ["Art.21(e)"],
};

// Colour constants
const NIS2_COLOR   = "#F59E0B";
const NIS2_BG      = "rgba(245,158,11,0.12)";
const NIS2_BORDER  = "rgba(245,158,11,0.45)";

const FRAMEWORK_DOCS = [
  { id: "IMF-001", title: "Information Management Framework", type: "Framework" },
  { id: "GOV-001", title: "NIS2 Governance Instrument",       type: "Governance Instrument" },
  { id: "RACI-001",title: "Roles, Responsibilities & Authorities", type: "RACI" },
  { id: "EXC-001", title: "Exception Management Policy & Register", type: "Companion" },
  { id: "REG-001", title: "IMF Document Register",            type: "Register" },
  { id: "PLAN-001",title: "Gap Remediation Implementation Plan", type: "Plan" },
  { id: "REF-001", title: "Regulatory Authority Contact Register", type: "Reference" },
];

const DOMAINS = [
  {
    id:"data", label:"Data Governance", icon:"◈", color:"#4FC3F7",
    bg:"rgba(79,195,247,0.07)", border:"rgba(79,195,247,0.25)",
    regs:["GDPR","UK GDPR","HIPAA","CCPA","21 CFR Part 11","ALCOA+"],
    policies:[
      { id:"POL-001", title:"Data Classification Policy",    sops:[{ id:"SOP-001", title:"Data Classification Process",    wis:[{ id:"WI-001", title:"Data Classification Questionnaire" }] }] },
      { id:"POL-002", title:"Data Retention & Disposal Policy", sops:[{ id:"SOP-002", title:"Data Retention & Disposal Process", wis:[] }] },
      { id:"POL-003", title:"Data Integrity Policy (ALCOA+)", sops:[{ id:"SOP-003", title:"Data Integrity Process", wis:[] }] },
      { id:"POL-004", title:"Privacy Policy",                sops:[{ id:"SOP-004", title:"Privacy / DPIA Process", wis:[] }], note:"v1.1 — test data mgmt" },
    ]
  },
  {
    id:"system", label:"System & Change", icon:"◎", color:"#81C784",
    bg:"rgba(129,199,132,0.07)", border:"rgba(129,199,132,0.25)",
    regs:["21 CFR Part 11","EU Annex 11","GAMP 5","ISO 27001"],
    policies:[
      { id:"POL-005", title:"System Classification Policy",  sops:[{ id:"SOP-005", title:"System Classification Process", wis:[{ id:"WI-005", title:"System Classification Questionnaire" }] }] },
      { id:"POL-006", title:"Computer System Validation Policy", sops:[{ id:"SOP-006", title:"CSV Process", wis:[] }] },
      { id:"POL-007", title:"Change Management Policy",      sops:[{ id:"SOP-007", title:"Change Management Process", wis:[] }] },
    ]
  },
  {
    id:"access", label:"Access & Identity", icon:"⬡", color:"#FFB74D",
    bg:"rgba(255,183,77,0.07)", border:"rgba(255,183,77,0.25)",
    regs:["ISO 27001","21 CFR Part 11","SOX ITGC","HIPAA"],
    policies:[
      { id:"POL-008", title:"Access Control Policy",         sops:[{ id:"SOP-008", title:"Access Control Process", wis:[] }] },
      { id:"POL-009", title:"Privileged Access Management Policy", sops:[{ id:"SOP-009", title:"PAM Process", wis:[] }] },
    ]
  },
  {
    id:"risk", label:"Risk & Resilience", icon:"◇", color:"#F06292",
    bg:"rgba(240,98,146,0.07)", border:"rgba(240,98,146,0.25)",
    regs:["ISO 27001","NIST CSF","NIS2 Art.21(a)","NIS2 Art.21(c)"],
    policies:[
      { id:"POL-010", title:"Information Security Risk Policy", sops:[{ id:"SOP-010", title:"IS Risk Assessment Process", wis:[] }], note:"v1.1 — threat intel" },
      { id:"POL-011", title:"Business Continuity Policy",    sops:[{ id:"SOP-011", title:"BC/DR Process", wis:[] }] },
      { id:"POL-016", title:"Backup Management Policy",      sops:[{ id:"SOP-016", title:"Backup & Restore Process", wis:[] }] },
    ]
  },
  {
    id:"secops", label:"Security Operations", icon:"◉", color:"#BA68C8",
    bg:"rgba(186,104,200,0.07)", border:"rgba(186,104,200,0.25)",
    regs:["ISO 27001","NIS2 Art.21","NIST SP 800-61","GDPR Art.33"],
    policies:[
      { id:"POL-012", title:"Incident Response Policy",      sops:[{ id:"SOP-012", title:"Security Incident Response Process", wis:[], note:"v1.1 — NIS2 Art.23" }] },
      { id:"POL-014", title:"Audit Trail & Monitoring Policy", sops:[{ id:"SOP-014", title:"Audit Trail Review Process", wis:[] }] },
      { id:"POL-015", title:"IT Service Management Policy",  sops:[{ id:"SOP-015", title:"ITSM Operational Incident Process", wis:[] }] },
      { id:"POL-017", title:"Vulnerability Management Policy", sops:[{ id:"SOP-017", title:"Vulnerability Management Process", wis:[] }], note:"v1.1 — CVD" },
      { id:"POL-018", title:"Cryptography & Key Management Policy", sops:[{ id:"SOP-018", title:"Cryptography & Key Mgmt Process", wis:[] }] },
      { id:"POL-019", title:"Network Security Policy",       sops:[{ id:"SOP-019", title:"Network Security Process", wis:[] }] },
    ]
  },
  {
    id:"vendor", label:"Third Party & Vendor", icon:"△", color:"#4DB6AC",
    bg:"rgba(77,182,172,0.07)", border:"rgba(77,182,172,0.25)",
    regs:["ISO 27001","NIS2 Art.21(d)","GDPR Art.28","HIPAA BAA"],
    policies:[
      { id:"POL-013", title:"Third Party & Vendor Risk Policy", sops:[{ id:"SOP-013", title:"Vendor Risk Assessment Process", wis:[] }] },
    ]
  },
  {
    id:"people", label:"People & Culture", icon:"◯", color:"#FFD54F",
    bg:"rgba(255,213,79,0.07)", border:"rgba(255,213,79,0.25)",
    regs:["ISO 27001","NIS2 Art.20(2)","NIS2 Art.21(g)","GDPR"],
    policies:[
      { id:"POL-020", title:"Security Awareness & Training Policy", sops:[{ id:"SOP-020", title:"Security Awareness & Training Process", wis:[] }], note:"v1.1 — Tier 0 Board" },
      { id:"POL-021", title:"HR Security & Acceptable Use Policy", sops:[{ id:"SOP-021", title:"HR Security Process", wis:[{ id:"WI-021", title:"Acceptable Use Policy" }] }] },
    ]
  },
  {
    id:"commsai", label:"Communications & AI", icon:"✦", color:"#CE93D8",
    bg:"rgba(206,147,216,0.07)", border:"rgba(206,147,216,0.25)",
    regs:["NIS2 Art.21(j)","ISO 27001 A.8.26","EU AI Act","FDA AI/ML","GDPR Art.22"],
    policies:[
      { id:"POL-022", title:"Communications Security Policy", sops:[{ id:"SOP-022", title:"Communications Security Process", wis:[] }] },
      { id:"POL-023", title:"AI Governance & Acceptable Use Policy", sops:[{ id:"SOP-023", title:"AI Governance Process", wis:[] }] },
    ]
  },
];

const REG_DETAILS = [
  { name:"ISO 27001:2022", color:"#4FC3F7", desc:"ISMS standard. Core structural framework for the entire IMF. Annex A controls addressed across all 23 policies.", docs:["All policies","All SOPs","GOV-001","RACI-001","EXC-001"] },
  { name:"NIS2 Directive (EU) 2022/2555", color:"#F59E0B", desc:"Art.20 board governance & personal liability. Art.21 risk-management measures (a–j). Art.23 three-stage incident reporting to CSIRT/NCA.", docs:["GOV-001","SOP-012 v1.1","POL-020 v1.1","POL-022","POL-017 v1.1","POL-010 v1.1","REF-001"] },
  { name:"21 CFR Part 11 / EU Annex 11", color:"#FFB74D", desc:"FDA/EMA regulations for electronic records and signatures in GxP environments. Data integrity, audit trails, validated systems.", docs:["POL-003","SOP-003","POL-005","SOP-005","POL-006","SOP-006","POL-014","SOP-014"] },
  { name:"GDPR / UK GDPR", color:"#F06292", desc:"Lawful processing, data subject rights, DPIAs, 72-hour breach notification, international transfers, data protection by design.", docs:["POL-004","SOP-004","POL-001","POL-002","SOP-012 v1.1","REF-001"] },
  { name:"HIPAA", color:"#CE93D8", desc:"Privacy Rule, Security Rule, Breach Notification Rule. PHI protection. BAA requirement for business associates.", docs:["POL-004","SOP-004","POL-008","POL-013","SOP-013","SOP-012 v1.1"] },
  { name:"SOX ITGC", color:"#FFD54F", desc:"IT General Controls for Sarbanes-Oxley. Change management, access controls, audit trails for financial reporting systems.", docs:["POL-007","SOP-007","POL-008","SOP-008","POL-014","SOP-014","POL-002"] },
  { name:"EU AI Act / FDA AI/ML", color:"#BA68C8", desc:"Risk-based AI obligations. High-risk AI in healthcare. AI/ML-based SaMD guidance. Phased 2024–2026 EU implementation.", docs:["POL-023","SOP-023"] },
  { name:"GAMP 5 / ALCOA+", color:"#A5D6A7", desc:"Good Automated Manufacturing Practice. ALCOA+ data integrity: Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available.", docs:["POL-003","SOP-003","POL-005","POL-006"] },
  { name:"NIST CSF 2.0 / CCPA / CPRA", color:"#80CBC4", desc:"NIST Cybersecurity Framework Identify/Protect/Detect/Respond/Recover functions. California consumer privacy rights.", docs:["IMF-001","POL-010","SOP-010","POL-004","SOP-004"] },
];

const STATS = [
  { n:"56", label:"Documents" },
  { n:"9",  label:"Domains" },
  { n:"23", label:"Policies" },
  { n:"23", label:"SOPs" },
  { n:"3",  label:"Work Instructions" },
  { n:"7",  label:"Governance Docs" },
];

// ── Helpers ───────────────────────────────────────────────────────────────
function nis2Articles(id) { return NIS2[id] || []; }
function isNIS2(id)       { return !!NIS2[id]; }

function domainHasNIS2(domain) {
  return domain.policies.some(p =>
    isNIS2(p.id) || p.sops.some(s => isNIS2(s.id))
  );
}

// ── NIS2 badge ────────────────────────────────────────────────────────────
function NIS2Badge({ articles, small }) {
  if (!articles || articles.length === 0) return null;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      background: NIS2_BG,
      border: `1px solid ${NIS2_BORDER}`,
      borderRadius: 4,
      padding: small ? "1px 5px" : "2px 7px",
      fontFamily:"monospace",
      fontSize: small ? 8 : 9,
      color: NIS2_COLOR,
      whiteSpace:"nowrap",
      flexShrink: 0,
    }}>
      <span style={{fontSize: small ? 7 : 8, opacity:0.8}}>⚑</span>
      NIS2 {articles.join(" ")}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function IMFOverview() {
  const [tab, setTab]                 = useState("map");
  const [expandedDomain, setExpanded] = useState(null);
  const [nis2Only, setNis2Only]       = useState(false);

  const nis2DocCount = Object.keys(NIS2).length;

  // domains visible when filter is active
  const visibleDomains = nis2Only
    ? DOMAINS.filter(d => domainHasNIS2(d))
    : DOMAINS;

  return (
    <div style={{ minHeight:"100vh", background:"#080E1A", color:"#E2E8F0", fontFamily:"Georgia,'Times New Roman',serif" }}>
      {/* Background grid */}
      <div style={{
        position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        backgroundImage:"linear-gradient(rgba(79,195,247,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(79,195,247,0.025) 1px,transparent 1px)",
        backgroundSize:"40px 40px",
      }}/>

      <div style={{position:"relative",zIndex:1}}>

        {/* ── Header ── */}
        <div style={{
          borderBottom:"1px solid rgba(79,195,247,0.18)",
          padding:"36px 44px 28px",
          background:"linear-gradient(180deg,rgba(79,195,247,0.05) 0%,transparent 100%)",
        }}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
            <div>
              <div style={{fontFamily:"monospace",fontSize:10,color:"#4FC3F7",letterSpacing:"0.2em",marginBottom:8,opacity:0.75}}>
                IMF-001 · INFORMATION MANAGEMENT FRAMEWORK · v1.1
              </div>
              <h1 style={{fontSize:"clamp(22px,3.5vw,38px)",fontWeight:400,margin:0,letterSpacing:"-0.02em",lineHeight:1.15,color:"#F1F5F9"}}>
                Policy &amp; Procedure<br/>
                <span style={{color:"#4FC3F7"}}>Architecture Overview</span>
              </h1>
              <p style={{marginTop:10,color:"#475569",fontFamily:"monospace",fontSize:11,letterSpacing:"0.04em"}}>
                Life-Sciences · ISO 27001 · NIS2 · 21 CFR Part 11 · GDPR · HIPAA · SOX · EU AI Act
              </p>
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {STATS.map(s => (
                <div key={s.label} style={{
                  background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:8,padding:"10px 16px",textAlign:"center",minWidth:72,
                }}>
                  <div style={{fontSize:24,fontWeight:700,color:"#4FC3F7",fontFamily:"monospace",lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:9,color:"#475569",marginTop:3,letterSpacing:"0.06em"}}>{s.label.toUpperCase()}</div>
                </div>
              ))}
              {/* NIS2 stat */}
              <div style={{
                background: nis2Only ? NIS2_BG : "rgba(245,158,11,0.06)",
                border:`1px solid ${nis2Only ? NIS2_BORDER : "rgba(245,158,11,0.2)"}`,
                borderRadius:8,padding:"10px 16px",textAlign:"center",minWidth:72,
                cursor:"pointer", transition:"all 0.2s",
              }} onClick={()=>setNis2Only(v=>!v)} title="Toggle NIS2 filter">
                <div style={{fontSize:24,fontWeight:700,color:NIS2_COLOR,fontFamily:"monospace",lineHeight:1}}>{nis2DocCount}</div>
                <div style={{fontSize:9,color:NIS2_COLOR,marginTop:3,letterSpacing:"0.06em",opacity:0.85}}>NIS2 DOCS</div>
              </div>
            </div>
          </div>

          {/* Tabs + NIS2 toggle */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:24,flexWrap:"wrap"}}>
            {[["map","Document Map"],["domains","Domain Detail"],["regs","Regulatory Scope"]].map(([k,l]) => (
              <button key={k} onClick={()=>setTab(k)} style={{
                background:tab===k?"rgba(79,195,247,0.12)":"transparent",
                border:`1px solid ${tab===k?"rgba(79,195,247,0.45)":"rgba(255,255,255,0.09)"}`,
                color:tab===k?"#4FC3F7":"#64748B",borderRadius:6,padding:"6px 16px",cursor:"pointer",
                fontFamily:"monospace",fontSize:11,letterSpacing:"0.08em",transition:"all 0.15s",
              }}>{l.toUpperCase()}</button>
            ))}

            {/* NIS2 filter toggle */}
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
              {nis2Only && (
                <span style={{fontFamily:"monospace",fontSize:10,color:NIS2_COLOR,opacity:0.8}}>
                  SHOWING NIS2-RELEVANT ONLY
                </span>
              )}
              <button onClick={()=>setNis2Only(v=>!v)} style={{
                display:"flex", alignItems:"center", gap:7,
                background: nis2Only ? NIS2_BG : "transparent",
                border: `1px solid ${nis2Only ? NIS2_BORDER : "rgba(245,158,11,0.3)"}`,
                borderRadius:6, padding:"6px 14px", cursor:"pointer",
                fontFamily:"monospace", fontSize:11, color: nis2Only ? NIS2_COLOR : "#78716C",
                letterSpacing:"0.08em", transition:"all 0.2s",
              }}>
                <span style={{fontSize:12}}>⚑</span>
                NIS2 FILTER {nis2Only ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>

        <div style={{padding:"36px 44px"}}>

          {/* ── MAP TAB ── */}
          {tab==="map" && (
            <div>
              {/* Framework layer */}
              {!nis2Only && (
                <div style={{marginBottom:36}}>
                  <Label>FRAMEWORK &amp; GOVERNANCE LAYER — 7 DOCUMENTS</Label>
                  <div style={{
                    background:"linear-gradient(135deg,rgba(79,195,247,0.07) 0%,rgba(79,195,247,0.03) 100%)",
                    border:"1px solid rgba(79,195,247,0.22)",borderRadius:10,padding:"18px 20px",
                  }}>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:8}}>
                      {FRAMEWORK_DOCS.map(d => <FwCard key={d.id} doc={d} nis2Only={nis2Only}/>)}
                    </div>
                  </div>
                </div>
              )}
              {nis2Only && (
                <div style={{marginBottom:36}}>
                  <Label>FRAMEWORK &amp; GOVERNANCE LAYER — NIS2-RELEVANT</Label>
                  <div style={{
                    background:`linear-gradient(135deg,${NIS2_BG} 0%,rgba(245,158,11,0.04) 100%)`,
                    border:`1px solid ${NIS2_BORDER}`,borderRadius:10,padding:"18px 20px",
                  }}>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:8}}>
                      {FRAMEWORK_DOCS.filter(d=>isNIS2(d.id)).map(d => <FwCard key={d.id} doc={d} nis2Only={nis2Only}/>)}
                    </div>
                  </div>
                </div>
              )}

              {/* Domain cards */}
              <Label>
                {nis2Only
                  ? `NIS2-RELEVANT DOMAINS — ${visibleDomains.length} OF ${DOMAINS.length} DOMAINS · CLICK TO EXPAND`
                  : `POLICY DOMAINS — 8 DOMAINS · 23 POLICIES · 23 SOPs · 3 WORK INSTRUCTIONS · CLICK TO EXPAND`
                }
              </Label>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:14}}>
                {visibleDomains.map(d => (
                  <DomCard key={d.id} domain={d}
                    expanded={expandedDomain===d.id}
                    onToggle={()=>setExpanded(expandedDomain===d.id?null:d.id)}
                    nis2Only={nis2Only}
                  />
                ))}
              </div>

              {/* Legend */}
              <div style={{marginTop:36,display:"flex",gap:20,flexWrap:"wrap",alignItems:"center",paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                <span style={{fontFamily:"monospace",fontSize:10,color:"#334155",letterSpacing:"0.1em"}}>LEGEND:</span>
                {[
                  ["Policy",         "rgba(255,255,255,0.16)", "#CBD5E1"],
                  ["SOP",            "rgba(255,255,255,0.09)", "#94A3B8"],
                  ["Work Instruction","rgba(255,255,255,0.05)", "#64748B"],
                  ["v1.1 amended",   "rgba(79,195,247,0.35)",  "#4FC3F7"],
                ].map(([lbl,bdr,col])=>(
                  <div key={lbl} style={{display:"flex",alignItems:"center",gap:7}}>
                    <div style={{width:26,height:14,border:`1px solid ${bdr}`,borderRadius:3,background:"rgba(255,255,255,0.02)"}}/>
                    <span style={{fontFamily:"monospace",fontSize:10,color:col}}>{lbl}</span>
                  </div>
                ))}
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  <span style={{
                    fontFamily:"monospace",fontSize:8,color:NIS2_COLOR,
                    border:`1px solid ${NIS2_BORDER}`,borderRadius:4,
                    padding:"1px 6px",background:NIS2_BG,
                  }}>⚑ NIS2</span>
                  <span style={{fontFamily:"monospace",fontSize:10,color:NIS2_COLOR}}>NIS2 article</span>
                </div>
              </div>
            </div>
          )}

          {/* ── DOMAINS TAB ── */}
          {tab==="domains" && (
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              {visibleDomains.map(d => (
                <div key={d.id} style={{
                  border:`1px solid ${d.border}`,borderLeft:`4px solid ${d.color}`,
                  borderRadius:10,background:d.bg,overflow:"hidden",
                }}>
                  <div style={{padding:"14px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:18,color:d.color}}>{d.icon}</span>
                      <div>
                        <div style={{fontWeight:600,fontSize:14,color:"#F1F5F9",letterSpacing:"-0.01em"}}>{d.label}</div>
                        <div style={{fontFamily:"monospace",fontSize:9,color:"#475569",marginTop:2}}>
                          {d.policies.length} POLIC{d.policies.length!==1?"IES":"Y"} · {d.policies.reduce((s,p)=>s+p.sops.length,0)} SOPs
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"flex-end",maxWidth:400}}>
                      {d.regs.map(r=>(
                        <span key={r} style={{fontFamily:"monospace",fontSize:9,color:d.color,border:`1px solid ${d.border}`,borderRadius:3,padding:"2px 7px"}}>{r}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{borderTop:`1px solid ${d.border}`}}>
                    {d.policies.map((pol,pi) => {
                      const showPol = !nis2Only || isNIS2(pol.id) || pol.sops.some(s=>isNIS2(s.id));
                      if (!showPol) return null;
                      return (
                        <div key={pol.id} style={{borderBottom:pi<d.policies.length-1?"1px solid rgba(255,255,255,0.035)":"none"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 22px 8px",background:"rgba(255,255,255,0.018)",flexWrap:"wrap"}}>
                            <span style={{fontFamily:"monospace",fontSize:11,color:d.color,minWidth:64,fontWeight:700}}>{pol.id}</span>
                            <span style={{fontSize:13,color:"#CBD5E1",flex:1}}>{pol.title}</span>
                            {pol.note&&<span style={{fontFamily:"monospace",fontSize:9,color:"#4FC3F7",whiteSpace:"nowrap"}}>· {pol.note}</span>}
                            <NIS2Badge articles={nis2Articles(pol.id)} small />
                            <span style={{fontFamily:"monospace",fontSize:9,color:"#334155",background:"rgba(255,255,255,0.03)",padding:"2px 7px",borderRadius:3}}>POLICY</span>
                          </div>
                          {pol.sops.map(sop => {
                            if (nis2Only && !isNIS2(sop.id)) return null;
                            return (
                              <div key={sop.id}>
                                <div style={{display:"flex",alignItems:"center",gap:10,padding:"7px 22px 7px 44px",flexWrap:"wrap"}}>
                                  <span style={{fontFamily:"monospace",fontSize:10,color:"#64748B",minWidth:64}}>{sop.id}</span>
                                  <span style={{fontSize:12,color:"#94A3B8",flex:1}}>
                                    {sop.title}
                                    {sop.note&&<span style={{marginLeft:7,fontFamily:"monospace",fontSize:9,color:"#4FC3F7"}}>· {sop.note}</span>}
                                  </span>
                                  <NIS2Badge articles={nis2Articles(sop.id)} small />
                                  <span style={{fontFamily:"monospace",fontSize:9,color:"#1E293B",background:"rgba(255,255,255,0.015)",padding:"2px 7px",borderRadius:3}}>SOP</span>
                                </div>
                                {!nis2Only && sop.wis&&sop.wis.map(wi=>(
                                  <div key={wi.id} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 22px 5px 66px"}}>
                                    <span style={{fontFamily:"monospace",fontSize:9,color:"#334155",minWidth:64}}>{wi.id}</span>
                                    <span style={{fontSize:11,color:"#64748B",flex:1}}>{wi.title}</span>
                                    <span style={{fontFamily:"monospace",fontSize:9,color:"#1E293B",border:"1px solid rgba(255,255,255,0.04)",padding:"2px 7px",borderRadius:3}}>WI</span>
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── REGS TAB ── */}
          {tab==="regs" && (
            <div>
              <p style={{color:"#475569",fontFamily:"monospace",fontSize:11,marginBottom:28,lineHeight:1.9}}>
                THE IMF ADDRESSES 9 REGULATORY FRAMEWORKS ACROSS ITS 56 DOCUMENTS.
                ESSENTIAL ENTITY STATUS UNDER NIS2 (HEALTH SECTOR, ANNEX I) IS ASSUMED.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
                {REG_DETAILS.map(r=>(
                  <div key={r.name} style={{
                    background: r.name.startsWith("NIS2") ? NIS2_BG : "rgba(255,255,255,0.02)",
                    border:`1px solid ${r.name.startsWith("NIS2") ? NIS2_BORDER : r.color+"35"}`,
                    borderTop:`3px solid ${r.color}`,borderRadius:8,padding:"16px 18px",
                  }}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
                      <div style={{width:7,height:7,borderRadius:"50%",background:r.color,flexShrink:0}}/>
                      <span style={{fontFamily:"monospace",fontSize:11,color:r.color,fontWeight:700}}>{r.name}</span>
                      {r.name.startsWith("NIS2") && (
                        <span style={{fontFamily:"monospace",fontSize:9,color:NIS2_COLOR,marginLeft:"auto"}}>⚑ ESSENTIAL ENTITY</span>
                      )}
                    </div>
                    <p style={{fontSize:12,color:"#94A3B8",margin:"0 0 11px",lineHeight:1.65}}>{r.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                      {r.docs.map(d=>(
                        <span key={d} style={{fontFamily:"monospace",fontSize:9,color:"#475569",border:"1px solid rgba(255,255,255,0.06)",borderRadius:3,padding:"1px 6px"}}>{d}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{
          borderTop:"1px solid rgba(255,255,255,0.05)",
          padding:"16px 44px",
          display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,
        }}>
          <span style={{fontFamily:"monospace",fontSize:10,color:"#1E293B"}}>
            IMF v1.1 · 56 DOCUMENTS · {nis2DocCount} NIS2-RELEVANT · INTEGRITY SCAN: 0 ERRORS · CLASSIFICATION: INTERNAL USE
          </span>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["ISO 27001","NIS2","21 CFR Pt.11","GDPR","HIPAA","SOX","EU AI Act","GAMP 5"].map(r=>(
              <span key={r} style={{fontFamily:"monospace",fontSize:9,color: r==="NIS2" ? NIS2_COLOR : "#334155",border:`1px solid ${r==="NIS2"?"rgba(245,158,11,0.3)":"rgba(255,255,255,0.05)"}`,borderRadius:3,padding:"2px 6px"}}>{r}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function Label({children}) {
  return <div style={{fontFamily:"monospace",fontSize:10,color:"#475569",letterSpacing:"0.14em",marginBottom:12}}>{children}</div>;
}

function FwCard({doc, nis2Only}) {
  const [h,setH] = useState(false);
  const articles = nis2Articles(doc.id);
  const highlight = articles.length > 0;
  return (
    <div
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        background: h
          ? (highlight ? "rgba(245,158,11,0.15)" : "rgba(79,195,247,0.1)")
          : (highlight ? "rgba(245,158,11,0.07)" : "rgba(79,195,247,0.035)"),
        border:`1px solid ${h
          ? (highlight ? NIS2_BORDER : "rgba(79,195,247,0.45)")
          : (highlight ? "rgba(245,158,11,0.3)" : "rgba(79,195,247,0.18)")}`,
        borderRadius:7, padding:"10px 14px", cursor:"default", transition:"all 0.15s",
      }}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6,marginBottom:3}}>
        <span style={{fontFamily:"monospace",fontSize:11,color: highlight ? NIS2_COLOR : "#4FC3F7",fontWeight:700}}>{doc.id}</span>
        {articles.length > 0 && <NIS2Badge articles={articles} small />}
      </div>
      <div style={{fontSize:11,color:"#94A3B8",lineHeight:1.4}}>{doc.title}</div>
      <div style={{fontFamily:"monospace",fontSize:9,color:"#334155",marginTop:5}}>{doc.type.toUpperCase()}</div>
    </div>
  );
}

function DomCard({domain, expanded, onToggle, nis2Only}) {
  const polCount = domain.policies.length;
  const sopCount = domain.policies.reduce((s,p)=>s+p.sops.length,0);
  const wiCount  = domain.policies.reduce((s,p)=>s+p.sops.reduce((ss,sop)=>ss+(sop.wis?sop.wis.length:0),0),0);
  const hasNIS2  = domainHasNIS2(domain);

  return (
    <div style={{
      border:`1px solid ${expanded ? domain.color+"55" : domain.border}`,
      borderTop:`3px solid ${domain.color}`,
      borderRadius:10,
      background: expanded ? domain.bg : "rgba(255,255,255,0.013)",
      transition:"all 0.2s", overflow:"hidden",
      outline: (hasNIS2 && !expanded) ? `1px solid rgba(245,158,11,0.18)` : "none",
    }}>
      <div onClick={onToggle} style={{padding:"15px 17px",cursor:"pointer",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
            <span style={{fontSize:16,color:domain.color}}>{domain.icon}</span>
            <span style={{fontWeight:600,fontSize:13,color:"#E2E8F0",letterSpacing:"-0.01em"}}>{domain.label}</span>
            {hasNIS2 && (
              <span style={{fontFamily:"monospace",fontSize:8,color:NIS2_COLOR,border:`1px solid ${NIS2_BORDER}`,borderRadius:3,padding:"1px 5px",background:NIS2_BG}}>
                ⚑ NIS2
              </span>
            )}
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {domain.policies.map(p => {
              const pNis2 = isNIS2(p.id) || p.sops.some(s=>isNIS2(s.id));
              if (nis2Only && !pNis2) return null;
              return (
                <span key={p.id} style={{
                  fontFamily:"monospace",fontSize:9,
                  color: pNis2 ? NIS2_COLOR : domain.color,
                  opacity: pNis2 ? 1 : 0.75,
                  border:`1px solid ${pNis2 ? NIS2_BORDER : domain.border}`,
                  background: pNis2 ? NIS2_BG : "transparent",
                  borderRadius:3,padding:"1px 6px",
                }}>{p.id}</span>
              );
            })}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:"#64748B"}}>{polCount}P·{sopCount}S{wiCount?`·${wiCount}W`:""}</div>
          <div style={{fontFamily:"monospace",fontSize:10,color:domain.color,opacity:0.5}}>{expanded?"▲":"▼"}</div>
        </div>
      </div>

      {expanded && (
        <div style={{borderTop:`1px solid ${domain.border}`,padding:"12px 17px 15px"}}>
          {domain.policies.map((pol,pi) => {
            const polNis2 = nis2Articles(pol.id);
            const sopNis2 = pol.sops.some(s=>isNIS2(s.id));
            if (nis2Only && polNis2.length===0 && !sopNis2) return null;
            return (
              <div key={pol.id} style={{marginBottom:pi<domain.policies.length-1?13:0}}>
                <div style={{
                  background: polNis2.length>0 ? "rgba(245,158,11,0.09)" : "rgba(255,255,255,0.055)",
                  border:`1px solid ${polNis2.length>0 ? NIS2_BORDER : "rgba(255,255,255,0.15)"}`,
                  borderRadius:5,padding:"8px 11px",display:"flex",alignItems:"center",gap:9,flexWrap:"wrap",
                }}>
                  <span style={{fontFamily:"monospace",fontSize:10,color:polNis2.length>0?NIS2_COLOR:domain.color,fontWeight:700,minWidth:55}}>{pol.id}</span>
                  <span style={{fontSize:11,color:"#CBD5E1",flex:1}}>{pol.title}</span>
                  {pol.note&&<span style={{fontFamily:"monospace",fontSize:8,color:"#4FC3F7",whiteSpace:"nowrap"}}>· {pol.note}</span>}
                  <NIS2Badge articles={polNis2} small />
                </div>

                {pol.sops.map(sop => {
                  const sopArts = nis2Articles(sop.id);
                  if (nis2Only && sopArts.length===0) return null;
                  return (
                    <div key={sop.id} style={{marginLeft:14,marginTop:3}}>
                      <div style={{
                        background: sopArts.length>0 ? "rgba(245,158,11,0.05)" : "rgba(255,255,255,0.025)",
                        border:`1px solid ${sopArts.length>0 ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.09)"}`,
                        borderRadius:5,padding:"6px 11px",display:"flex",alignItems:"center",gap:9,flexWrap:"wrap",
                      }}>
                        <span style={{fontFamily:"monospace",fontSize:9,color:sopArts.length>0?NIS2_COLOR:"#64748B",minWidth:55}}>{sop.id}</span>
                        <span style={{fontSize:11,color:"#94A3B8",flex:1}}>
                          {sop.title}
                          {sop.note&&<span style={{marginLeft:6,fontFamily:"monospace",fontSize:8,color:"#4FC3F7"}}>· {sop.note}</span>}
                        </span>
                        <NIS2Badge articles={sopArts} small />
                      </div>
                      {!nis2Only && sop.wis&&sop.wis.map(wi=>(
                        <div key={wi.id} style={{marginLeft:14,marginTop:3}}>
                          <div style={{background:"rgba(255,255,255,0.01)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:5,padding:"5px 11px",display:"flex",alignItems:"center",gap:9}}>
                            <span style={{fontFamily:"monospace",fontSize:9,color:"#334155",minWidth:55}}>{wi.id}</span>
                            <span style={{fontSize:10,color:"#64748B",flex:1}}>{wi.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
