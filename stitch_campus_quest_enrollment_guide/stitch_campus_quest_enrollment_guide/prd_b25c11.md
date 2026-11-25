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
* **Section A: Document & Requirement Checklist**
  * Interactive checkable list of items to bring:
    * လိုင်စင်ဓာတ်ပုံ (၃) ပုံ — *၁ ပုံ ဖောင်ထိပ်တွင်ကပ်ရန်၊ ၂ ပုံ ကလစ်ဖြင့် ညှပ်ထည့်ရန်*
    * မှတ်ပုံတင် မူရင်း နှင့် မိတ္တူ (ကျောင်းသား၊ အဘ၊ အမိ အချက်အလက်အပြည့်အစုံ)
    * ပထမနှစ် ခုံအမှတ်၊ တက္ကသိုလ်မှတ်ပုံတင်အမှတ် နှင့် ၁၀ တန်းအောင် ခုံအမှတ်/စာစစ်ဌာန
    * ကျောင်းလခပေးသွင်းရန် **UAB Pay** အကောင့် (ငွေအလုံအလောက် ဖြည့်ထားရန်)
* **Section B: Multi-Step Form Pre-fill Wizard (Matching Official UY Form)**
  * Organize inputs into 4 clean tabs/steps so mobile screens aren't overwhelmed:
    * **Step 1 (သင်တန်းအချက်အလက်):** ပညာသင်နှစ် (`၂၀၂၆ - ၂၀၂၇`), သင်တန်းနှစ် (`ဒုတိယနှစ်`), အထူးပြုဘာသာ (`ကွန်ပျူတာသိပ္ပံ`), ခုံအမှတ် (`ပကသ - ...`), တက္ကသိုလ်မှတ်ပုံတင်အမှတ်, တက္ကသိုလ်ဝင်ရောက်သည့်နှစ်.
    * **Step 2 (ကျောင်းသား/အဘ/အမိ အချက်အလက်):**
      * Student: အမည် (မြန်မာ/English), လူမျိုး, ကိုးကွယ်သည့်ဘာသာ, မွေးဖွားရာဇာတိ, မှတ်ပုံတင်အမှတ်, မွေးသက္ကရာဇ်, ၁၀ တန်းအောင် ခုံအမှတ်/ခုနှစ်/စာစစ်ဌာန, အမြဲတမ်းနေရပ်လိပ်စာ, ဖုန်းနံပါတ်.
      * Father (အဘ): အမည် (မြန်မာ/English), လူမျိုး, ဘာသာ, ဇာတိ, မှတ်ပုံတင်အမှတ်, အလုပ်အကိုင်, လိပ်စာ, ဖုန်းနံပါတ်.
      * Mother (အမိ): အမည် (မြန်မာ/English), လူမျိုး, ဘာသာ, ဇာတိ, မှတ်ပုံတင်အမှတ်, အလုပ်အကိုင်, လိပ်စာ, ဖုန်းနံပါတ်.
    * **Step 3 (ဖြေဆိုခဲ့သည့် စာမေးပွဲများ):** ပထမနှစ် အဓိကဘာသာ, ခုံအမှတ်, ခုနှစ်, အောင်/ရှုံး.
    * **Step 4 (နောက်ကျောဘက် ဝန်ခံချက်နှင့် ထောက်ပံ့သူ):** ထောက်ပံ့မည့်ပုဂ္ဂိုလ် (အမည်, တော်စပ်ပုံ, အလုပ်အကိုင်, လိပ်စာ), ပညာသင်ထောက်ပံ့ကြေး (`ပြု`), ယခုဆက်သွယ်ရန်လိပ်စာ, နေ့စွဲ.
  * **Validation Highlight:** Empty required fields show a subtle red border/indicator (`*`) so users notice missing info before arriving at the counter.
  * **Live Form Preview:** Renders a clean, structured facsimile of the official front & back form pages populated in real-time with the user's entered values (highlighted in blue text) so students can easily copy onto the physical paper form on campus.

### 3.4 View 3: Active Campus Quest Dashboard
* **Sticky Collapsible Quest Header (Top of Viewport):**
  * **Collapsed State (Default):** Shows only the current active quest title (e.g., `CURRENT QUEST (1/4): သိပ္ပံဆောင် (အပိုင်း ၁)...`) with a toggle chevron button (`▼`).
  * **Expanded State:** Drops down an overview drawer showing all 4 Main Quests, their completion status (Green check vs. pending), and allows jumping/viewing progress at a glance.
* **Context Setup Card:**
  * **Class Year Selector:** `First Year`, `Second Year`, `Third Year`, `Fourth Year` (Default: `Second Year`).
  * **Entry Gate Selector:** `အဓိပတိလမ်း (Main ဂိတ်)` vs. `မာလာဂိတ်ပေါက်`. Displays tailored walking directions from the selected gate to **Science Building (သိပ္ပံဆောင်)**.
* **Quest Sequence & Sub-Quests (Exact Campus Workflow):**
  * **Quest 1: သိပ္ပံဆောင် (အပိုင်း ၁) - ဖောင်ထုတ်ယူခြင်း နှင့် ကြွေးကျန်စစ်ဆေးခြင်း**
    * *Location:* သိပ္ပံဆောင် (Science Building) — *Note: ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန နှစ်ခုလုံး ဤတစ်ဆောင်တည်းတွင် ရှိသည်။*
    * *Map Button:* Direct link to Science Building on Google Maps.
    * *Sub-quests:*
      1. ကျောင်းသားရေးရာ ကောင်တာတွင် 'သဟောင်းများ ပညာဆက်လက်သင်ခွင့် လျှောက်လွှာ' ထုတ်ယူပါ။
      2. ဖောင်ထိပ်တွင် ဓာတ်ပုံ (၁) ပုံကပ်ပြီး ကျန် (၂) ပုံကို ညှပ်ထည့်ကာ အချက်အလက်များ ပြည့်စုံစွာဖြည့်ပါ။ (Include quick link button to view user's Pre-filled Sample).
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