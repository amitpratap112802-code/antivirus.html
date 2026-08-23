<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320" width="100%" height="auto">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05070D"/>
      <stop offset="50%" stop-color="#0B1220"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>

    <!-- Cyan Accent Gradient -->
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00D4FF"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>

    <!-- Grid Pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" stroke-width="0.75" opacity="0.4"/>
      <circle cx="40" cy="40" r="1" fill="#00D4FF" opacity="0.3"/>
    </pattern>

    <!-- Glow Filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Outer Background Canvas -->
  <rect width="1200" height="320" fill="url(#bgGrad)" rx="12" stroke="#1E293B" stroke-width="2"/>
  <rect width="1200" height="320" fill="url(#grid)" rx="12"/>

  <!-- Left Tech Accent Lines -->
  <path d="M 0 60 L 60 60 L 100 100 L 100 220 L 60 260 L 0 260" fill="none" stroke="#00D4FF" stroke-width="2" opacity="0.3"/>
  <circle cx="100" cy="100" r="4" fill="#00D4FF" opacity="0.6"/>
  <circle cx="100" cy="220" r="4" fill="#8B5CF6" opacity="0.6"/>

  <!-- Right Tech Accent Lines -->
  <path d="M 1200 60 L 1140 60 L 1100 100 L 1100 220 L 1140 260 L 1200 260" fill="none" stroke="#00D4FF" stroke-width="2" opacity="0.3"/>
  <circle cx="1100" cy="100" r="4" fill="#00D4FF" opacity="0.6"/>
  <circle cx="1100" cy="220" r="4" fill="#8B5CF6" opacity="0.6"/>

  <!-- Tactical HUD Corner Graphics -->
  <path d="M 30 30 L 70 30 M 30 30 L 30 70" stroke="#00D4FF" stroke-width="3" fill="none" filter="url(#glow)"/>
  <path d="M 1170 30 L 1130 30 M 1170 30 L 1170 70" stroke="#00D4FF" stroke-width="3" fill="none" filter="url(#glow)"/>
  <path d="M 30 290 L 70 290 M 30 290 L 30 250" stroke="#8B5CF6" stroke-width="3" fill="none" filter="url(#glow)"/>
  <path d="M 1170 290 L 1130 290 M 1170 290 L 1170 250" stroke="#8B5CF6" stroke-width="3" fill="none" filter="url(#glow)"/>

  <!-- Center Shield Icon -->
  <g transform="translate(600, 65)">
    <polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12" fill="#0B1220" stroke="url(#cyanGrad)" stroke-width="2.5" filter="url(#glow)"/>
    <path d="M -8 0 L -2 6 L 10 -6" fill="none" stroke="#00D4FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Typography -->
  <!-- Title -->
  <text x="600" y="130" text-anchor="middle" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="30" font-weight="800" letter-spacing="4">
    ANTIVIRUS SECURITY DASHBOARD
  </text>

  <!-- Subtitle -->
  <text x="600" y="165" text-anchor="middle" fill="#00D4FF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="6">
    AI-ASSISTED CYBERSECURITY UI
  </text>

  <!-- Divider Line -->
  <line x1="400" y1="190" x2="800" y2="190" stroke="url(#cyanGrad)" stroke-width="1.5" opacity="0.8"/>

  <!-- Tactical Status Metrics -->
  <text x="600" y="225" text-anchor="middle" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="600" letter-spacing="4">
    OBSERVE  •  ANALYZE  •  SCAN  •  MONITOR
  </text>

  <!-- Bottom Indicator Pill -->
  <g transform="translate(600, 260)">
    <rect x="-100" y="-12" width="200" height="24" rx="12" fill="#111827" stroke="#1E293B" stroke-width="1"/>
    <circle cx="-80" cy="0" r="4" fill="#22C55E"/>
    <text x="5" y="4" text-anchor="middle" fill="#22C55E" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="2">SYSTEM ACTIVE</text>
  </g>
</svg>

</div>

<br />

<div align="center">
</div>
### 📡 Project Signal Bar

<div align="center">

| Signal | Value | Signal | Value |
| :--- | :--- | :--- | :--- |
| **Development Status** | `🟢 ACTIVE DEVELOPMENT` | **Frontend Stack** | `HTML5 • CSS3 • JS (ES6+)` |
| **Project Type** | `Cybersecurity Dashboard UI` | **Data Visualization** | `Chart.js` |
| **Workflow Methodology** | `AI-Assisted Engineering` | **Deployment Target** | `GitHub Pages` |

</div>

<br />
┌──────────────────────────────────────────────────────────────────────────────────┐
│  LIVE DEMO    : https://amitpratap112802-code.github.io/antivirus-security-dashboard/ │
│  REPOSITORY   : https://github.com/amitpratap112802-code/antivirus-security-dashboard│
└──────────────────────────────────────────────────────────────────────────────────┘
---

### 🌐 Overview & Core Concept

The **Antivirus Security Dashboard** is a high-density, centralized monitoring interface designed to synthesize security metrics, scan workflows, and system event data into a clear human-centric visual experience. Built using an AI-assisted development model, this project demonstrates how generative AI tools and precise prompt engineering can accelerate front-end delivery while maintaining strict structural, architectural, and visual standards.
> **Note:** This project is an interactive front-end visual dashboard designed for telemetry representation, workflow orchestration, and UI design pattern exploration. It is not an enterprise antivirus engine or a real-time system kernel monitor.

---

### 🛡 Feature Matrix

<table>
  <tr>
    <td width="33%">
      <h4>🛡 Security Dashboard</h4>
      <p>Centralized view of security status, active shields, threat levels, and system health markers.</p>
    </td>
    <td width="33%">
      <h4>🔍 Scanning Workflow</h4>
      <p>Visual controls for quick, full, and custom file system scanning routines with progress metrics.</p>
    </td>
    <td width="33%">
      <h4>📊 Analytics Suite</h4>
      <p>Interactive temporal charts powered by Chart.js representing threat detection rates over time.</p>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <h4>💻 System Monitoring</h4>
      <p>Telemetry panels tracking resource allocation, CPU/Memory load, and network transfer rates.</p>
    </td>
    <td width="33%">
      <h4>🚨 Threat Log Panel</h4>
      <p>Categorized stream showing flagged system events, severity indexes, and status resolutions.</p>
    </td>
    <td width="33%">
      <h4>📱 Adaptive Layout</h4>
      <p>Fluid, fully responsive interface architecture optimized for desktop and high-density monitors.</p>
    </td>
  </tr>
</table>

---

### 🏗 System Architecture

The layout below illustrates the logical boundary between the client-side presentation layer and external backend service integrations.

```mermaid
graph TD
    classDef user fill:#0B1220,stroke:#00D4FF,stroke-width:2px,color:#FFF;
    classDef frontend fill:#111827,stroke:#8B5CF6,stroke-width:2px,color:#FFF;
    classDef modules fill:#05070D,stroke:#1E293B,stroke-width:1px,color:#94A3B8;
    classDef backend fill:#0B1220,stroke:#22C55E,stroke-width:2px,color:#FFF;

    User([👤 Operator / Security Analyst]) -->|Interacts with UI| Browser[💻 Web Browser Layer]
    
    subgraph Client_Side [Static Frontend Architecture - GitHub Pages]
        Browser --> IndexHTML[index.html - Structure Layer]
        IndexHTML --> DashboardUI[🎨 Dashboard Interface Engine]
        
        DashboardUI --> SecStatus[🛡️ Security Status Panel]
        DashboardUI --> ScanEngine[🔍 Scanning Visualizer]
        DashboardUI --> AnalyticsEngine[📊 Analytics Engine - Chart.js]
        DashboardUI --> SystemMon[💻 Resource Telemetry]
    end

    Client_Side -->|Async REST / API Calls| APIComm[⚡ API Gateway Communication Layer]

    subgraph External_Services [Separate Backend Services - Independent Host]
        APIComm --> BackendService[⚙️ Backend Service Infrastructure]
        BackendService --> SecurityData[(🗄️ Security & System Data Store)]
    end

    class User user;
    class Browser,IndexHTML,DashboardUI frontend;
    class SecStatus,ScanEngine,AnalyticsEngine,SystemMon modules;
    class APIComm,BackendService,SecurityData backend;
+-----------------------------------------------------------------------------------+
|                        CLIENT-SIDE FRONTEND (GitHub Pages)                        |
|                                                                                   |
|  [ User ] ---> [ Web Browser ] ---> [ index.html ]                                |
|                                          │                                        |
|                                          ▼                                        |
|                                 [ Dashboard UI Engine ]                           |
|                                          │                                        |
|             ┌────────────────────┬───────┴────────────┬────────────────────┐      |
|             ▼                    ▼                    ▼                    ▼      |
|     [Security Status]    [Scanning Panel]     [Chart.js Analytics]   [System Telemetry] |
+──────────────────────────────────────────┬────────────────────────────────────────+
                                           │
                                    (API Request Stream)
                                           │
                                           ▼
+-----------------------------------------------------------------------------------+
|                        EXTERNAL BACKEND SERVICES (Isolated)                        |
|                                                                                   |
|                   [ API Gateway ] ---> [ Backend Logic / Engine ]                 |
|                                                  │                                |
|                                                  ▼                                |
|                                       [( System & Threat Logs )]                  |
+-----------------------------------------------------------------------------
🔄 Data Flow Pipeline

┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│     INPUT       │      │     PROCESS     │      │     ANALYZE     │
│ Raw Telemetry & │ ───> │ Ingestion & Data│ ───> │ Event Metrics & │
│ Security Events │      │ Parsing Engine  │      │ Aggregation     │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  USER ACTION    │      │    DASHBOARD    │      │    VISUALIZE    │
│ Mitigation &    │ <─── │ Actionable UI   │ <─── │ Chart Rendering │
│ System Controls │      │ Render State    │      │ & Signal Flags  │
└─────────────────┘      └─────────────────┘      └─────────────────┘
graph LR
    classDef tech fill:#0B1220,stroke:#00D4FF,stroke-width:1.5px,color:#FFF;
    classDef target fill:#111827,stroke:#22C55E,stroke-width:2px,color:#FFF;

    HTML5[HTML5 - Semantics] --- CSS3[CSS3 - Custom UI/Vars]
    CSS3 --- JS[JavaScript ES6+ - Logic]
    JS --- ChartJS[Chart.js - Visualization]
    
    HTML5 --> UI[Dashboard UI System]
    CSS3 --> UI
    JS --> UI
    ChartJS --> UI

    UI --> GitHubPages[Deployed to GitHub Pages]

    class HTML5,CSS3,JS,ChartJS tech;
    class UI,GitHubPages target;
┌──────────────┐
│     IDEA     │ Contextualization & Functional Scope
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ AI PROMPTING │ Structured Prompt Framing & Context Injection
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  PROTOTYPE   │ Rapid Interface Generation & Component Drafting
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   DEVELOP    │ Logic Integration, State Management & Styling
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ REVIEW/TEST  │ Edge-case Analysis, Layout Checks & Audit
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    REFINE    │ Optimization, Accessibility & Visual Polishing
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    DEPLOY    │ Production Packaging & GitHub Pages Release
└──────────────┘
antivirus-security-dashboard/
│
├── backend/                  # Service infrastructure & API handling (Separate deployment)
│   └── ...                   # Backend source files and configuration scripts
│
├── index.html                # Main application entryway & DOM layout framework
│
├── README.md                 # Technical repository case study & documentation
│
└── SETUP.md                  # Development environment configuration & instructions
┌─────────────────────────────────────────────────────────┐
│                     GITHUB PAGES                        │
│                                                         │
│                     index.html                          │
│                  STATIC FRONTEND                        │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ REST / API Communication
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND SERVICE                       │
│                                                         │
│                      backend/                           │
│                 INDEPENDENT HOSTING                     │
└─────────────────────────────────────────────────────────┘
[ Local Environment ] ───> [ Git Commit ] ───> [ Main Branch ] ───> [ GitHub Actions/Pages ] ───> [ Live App ]
AI CAPABILITIES
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
[ Generative AI ]   [ Prompt Engineering ] [ AI-Assisted Dev ]
       │                    │                    │
       └────────────────────┼────────────────────┘
                            │
                            ▼
                    SOFTWARE ENGINEERING
                            │
       ┌────────────────────┴────────────────────┐
       ▼                                         ▼
[ Frontend Systems ]                     [ Interactive Interfaces ]
       │                                         │
       └────────────────────┬────────────────────┘
                            │
                            ▼
                     DELIVERY TARGET
                            │
               [ Production Web Software ]
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   AI accelerates the workflow.                                   │
│   Engineering gives it structure.                                │
│   Design makes it usable.                                        │
│   Iteration makes it better.                                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
[ STATUS ]    : 🟢 ACTIVE DEVELOPMENT
[ FRONTEND ]  : AVAILABLE / DEPLOYED
[ HOSTING ]   : GITHUB PAGES
[ BACKEND ]   : SEPARATE SERVICE (LOCAL/INDEPENDENT)
[ LICENSE ]   : NOT CURRENTLY SPECIFIED
BUILD WITH AI.  •  ENGINEER WITH INTENT.  •  DESIGN FOR PEOPLE.
[ Phase 1: Current ] ───> [ Phase 2: Next ] ───> [ Phase 3: Future ]
