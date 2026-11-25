'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  FileText,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  AcademicYearOption,
  AppView,
  ChecklistGroupKey,
  EnrollmentFormData,
  FormTabId,
  MajorEnrollmentConfig,
} from '@/types/enrollment';
import { FormLivePreview } from '@/components/FormLivePreview';

interface PrepAndPrefillViewProps {
  config: MajorEnrollmentConfig;
  selectedYear: AcademicYearOption;
  checkedDocs: string[];
  formData: EnrollmentFormData;
  onSelectYear: (year: AcademicYearOption) => void;
  onToggleDoc: (docId: string) => void;
  onUpdateField: <K extends keyof EnrollmentFormData>(
    key: K,
    value: EnrollmentFormData[K]
  ) => void;
  onUpdateFields: (patch: Partial<EnrollmentFormData>) => void;
  onNavigate: (view: AppView) => void;
  onResetProgress: () => void;
}

interface FieldInputProps {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'tel';
  mono?: boolean;
  onChange: (value: string) => void;
}

function FieldInput({
  label,
  value,
  placeholder,
  required = false,
  type = 'text',
  mono = false,
  onChange,
}: FieldInputProps) {
  const isMissingRequired = required && value.trim().length === 0;

  return (
    <label className="flex flex-col gap-1">
      <span className="font-body text-xs font-semibold leading-relaxed text-light-on-surface py-0.5">
        {label} {required && <span className="text-light-error">*</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg px-3 py-2 text-sm leading-relaxed text-light-on-surface focus:outline-none focus:ring-1 transition-colors ${
          mono ? 'font-mono' : 'font-body'
        } ${
          isMissingRequired
            ? 'border-2 border-red-300 bg-light-error-container/15 focus:border-light-error focus:ring-light-error'
            : 'border border-light-outline-variant bg-light-surface focus:border-indigo-accent focus:ring-indigo-accent'
        }`}
      />
    </label>
  );
}

function QuickFillButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-indigo-soft text-indigo-accent border border-indigo-accent/20 font-body text-[11px] font-semibold leading-relaxed hover:bg-indigo-accent hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer text-left"
    >
      <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export function PrepAndPrefillView({
  config,
  selectedYear,
  checkedDocs,
  formData,
  onSelectYear,
  onToggleDoc,
  onUpdateField,
  onUpdateFields,
  onNavigate,
  onResetProgress,
}: PrepAndPrefillViewProps) {
  const [activeTab, setActiveTab] = useState<FormTabId>('academic');

  const checklistGroupKey: ChecklistGroupKey =
    selectedYear === 'First Year' ? 'firstYear' : 'returning';
  const activeChecklist = config.checklistByGroup[checklistGroupKey];

  const checkedCount = activeChecklist.items.filter((doc) =>
    checkedDocs.includes(doc.id)
  ).length;

  const getTabMissingCount = (tabId: FormTabId) =>
    config.tabRequiredFields[tabId].filter(
      (fieldKey) => String(formData[fieldKey] ?? '').trim().length === 0
    ).length;

  const totalRemainingCount = config.formTabs.reduce(
    (sum, tab) => sum + getTabMissingCount(tab.id),
    0
  );

  const scrollToPreview = () => {
    const el = document.getElementById('live-form-preview');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const hasStudentFamilyDetails = Boolean(
    formData.studentRace.trim() ||
      formData.studentReligion.trim() ||
      formData.studentBirthplace.trim() ||
      formData.studentPermanentAddress.trim()
  );

  const copyStudentDetailsToFather = () => {
    onUpdateFields({
      fatherRace: formData.studentRace,
      fatherReligion: formData.studentReligion,
      fatherBirthplace: formData.studentBirthplace,
      fatherAddress: formData.studentPermanentAddress,
    });
  };

  const copyStudentDetailsToMother = () => {
    onUpdateFields({
      motherRace: formData.studentRace,
      motherReligion: formData.studentReligion,
      motherBirthplace: formData.studentBirthplace,
      motherAddress: formData.studentPermanentAddress,
    });
  };

  const copyFatherToSponsor = () => {
    onUpdateFields({
      sponsorName: formData.fatherNameMm,
      sponsorRelation: 'အဘ',
      sponsorOccupation: formData.fatherOccupation,
      sponsorAddress: formData.fatherAddress || formData.studentPermanentAddress,
    });
  };

  const copyMotherToSponsor = () => {
    onUpdateFields({
      sponsorName: formData.motherNameMm,
      sponsorRelation: 'အမိ',
      sponsorOccupation: formData.motherOccupation,
      sponsorAddress: formData.motherAddress || formData.studentPermanentAddress,
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Sticky Task Flow Header */}
      <header className="sticky top-0 z-30 bg-light-surface border-b border-light-outline-variant px-4 py-3 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            aria-label="Back to landing"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-light-surface-container text-light-on-surface hover:bg-light-surface-container-high transition-colors shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <h1 className="font-headline text-base font-bold text-light-on-surface truncate">
              {config.prepHeader.titleEn}
            </h1>
            <p className="font-body text-xs leading-relaxed py-0.5 text-light-on-surface-variant truncate">
              {config.prepHeader.titleMm}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-indigo-soft text-indigo-accent font-mono text-xs font-medium tabular-nums">
            {checkedCount}/{activeChecklist.items.length}
          </span>
          <button
            type="button"
            onClick={() => onNavigate('quest')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-soft text-blue-ink font-label text-xs font-semibold hover:bg-blue-primary hover:text-white transition-colors cursor-pointer"
          >
            <span>{config.prepHeader.questButtonLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 flex flex-col gap-5">
        {/* TOP SECTION: Dynamic Class-Year Document Checklist */}
        <section
          aria-label="Document checklist"
          className="bg-light-surface border border-light-outline-variant rounded-2xl p-4 shadow-sm flex flex-col gap-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-indigo-accent shrink-0" aria-hidden="true" />
              <h2 className="font-title text-[15px] font-semibold leading-relaxed text-light-on-surface py-0.5">
                {config.prepHeader.checklistTitle}
              </h2>
            </div>
            <span className="font-body text-xs text-light-on-surface-variant">
              {config.prepHeader.checklistBadgeLabel}
            </span>
          </div>

          {/* Class Year Toggle: First Year (လူသစ်) vs Returning (သဟောင်း) */}
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-[11px] font-semibold text-light-on-surface-variant">
              {config.prepHeader.classYearToggleHint}
            </span>
            <div
              role="radiogroup"
              aria-label="Class year checklist selector"
              className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-light-surface-container border border-light-outline-variant"
            >
              <button
                type="button"
                role="radio"
                aria-checked={checklistGroupKey === 'firstYear'}
                onClick={() => onSelectYear('First Year')}
                className={`py-2 px-2 rounded-lg font-body text-xs font-semibold leading-relaxed transition-all cursor-pointer ${
                  checklistGroupKey === 'firstYear'
                    ? 'bg-indigo-accent text-white shadow-sm'
                    : 'text-light-on-surface-variant hover:text-light-on-surface'
                }`}
              >
                {config.checklistByGroup.firstYear.toggleLabel}
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={checklistGroupKey === 'returning'}
                onClick={() => {
                  if (selectedYear === 'First Year') {
                    onSelectYear('Second Year');
                  }
                }}
                className={`py-2 px-2 rounded-lg font-body text-xs font-semibold leading-relaxed transition-all cursor-pointer ${
                  checklistGroupKey === 'returning'
                    ? 'bg-indigo-accent text-white shadow-sm'
                    : 'text-light-on-surface-variant hover:text-light-on-surface'
                }`}
              >
                {config.checklistByGroup.returning.toggleLabel}
              </button>
            </div>
          </div>

          {/* Class-Year Rule Banner */}
          <div
            role="note"
            className={`rounded-xl p-3 border flex flex-col gap-1 ${
              checklistGroupKey === 'firstYear'
                ? 'bg-amber-bg/70 border-amber-border/40 text-amber-text'
                : 'bg-blue-soft border-blue-primary/25 text-light-on-surface'
            }`}
          >
            <p className="font-body text-xs font-bold leading-relaxed py-0.5">
              {activeChecklist.bannerTitle}
            </p>
            <p className="font-body text-xs leading-relaxed py-0.5 text-pretty">
              {activeChecklist.bannerText}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {activeChecklist.items.map((doc) => {
              const isChecked = checkedDocs.includes(doc.id);
              const isCopyOnly = doc.badge === 'ကြည့်ကူးရန်သာ';
              return (
                <label
                  key={doc.id}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    isChecked
                      ? 'bg-success-container/40 border-success/40'
                      : 'bg-light-surface-container-low border-light-outline-variant'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleDoc(doc.id)}
                    className="mt-1.5 w-4 h-4 rounded border-light-outline text-indigo-accent focus:ring-indigo-accent shrink-0"
                  />
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span
                        className={`font-body text-sm font-semibold leading-relaxed py-0.5 ${
                          isChecked
                            ? 'line-through text-light-on-surface-variant'
                            : 'text-light-on-surface'
                        }`}
                      >
                        {doc.title}
                      </span>
                      {doc.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full font-body text-[10px] font-semibold shrink-0 ${
                            isCopyOnly
                              ? 'bg-slate-200 text-slate-700'
                              : doc.badge === 'UAB Pay Only'
                                ? 'bg-light-error-container text-light-on-error-container'
                                : 'bg-indigo-soft text-indigo-accent'
                          }`}
                        >
                          {doc.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-body text-xs leading-relaxed text-light-on-surface-variant py-0.5">
                      {doc.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* MIDDLE SECTION: Smart Form Pre-fill Wizard */}
        <section aria-label="Form pre-fill wizard" className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 className="font-title text-[17px] font-bold leading-7 text-light-on-surface py-0.5">
              {config.prepHeader.wizardTitle}
            </h2>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-body text-[11px] font-semibold leading-relaxed ${
                totalRemainingCount === 0
                  ? 'bg-success-container text-on-success-container'
                  : 'bg-amber-bg text-amber-text'
              }`}
            >
              {totalRemainingCount === 0
                ? `${config.formPreviewCopy.allFieldsCompleteLabel} ✓`
                : `${config.formPreviewCopy.remainingFieldsPrefix}: ${totalRemainingCount} ${config.formPreviewCopy.remainingFieldsUnit}`}
            </span>
          </div>

          <p className="font-body text-xs leading-relaxed text-light-error">
            {config.prepHeader.requiredHint}
          </p>

          {/* Segmented Pill Tabs */}
          <div
            role="tablist"
            aria-label="Form sections"
            className="flex items-center gap-1.5 overflow-x-auto pb-1"
          >
            {config.formTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              const missingInTab = getTabMissingCount(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-accent text-white shadow-sm'
                      : 'bg-light-surface text-light-on-surface-variant border border-light-outline-variant hover:border-indigo-accent/50'
                  }`}
                >
                  <span className="py-0.5">
                    {tab.labelEn} · {tab.labelMm}
                  </span>
                  {missingInTab > 0 ? (
                    <span
                      className={`px-1.5 py-0 rounded-full text-[10px] font-mono tabular-nums ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-light-error-container text-light-on-error-container'
                      }`}
                    >
                      {missingInTab}
                    </span>
                  ) : (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected ? 'text-green-200' : 'text-success'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick-Copy Helper Chips Bar */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                onUpdateFields({
                  academicYear: config.sampleFormData.academicYear,
                  uniEntryYear: config.sampleFormData.uniEntryYear,
                  pastExamYear: config.sampleFormData.pastExamYear,
                })
              }
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-soft text-blue-ink border border-light-outline-variant font-label text-[11px] font-semibold hover:bg-blue-primary hover:text-white transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span>Fill 2026–2027</span>
            </button>
            <QuickFillButton
              label="Father as Sponsor"
              disabled={!formData.fatherNameMm.trim()}
              onClick={copyFatherToSponsor}
            />
          </div>

          {/* Active Tab Panel */}
          <div className="bg-light-surface border border-light-outline-variant rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            {activeTab === 'academic' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="ပညာသင်နှစ်"
                    value={formData.academicYear}
                    placeholder={config.sampleFormData.academicYear}
                    required
                    onChange={(v) => onUpdateField('academicYear', v)}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-xs font-semibold leading-relaxed text-light-on-surface py-0.5">
                      ဘွဲ့ကြို / ဘွဲ့လွန်
                    </span>
                    <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-light-surface-container border border-light-outline-variant">
                      {(['ဘွဲ့ကြို', 'ဘွဲ့လွန်'] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => onUpdateField('programLevel', level)}
                          className={`py-1.5 rounded-md font-body text-xs font-semibold transition-colors cursor-pointer ${
                            formData.programLevel === level
                              ? 'bg-indigo-accent text-white shadow-sm'
                              : 'text-light-on-surface-variant'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="သင်တန်းနှစ်"
                    value={formData.classYear}
                    placeholder={config.sampleFormData.classYear}
                    required
                    onChange={(v) => onUpdateField('classYear', v)}
                  />
                  <FieldInput
                    label="အထူးပြုဘာသာ"
                    value={formData.major}
                    placeholder={config.sampleFormData.major}
                    required
                    onChange={(v) => onUpdateField('major', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="ခုံအမှတ်"
                    value={formData.rollNo}
                    placeholder={config.sampleFormData.rollNo}
                    required
                    onChange={(v) => onUpdateField('rollNo', v)}
                  />
                  <FieldInput
                    label="တက္ကသိုလ်မှတ်ပုံတင်အမှတ်"
                    value={formData.uniRegNo}
                    placeholder={config.sampleFormData.uniRegNo}
                    required
                    onChange={(v) => onUpdateField('uniRegNo', v)}
                  />
                </div>
                <FieldInput
                  label="တက္ကသိုလ်ဝင်ရောက်သည့်နှစ်"
                  value={formData.uniEntryYear}
                  placeholder={config.sampleFormData.uniEntryYear}
                  required
                  onChange={(v) => onUpdateField('uniEntryYear', v)}
                />
              </>
            )}

            {activeTab === 'student' && (
              <>
                <div className="grid grid-cols-1 gap-3">
                  <FieldInput
                    label="အမည် (မြန်မာစာဖြင့်)"
                    value={formData.studentNameMm}
                    placeholder={config.sampleFormData.studentNameMm}
                    required
                    onChange={(v) => onUpdateField('studentNameMm', v)}
                  />
                  <FieldInput
                    label="အမည် (အင်္ဂလိပ်စာဖြင့်)"
                    value={formData.studentNameEn}
                    placeholder={config.sampleFormData.studentNameEn}
                    required
                    onChange={(v) => onUpdateField('studentNameEn', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="လူမျိုး"
                    value={formData.studentRace}
                    placeholder={config.sampleFormData.studentRace}
                    required
                    onChange={(v) => onUpdateField('studentRace', v)}
                  />
                  <FieldInput
                    label="ကိုးကွယ်သည့်ဘာသာ"
                    value={formData.studentReligion}
                    placeholder={config.sampleFormData.studentReligion}
                    required
                    onChange={(v) => onUpdateField('studentReligion', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="မွေးဖွားရာဇာတိ (မြို့နယ်/ပြည်နယ်/တိုင်း)"
                    value={formData.studentBirthplace}
                    placeholder={config.sampleFormData.studentBirthplace}
                    required
                    onChange={(v) => onUpdateField('studentBirthplace', v)}
                  />
                  <FieldInput
                    label="မွေးသက္ကရာဇ်"
                    value={formData.studentDob}
                    placeholder={config.sampleFormData.studentDob}
                    required
                    onChange={(v) => onUpdateField('studentDob', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="မှတ်ပုံတင်အမှတ်"
                    value={formData.studentNrc}
                    placeholder={config.sampleFormData.studentNrc}
                    required
                    onChange={(v) => onUpdateField('studentNrc', v)}
                  />
                  <FieldInput
                    label="ဖုန်းနံပါတ်"
                    value={formData.studentPhone}
                    placeholder={config.sampleFormData.studentPhone}
                    required
                    type="tel"
                    mono
                    onChange={(v) => onUpdateField('studentPhone', v)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <FieldInput
                    label="၁၀ တန်း ခုံအမှတ်"
                    value={formData.matricRollNo}
                    placeholder={config.sampleFormData.matricRollNo}
                    required
                    onChange={(v) => onUpdateField('matricRollNo', v)}
                  />
                  <FieldInput
                    label="အောင်မြင်သည့် ခုနှစ်"
                    value={formData.matricYear}
                    placeholder={config.sampleFormData.matricYear}
                    required
                    onChange={(v) => onUpdateField('matricYear', v)}
                  />
                  <FieldInput
                    label="စာစစ်ဌာန"
                    value={formData.matricCenter}
                    placeholder={config.sampleFormData.matricCenter}
                    required
                    onChange={(v) => onUpdateField('matricCenter', v)}
                  />
                </div>
                <FieldInput
                  label="အမြဲတမ်းနေထိုင်သည့်လိပ်စာ (အပြည့်အစုံ)"
                  value={formData.studentPermanentAddress}
                  placeholder={config.sampleFormData.studentPermanentAddress}
                  required
                  onChange={(v) => onUpdateField('studentPermanentAddress', v)}
                />
              </>
            )}

            {activeTab === 'father' && (
              <>
                <div className="p-2.5 rounded-xl bg-light-surface-container-low border border-light-outline-variant flex flex-col gap-1.5">
                  <span className="font-body text-[11px] font-semibold text-light-on-surface-variant">
                    အမြန်ဖြည့်ရန် (Quick Fill)
                  </span>
                  <QuickFillButton
                    label="ကျောင်းသား၏ လူမျိုး/ဘာသာ/ဇာတိ/လိပ်စာ အတိုင်းဖြည့်မည်"
                    disabled={!hasStudentFamilyDetails}
                    onClick={copyStudentDetailsToFather}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <FieldInput
                    label="အဘအမည် (မြန်မာစာဖြင့်)"
                    value={formData.fatherNameMm}
                    placeholder={config.sampleFormData.fatherNameMm}
                    required
                    onChange={(v) => onUpdateField('fatherNameMm', v)}
                  />
                  <FieldInput
                    label="အဘအမည် (အင်္ဂလိပ်စာဖြင့်)"
                    value={formData.fatherNameEn}
                    placeholder={config.sampleFormData.fatherNameEn}
                    onChange={(v) => onUpdateField('fatherNameEn', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="အဘ လူမျိုး"
                    value={formData.fatherRace}
                    placeholder={config.sampleFormData.fatherRace}
                    required
                    onChange={(v) => onUpdateField('fatherRace', v)}
                  />
                  <FieldInput
                    label="အဘ ကိုးကွယ်သည့်ဘာသာ"
                    value={formData.fatherReligion}
                    placeholder={config.sampleFormData.fatherReligion}
                    required
                    onChange={(v) => onUpdateField('fatherReligion', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="မွေးဖွားရာဇာတိ (မြို့နယ်/ပြည်နယ်/တိုင်း)"
                    value={formData.fatherBirthplace}
                    placeholder={config.sampleFormData.fatherBirthplace}
                    onChange={(v) => onUpdateField('fatherBirthplace', v)}
                  />
                  <FieldInput
                    label="အဘ မှတ်ပုံတင်အမှတ်"
                    value={formData.fatherNrc}
                    placeholder={config.sampleFormData.fatherNrc}
                    required
                    onChange={(v) => onUpdateField('fatherNrc', v)}
                  />
                </div>
                <FieldInput
                  label="အလုပ်အကိုင် / ရာထူး / ဌာန"
                  value={formData.fatherOccupation}
                  placeholder={config.sampleFormData.fatherOccupation}
                  required
                  onChange={(v) => onUpdateField('fatherOccupation', v)}
                />
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-body text-xs font-semibold leading-relaxed text-light-on-surface py-0.5">
                      အဘ နေရပ်လိပ်စာ (အပြည့်အစုံ)
                    </span>
                    <QuickFillButton
                      label="Same as Student's Permanent Address"
                      disabled={!formData.studentPermanentAddress.trim()}
                      onClick={() =>
                        onUpdateField('fatherAddress', formData.studentPermanentAddress)
                      }
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.fatherAddress}
                    placeholder={config.sampleFormData.fatherAddress}
                    onChange={(e) => onUpdateField('fatherAddress', e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm leading-relaxed font-body text-light-on-surface border border-light-outline-variant bg-light-surface focus:outline-none focus:border-indigo-accent focus:ring-1 focus:ring-indigo-accent"
                  />
                </div>
                <FieldInput
                  label="အဘ ဖုန်းနံပါတ်"
                  value={formData.fatherPhone}
                  placeholder={config.sampleFormData.fatherPhone}
                  type="tel"
                  mono
                  onChange={(v) => onUpdateField('fatherPhone', v)}
                />
              </>
            )}

            {activeTab === 'mother' && (
              <>
                <div className="p-2.5 rounded-xl bg-light-surface-container-low border border-light-outline-variant flex flex-col gap-1.5">
                  <span className="font-body text-[11px] font-semibold text-light-on-surface-variant">
                    အမြန်ဖြည့်ရန် (Quick Fill)
                  </span>
                  <QuickFillButton
                    label="ကျောင်းသား၏ လူမျိုး/ဘာသာ/ဇာတိ/လိပ်စာ အတိုင်းဖြည့်မည်"
                    disabled={!hasStudentFamilyDetails}
                    onClick={copyStudentDetailsToMother}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <FieldInput
                    label="အမိအမည် (မြန်မာစာဖြင့်)"
                    value={formData.motherNameMm}
                    placeholder={config.sampleFormData.motherNameMm}
                    required
                    onChange={(v) => onUpdateField('motherNameMm', v)}
                  />
                  <FieldInput
                    label="အမိအမည် (အင်္ဂလိပ်စာဖြင့်)"
                    value={formData.motherNameEn}
                    placeholder={config.sampleFormData.motherNameEn}
                    onChange={(v) => onUpdateField('motherNameEn', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="အမိ လူမျိုး"
                    value={formData.motherRace}
                    placeholder={config.sampleFormData.motherRace}
                    required
                    onChange={(v) => onUpdateField('motherRace', v)}
                  />
                  <FieldInput
                    label="အမိ ကိုးကွယ်သည့်ဘာသာ"
                    value={formData.motherReligion}
                    placeholder={config.sampleFormData.motherReligion}
                    required
                    onChange={(v) => onUpdateField('motherReligion', v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="မွေးဖွားရာဇာတိ (မြို့နယ်/ပြည်နယ်/တိုင်း)"
                    value={formData.motherBirthplace}
                    placeholder={config.sampleFormData.motherBirthplace}
                    onChange={(v) => onUpdateField('motherBirthplace', v)}
                  />
                  <FieldInput
                    label="အမိ မှတ်ပုံတင်အမှတ်"
                    value={formData.motherNrc}
                    placeholder={config.sampleFormData.motherNrc}
                    required
                    onChange={(v) => onUpdateField('motherNrc', v)}
                  />
                </div>
                <FieldInput
                  label="အလုပ်အကိုင် / ရာထူး / ဌာန"
                  value={formData.motherOccupation}
                  placeholder={config.sampleFormData.motherOccupation}
                  required
                  onChange={(v) => onUpdateField('motherOccupation', v)}
                />
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-body text-xs font-semibold leading-relaxed text-light-on-surface py-0.5">
                      အမိ နေရပ်လိပ်စာ (အပြည့်အစုံ)
                    </span>
                    <QuickFillButton
                      label="Same as Student's Permanent Address"
                      disabled={!formData.studentPermanentAddress.trim()}
                      onClick={() =>
                        onUpdateField('motherAddress', formData.studentPermanentAddress)
                      }
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.motherAddress}
                    placeholder={config.sampleFormData.motherAddress}
                    onChange={(e) => onUpdateField('motherAddress', e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm leading-relaxed font-body text-light-on-surface border border-light-outline-variant bg-light-surface focus:outline-none focus:border-indigo-accent focus:ring-1 focus:ring-indigo-accent"
                  />
                </div>
                <FieldInput
                  label="အမိ ဖုန်းနံပါတ်"
                  value={formData.motherPhone}
                  placeholder={config.sampleFormData.motherPhone}
                  type="tel"
                  mono
                  onChange={(v) => onUpdateField('motherPhone', v)}
                />
              </>
            )}

            {activeTab === 'exam' && (
              <>
                <FieldInput
                  label="ပထမနှစ် အဓိကဘာသာ"
                  value={formData.pastExamMajor}
                  placeholder={config.sampleFormData.pastExamMajor}
                  required
                  onChange={(v) => onUpdateField('pastExamMajor', v)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="ခုံအမှတ်"
                    value={formData.pastExamRollNo}
                    placeholder={config.sampleFormData.pastExamRollNo}
                    required
                    onChange={(v) => onUpdateField('pastExamRollNo', v)}
                  />
                  <FieldInput
                    label="ခုနှစ်"
                    value={formData.pastExamYear}
                    placeholder={config.sampleFormData.pastExamYear}
                    required
                    onChange={(v) => onUpdateField('pastExamYear', v)}
                  />
                </div>
                <FieldInput
                  label="အောင် / ရှုံး"
                  value={formData.pastExamResult}
                  placeholder={config.sampleFormData.pastExamResult}
                  required
                  onChange={(v) => onUpdateField('pastExamResult', v)}
                />
              </>
            )}

            {activeTab === 'sponsor' && (
              <>
                <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-light-surface-container-low border border-light-outline-variant">
                  <span className="font-body text-[11px] font-semibold text-light-on-surface-variant">
                    အပိုင်း (၃) အမြန်ဖြည့်ရန်
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <QuickFillButton
                      label="အဘ အချက်အလက် ထည့်မည်"
                      disabled={!formData.fatherNameMm.trim()}
                      onClick={copyFatherToSponsor}
                    />
                    <QuickFillButton
                      label="အမိ အချက်အလက် ထည့်မည်"
                      disabled={!formData.motherNameMm.trim()}
                      onClick={copyMotherToSponsor}
                    />
                  </div>
                </div>

                <FieldInput
                  label="(က) ထောက်ပံ့မည့်ပုဂ္ဂိုလ် အမည်"
                  value={formData.sponsorName}
                  placeholder={config.sampleFormData.sponsorName}
                  required
                  onChange={(v) => onUpdateField('sponsorName', v)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput
                    label="(ခ) မည်သို့တော်စပ်သည်"
                    value={formData.sponsorRelation}
                    placeholder={config.sampleFormData.sponsorRelation}
                    required
                    onChange={(v) => onUpdateField('sponsorRelation', v)}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-xs font-semibold leading-relaxed text-light-on-surface py-0.5">
                      ၄။ ပညာသင်ထောက်ပံ့ကြေး
                    </span>
                    <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-light-surface-container border border-light-outline-variant">
                      {(['ပြု', 'မပြု'] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => onUpdateField('grantStatus', option)}
                          className={`py-1.5 rounded-md font-body text-xs font-semibold transition-colors cursor-pointer ${
                            formData.grantStatus === option
                              ? 'bg-indigo-accent text-white shadow-sm'
                              : 'text-light-on-surface-variant'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <FieldInput
                  label="(ဂ) အလုပ်အကိုင်"
                  value={formData.sponsorOccupation}
                  placeholder={config.sampleFormData.sponsorOccupation}
                  onChange={(v) => onUpdateField('sponsorOccupation', v)}
                />
                <FieldInput
                  label="(ဃ) ဆက်သွယ်ရန်လိပ်စာ"
                  value={formData.sponsorAddress}
                  placeholder={config.sampleFormData.sponsorAddress}
                  required
                  onChange={(v) => onUpdateField('sponsorAddress', v)}
                />

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-light-outline-variant">
                  <FieldInput
                    label="နေ့စွဲ (ခုနှစ်)"
                    value={formData.declarationYear}
                    placeholder={config.sampleFormData.declarationYear}
                    onChange={(v) => onUpdateField('declarationYear', v)}
                  />
                  <FieldInput
                    label="လ"
                    value={formData.declarationMonth}
                    placeholder={config.sampleFormData.declarationMonth}
                    onChange={(v) => onUpdateField('declarationMonth', v)}
                  />
                  <FieldInput
                    label="ရက်"
                    value={formData.declarationDay}
                    placeholder={config.sampleFormData.declarationDay}
                    onChange={(v) => onUpdateField('declarationDay', v)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-body text-xs font-semibold leading-relaxed text-light-on-surface py-0.5">
                      ယခုဆက်သွယ်ရန်လိပ်စာ <span className="text-light-error">*</span>
                    </span>
                    <QuickFillButton
                      label="Same as Permanent Address"
                      disabled={!formData.studentPermanentAddress.trim()}
                      onClick={() =>
                        onUpdateField(
                          'currentContactAddress',
                          formData.studentPermanentAddress
                        )
                      }
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.currentContactAddress}
                    placeholder={config.sampleFormData.currentContactAddress}
                    onChange={(e) =>
                      onUpdateField('currentContactAddress', e.target.value)
                    }
                    className={`w-full rounded-lg px-3 py-2 text-sm leading-relaxed font-body text-light-on-surface focus:outline-none focus:ring-1 transition-colors ${
                      formData.currentContactAddress.trim().length === 0
                        ? 'border-2 border-red-300 bg-light-error-container/15 focus:border-light-error focus:ring-light-error'
                        : 'border border-light-outline-variant bg-light-surface focus:border-indigo-accent focus:ring-indigo-accent'
                    }`}
                  />
                </div>
              </>
            )}
          </div>

          {/* Primary Preview CTA Button (Stitch Smart Form Pattern) */}
          <button
            type="button"
            onClick={scrollToPreview}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-accent text-white font-label text-sm font-semibold shadow-sm hover:bg-light-secondary transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{config.prepHeader.viewFormButton}</span>
          </button>
        </section>

        {/* BOTTOM SECTION: Full Two-Sided Official Form Replica */}
        <FormLivePreview
          formData={formData}
          sampleData={config.sampleFormData}
          copy={config.formPreviewCopy}
          remainingCount={totalRemainingCount}
        />

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 pb-6">
          <button
            type="button"
            onClick={onResetProgress}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-label font-semibold text-light-on-surface-variant hover:text-light-error hover:bg-light-error-container/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{config.questUiCopy.resetButtonLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('quest')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-primary text-white font-label text-xs font-semibold shadow-sm hover:bg-light-primary transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>{config.landingCards.quest.titleEn}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </main>
    </div>
  );
}
