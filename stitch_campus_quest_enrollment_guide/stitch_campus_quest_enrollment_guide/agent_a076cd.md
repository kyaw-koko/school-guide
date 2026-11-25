# AGENT.md — AI Coding Guidelines & Project Rules

## 1. Role & Objective
You are an expert Next.js, TypeScript, and Tailwind CSS engineer building the **UY Computer Studies Enrollment Guide** (`PRD.md`). Your goal is to create a fast, mobile-first, bug-free web application tailored for University of Yangon students navigating campus enrollment.

---

## 2. Tech Stack & Environment Rules
* **Framework:** Next.js (App Router) with strict TypeScript (`strict: true`).
* **Styling:** Tailwind CSS only. Do not install heavy UI libraries (e.g., MUI, Ant Design).
* **Icons:** Use `lucide-react` exclusively for all UI icons.
* **Package Manager:** Prefer `yarn` commands when running or suggesting package installations (e.g., `yarn add lucide-react`).
* **State Persistence:** Use `localStorage` for saving user checklist progress, selected gate/year, and form pre-fill data. Always wrap `localStorage` access inside `useEffect` or client-side guards to prevent Next.js SSR hydration mismatch errors.

---

## 3. Domain-Specific Business Logic (CRITICAL — DO NOT DEVIATE)
When generating data, copy, or workflow logic, strictly enforce these real-world University of Yangon (CS Department) rules:
1. **Only Two Physical Campus Buildings:**
   * **သိပ္ပံဆောင် (Science Building):** Houses **both** Student Affairs (ကျောင်းသားရေးရာ / စာတမ်းမှတ်ဌာနစိတ်) and Finance/Accounts (ဘဏ္ဍာရေးဌာန / ငွေလက်ခံဌာန).
   * **ULB (University Library Building — Top Floor):** Houses the Department of Computer Studies (ကွန်ပျူတာသိပ္ပံပညာဌာန) where students get the Professor/Head of Department signature and stamp.
2. **Library Clearance Stamp Rule:**
   * Students **DO NOT** walk to the Central Library building. The *"ဗဟိုစာကြည့်တိုက် စာအုပ်ကြွေးကျန်မရှိပါ"* stamp is handled directly at the **Finance Department inside Science Building (သိပ္ပံဆောင်)**. Explicitly state this note in Quest 1.
3. **Photo Requirement Rule:**
   * Total **3 license photos**: 1 glued to the top of the form, 2 clipped to the form.
4. **Payment Method Restriction (UAB Pay Only):**
   * Tuition fee payment MUST strictly specify **UAB Pay Only**. Do not mention KBZPay, WavePay, AYA Pay, or cash counters as valid payment options. Emphasize keeping a printed/copied receipt (ချာလံမိတ္တူ) to submit back at Science Building.
5. **Scalable Data-Driven Structure:**
   * Keep all major-specific content inside `src/data/enrollmentData.ts` indexed by major key (`cs`). UI components must read dynamically from this data structure so adding other majors later requires zero UI rewrites.

---

## 4. UI/UX & Typography Standards
* **Burmese Unicode Rendering:**
  * Configure `Noto Sans Myanmar` alongside `Inter` in `src/app/layout.tsx`.
  * Always apply generous line-height (`leading-relaxed` or `leading-7`) and vertical padding on Burmese text containers so stacked diacritics and vowels (`အပေါ်/အောက် အသတ်များ`) are never clipped.
* **Mobile-First One-Handed Design:**
  * Constrain main content containers (`max-w-md mx-auto`) for clean mobile ergonomics while remaining centered and readable on desktop.
  * Ensure the **Sticky Collapsible Quest Header** stays pinned at `top-0 z-30`, collapsed by default to show only the current active quest, expanding smoothly on click to reveal all main quests.
* **Live Form Preview (`FormLivePreview.tsx`):**
  * Must accurately mirror both the **Front Page** (Academic info, Student/Father/Mother table, Past Exams table) and **Back Page** (Sponsor details, Grant checkbox `ပြု`, Date, Current Address, Self-declaration) of the official UY enrollment form.
  * Highlight empty required inputs with a subtle red border (`border-red-300`) and render populated values in distinct blue text (`text-blue-700 font-semibold`) on the preview card.

---

## 5. Execution & Verification Workflow
1. **Step 1:** Create TypeScript interfaces in `src/types/enrollment.ts`.
2. **Step 2:** Create the structured dataset in `src/data/enrollmentData.ts` matching `PRD.md` Section 3.4.
3. **Step 3:** Build modular components (`DisclaimerBanner`, `LandingView`, `PrepAndPrefillView`, `FormLivePreview`, `StickyQuestHeader`, `QuestDashboard`).
4. **Step 4:** Assemble the main stateful view switcher in `src/app/page.tsx` with `localStorage` sync and a "Reset Progress" button.
5. **Step 5:** Run TypeScript check (`npx tsc --noEmit`) and verify zero build or hydration errors before finishing.