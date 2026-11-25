export type AppView = 'landing' | 'prep' | 'quest';

export type MajorId = 'cs';

export type AcademicYearOption =
  | 'First Year'
  | 'Second Year'
  | 'Third Year'
  | 'Fourth Year';

export type EntryGateId = 'main' | 'maler';

export type CampusRouteId =
  | 'pyay-marlar-to-science'
  | 'uni-ave-to-science'
  | 'science-to-ulb';

export type ScienceWingId = 'right' | 'left';

export type ProgramLevel = 'ဘွဲ့ကြို' | 'ဘွဲ့လွန်';

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface DisclaimerConfig {
  text: string;
  shortBadge: string;
}

export interface LandingCardConfig {
  id: 'prep' | 'quest';
  badge: string;
  titleEn: string;
  titleMm: string;
  footerText: string;
}

export interface BentoMiniTile {
  id: string;
  icon: 'building' | 'camera' | 'wallet';
  title: string;
  subtitle: string;
  isCritical?: boolean;
  fullWidth?: boolean;
}

export interface QuickReminderItem {
  id: string;
  icon: 'building' | 'camera' | 'wallet';
  textPrefix: string;
  textHighlight: string;
  textSuffix?: string;
  isCritical?: boolean;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

export type ChecklistGroupKey = 'firstYear' | 'returning';

export interface ChecklistGroupConfig {
  toggleLabel: string;
  bannerTitle: string;
  bannerText: string;
  items: ChecklistItem[];
}

export interface CampusLocation {
  id: string;
  name: string;
  shortName: string;
  mapsUrl: string;
  mapsLabel: string;
}

export interface EntryGateConfig {
  id: EntryGateId;
  label: string;
  shortLabel: string;
  walkTime: string;
  directionTitle: string;
  directionToScienceBuilding: string;
}

export interface CampusRouteConfig {
  id: CampusRouteId;
  label: string;
  walkTime: string;
  hintText: string;
  origin: string | LatLngLiteral;
  destination: string | LatLngLiteral;
  waypoints?: { location: string; stopover: boolean }[];
  mapCenter: LatLngLiteral;
  originLabel: string;
  destinationLabel: string;
  mapsUrl: string;
}

export interface ScienceInteriorConfig {
  title: string;
  subtitle: string;
  buildingTitle: string;
  entranceLabel: string;
  wings: Record<
    ScienceWingId,
    {
      id: ScienceWingId;
      buttonLabel: string;
      roomTitle: string;
      roomSubtitle: string;
      pathHint: string;
    }
  >;
}

export interface SubQuest {
  id: string;
  text: string;
  firstYearText?: string;
  hasPrefillShortcut?: boolean;
}

export interface QuestAlert {
  variant: 'info' | 'error';
  title?: string;
  text: string;
}

export interface QuestStep {
  id: string;
  number: number;
  shortTitle: string;
  title: string;
  locationId?: string;
  locationNote: string;
  interiorDefaultWing?: ScienceWingId;
  alert?: QuestAlert;
  subQuests: SubQuest[];
}

export interface EnrollmentFormData {
  // Front Page — Top Header & Academic Box
  academicYear: string;
  programLevel: ProgramLevel;
  classYear: string;
  major: string;
  rollNo: string;
  uniRegNo: string;
  uniEntryYear: string;

  // Front Page — Section 1: Student Column
  studentNameMm: string;
  studentNameEn: string;
  studentRace: string;
  studentReligion: string;
  studentBirthplace: string;
  studentNrc: string;
  studentDob: string;
  matricRollNo: string;
  matricYear: string;
  matricCenter: string;
  studentPermanentAddress: string;
  studentPhone: string;

  // Front Page — Section 1: Father Column (အဘ)
  fatherNameMm: string;
  fatherNameEn: string;
  fatherRace: string;
  fatherReligion: string;
  fatherBirthplace: string;
  fatherNrc: string;
  fatherOccupation: string;
  fatherAddress: string;
  fatherPhone: string;

  // Front Page — Section 1: Mother Column (အမိ)
  motherNameMm: string;
  motherNameEn: string;
  motherRace: string;
  motherReligion: string;
  motherBirthplace: string;
  motherNrc: string;
  motherOccupation: string;
  motherAddress: string;
  motherPhone: string;

  // Front Page — Section 2: Past Exams Table (ဖြေဆိုခဲ့သည့် စာမေးပွဲများ)
  pastExamMajor: string;
  pastExamRollNo: string;
  pastExamYear: string;
  pastExamResult: string;

  // Back Page — Sections 3, 4 & Self-Declaration
  sponsorName: string;
  sponsorRelation: string;
  sponsorOccupation: string;
  sponsorAddress: string;
  grantStatus: 'ပြု' | 'မပြု';
  declarationYear: string;
  declarationMonth: string;
  declarationDay: string;
  currentContactAddress: string;
}

export type FormTabId =
  | 'academic'
  | 'student'
  | 'father'
  | 'mother'
  | 'exam'
  | 'sponsor';

export interface FormTabConfig {
  id: FormTabId;
  labelEn: string;
  labelMm: string;
}

export interface FormPreviewCopy {
  sectionTitle: string;
  blueLegend: string;
  remainingFieldsPrefix: string;
  remainingFieldsUnit: string;
  allFieldsCompleteLabel: string;
  sampleToggleOn: string;
  sampleToggleOff: string;
  sampleBannerText: string;
  tableScrollHint: string;
  frontTabLabel: string;
  backTabLabel: string;
  photoBoxLabel: string;
  photoInstructionNote: string;
  universityTitle: string;
  academicYearSuffix: string;
  programLevels: readonly ProgramLevel[];
  formTitle: string;
  classYearLabel: string;
  majorLabel: string;
  rollNoLabel: string;
  regNoLabel: string;
  entryYearLabel: string;
  section1Header: string;
  tableHeaders: {
    student: string;
    father: string;
    mother: string;
  };
  tableRows: {
    nameMm: string;
    nameEn: string;
    race: string;
    religion: string;
    birthplace: string;
    nrc: string;
    dob: string;
    matric: string;
    studentPermanentAddress: string;
    fatherMergedTitle: string;
    motherMergedTitle: string;
  };
  pastExamsTitle: string;
  pastExamsHeaders: {
    yearLevel: string;
    major: string;
    rollNo: string;
    year: string;
    result: string;
  };
  pastExamsFirstYearLabel: string;
  backHeaderTitle: string;
  sponsorSectionTitle: string;
  sponsorLabels: {
    name: string;
    relationship: string;
    occupation: string;
    address: string;
  };
  grantLabel: string;
  declarationHeading: string;
  declarationItems: string[];
  datePrefix: string;
  yearUnit: string;
  monthUnit: string;
  dayUnit: string;
  currentAddressLabel: string;
  signatureLabel: string;
  officeOnlyBanner: string;
  officeStamps: {
    universityCheck: string;
    hod: string;
    finance: string;
    library: string;
  };
  emptyPlaceholder: string;
}

export interface MajorEnrollmentConfig {
  id: MajorId;
  badgeText: string;
  titleEn: string;
  titleMm: string;
  departmentNameMm: string;
  defaultClassYear: AcademicYearOption;
  classYears: {
    id: AcademicYearOption;
    labelEn: string;
    labelMm: string;
  }[];
  landingCards: {
    prep: LandingCardConfig;
    quest: LandingCardConfig;
  };
  bentoMiniTiles: BentoMiniTile[];
  quickRemindersTitle: string;
  quickReminders: QuickReminderItem[];
  prepHeader: {
    titleEn: string;
    titleMm: string;
    questButtonLabel: string;
    checklistTitle: string;
    checklistBadgeLabel: string;
    classYearToggleHint: string;
    wizardTitle: string;
    requiredHint: string;
    viewFormButton: string;
  };
  checklistByGroup: Record<ChecklistGroupKey, ChecklistGroupConfig>;
  formTabs: FormTabConfig[];
  tabRequiredFields: Record<FormTabId, (keyof EnrollmentFormData)[]>;
  defaultFormData: EnrollmentFormData;
  sampleFormData: EnrollmentFormData;
  formPreviewCopy: FormPreviewCopy;
  gates: Record<EntryGateId, EntryGateConfig>;
  campusRoutes: CampusRouteConfig[];
  scienceInterior: ScienceInteriorConfig;
  locations: Record<string, CampusLocation>;
  quests: QuestStep[];
  questUiCopy: {
    classYearLabel: string;
    entryGateLabel: string;
    liveMapTitle: string;
    mapLandmarkBadge: string;
    openFullRouteLabel: string;
    mapFallbackNotice: string;
    currentQuestPrefix: string;
    allDoneTitle: string;
    allDoneSubtitle: string;
    resetButtonLabel: string;
    resetConfirmText: string;
    viewPrefilledLabel: string;
    statusActive: string;
    statusPending: string;
    statusDone: string;
  };
}

export interface PersistedEnrollmentState {
  version: number;
  selectedMajor: MajorId;
  selectedYear: AcademicYearOption;
  selectedGate: EntryGateId;
  selectedRoute: CampusRouteId;
  checkedDocs: string[];
  completedSubQuests: string[];
  formData: EnrollmentFormData;
}
