# Product Requirements Document (PRD): UY CS Enrollment Guide

## 1. Project Overview
* **Project Name:** UY Computer Studies Enrollment Guide (ရန်ကုန်တက္ကသိုလ် ကွန်ပျူတာသိပ္ပံပညာဌာန ကျောင်းအပ်လမ်းညွှန်)
* **Target Audience:** Undergraduate students enrolling at the Department of Computer Studies, University of Yangon (starting with Second Year, scalable to all academic years and majors).
* **Core Problem:** Students often get confused on campus during enrollment day regarding where to collect forms, how to fill out specific fields accurately, which department stamps/signatures are required, the exact physical building sequence, and payment rules.
* **Solution:** A mobile-first, interactive, step-by-step "Quest-style" web guide combined with a live Form Pre-fill Wizard and direct Google Maps campus navigation.
* **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide React (`lucide-react`), `localStorage` (for client-side persistence).
* **Language:** Burmese (Unicode) UI with English technical/academic labels where appropriate.

---

## 2. Core Architectural Principles
1. **Scalable JSON Data-Driven Architecture:** All major-specific workflows, building coordinates, checklists, and quest steps must reside in a structured data file (`src/data/enrollmentData.ts`) keyed by major ID (e.g., `cs`). Adding future majors (Physics, Chemistry, English, etc.) must require zero UI refactoring.
2. **Mobile-First & One-Handed UX:** Designed primarily for students walking around campus using smartphones. Large tap targets, sticky collapsible navigation headers, and high-contrast status indicators.
3. **Offline/Reload Resilience:** All checklist progress, selected gate/year preferences, and pre-filled form inputs must auto-save to `localStorage`.
4. **No Heavy Map APIs:** Use direct Google Maps search/navigation URLs (`https://www.google.com/maps/search/?api=1&query=...`) instead of heavy 2D canvas maps or paid Maps SDKs.

---

## 3. Functional Requirements & User Flow

### 3.1 Global Top Disclaimer Banner
* Display a persistent warning banner at the very top of the viewport:
  * *"၂၀၂၆ - ၂၀၂၇ ပညာသင်နှစ် ကျောင်းအပ်ဖောင်မူရင်းအပေါ် အခြေခံထားပါသည်။ စည်းကမ်းချက်များ နှစ်အလိုက် ပြောင်းလဲနိုင်ပါသည်။"*

### 3.2 View 1: Landing Page (`/`)
* **Header:** University of Yangon badge + Title (`Computer Science (ကွန်ပျူတာသိပ္ပံပညာဌာန) ကျောင်းအပ်နှံခြင်း လမ်းညွှန်`).
* **Primary Action Cards (2 Options Only):**
  1. **ကြိုတင်ပြင်ဆင်ရန် & ဖောင်နမူနာ စမ်းဖြည့်မည် (Prep & Form Pre-fill):** For students preparing at home before arriving on campus.
  2. **ကျောင်းရောက်နေပြီ - လမ်းညွှန်စတင်မည် (Start Active Campus Quest):** For students currently on campus ready to execute step-by-step enrollment tasks.

### 3.3 View 2: Preparation Checklist & Form Pre-fill Wizard
* **Section A: Dynamic Class-Year Document Checklist**
  * Top Class Year toggle (`First Year (လူသစ်)` vs. `Second / Third / Fourth Year (သဟောင်း)`) synced with the Quest Dashboard:
    * **First Year (လူသစ်):** Requires submitting original & photocopied verification documents alongside the form (`မှတ်ပုံတင် မူရင်း/မိတ္တူ`, `၁၀ တန်း အောင်လက်မှတ်/အမှတ်စာရင်း မူရင်း/မိတ္တူ`, `လိုင်စင်ဓာတ်ပုံ (၄) ပုံ — (၄ ပုံလုံး သတ်မှတ်နေရာများတွင် ကော်ဖြင့် သေချာကပ်ရပါမည် — ကော်ဘူး တစ်ပါတည်း ယူဆောင်လာရန် တိုက်တွန်းပါသည်)`, `UAB Pay`).
    * **Returning Students (`Second / Third / Fourth Year`, Default):** Only **လိုင်စင်ဓာတ်ပုံ (၄) ပုံ** (`၄ ပုံလုံး သတ်မှတ်နေရာများတွင် ကော်ဖြင့် သေချာကပ်ရပါမည် — ကော်ဘူး တစ်ပါတည်း ယူဆောင်လာရန် တိုက်တွန်းပါသည်`) is submitted with the form; NRC and past exam/registration info are **NOT submitted** (`ရုံးသို့ တင်ရန်မဟုတ်ပါ — ဖောင်တွင် မှန်ကန်စွာ ကြည့်ကူးဖြည့်နိုင်ရန်သာ ယူဆောင်လာရန်`), plus `UAB Pay`.
* **Section B: Multi-Step Form Pre-fill Wizard (Matching Official UY Form)**
  * Organize inputs into 6 clean tabs/steps so mobile screens aren't overwhelmed:
    * **Tab 1 (`Academic` / သင်တန်းအချက်အလက်):**
      * Header: `academicYear` (`၂၀၂၆ - ၂၀၂၇`), `programLevel` (`ဘွဲ့ကြို` vs `ဘွဲ့လွန်`, default `ဘွဲ့ကြို` with strikethrough on unselected in preview).
      * Academic Box: `classYear` (`ဒုတိယနှစ်`), `major` (`ကွန်ပျူတာသိပ္ပံ`), `rollNo` (`ပကသ - ...`), `uniRegNo` (`ရတ - ...`), `uniEntryYear` (`၂၀၂၅ - ၂၀၂၆`).
    * **Tab 2 (`Student` / ကျောင်းသား/သူ):**
      * `studentNameMm`, `studentNameEn` (labeled `"အမည် (အင်္ဂလိပ်စာဖြင့် ဖြည့်ရန်)"` with `Mg` / `Ma` prefix reminder), `studentRace`, `studentReligion`, `studentBirthplace` (မြို့နယ်/ပြည်နယ်/တိုင်း), `studentNrc`, `studentDob`, `matricRollNo`, `matricYear`, `matricCenter`, `studentPermanentAddress`, `studentPhone`.
    * **Tab 3 (`Father` / အဘ):**
      * `fatherNameMm`, `fatherNameEn` (labeled `"အမည် (အင်္ဂလိပ်စာဖြင့် ဖြည့်ရန်)"` with `U` prefix reminder), `fatherRace`, `fatherReligion`, `fatherBirthplace`, `fatherNrc`, `"အဘ၏ အလုပ်အကိုင် နှင့် နေရပ်လိပ်စာ (အပြည့်အစုံ ဖြည့်ရန်)"` (`fatherOccupation`, `fatherAddress` labeled `"အဘ၏ နေရပ်လိပ်စာ (အပြည့်အစုံ ဖြည့်ရန်)"` with `"ကျောင်းသားလိပ်စာအတိုင်း ဖြည့်မည်"` quick-copy), `fatherPhone`.
    * **Tab 4 (`Mother` / အမိ):**
      * `motherNameMm`, `motherNameEn` (labeled `"အမည် (အင်္ဂလိပ်စာဖြင့် ဖြည့်ရန်)"` with `Daw` prefix reminder), `motherRace`, `motherReligion`, `motherBirthplace`, `motherNrc`, `"အမိ၏ အလုပ်အကိုင် နှင့် နေရပ်လိပ်စာ (အပြည့်အစုံ ဖြည့်ရန်)"` (`motherOccupation`, `motherAddress` labeled `"အမိ၏ နေရပ်လိပ်စာ (အပြည့်အစုံ ဖြည့်ရန်)"` with `"ကျောင်းသားလိပ်စာအတိုင်း ဖြည့်မည်"` quick-copy), `motherPhone`.
    * **Tab 5 (`Past Exam` / ဖြေဆိုခဲ့သည့် စာမေးပွဲများ):**
      * `pastExamMajor` (`ကွန်ပျူတာသိပ္ပံ`), `pastExamRollNo`, `pastExamYear` (`၂၀၂၅ - ၂၀၂၆`), `pastExamResult` (`အောင်`).
    * **Tab 6 (`Sponsor` / နောက်ကျောဘက် ဝန်ခံချက်နှင့် ထောက်ပံ့သူ):**
      * Section 3: `sponsorName`, `sponsorRelation`, `sponsorOccupation`, `sponsorAddress` (with quick-copy buttons `"အဘ အချက်အလက် ထည့်မည်"` / `"အမိ အချက်အလက် ထည့်မည်"`).
      * Section 4: `grantStatus` (`ပြု` / `မပြု`, default `ပြု`).
      * Self-Declaration: `declarationYear` (`၂၀၂၆`), `declarationMonth`, `declarationDay`, `currentContactAddress` (with `"Same as Permanent Address"` quick-fill).
  * **Validation Highlight:** Empty required fields show a subtle red border/indicator (`*`) so users notice missing info before arriving at the counter.
  * **Live Form Preview:** Renders a clean, structured facsimile of the official front & back form pages populated in real-time with the user's entered values (highlighted in `text-blue-700 font-semibold`), strikethrough on the unselected program/grant option, signature prompt `"ပညာဆက်လက်သင်ခွင့်တောင်းသူ၏ လက်မှတ် (ကိုယ်တိုင်လက်မှတ်ထိုးရန်)"`, and office/professor/accounts/library stamp sections clearly marked `"ရုံးပိုင်းဆိုင်ရာ ဖြည့်သွင်းရန် (ကျောင်းသား ဖြည့်ရန်မလို)"`.

### 3.4 View 3: Active Campus Quest Dashboard
* **Sticky Collapsible Quest Header (Top of Viewport):**
  * **Collapsed State (Default):** Shows only the current active quest title (e.g., `CURRENT QUEST (1/4): သိပ္ပံဆောင် (အပိုင်း ၁)...`) with a toggle chevron button (`▼`).
  * **Expanded State:** Drops down an overview drawer showing all 4 Main Quests, their completion status (Green check vs. pending), and allows jumping/viewing progress at a glance.
* **Context Setup & Live Campus Map Card (`LiveCampusMap.tsx`):**
  * **Class Year Selector:** `First Year`, `Second Year`, `Third Year`, `Fourth Year` (Default: `Second Year`).
  * **Verified Science Building GPS Pin:** `lat: 16.83184325671567, lng: 96.13659801107418` (`"📍 သိပ္ပံဆောင် (ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန)"`).
  * **Verified ULB Top Floor (CS Dept) GPS Pin:** `lat: 16.827850798042512, lng: 96.13734101559889` (`"ULB အပေါ်ဆုံးထပ် (ကွန်ပျူတာသိပ္ပံပညာဌာန)"`).
  * **Verified Gate Origin GPS Pin (`16°49'34.7"N 96°08'01.7"E`):** `lat: 16.826306, lng: 96.133806`.
  * **3 Walking Routes (`DirectionsService` in `WALKING` mode + `"Google Maps App ဖြင့် ဖွင့်ရန်"` fallback link):**
    1. `ပြည်လမ်း မာလာမှတ်တိုင် ➔ သိပ္ပံဆောင်` (`Pyay Road Marlar Bus Stop, Yangon` ➔ waypoint `Convocation Street, University of Yangon` ➔ `{ lat: 16.83184325671567, lng: 96.13659801107418 }`).
    2. `တက္ကသိုလ်ရိပ်သာလမ်း ဂိတ်ပေါက် ➔ သိပ္ပံဆောင်` (`{ lat: 16.826306, lng: 96.133806 }` ➔ `{ lat: 16.83184325671567, lng: 96.13659801107418 }`).
    3. `သိပ္ပံဆောင် ➔ ULB (အပေါ်ဆုံးထပ် - CS ဌာန)` (`{ lat: 16.83184325671567, lng: 96.13659801107418 }` ➔ `{ lat: 16.827850798042512, lng: 96.13734101559889 }`).
* **Quest Sequence & Sub-Quests (Exact Campus Workflow):**
  * **Quest 1: သိပ္ပံဆောင် (အပိုင်း ၁) - ဖောင်ထုတ်ယူခြင်း နှင့် ကြွေးကျန်စစ်ဆေးခြင်း**
    * *Location:* သိပ္ပံဆောင် (Science Building) — *Note: ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန နှစ်ခုလုံး ဤတစ်ဆောင်တည်းတွင် ရှိသည်။*
    * *Map Button:* Direct link to Science Building on Google Maps.
    * *Sub-quests:*
      1. ကျောင်းသားရေးရာ ကောင်တာတွင် 'သဟောင်းများ ပညာဆက်လက်သင်ခွင့် လျှောက်လွှာ' ထုတ်ယူပါ။
      2. သတ်မှတ်နေရာများတွင် လိုင်စင်ဓာတ်ပုံ (၄) ပုံလုံးကို ကော်ဖြင့် သေချာကပ်ပြီး အချက်အလက်များ ပြည့်စုံမှန်ကန်စွာ ဖြည့်သွင်းပါ။ (Include quick link button to view user's Pre-filled Sample).
      3. စာတမ်းမှတ်ဌာနစိတ် / ကျောင်းသားရေးရာတွင် ဖောင်စစ်ဆေးပြီး အတည်ပြုလက်မှတ် ယူပါ။
      4. ထိုသိပ္ပံဆောင်ထဲရှိ **ဘဏ္ဍာရေးဌာန** သို့ ဆက်သွားပြီး ငွေစာရင်းနှင့် **ဗဟိုစာကြည့်တိုက် စာအုပ်ကြွေးကျန်မရှိကြောင်း တံဆိပ်တုံးများ** ထုခိုင်းပါ။ *(Explicit Note: ဗဟိုစာကြည့်တိုက်သို့ သီးသန့်သွားရန် မလိုပါ၊ ဘဏ္ဍာရေးဌာနမှ ကိုင်တွယ်ပေးပါသည်။)*
  * **Quest 2: ULB (အပေါ်ဆုံးထပ်) - ပါမောက္ခ (ဌာနမှူး) လက်မှတ်ယူခြင်း**
    * *Location:* ULB အဆောက်အဦ (အပေါ်ဆုံးထပ် - ကွန်ပျူတာသိပ္ပံပညာဌာန)
    * *Map Button:* Direct link to ULB on Google Maps.
    * *Sub-quests:*
      1. သိပ္ပံဆောင်မှ ထွက်ပြီး ULB အပေါ်ဆုံးထပ်ရှိ CS ဌာနရုံးခန်းသို့ သွားပါ။
      2. ဖောင်တင်ပြပြီး ပါမောက္ခ(ဌာနမှူး) လက်မှတ်နှင့် ဌာနတံဆိပ်တုံး ယူပါ။
  * **Quest 3: ကျောင်းလခ ပေးသွင်းခြင်း (UAB Pay Only)**
    * *Location:* Online Payment (`UAB Pay`)
    * *Critical Red Alert Box:* *"အရေးကြီးသတိပေးချက်: ကျောင်းလခကို UAB Pay တစ်မျိုးတည်းဖြင့်သာ ပေးသွင်းရပါမည်။ ငွေလွှဲပြီးပါက ချာလံမိတ္တူ (Receipt Copy) ကို မဖြစ်မနေ ပြင်ဆင်ထားပါ။"*
    * *Sub-quests:*
      1. ပါမောက္ခ လက်မှတ်ရရှိပြီးနောက် UAB Pay ဖြင့် သတ်မှတ်ကျောင်းလခ ပေးသွင်းပါ။
      2. ငွေသွင်းချာလံ မိတ္တူ (Receipt Copy) ထုတ်ယူပါ။
  * **Quest 4: သိပ္ပံဆောင် (အပိုင်း ၂) - ငွေလက်ခံဌာနသို့ ဖောင်ပြန်အပ်ခြင်း**
    * *Location:* သိပ္ပံဆောင် (ဘဏ္ဍာရေး / ငွေလက်ခံဌာန)
    * *Map Button:* Direct link to Science Building on Google Maps.
    * *Sub-quests:*
      1. သိပ္ပံဆောင်ရှိ ဘဏ္ဍာရေးဌာန (ငွေလက်ခံသူ) ထံ လက်မှတ်စုံပါသော ဖောင်နှင့် ငွေသွင်းချာလံမိတ္တူကို အပ်နှံပါ။
      2. ကျောင်းအပ်နှံခြင်း အောင်မြင်စွာ ပြီးဆုံးပါပြီ 🎉

---

## 4. Folder Structure (Recommended for Next.js)
```text
src/
├── app/
│   ├── layout.tsx          # Font setup (Noto Sans Myanmar / Inter) & metadata
│   └── page.tsx            # Main stateful container (Landing / Prep / Quest views)
├── components/
│   ├── DisclaimerBanner.tsx
│   ├── LandingView.tsx
│   ├── PrepAndPrefillView.tsx
│   ├── FormLivePreview.tsx # Visual replica of Front & Back official form
│   ├── QuestDashboard.tsx
│   └── StickyQuestHeader.tsx
├── data/
│   └── enrollmentData.ts   # Strongly typed JSON-like structure for CS & future majors
└── types/
    └── enrollment.ts       # TypeScript interfaces for Major, Quest, SubQuest, FormData