import {
  DisclaimerConfig,
  MajorEnrollmentConfig,
  MajorId,
} from '@/types/enrollment';

export const STORAGE_KEY = 'uy_enrollment_v1';
export const STORAGE_VERSION = 6;

export const GATE_ORIGIN_COORDS = {
  lat: 16.826306,
  lng: 96.133806,
};

export const SCIENCE_BUILDING_COORDS = {
  lat: 16.83184325671567,
  lng: 96.13659801107418,
};

export const ULB_COORDS = {
  lat: 16.827850798042512,
  lng: 96.13734101559889,
};

export const GLOBAL_DISCLAIMER: DisclaimerConfig = {
  shortBadge: '2026–2027 Guide',
  text: '၂၀၂၆ - ၂၀၂၇ ပညာသင်နှစ် ကျောင်းအပ်ဖောင်မူရင်းအပေါ် အခြေခံထားပါသည်။ စည်းကမ်းချက်များ နှစ်အလိုက် ပြောင်းလဲနိုင်ပါသည်။',
};

export const ENROLLMENT_DATA: Record<MajorId, MajorEnrollmentConfig> = {
  cs: {
    id: 'cs',
    badgeText: 'UY · CS Dept',
    titleEn: 'University of Yangon — Computer Science Enrollment Guide',
    titleMm: 'ကွန်ပျူတာသိပ္ပံပညာဌာန ကျောင်းအပ်နှံခြင်း လမ်းညွှန်',
    departmentNameMm: 'ကွန်ပျူတာသိပ္ပံပညာဌာန',
    defaultClassYear: 'Second Year',
    classYears: [
      { id: 'First Year', labelEn: 'First Year', labelMm: 'ပထမနှစ်' },
      { id: 'Second Year', labelEn: 'Second Year', labelMm: 'ဒုတိယနှစ်' },
      { id: 'Third Year', labelEn: 'Third Year', labelMm: 'တတိယနှစ်' },
      { id: 'Fourth Year', labelEn: 'Fourth Year', labelMm: 'စတုတ္ထနှစ်' },
    ],
    landingCards: {
      prep: {
        id: 'prep',
        badge: 'Home Prep',
        titleEn: 'Prep & Smart Form Pre-fill',
        titleMm: 'ကြိုတင်ပြင်ဆင်ရန် & ဖောင်နမူနာ စမ်းဖြည့်မည်',
        footerText: 'Document checklist & live two-sided form preview',
      },
      quest: {
        id: 'quest',
        badge: '4 Quests',
        titleEn: 'On-Campus Enrollment Quest',
        titleMm: 'ကျောင်းရောက်နေပြီ - လမ်းညွှန်စတင်မည်',
        footerText: 'သိပ္ပံဆောင် · ULB · UAB Pay အဆင့် ၄ ဆင့် + Live Map',
      },
    },
    bentoMiniTiles: [
      {
        id: 'mini-buildings',
        icon: 'building',
        title: '2 Buildings Only',
        subtitle: 'သိပ္ပံဆောင် & ULB',
      },
      {
        id: 'mini-uab',
        icon: 'wallet',
        title: 'UAB Pay Only',
        subtitle: 'ချာလံမိတ္တူ သိမ်းထားပါ',
        isCritical: true,
      },
      {
        id: 'mini-photos',
        icon: 'camera',
        title: 'လိုင်စင်ဓာတ်ပုံ (၄) ပုံ',
        subtitle: '၁ ပုံ ဖောင်ထိပ်တွင်ကပ်ရန်၊ ကျန် ၃ ပုံ ကလစ်ဖြင့် ညှပ်ထည့်ရန်',
        fullWidth: true,
      },
    ],
    quickRemindersTitle: 'Quick Campus Reminders',
    quickReminders: [
      {
        id: 'buildings',
        icon: 'building',
        textPrefix: 'အဆောက်အဦ ၂ ခုသာ သွားရန်လိုသည် — ',
        textHighlight: 'သိပ္ပံဆောင် နှင့် ULB (အပေါ်ဆုံးထပ်)',
      },
      {
        id: 'photos',
        icon: 'camera',
        textPrefix: 'လိုင်စင်ဓာတ်ပုံ ',
        textHighlight: '(၄) ပုံ',
        textSuffix: ' — ၁ ပုံ ဖောင်ထိပ်တွင်ကပ်၊ ကျန် ၃ ပုံ ကလစ်ဖြင့်ညှပ်',
      },
      {
        id: 'uab-pay',
        icon: 'wallet',
        textPrefix: 'ကျောင်းလခပေးသွင်းမှု — ',
        textHighlight: 'UAB Pay Only',
        isCritical: true,
      },
    ],
    prepHeader: {
      titleEn: 'Prep & Smart Form Pre-fill',
      titleMm: 'ကြိုတင်ပြင်ဆင်မှုနှင့် ဖောင်နမူနာ',
      questButtonLabel: 'Quest',
      checklistTitle: 'ယူဆောင်ရမည့် စာရွက်စာတမ်းများ',
      checklistBadgeLabel: 'ယူဆောင်ရန်',
      classYearToggleHint: 'သင်တန်းနှစ် ရွေးချယ်ပါ (Class Year)',
      wizardTitle: 'ဖောင်အချက်အလက် ဖြည့်သွင်းရန်',
      requiredHint: '* အနီရောင်ကွက် လိုအပ်သည်',
      viewFormButton: 'Preview Official Form',
    },
    checklistByGroup: {
      firstYear: {
        toggleLabel: 'First Year (လူသစ်)',
        bannerTitle: 'ပထမနှစ် (လူသစ်) — မူရင်းနှင့် မိတ္တူ စာရွက်စာတမ်းများ ပူးတွဲတင်ပြရန် လိုအပ်သည်',
        bannerText:
          'ကျောင်းဝင်ခွင့်အသစ် လျှောက်ထားရမည်ဖြစ်သောကြောင့် မှတ်ပုံတင်မိတ္တူနှင့် ၁၀ တန်းအောင်လက်မှတ်/အမှတ်စာရင်း မူရင်း/မိတ္တူများကို ဖောင်နှင့်အတူ တင်ပြစစ်ဆေးရပါမည်။',
        items: [
          {
            id: 'doc-photos',
            title: 'လိုင်စင်ဓာတ်ပုံ (၄) ပုံ',
            description: '၁ ပုံ ဖောင်ထိပ်တွင်ကပ်ရန်၊ ကျန် ၃ ပုံ ကလစ်ဖြင့် ညှပ်ထည့်ရန်',
            badge: 'ဖောင်နှင့်အတူတင်ရန်',
          },
          {
            id: 'doc-nrc',
            title: 'မှတ်ပုံတင် မူရင်း နှင့် မိတ္တူ (ကျောင်းသား၊ အဘ၊ အမိ)',
            description: 'ပူးတွဲတင်ပြရန် လိုအပ်သည်',
            badge: 'ပူးတွဲတင်ပြရန်',
          },
          {
            id: 'doc-matric',
            title: '၁၀ တန်း အောင်လက်မှတ် / အမှတ်စာရင်း မူရင်းနှင့် မိတ္တူ နှင့် ဝင်ခွင့်အထောက်အထား',
            description: 'ပူးတွဲတင်ပြရန် လိုအပ်သည်',
            badge: 'ပူးတွဲတင်ပြရန်',
          },
          {
            id: 'doc-uab',
            title: 'UAB Pay အကောင့် (UAB Pay Only)',
            description: 'ကျောင်းလခပေးသွင်းရန် UAB Pay အကောင့်ထဲတွင် ငွေအလုံအလောက် ဖြည့်ထားရန်',
            badge: 'UAB Pay Only',
          },
        ],
      },
      returning: {
        toggleLabel: 'Second / Third / Fourth Year (သဟောင်း)',
        bannerTitle: 'သဟောင်းများ — လိုင်စင်ဓာတ်ပုံ (၄) ပုံသာ ဖောင်နှင့်အတူ တင်သွင်းရန်လိုသည်',
        bannerText:
          'မှတ်ပုံတင်မိတ္တူနှင့် စာမေးပွဲစာရွက်စာတမ်းများကို ရုံးသို့တင်ရန် မလိုအပ်ပါ။ ဖောင်တွင် မှန်ကန်စွာ ကြည့်ကူးဖြည့်နိုင်ရန်သာ ယူဆောင်လာပါ။',
        items: [
          {
            id: 'doc-photos',
            title: 'လိုင်စင်ဓာတ်ပုံ (၄) ပုံ',
            description: '၁ ပုံ ဖောင်ထိပ်တွင်ကပ်ရန်၊ ကျန် ၃ ပုံ ကလစ်ဖြင့် ညှပ်ထည့်ရန်',
            badge: 'ဖောင်နှင့်အတူတင်ရန်',
          },
          {
            id: 'doc-nrc',
            title: 'မှတ်ပုံတင်အချက်အလက် (ကျောင်းသား၊ အဘ၊ အမိ)',
            description: 'ရုံးသို့ တင်ရန်မဟုတ်ပါ — ဖောင်တွင် မှန်ကန်စွာ ကြည့်ကူးဖြည့်နိုင်ရန်သာ ယူဆောင်လာရန်',
            badge: 'ကြည့်ကူးရန်သာ',
          },
          {
            id: 'doc-past-info',
            title: 'ယခင်နှစ် ခုံအမှတ်၊ တက္ကသိုလ်မှတ်ပုံတင်အမှတ် နှင့် ၁၀ တန်းအောင် အချက်အလက်',
            description: 'ရုံးသို့ တင်ရန်မဟုတ်ပါ — ဖောင်တွင် မှန်ကန်စွာ ကြည့်ကူးဖြည့်နိုင်ရန်သာ ယူဆောင်လာရန်',
            badge: 'ကြည့်ကူးရန်သာ',
          },
          {
            id: 'doc-uab',
            title: 'UAB Pay အကောင့် (UAB Pay Only)',
            description: 'ကျောင်းလခပေးသွင်းရန် UAB Pay အကောင့်ထဲတွင် ငွေအလုံအလောက် ဖြည့်ထားရန်',
            badge: 'UAB Pay Only',
          },
        ],
      },
    },
    formTabs: [
      { id: 'academic', labelEn: 'Academic', labelMm: 'သင်တန်း' },
      { id: 'student', labelEn: 'Student', labelMm: 'ကျောင်းသား' },
      { id: 'father', labelEn: 'Father', labelMm: 'အဘ' },
      { id: 'mother', labelEn: 'Mother', labelMm: 'အမိ' },
      { id: 'exam', labelEn: 'Past Exam', labelMm: 'စာမေးပွဲ' },
      { id: 'sponsor', labelEn: 'Sponsor', labelMm: 'ထောက်ပံ့/ဝန်ခံ' },
    ],
    tabRequiredFields: {
      academic: ['academicYear', 'classYear', 'major', 'rollNo', 'uniRegNo', 'uniEntryYear'],
      student: [
        'studentNameMm',
        'studentNameEn',
        'studentRace',
        'studentReligion',
        'studentBirthplace',
        'studentNrc',
        'studentDob',
        'matricRollNo',
        'matricYear',
        'matricCenter',
        'studentPermanentAddress',
        'studentPhone',
      ],
      father: ['fatherNameMm', 'fatherRace', 'fatherReligion', 'fatherNrc', 'fatherOccupation'],
      mother: ['motherNameMm', 'motherRace', 'motherReligion', 'motherNrc', 'motherOccupation'],
      exam: ['pastExamMajor', 'pastExamRollNo', 'pastExamYear', 'pastExamResult'],
      sponsor: ['sponsorName', 'sponsorRelation', 'sponsorAddress', 'currentContactAddress'],
    },
    defaultFormData: {
      academicYear: '',
      programLevel: 'ဘွဲ့ကြို',
      classYear: '',
      major: '',
      rollNo: '',
      uniRegNo: '',
      uniEntryYear: '',

      studentNameMm: '',
      studentNameEn: '',
      studentRace: '',
      studentReligion: '',
      studentBirthplace: '',
      studentNrc: '',
      studentDob: '',
      matricRollNo: '',
      matricYear: '',
      matricCenter: '',
      studentPermanentAddress: '',
      studentPhone: '',

      fatherNameMm: '',
      fatherNameEn: '',
      fatherRace: '',
      fatherReligion: '',
      fatherBirthplace: '',
      fatherNrc: '',
      fatherOccupation: '',
      fatherAddress: '',
      fatherPhone: '',

      motherNameMm: '',
      motherNameEn: '',
      motherRace: '',
      motherReligion: '',
      motherBirthplace: '',
      motherNrc: '',
      motherOccupation: '',
      motherAddress: '',
      motherPhone: '',

      pastExamMajor: '',
      pastExamRollNo: '',
      pastExamYear: '',
      pastExamResult: '',

      sponsorName: '',
      sponsorRelation: '',
      sponsorOccupation: '',
      sponsorAddress: '',
      grantStatus: 'ပြု',
      declarationYear: '',
      declarationMonth: '',
      declarationDay: '',
      currentContactAddress: '',
    },
    sampleFormData: {
      academicYear: '၂၀၂၆ - ၂၀၂၇',
      programLevel: 'ဘွဲ့ကြို',
      classYear: 'ဒုတိယနှစ်',
      major: 'ကွန်ပျူတာသိပ္ပံ',
      rollNo: 'ပကသ - ၁၀၁',
      uniRegNo: 'ရတ - ၀၀၀၀၀',
      uniEntryYear: '၂၀၂၅ - ၂၀၂၆',

      studentNameMm: 'မောင်အောင်အောင်',
      studentNameEn: 'Mg Aung Aung',
      studentRace: 'ဗမာ',
      studentReligion: 'ဗုဒ္ဓဘာသာ',
      studentBirthplace: 'ရန်ကုန်မြို့၊ ရန်ကုန်တိုင်းဒေသကြီး',
      studentNrc: '၁၂/ဥကမ(နိုင်)၀၀၀၀၀၀',
      studentDob: '၁ . ၁ . ၂၀၀၆',
      matricRollNo: 'ဒဂမ - ၁၀၀',
      matricYear: '၂၀၂၅',
      matricCenter: 'အ.ထ.က (၁) ဒဂုံ',
      studentPermanentAddress:
        'အမှတ် (၁၂)၊ တက္ကသိုလ်ရိပ်သာလမ်း၊ ကမာရွတ်မြို့နယ်၊ ရန်ကုန်မြို့',
      studentPhone: '09-000000000',

      fatherNameMm: 'ဦးဘ',
      fatherNameEn: 'U Ba',
      fatherRace: 'ဗမာ',
      fatherReligion: 'ဗုဒ္ဓဘာသာ',
      fatherBirthplace: 'ရန်ကုန်မြို့၊ ရန်ကုန်တိုင်းဒေသကြီး',
      fatherNrc: '၁၂/ဥကမ(နိုင်)၁၁၁၁၁၁',
      fatherOccupation: 'ကုန်သည်',
      fatherAddress:
        'အမှတ် (၁၂)၊ တက္ကသိုလ်ရိပ်သာလမ်း၊ ကမာရွတ်မြို့နယ်၊ ရန်ကုန်မြို့',
      fatherPhone: '09-111111111',

      motherNameMm: 'ဒေါ်မြ',
      motherNameEn: 'Daw Mya',
      motherRace: 'ဗမာ',
      motherReligion: 'ဗုဒ္ဓဘာသာ',
      motherBirthplace: 'ရန်ကုန်မြို့၊ ရန်ကုန်တိုင်းဒေသကြီး',
      motherNrc: '၁၂/ဥကမ(နိုင်)၂၂၂၂၂၂',
      motherOccupation: 'မှီခို',
      motherAddress:
        'အမှတ် (၁၂)၊ တက္ကသိုလ်ရိပ်သာလမ်း၊ ကမာရွတ်မြို့နယ်၊ ရန်ကုန်မြို့',
      motherPhone: '09-222222222',

      pastExamMajor: 'ကွန်ပျူတာသိပ္ပံ',
      pastExamRollNo: 'ပကသ - ၁၀၁',
      pastExamYear: '၂၀၂၅ - ၂၀၂၆',
      pastExamResult: 'အောင်',

      sponsorName: 'ဦးဘ',
      sponsorRelation: 'အဘ',
      sponsorOccupation: 'ကုန်သည်',
      sponsorAddress:
        'အမှတ် (၁၂)၊ တက္ကသိုလ်ရိပ်သာလမ်း၊ ကမာရွတ်မြို့နယ်၊ ရန်ကုန်မြို့',
      grantStatus: 'ပြု',
      declarationYear: '၂၀၂၆',
      declarationMonth: 'နိုဝင်ဘာ',
      declarationDay: '၂၅',
      currentContactAddress:
        'အမှတ် (၁၂)၊ တက္ကသိုလ်ရိပ်သာလမ်း၊ ကမာရွတ်မြို့နယ်၊ ရန်ကုန်မြို့',
    },
    formPreviewCopy: {
      sectionTitle: 'ဖောင်နမူနာ (Official Form Replica)',
      blueLegend: 'အပြာရောင်စာသား = ဖြည့်ထားချက်',
      remainingFieldsPrefix: 'ဖြည့်ရန်ကျန်',
      remainingFieldsUnit: 'ကွက်',
      allFieldsCompleteLabel: 'ပြည့်စုံပါပြီ',
      sampleToggleOn: 'Show My Form',
      sampleToggleOff: 'Show Sample Example',
      sampleBannerText: 'နမူနာအချက်အလက်များသာ ဖြစ်သည် (Sample Example Only)',
      tableScrollHint: '← ဇယားအပြည့်အစုံ ဘေးသို့ဆွဲကြည့်နိုင်သည် →',
      frontTabLabel: 'Front Page (ရှေ့မျက်နှာစာ)',
      backTabLabel: 'Back Page (နောက်ကျောဘက်)',
      photoBoxLabel: 'ဓာတ်ပုံ (၁) ပုံ ကပ်ရန်',
      photoInstructionNote: 'ကျန် ၃ ပုံ ကလစ်ဖြင့် ညှပ်ထည့်ရန်',
      universityTitle: 'ရန်ကုန်တက္ကသိုလ်',
      academicYearSuffix: 'ပညာသင်နှစ်',
      programLevels: ['ဘွဲ့ကြို', 'ဘွဲ့လွန်'] as const,
      formTitle: 'သဟောင်းများ ပညာဆက်လက်သင်ခွင့် လျှောက်လွှာ',
      classYearLabel: 'သင်တန်းနှစ်',
      majorLabel: 'အထူးပြုဘာသာ',
      rollNoLabel: 'ခုံအမှတ်',
      regNoLabel: 'တက္ကသိုလ်မှတ်ပုံတင်အမှတ်',
      entryYearLabel: 'တက္ကသိုလ်ဝင်ရောက်သည့်နှစ်',
      section1Header: '၁။ ပညာဆက်လက်သင်ခွင့်တောင်းသူ',
      tableHeaders: {
        student: 'ကျောင်းသား/သူ',
        father: 'အဘ',
        mother: 'အမိ',
      },
      tableRows: {
        nameMm: 'အမည် မြန်မာစာဖြင့်',
        nameEn: 'အင်္ဂလိပ်စာဖြင့်',
        race: 'လူမျိုး',
        religion: 'ကိုးကွယ်သည့်ဘာသာ',
        birthplace: 'မွေးဖွားရာဇာတိ (မြို့နယ်/ပြည်နယ်/တိုင်း)',
        nrc: 'တိုင်းရင်းသား/နိုင်ငံခြားသား မှတ်ပုံတင်အမှတ်',
        dob: 'မွေးသက္ကရာဇ်',
        matric: 'အခြေခံပညာအထက်တန်း စာမေးပွဲအောင်မြင်သည့် ခုံအမှတ်၊ ခုနှစ်နှင့် စာစစ်ဌာန',
        studentPermanentAddress: 'အမြဲတမ်းနေထိုင်သည့်လိပ်စာ (အပြည့်အစုံ) / ဖုန်းနံပါတ်',
        fatherMergedTitle: 'အဘ/အုပ်ထိန်းသူ၏ အလုပ်အကိုင် / ရာထူး / ဌာန / လိပ်စာအပြည့်အစုံ / ဖုန်းနံပါတ်',
        motherMergedTitle: 'အမိ/အုပ်ထိန်းသူ၏ အလုပ်အကိုင် / ရာထူး / ဌာန / လိပ်စာအပြည့်အစုံ / ဖုန်းနံပါတ်',
      },
      pastExamsTitle: '၂။ ဖြေဆိုခဲ့သည့် စာမေးပွဲများ',
      pastExamsHeaders: {
        yearLevel: 'သင်တန်း',
        major: 'အဓိကဘာသာ',
        rollNo: 'ခုံအမှတ်',
        year: 'ခုနှစ်',
        result: 'အောင်/ရှုံး',
      },
      pastExamsFirstYearLabel: 'ပထမနှစ်',
      backHeaderTitle: 'နောက်ကျောဘက် — ထောက်ပံ့သူ ဝန်ခံချက်နှင့် ရုံးသုံးတံဆိပ်တုံးများ',
      sponsorSectionTitle: '၃။ ကျောင်းနေရန် အထောက်အပံ့ပြုမည့်ပုဂ္ဂိုလ်',
      sponsorLabels: {
        name: '(က) အမည်',
        relationship: '(ခ) မည်သို့တော်စပ်သည်',
        occupation: '(ဂ) အလုပ်အကိုင်',
        address: '(ဃ) ဆက်သွယ်ရန်လိပ်စာ',
      },
      grantLabel: '၄။ ပညာသင်ထောက်ပံ့ကြေးပေးရန် ပြု/မပြု',
      declarationHeading: 'ကိုယ်တိုင်ဝန်ခံချက်',
      declarationItems: [
        '၁။ အထက်ဖော်ပြပါအချက်အားလုံး မှန်ကန်ပါသည်။',
        '၂။ ဤသို့တက္ကသိုလ်၌ ဆက်လက်ပညာသင်ခွင့်တောင်းသည်ကို မိဘ (သို့မဟုတ်) အုပ်ထိန်းသူက သဘောတူပြီး ဖြစ်ပါသည်။',
        '၃။ ကျောင်းလခများ မှန်မှန်ပေးရန် မိဘ (သို့မဟုတ်) အုပ်ထိန်းသူက သဘောတူပြီး ဖြစ်ပါသည်။',
        '၄။ တက္ကသိုလ်ကျောင်းသားကောင်းတစ်ယောက်ပီသစွာ တက္ကသိုလ်ကချမှတ်သည့် စည်းမျဉ်းစည်းကမ်းများနှင့်အညီ လိုက်နာကျင့်ကြံ နေထိုင်ပါမည်။',
      ],
      datePrefix: 'နေ့စွဲ',
      yearUnit: 'ခုနှစ်၊',
      monthUnit: 'လ',
      dayUnit: 'ရက်။',
      currentAddressLabel: 'ယခုဆက်သွယ်ရန်လိပ်စာ',
      signatureLabel: 'ပညာဆက်လက်သင်ခွင့်တောင်းသူ၏ လက်မှတ် (ကိုယ်တိုင်လက်မှတ်ထိုးရန်)',
      officeOnlyBanner: 'ရုံးပိုင်းဆိုင်ရာ ဖြည့်သွင်းရန် (ကျောင်းသား ဖြည့်ရန်မလို)',
      officeStamps: {
        universityCheck: 'တက္ကသိုလ်ရုံးမှစစ်ဆေးပြီး (ကျောင်းသားရေးရာ)',
        hod: 'ပါမောက္ခ/ဌာနမှူး — ကွန်ပျူတာသိပ္ပံပညာဌာန (ULB)',
        finance: 'ငွေလက်ခံသည့်ဌာန (သိပ္ပံဆောင် ဘဏ္ဍာရေးဌာန)',
        library: 'ဗဟိုစာကြည့်တိုက် စာအုပ်ကြွေးကျန်မရှိပါ (သိပ္ပံဆောင် ဘဏ္ဍာရေးဌာနမှ ထုပေးသည်)',
      },
      emptyPlaceholder: '[ဖြည့်ရန်]',
    },
    gates: {
      main: {
        id: 'main',
        label: 'အဓိပတိလမ်း (Main ဂိတ်)',
        shortLabel: 'Main ဂိတ်',
        walkTime: '~4 min walk',
        directionTitle: 'သိပ္ပံဆောင်သို့ လမ်းညွှန်',
        directionToScienceBuilding:
          'အဓိပတိလမ်း (Main ဂိတ်) မှ တည့်တည့်ဝင်ပြီး ဘွဲ့နှင်းသဘင်ခန်းမရှေ့ ဘယ်ဘက်လမ်းအတိုင်း လျှောက်ပါက သိပ္ပံဆောင်သို့ ရောက်ရှိပါမည်။',
      },
      maler: {
        id: 'maler',
        label: 'မာလာဂိတ်',
        shortLabel: 'မာလာဂိတ်',
        walkTime: '~3 min walk',
        directionTitle: 'သိပ္ပံဆောင်သို့ လမ်းညွှန်',
        directionToScienceBuilding:
          'မာလာဂိတ်ပေါက်မှ ဝင်လာပြီး မာလာဆောင်ဘေးလမ်းအတိုင်း ညာဘက်သို့ ချိုးကွေ့လျှောက်ပါက သိပ္ပံဆောင်သို့ တိုက်ရိုက်ရောက်ရှိပါမည်။',
      },
    },
    campusRoutes: [
      {
        id: 'pyay-marlar-to-science',
        label: 'ပြည်လမ်း မာလာမှတ်တိုင် ➔ သိပ္ပံဆောင်',
        walkTime: '4 min',
        hintText:
          'ပြည်လမ်း မာလာမှတ်တိုင်မှ ဝင်ပြီး Convocation Street (ဘွဲ့နှင်းသဘင်လမ်း) အတိုင်း သိပ္ပံဆောင် (ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန) သို့ လျှောက်ပါ။',
        origin: 'Pyay Road Marlar Bus Stop, Yangon',
        waypoints: [
          { location: 'Convocation Street, University of Yangon', stopover: false },
        ],
        destination: SCIENCE_BUILDING_COORDS,
        mapCenter: SCIENCE_BUILDING_COORDS,
        originLabel: 'Marlar Bus Stop',
        destinationLabel: 'သိပ္ပံဆောင် (ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန)',
        mapsUrl:
          'https://www.google.com/maps/dir/?api=1&origin=Pyay+Road+Marlar+Bus+Stop+Yangon&destination=16.83184325671567,96.13659801107418&waypoints=Convocation+Street+University+of+Yangon&travelmode=walking',
      },
      {
        id: 'uni-ave-to-science',
        label: 'တက္ကသိုလ်ရိပ်သာလမ်း ဂိတ်ပေါက် ➔ သိပ္ပံဆောင်',
        walkTime: '4 min',
        hintText:
          'တက္ကသိုလ်ရိပ်သာလမ်း ဂိတ်ပေါက်ဝမှ ဝင်လာပြီး သိပ္ပံဆောင် (ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန) ဆီသို့ တည့်တည့်လျှောက်ပါ။',
        origin: GATE_ORIGIN_COORDS,
        destination: SCIENCE_BUILDING_COORDS,
        mapCenter: SCIENCE_BUILDING_COORDS,
        originLabel: 'Uni Ave Gate',
        destinationLabel: 'သိပ္ပံဆောင် (ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန)',
        mapsUrl:
          'https://www.google.com/maps/dir/?api=1&origin=16.826306,96.133806&destination=16.83184325671567,96.13659801107418&travelmode=walking',
      },
      {
        id: 'science-to-ulb',
        label: 'သိပ္ပံဆောင် ➔ ULB (အပေါ်ဆုံးထပ် - CS ဌာန)',
        walkTime: '5 min',
        hintText:
          'သိပ္ပံဆောင်မှ ထွက်ပြီး ULB (University Library Building) အပေါ်ဆုံးထပ်ရှိ ကွန်ပျူတာသိပ္ပံပညာဌာနသို့ သွားပါ။',
        origin: SCIENCE_BUILDING_COORDS,
        destination: ULB_COORDS,
        mapCenter: SCIENCE_BUILDING_COORDS,
        originLabel: 'သိပ္ပံဆောင်',
        destinationLabel: 'ULB အပေါ်ဆုံးထပ် (ကွန်ပျူတာသိပ္ပံပညာဌာန)',
        mapsUrl:
          'https://www.google.com/maps/dir/?api=1&origin=16.83184325671567,96.13659801107418&destination=16.827850798042512,96.13734101559889&travelmode=walking',
      },
    ],
    scienceInterior: {
      title: 'Science Building CAD Blueprint',
      subtitle: 'အခန်းနှိပ်၍ လမ်းကြောင်းကြည့်ပါ',
      buildingTitle: 'သိပ္ပံဆောင် (SCIENCE BUILDING — GROUND FLOOR)',
      entranceLabel: 'ဝင်ပေါက်',
      wings: {
        right: {
          id: 'right',
          buttonLabel: '၁။ ကျောင်းသားရေးရာ (ညာဘက်)',
          roomTitle: 'ကျောင်းသားရေးရာ',
          roomSubtitle: 'Right Wing · Top Doorway',
          pathHint:
            'ဝင်ပေါက်မှ အလယ်စင်္ကြံအတိုင်း တည့်တည့်လျှောက် ➔ ညာဘက်သို့ချိုး ➔ အပေါ်တံခါးပေါက်မှ ဝင်ပါ။',
        },
        left: {
          id: 'left',
          buttonLabel: '၂။ ဘဏ္ဍာရေး (ဘယ်ဘက်)',
          roomTitle: 'ဘဏ္ဍာရေး',
          roomSubtitle: 'Left Wing · Bottom Doorway',
          pathHint:
            'ဝင်ပေါက်မှ ဝင်ဝင်ချင်း ဘယ်ဘက်သို့ချိုး ➔ အောက်တံခါးပေါက်မှ တိုက်ရိုက်ဝင်ပါ။',
        },
      },
    },
    locations: {
      science: {
        id: 'science',
        name: 'သိပ္ပံဆောင် (ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန)',
        shortName: 'သိပ္ပံဆောင်',
        mapsUrl:
          'https://www.google.com/maps/search/?api=1&query=16.83184325671567,96.13659801107418',
        mapsLabel: 'Google Maps (သိပ္ပံဆောင်)',
      },
      ulb: {
        id: 'ulb',
        name: 'ULB (University Library Building — အပေါ်ဆုံးထပ်)',
        shortName: 'ULB အပေါ်ဆုံးထပ်',
        mapsUrl:
          'https://www.google.com/maps/search/?api=1&query=16.827850798042512,96.13734101559889',
        mapsLabel: 'Google Maps (ULB)',
      },
    },
    quests: [
      {
        id: 'quest-1',
        number: 1,
        shortTitle: 'သိပ္ပံဆောင် (အပိုင်း ၁) — ဖောင်ထုတ်ယူခြင်း',
        title: 'သိပ္ပံဆောင် (အပိုင်း ၁) - ဖောင်ထုတ်ယူခြင်း နှင့် ကြွေးကျန်စစ်ဆေးခြင်း',
        locationId: 'science',
        locationNote:
          'သိပ္ပံဆောင် (Science Building) — ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန နှစ်ခုလုံး ဤတစ်ဆောင်တည်းတွင် ရှိသည်။',
        interiorDefaultWing: 'right',
        alert: {
          variant: 'info',
          text: 'ဗဟိုစာကြည့်တိုက်သို့ သီးသန့်သွားရန် မလိုပါ။ ငွေစာရင်းနှင့် "ဗဟိုစာကြည့်တိုက် စာအုပ်ကြွေးကျန်မရှိပါ" တံဆိပ်တုံးများကို သိပ္ပံဆောင်ထဲရှိ ဘဏ္ဍာရေးဌာနမှ တစ်ပါတည်း ကိုင်တွယ်ထုပေးပါသည်။',
        },
        subQuests: [
          {
            id: 'q1-s1',
            text: "၁။ ကျောင်းသားရေးရာ ကောင်တာတွင် 'သဟောင်းများ ပညာဆက်လက်သင်ခွင့် လျှောက်လွှာ' ထုတ်ယူပါ။ (ပထမနှစ် လူသစ်များသာ ကျောင်းဝင်ခွင့်လျှောက်လွှာအသစ် အသုံးပြုရပါမည်။)",
            firstYearText:
              "၁။ ကျောင်းသားရေးရာ ကောင်တာတွင် 'ပထမနှစ် (လူသစ်) ကျောင်းဝင်ခွင့် လျှောက်လွှာ' ထုတ်ယူပါ။ (သဟောင်းများသာ 'သဟောင်းများ ပညာဆက်လက်သင်ခွင့် လျှောက်လွှာ' ကို အသုံးပြုပါသည်။)",
          },
          {
            id: 'q1-s2',
            text: '၂။ ဖောင်ထိပ်တွင် ဓာတ်ပုံ (၁) ပုံကပ်ပြီး ကျန် (၃) ပုံကို ကလစ်ဖြင့် ညှပ်ထည့်ကာ အချက်အလက်များ ပြည့်စုံစွာဖြည့်ပါ။',
            hasPrefillShortcut: true,
          },
          {
            id: 'q1-s3',
            text: '၃။ စာတမ်းမှတ်ဌာနစိတ် / ကျောင်းသားရေးရာတွင် ဖောင်စစ်ဆေးပြီး အတည်ပြုလက်မှတ် ယူပါ။',
          },
          {
            id: 'q1-s4',
            text: '၄။ ထိုသိပ္ပံဆောင်ထဲရှိ ဘဏ္ဍာရေးဌာနသို့ ဆက်သွားပြီး ငွေစာရင်းနှင့် ဗဟိုစာကြည့်တိုက် စာအုပ်ကြွေးကျန်မရှိကြောင်း တံဆိပ်တုံးများ ထုခိုင်းပါ။',
          },
        ],
      },
      {
        id: 'quest-2',
        number: 2,
        shortTitle: 'ULB (အပေါ်ဆုံးထပ်) — ပါမောက္ခ လက်မှတ်',
        title: 'ULB (အပေါ်ဆုံးထပ်) - ပါမောက္ခ (ဌာနမှူး) လက်မှတ်ယူခြင်း',
        locationId: 'ulb',
        locationNote: 'ULB အဆောက်အဦ (အပေါ်ဆုံးထပ် — ကွန်ပျူတာသိပ္ပံပညာဌာန ရုံးခန်း)',
        subQuests: [
          {
            id: 'q2-s1',
            text: '၁။ သိပ္ပံဆောင်မှ ထွက်ပြီး ULB အပေါ်ဆုံးထပ်ရှိ ကွန်ပျူတာသိပ္ပံပညာဌာန (CS ဌာန) ရုံးခန်းသို့ သွားပါ။',
          },
          {
            id: 'q2-s2',
            text: '၂။ ဖောင်တင်ပြပြီး ပါမောက္ခ (ဌာနမှူး) လက်မှတ်နှင့် ဌာနတံဆိပ်တုံး ယူပါ။',
          },
        ],
      },
      {
        id: 'quest-3',
        number: 3,
        shortTitle: 'ကျောင်းလခ ပေးသွင်းခြင်း (UAB Pay Only)',
        title: 'ကျောင်းလခ ပေးသွင်းခြင်း (UAB Pay Only)',
        locationNote: 'Online Payment (UAB Pay App Only)',
        alert: {
          variant: 'error',
          title: 'UAB Pay Only — အရေးကြီးသတိပေးချက်',
          text: 'ကျောင်းလခကို UAB Pay တစ်မျိုးတည်းဖြင့်သာ ပေးသွင်းရပါမည်။ ငွေလွှဲပြီးပါက ချာလံမိတ္တူ (Receipt Copy) ကို မဖြစ်မနေ ပြင်ဆင်ထားပါ။',
        },
        subQuests: [
          {
            id: 'q3-s1',
            text: '၁။ ပါမောက္ခ လက်မှတ်ရရှိပြီးနောက် UAB Pay ဖြင့် သတ်မှတ်ကျောင်းလခ ပေးသွင်းပါ။',
          },
          {
            id: 'q3-s2',
            text: '၂။ ငွေသွင်းချာလံ မိတ္တူ (Receipt Copy) ထုတ်ယူပြင်ဆင်ပါ။',
          },
        ],
      },
      {
        id: 'quest-4',
        number: 4,
        shortTitle: 'သိပ္ပံဆောင် (အပိုင်း ၂) — ဖောင်ပြန်အပ်ခြင်း',
        title: 'သိပ္ပံဆောင် (အပိုင်း ၂) - ငွေလက်ခံဌာနသို့ ဖောင်ပြန်အပ်ခြင်း',
        locationId: 'science',
        locationNote: 'သိပ္ပံဆောင် (ဘဏ္ဍာရေး / ငွေလက်ခံဌာန)',
        interiorDefaultWing: 'left',
        subQuests: [
          {
            id: 'q4-s1',
            text: '၁။ သိပ္ပံဆောင်ရှိ ဘဏ္ဍာရေးဌာန (ငွေလက်ခံသူ) ထံ လက်မှတ်စုံပါသော ဖောင်နှင့် UAB Pay ငွေသွင်းချာလံမိတ္တူကို အပ်နှံပါ။',
          },
          {
            id: 'q4-s2',
            text: '၂။ ကျောင်းအပ်နှံခြင်း အောင်မြင်စွာ ပြီးဆုံးပါပြီ 🎉',
          },
        ],
      },
    ],
    questUiCopy: {
      classYearLabel: 'Class Year (သင်တန်းနှစ်)',
      entryGateLabel: 'Campus Route (လမ်းကြောင်း ရွေးချယ်ရန်)',
      liveMapTitle: 'Live Campus Walking Route',
      mapLandmarkBadge: '📍 သိပ္ပံဆောင် (ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန)',
      openFullRouteLabel: 'Google Maps App ဖြင့် ဖွင့်ရန်',
      mapFallbackNotice: 'Interactive UY campus walking schematic (သိပ္ပံဆောင် 16.8318, 96.1366)',
      currentQuestPrefix: 'CURRENT QUEST',
      allDoneTitle: 'ကျောင်းအပ်နှံခြင်း အဆင့်အားလုံး ပြီးဆုံးပါပြီ!',
      allDoneSubtitle: 'သိပ္ပံဆောင် ငွေလက်ခံဌာနသို့ အောင်မြင်စွာ အပ်နှံပြီးပါပြီ။',
      resetButtonLabel: 'Reset Progress',
      resetConfirmText: 'ဖြည့်ထားသော ဖောင်အချက်အလက်နှင့် ပြီးစီးမှုမှတ်တမ်းအားလုံးကို ပြန်ဖျက်မည်လား?',
      viewPrefilledLabel: 'View Pre-filled Form',
      statusActive: 'Active',
      statusPending: 'Pending',
      statusDone: 'Done',
    },
  },
};
