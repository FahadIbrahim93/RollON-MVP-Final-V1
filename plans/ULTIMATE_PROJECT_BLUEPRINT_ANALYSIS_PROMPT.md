# Prompt for Antigravity Agent Manager (Claude Opus Latest Model)

**Role:** Chief Enterprise Architect & Strategist
**Objective:** To comprehensively analyze all provided project artifacts and agent reports to generate the ultimate project blueprint. This blueprint will serve as the Single Source of Truth (SSOT) with proper version management, and define a multi-agent collaboration structure for achieving enterprise-grade, state-of-the-art project success.

## Input Materials for Analysis

You will be provided with the following key documents and project artifacts:

1.  **Agent Reports (3 Perspectives):**
    *   **Kimi Agent Report (This Agent):** `plans/CODE_AUDIT_REPORT.md` & `plans/MULTI_AGENT_AUDIT_REPORT.md`
        *   *Focus:* Detailed technical audit, identification of issues, prioritized remediation plan, multi-agent task breakdown.
    *   **Kilo Code Agent Report (Assumed to be provided separately by the user):**
        *   *Focus:* [Specify Kilo's focus, e.g., backend architecture, database design, API specification, infrastructure strategy]. Expect insights on server-side concerns, data modeling, and potential backend technologies.
    *   **OpenCode AI Agent Report (Assumed to be provided separately by the user):**
        *   *Focus:* [Specify OpenCode's focus, e.g., frontend component architecture, UX/UI patterns, design system, accessibility, performance optimization]. Expect insights on client-side best practices, user experience, and interface design.

2.  **Project Artifacts:**
    *   **`rollon-app/`**: React-based frontend application (Vite, Tailwind, TypeScript, Zustand).
    *   **`target_repo/`**: Another React-based frontend application (Vite, Tailwind, TypeScript, likely shadcn/ui).
    *   Configuration files (`package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`, etc.).
    *   Source code for all pages, components, stores, contexts, types, and utilities within both `rollon-app` and `target_repo`.
    *   `plans/MULTI_AGENT_AUDIT_REPORT.md` (The 9-stage plan for rehabilitation).
    *   Any other relevant files in the `c:/Users/fhdib/Downloads/Kimi_Agent_Deployment_v1` directory.

## Core Analysis Tasks

Your analysis must be meticulous, critical, and strategic. Synthesize information from all sources to address the following:

### 1. Holistic Project Understanding
*   **Unified Vision:** Construct a comprehensive understanding of the project's business objectives, target market (Bangladesh), and core functionalities (e-commerce platform).
*   **Current State Assessment:** Consolidate the findings from all three agent reports into a single, unambiguous view of the project's current state, covering:
    *   **Architecture:** Frontend patterns, state management, component structure, proposed/backend/backend concepts.
    *   **Technology Stack:** Detailed inventory of all technologies, libraries, and tools used (including versions and potential conflicts).
    *   **Code Quality & Security:** Consolidate all identified issues, vulnerabilities, and technical debt.
    *   **Performance & Scalability:** Current bottlenecks and future scalability concerns.
    *   **Testing & Reliability:** Current test coverage and reliability gaps.
    *   **Compliance & Standards:** Alignment with accessibility, SEO, PWA, and other industry standards.
    *   **Business Alignment:** How well the current implementation meets business needs.

### 2. Single Source of Truth (SSOT) & Blueprint Generation
*   **Create the Ultimate Project Blueprint:** This document will be the master plan for achieving enterprise-grade success. It must be structured, actionable, and version-controlled from its inception.
    *   **Executive Summary:** High-level overview, key goals, and success metrics.
    *   **Project Vision & Goals:** Clearly defined, measurable, and time-bound objectives.
    *   **Unified Architecture & Technical Stack:**
        *   Propose a single, coherent architecture that integrates frontend, backend, database, and infrastructure.
        *   Resolve discrepancies between `rollon-app` and `target_repo` (e.g., consolidate into one definitive application or define clear boundaries/purpose for each).
        *   Finalize technology stack with specific, pinned versions.
        *   Design data models (integrate frontend types with backend/database schema).
    *   **Roadmap to Production-Readiness:**
        *   A consolidated, prioritized backlog of all tasks, features, and fixes.
        *   Phased implementation plan (e.g., Discovery, Alpha, Beta, GA, Post-Launch).
        *   Key milestones and deliverables for each phase.
    *   **Multi-Agent Collaboration Framework:**
        *   Define the roles, responsibilities, and interaction protocols for all agents (including Kimi, Kilo, OpenCode, and any new specialized agents).
        *   Specify handoff points and escalation procedures.
        *   Outline the workflow for task assignment, execution, review, and integration.
    *   **Governance & Quality Assurance:**
        *   CI/CD strategy (build, test, deploy, monitoring).
        *   Code review processes and quality gates.
        *   Security scanning and compliance checks.
        *   Performance monitoring and alerting.
    *   **Risk Mitigation Plan:** Identify potential risks (technical, market, operational) and mitigation strategies.
    *   **Success Metrics & KPIs:** Define how success will be measured (e.g., performance metrics, code quality scores, user adoption, business KPIs).

### 3. Version Management & Documentation
*   **Implement Version Control for the Blueprint:** Establish a clear versioning scheme (e.g., v1.0.0 - Initial Blueprint, v1.1.0 - Backend Architecture Defined).
*   **Create Structured Documentation:** Ensure all artifacts generated are well-organized, searchable, and easily understandable by both technical and non-technical stakeholders. This includes the blueprint itself and any supporting documents.

### 4. Multi-Agent Systematic Structure Definition
*   **Agent Specialization & Orchestration:** Define specific roles for agents based on their expertise (e.g., Frontend Specialist, Backend Specialist, Security Specialist, QA Specialist, DevOps Specialist).
*   **Workflow Design:** Design systematic workflows for common project activities (e.g., feature development, bug fixing, release management) that leverage the multi-agent structure.
*   **Communication Protocols:** Define how agents will communicate, share information, and resolve conflicts.

## Output Deliverables

1.  **The Ultimate Project Blueprint Document (`ULTIMATE_PROJECT_BLUEPRINT_v1.0.0.md`):**
    *   A comprehensive, single-source document representing the master plan.
    *   Clearly structured sections as outlined in "SSOT & Blueprint Generation" above.
    *   Actionable, prioritized, and time-bound.
2.  **Multi-Agent Collaboration Framework Document (`MULTI_AGENT_FRAMEWORK_v1.0.0.md`):**
    *   Details on agent roles, responsibilities, and workflows.
3.  **Consolidated & Prioritized Backlog (`PROJECT_BACKLOG_v1.0.0.md`):**
    *   A single, prioritized list of all tasks, issues, and features, derived from all agent reports.
4.  **Versioned Artifacts:**
    *   All output documents must be clearly versioned and stored in a structured manner within the `plans/` directory.

## Constraints & Guidelines

*   **Enterprise-Grade Focus:** All recommendations must be suitable for a production, scalable, and maintainable enterprise environment.
*   **State-of-the-Art:** Leverage modern best practices, tools, and architectural patterns.
*   **Critical & Constructive:** Be brutally honest in your assessment. Avoid sugar-coating. Provide clear justifications for all recommendations.
*   **Actionable:** The blueprint must be a practical guide for execution, not just a theoretical document.
*   **Integration:** The primary challenge is synthesizing three potentially different perspectives into one coherent strategy. Focus on integration and synergy.
*   **Zero Assumptions:** Where information is missing or conflicting, state this clearly in the analysis and propose a method to resolve it (e.g., "Requires clarification from product team," "Spike needed to evaluate technology X").

---

**Final Instruction:**

Using the documents and artifacts provided, perform the analysis as outlined above and generate the specified deliverables. Your output will be the foundation for all subsequent project activities, executed by a team of AI agents.