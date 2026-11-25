---
name: uy-enrollment-guide-builder
description: Specialized skill for building, maintaining, and expanding the University of Yangon (UY) Enrollment Guide web application. Use this skill when creating or modifying campus quest steps, Burmese form pre-fill previews, Google Maps campus links, or adding new academic majors to the JSON data structure.
---

# SKILL: University of Yangon Enrollment Guide Architecture & Domain Rules

## 1. Core Domain Knowledge (UY Computer Studies Workflow)
Whenever editing or generating enrollment data, workflows, or UI text for the University of Yangon (CS Department), strictly apply these verified on-campus facts:

* **Two-Building Physical Flow & Exact Verified GPS Coordinates:**
  1. **သိပ္ပံဆောင် (Science Building — `lat: 16.83184325671567, lng: 96.13659801107418`):** Contains **both** Student Affairs (ကျောင်းသားရေးရာ / စာတမ်းမှတ်ဌာနစိတ်) and Finance/Accounts (ဘဏ္ဍာရေးဌာန / ငွေလက်ခံဌာန). Use the exact verified GPS coordinates `{ lat: 16.83184325671567, lng: 96.13659801107418 }` for the Science Building map center/marker and routes (`Pyay Road Marlar Bus Stop, Yangon` via `Convocation Street, University of Yangon` ➔ `{ lat: 16.83184325671567, lng: 96.13659801107418 }`; Gate `{ lat: 16.826306, lng: 96.133806 }` ➔ `{ lat: 16.83184325671567, lng: 96.13659801107418 }`).
  2. **ULB (University Library Building — Top Floor, `lat: 16.827850798042512, lng: 96.13734101559889`):** Contains the Department of Computer Studies (ကွန်ပျူတာသိပ္ပံပညာဌာန) office for Professor/HOD signature and department stamp. Quest 2 routes directly from `{ lat: 16.83184325671567, lng: 96.13659801107418 }` to `{ lat: 16.827850798042512, lng: 96.13734101559889 }`.
* **Library Clearance Stamp Exception:**
  * Although the stamp reads *"ရန်ကုန်တက္ကသိုလ် ဗဟိုစာကြည့်တိုက် - စာအုပ်ကြွေးကျန်မရှိပါ"*, students **DO NOT** walk to the Central Library building. This clearance and stamping is handled directly at the **Finance Department inside Science Building (သိပ္ပံဆောင်)**. Always keep this clarification visible in Quest 1.
* **License Photo & Document Submission Rule (By Class Year):**
  * **All Years:** Exactly **4 license photos** — all 4 photos must be glued cleanly in their designated spots (`လိုင်စင်ဓာတ်ပုံ (၄) ပုံ — ၄ ပုံလုံး သတ်မှတ်နေရာများတွင် ကော်ဖြင့် သေချာကပ်ရပါမည် — ကော်ဘူး တစ်ပါတည်း ယူဆောင်လာရန် တိုက်တွန်းပါသည်`).
  * **First Year (လူသစ်):** Must submit photocopies & original verification documents (student/parent NRC copies & 10th-grade pass certificate/marksheet/admission proof) with the new-student application form.
  * **Returning Students (`Second / Third / Fourth Year`, Default):** Submit **only** the 4 license photos with *"သဟောင်းများ ပညာဆက်လက်သင်ခွင့် လျှောက်လွှာ"*; NRC and past roll/registration details are **NOT** submitted (`ရုံးသို့ တင်ရန်မဟုတ်ပါ — ဖောင်တွင် မှန်ကန်စွာ ကြည့်ကူးဖြည့်နိုင်ရန်သာ ယူဆောင်လာရန်`).
* **Payment Rule (Strict):**
  * Tuition fees must be paid via **UAB Pay Only**. Never suggest KBZPay, WavePay, AYA Pay, or cash counters. Always remind students to prepare a receipt copy (ချာလံမိတ္တူ) before returning to Science Building.

---

## 2. Official Paper Form Mapping (`FormLivePreview`)
When building or updating the Form Pre-fill Wizard and Live Preview replica, ensure every field maps accurately to the two-sided UY paper form ("သဟောင်းများ ပညာဆက်လက်သင်ခွင့် လျှောက်လွှာ"):

* **Front Page Structure:**
  1. **Header & Academic Box:** `academicYear` (`၂၀၂၆ - ၂၀၂၇`), `programLevel` (`ဘွဲ့ကြို` vs `ဘွဲ့လွန်`, unselected shown with strikethrough), `classYear` (`ဒုတိယနှစ်`), `major` (`ကွန်ပျူတာသိပ္ပံ`), `rollNo` (`ပကသ - ...`), `uniRegNo` (`ရတ - ...`), `uniEntryYear` (`၂၀၂၅ - ၂၀၂၆`).
  2. **Section 1 — 3-Column Personal Table (ကျောင်းသား/သူ | အဘ | အမိ):**
     * Name Myanmar & English (`studentNameMm`/`studentNameEn`, `fatherNameMm`/`fatherNameEn`, `motherNameMm`/`motherNameEn`), Race (`*Race`), Religion (`*Religion`), Place of Birth (`*Birthplace`), NRC No (`*Nrc`).
     * Student-only rows: Date of Birth (`studentDob`), Matriculation Exam (`matricRollNo`, `matricYear`, `matricCenter`), Permanent Address & Phone (`studentPermanentAddress`, `studentPhone`).
     * Parent/Guardian merged blocks: Occupation / Rank / Dept, Full Address, Phone (`fatherOccupation`, `fatherAddress`, `fatherPhone`; `motherOccupation`, `motherAddress`, `motherPhone`).
  3. **Section 2 — Past Exams Table (ဖြေဆိုခဲ့သည့် စာမေးပွဲများ):** `pastExamMajor`, `pastExamRollNo`, `pastExamYear`, `pastExamResult`.
* **Back Page Structure:**
  1. **Section 3 (ကျောင်းနေရန် အထောက်အပံ့ပြုမည့်ပုဂ္ဂိုလ်):** `(က)` `sponsorName`, `(ခ)` `sponsorRelation`, `(ဂ)` `sponsorOccupation`, `(ဃ)` `sponsorAddress`.
  2. **Section 4 (ပညာသင်ထောက်ပံ့ကြေးပေးရန် ပြု/မပြု):** `grantStatus` (`ပြု` | `မပြု`, default `ပြု`).
  3. **Self-Declaration & Signature Block:** `declarationYear`, `declarationMonth`, `declarationDay`, bordered `currentContactAddress` box (bottom-left), and signature prompt `"ပညာဆက်လက်သင်ခွင့်တောင်းသူ၏ လက်မှတ် (ကိုယ်တိုင်လက်မှတ်ထိုးရန်)"` (bottom-right).
  4. **Office & Clearance Stamps Zone:** Clearly marked `"ရုံးပိုင်းဆိုင်ရာ ဖြည့်သွင်းရန် (ကျောင်းသား ဖြည့်ရန်မလို)"` covering University Office check, Professor/HOD signature (`ပါမောက္ခ/ဌာနမှူး` — ULB), Accounts Receipt section (`ငွေလက်ခံသည့်ဌာန` — Science Building), and Central Library clearance stamp (`စာအုပ်ကြွေးကျန်မရှိပါ` — Science Building Finance Dept).

---

## 3. UI/UX & Technical Implementation Patterns

### A. Sticky Collapsible Quest Header Pattern
* Keep a sticky header at `top-0 z-30` showing the active quest (`CURRENT QUEST X/Y`) when collapsed.
* Clicking the header toggles an accordion drawer listing all main quests with completion badges so students can track overall progress without losing screen space while walking.

### B. Burmese Typography & Layout Safety
* Always load `Noto Sans Myanmar` in `layout.tsx`.
* Apply `leading-relaxed` (or `leading-7`) and sufficient vertical padding (`py-1.5` / `py-2`) to all Burmese text elements so stacked Myanmar vowels/diacritics are never clipped.
* Use `max-w-md mx-auto` for mobile-first ergonomics.

### C. Safe Client Storage (`localStorage`)
* Persist `completedSubQuests`, `selectedYear`, `selectedGate`, and `formData` under a versioned key (e.g., `uy_enrollment_v1`).
* Always hydrate from `localStorage` inside `useEffect` to prevent Next.js SSR hydration mismatches.

---

## 4. How to Add a New Major (Scalability Procedure)
When asked to add another department (e.g., Physics, Mathematics, English):
1. Open `src/data/enrollmentData.ts` (and `src/types/enrollment.ts` if needed).
2. Add a new key (e.g., `physics`) following the exact schema of `cs`.
3. Update `locations` with the specific department building's Google Maps search URL (`https://www.google.com/maps/search/?api=1&query=...`).
4. Keep shared Science Building steps consistent unless the new major has distinct administrative rules.
5. Add a major selector pill on `LandingView.tsx` so students can switch between majors cleanly.