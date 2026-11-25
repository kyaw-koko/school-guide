---
name: uy-enrollment-guide-builder
description: Specialized skill for building, maintaining, and expanding the University of Yangon (UY) Enrollment Guide web application. Use this skill when creating or modifying campus quest steps, Burmese form pre-fill previews, Google Maps campus links, or adding new academic majors to the JSON data structure.
---

# SKILL: University of Yangon Enrollment Guide Architecture & Domain Rules

## 1. Core Domain Knowledge (UY Computer Studies Workflow)
Whenever editing or generating enrollment data, workflows, or UI text for the University of Yangon (CS Department), strictly apply these verified on-campus facts:

* **Two-Building Physical Flow Only:**
  1. **သိပ္ပံဆောင် (Science Building):** Contains **both** Student Affairs (ကျောင်းသားရေးရာ / စာတမ်းမှတ်ဌာနစိတ်) and Finance/Accounts (ဘဏ္ဍာရေးဌာန / ငွေလက်ခံဌာန).
  2. **ULB (University Library Building — Top Floor):** Contains the Department of Computer Studies (ကွန်ပျူတာသိပ္ပံပညာဌာန) office for Professor/HOD signature and department stamp.
* **Library Clearance Stamp Exception:**
  * Although the stamp reads *"ရန်ကုန်တက္ကသိုလ် ဗဟိုစာကြည့်တိုက် - စာအုပ်ကြွေးကျန်မရှိပါ"*, students **DO NOT** walk to the Central Library building. This clearance and stamping is handled directly at the **Finance Department inside Science Building (သိပ္ပံဆောင်)**. Always keep this clarification visible in Quest 1.
* **License Photo Rule:**
  * Exactly **3 license photos**: 1 glued to the top-left photo box of the form, 2 clipped to the form.
* **Payment Rule (Strict):**
  * Tuition fees must be paid via **UAB Pay Only**. Never suggest KBZPay, WavePay, AYA Pay, or cash counters. Always remind students to prepare a receipt copy (ချာလံမိတ္တူ) before returning to Science Building.

---

## 2. Official Paper Form Mapping (`FormLivePreview`)
When building or updating the Form Pre-fill Wizard and Live Preview replica, ensure every field maps accurately to the two-sided UY paper form ("သဟောင်းများ ပညာဆက်လက်သင်ခွင့် လျှောက်လွှာ"):

* **Front Page Structure:**
  1. **Header & Academic Info:** Academic Year (`၂၀၂၆ - ၂၀၂၇`), Class Year (`ဒုတိယနှစ်`), Major (`ကွန်ပျူတာသိပ္ပံ`), Roll No (`ပကသ - ...`), University Registration No, Year of Entry (`၂၀၂၅ - ၂၀၂၆`).
  2. **3-Column Personal Table (ကျောင်းသား/သူ | အဘ | အမိ):**
     * Name (Myanmar & English), Race (လူမျိုး), Religion (ကိုးကွယ်သည့်ဘာသာ), Place of Birth (မွေးဖွားရာဇာတိ), NRC No (မှတ်ပုံတင်အမှတ်).
     * Student-only rows: Date of Birth (မွေးသက္ကရာဇ်), Matriculation Exam Roll No / Year / Exam Center, Permanent Address & Phone.
     * Parent/Guardian rows: Occupation/Rank/Department (အလုပ်အကိုင်/ရာထူး/ဌာန), Full Address & Phone.
  3. **Past Exams Table (ဖြေဆိုခဲ့သည့် စာမေးပွဲများ):** First Year Major, Roll No, Year, Pass/Fail status.
* **Back Page Structure:**
  1. **Section 3 (ကျောင်းနေရန် အထောက်အပံ့ပြုမည့်ပုဂ္ဂိုလ်):** Name (က), Relationship (ခ), Occupation (ဂ), Contact Address (ဃ).
  2. **Section 4 (ပညာသင်ထောက်ပံ့ကြေးပေးရန် ပြု/မပြု):** Default/example `ပြု`.
  3. **Self-Declaration & Signature Block:** Date (`နေ့စွဲ`), Current Contact Address box (`ယခုဆက်သွယ်ရန်လိပ်စာ`), Student Signature (`ပညာဆက်လက်သင်ခွင့်တောင်းသူ၏ လက်မှတ်`).
  4. **Office & Clearance Stamps Zone (Read-only visual reference in preview):** University Office check, Professor/HOD signature (`ပါမောက္ခ/ဌာနမှူး`), Accounts Receipt section (`ငွေလက်ခံသည့်ဌာန`), and Central Library clearance stamp area (`စာအုပ်ကြွေးကျန်မရှိပါ`).

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