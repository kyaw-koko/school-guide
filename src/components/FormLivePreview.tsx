'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  FileText,
  FlipHorizontal2,
  Lock,
  PenLine,
  User,
} from 'lucide-react';
import { EnrollmentFormData, FormPreviewCopy } from '@/types/enrollment';

interface FormLivePreviewProps {
  formData: EnrollmentFormData;
  sampleData: EnrollmentFormData;
  copy: FormPreviewCopy;
  remainingCount: number;
}

function PreviewValue({
  value,
  emptyLabel,
}: {
  value: string;
  emptyLabel: string;
}) {
  const trimmed = value.trim();
  if (!trimmed) {
    return (
      <span className="inline-block px-1 py-0.5 rounded bg-red-50 border border-red-200 text-light-error font-semibold">
        {emptyLabel}
      </span>
    );
  }
  return <span className="text-blue-700 font-semibold">{trimmed}</span>;
}

function ParentMergedDetails({
  nameMm,
  occupation,
  address,
  phone,
  emptyLabel,
}: {
  nameMm: string;
  occupation: string;
  address: string;
  phone: string;
  emptyLabel: string;
}) {
  const hasAny =
    occupation.trim() || address.trim() || phone.trim() || nameMm.trim();

  if (!hasAny) {
    return (
      <span className="inline-block px-1 py-0.5 rounded bg-red-50 border border-red-200 text-light-error font-semibold">
        {emptyLabel}
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-0.5 text-[10px] leading-relaxed">
      {nameMm.trim() && (
        <span className="text-blue-700 font-semibold">{nameMm.trim()}</span>
      )}
      <span>
        <PreviewValue value={occupation} emptyLabel={emptyLabel} />
      </span>
      {address.trim() && (
        <span className="text-blue-700 font-semibold">{address.trim()}</span>
      )}
      {phone.trim() && (
        <span className="font-mono text-blue-700 font-semibold">
          {phone.trim()}
        </span>
      )}
    </div>
  );
}

export function FormLivePreview({
  formData,
  sampleData,
  copy,
  remainingCount,
}: FormLivePreviewProps) {
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [showSample, setShowSample] = useState(false);

  const activeData = showSample ? sampleData : formData;

  return (
    <section
      id="live-form-preview"
      aria-label="Live paper form preview"
      className="flex flex-col gap-3 scroll-mt-20"
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="font-title text-[17px] font-bold leading-7 text-light-on-surface py-0.5">
          {copy.sectionTitle}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowSample((prev) => !prev)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label text-[11px] font-semibold border transition-colors cursor-pointer ${
              showSample
                ? 'bg-indigo-accent text-white border-indigo-accent'
                : 'bg-light-surface text-indigo-accent border-indigo-accent/30 hover:bg-indigo-soft'
            }`}
          >
            <Eye className="w-3 h-3 shrink-0" aria-hidden="true" />
            <span>{showSample ? copy.sampleToggleOn : copy.sampleToggleOff}</span>
          </button>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-body text-[11px] font-semibold leading-relaxed ${
              showSample || remainingCount === 0
                ? 'bg-success-container text-on-success-container'
                : 'bg-red-50 border border-red-200 text-light-error'
            }`}
          >
            {showSample || remainingCount === 0 ? (
              <>
                <CheckCircle2 className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span>{copy.allFieldsCompleteLabel}</span>
              </>
            ) : (
              <span>
                {copy.remainingFieldsPrefix}: {remainingCount} {copy.remainingFieldsUnit}
              </span>
            )}
          </span>
          <span className="font-body text-xs text-blue-700 font-semibold py-0.5">
            {copy.blueLegend}
          </span>
        </div>
      </div>

      {showSample && (
        <div
          role="status"
          className="rounded-xl bg-amber-bg border border-amber-border/40 px-3 py-2 font-body text-xs font-semibold text-amber-text"
        >
          {copy.sampleBannerText}
        </div>
      )}

      {/* Front / Back Page Toggle */}
      <div
        role="tablist"
        aria-label="Paper form page"
        className="grid grid-cols-2 p-1 rounded-xl bg-light-surface-container border border-light-outline-variant"
      >
        <button
          type="button"
          role="tab"
          aria-selected={side === 'front'}
          onClick={() => setSide('front')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-label text-xs font-semibold transition-all cursor-pointer ${
            side === 'front'
              ? 'bg-light-surface text-light-on-surface shadow-sm'
              : 'text-light-on-surface-variant hover:text-light-on-surface'
          }`}
        >
          <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="py-0.5">{copy.frontTabLabel}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={side === 'back'}
          onClick={() => setSide('back')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-label text-xs font-semibold transition-all cursor-pointer ${
            side === 'back'
              ? 'bg-light-surface text-light-on-surface shadow-sm'
              : 'text-light-on-surface-variant hover:text-light-on-surface'
          }`}
        >
          <FlipHorizontal2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="py-0.5">{copy.backTabLabel}</span>
        </button>
      </div>

      {/* Paper Form Facsimile Card */}
      <article className="bg-paper border border-paper-border rounded-xl p-3.5 shadow-sm flex flex-col gap-3.5 text-light-on-surface">
        {side === 'front' ? (
          <div className="flex flex-col gap-3.5">
            {/* Top Header: Photo + Title + Program Level */}
            <div className="flex items-start justify-between gap-2.5 border-b border-paper-border pb-3">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-16 h-20 border border-dashed border-paper-border rounded-md flex flex-col items-center justify-center text-center p-1 bg-light-surface gap-1">
                  <User className="w-5 h-5 text-light-on-surface-variant" aria-hidden="true" />
                  <span className="font-body text-[10px] leading-tight text-light-on-surface-variant">
                    {copy.photoBoxLabel}
                  </span>
                </div>
                <span className="font-body text-[9px] leading-snug text-center text-light-on-surface-variant max-w-[70px]">
                  {copy.photoInstructionNote}
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="text-center flex flex-col gap-0.5">
                  <p className="font-title text-[14px] font-bold leading-relaxed text-light-on-surface py-0.5">
                    {copy.universityTitle}
                  </p>
                  <p className="font-body text-[11px] leading-relaxed text-light-on-surface">
                    <PreviewValue
                      value={activeData.academicYear}
                      emptyLabel={copy.emptyPlaceholder}
                    />{' '}
                    {copy.academicYearSuffix}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 font-body text-[11px] leading-relaxed">
                    {copy.programLevels.map((lvl, idx) => {
                      const isSelected = activeData.programLevel === lvl;
                      return (
                        <span key={lvl} className="inline-flex items-center gap-1">
                          {idx > 0 && <span className="text-light-on-surface-variant">/</span>}
                          <span
                            className={
                              isSelected
                                ? 'text-blue-700 font-semibold'
                                : 'line-through text-light-on-surface-variant/70'
                            }
                          >
                            {lvl}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                  <p className="font-body text-[11px] font-semibold leading-relaxed text-light-on-surface py-0.5">
                    {copy.formTitle}
                  </p>
                </div>

                {/* Top-Right Academic Box */}
                <table className="w-full border-collapse border border-paper-border text-[10px] leading-relaxed bg-light-surface">
                  <tbody>
                    <tr>
                      <td className="border border-paper-border px-1.5 py-1 text-light-on-surface-variant">
                        {copy.classYearLabel}
                      </td>
                      <td className="border border-paper-border px-1.5 py-1">
                        <PreviewValue value={activeData.classYear} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border px-1.5 py-1 text-light-on-surface-variant">
                        {copy.majorLabel}
                      </td>
                      <td className="border border-paper-border px-1.5 py-1">
                        <PreviewValue value={activeData.major} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border px-1.5 py-1 text-light-on-surface-variant">
                        {copy.rollNoLabel}
                      </td>
                      <td className="border border-paper-border px-1.5 py-1">
                        <PreviewValue value={activeData.rollNo} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border px-1.5 py-1 text-light-on-surface-variant">
                        {copy.regNoLabel}
                      </td>
                      <td className="border border-paper-border px-1.5 py-1">
                        <PreviewValue value={activeData.uniRegNo} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border px-1.5 py-1 text-light-on-surface-variant">
                        {copy.entryYearLabel}
                      </td>
                      <td className="border border-paper-border px-1.5 py-1">
                        <PreviewValue value={activeData.uniEntryYear} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 1: 4-Column Official Personal Table */}
            <div className="flex flex-col gap-1">
              <p className="font-body text-[10px] text-light-on-surface-variant text-center sm:hidden">
                {copy.tableScrollHint}
              </p>
              <div className="overflow-x-auto -mx-1 px-1 pb-1">
                <table className="w-full min-w-[420px] border-collapse border border-paper-border text-left text-[10px] leading-relaxed">
                  <thead>
                    <tr className="bg-light-surface-container-low">
                      <th className="border border-paper-border p-1.5 font-body font-semibold w-[28%]">
                        {copy.section1Header}
                      </th>
                      <th className="border border-paper-border p-1.5 font-body font-semibold text-center w-[24%]">
                        {copy.tableHeaders.student}
                      </th>
                      <th className="border border-paper-border p-1.5 font-body font-semibold text-center w-[24%]">
                        {copy.tableHeaders.father}
                      </th>
                      <th className="border border-paper-border p-1.5 font-body font-semibold text-center w-[24%]">
                        {copy.tableHeaders.mother}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body">
                        {copy.tableRows.nameMm}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.studentNameMm} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.fatherNameMm} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.motherNameMm} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body">
                        {copy.tableRows.nameEn}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.studentNameEn} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        {activeData.fatherNameEn.trim() ? (
                          <span className="text-blue-700 font-semibold">{activeData.fatherNameEn.trim()}</span>
                        ) : (
                          <span className="text-light-on-surface-variant">—</span>
                        )}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        {activeData.motherNameEn.trim() ? (
                          <span className="text-blue-700 font-semibold">{activeData.motherNameEn.trim()}</span>
                        ) : (
                          <span className="text-light-on-surface-variant">—</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body">
                        {copy.tableRows.race}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.studentRace} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.fatherRace} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.motherRace} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body">
                        {copy.tableRows.religion}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.studentReligion} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.fatherReligion} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.motherReligion} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body">
                        {copy.tableRows.birthplace}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.studentBirthplace} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        {activeData.fatherBirthplace.trim() ? (
                          <span className="text-blue-700 font-semibold">{activeData.fatherBirthplace.trim()}</span>
                        ) : (
                          <span className="text-light-on-surface-variant">—</span>
                        )}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        {activeData.motherBirthplace.trim() ? (
                          <span className="text-blue-700 font-semibold">{activeData.motherBirthplace.trim()}</span>
                        ) : (
                          <span className="text-light-on-surface-variant">—</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body">
                        {copy.tableRows.nrc}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.studentNrc} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.fatherNrc} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.motherNrc} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body">
                        {copy.tableRows.dob}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <PreviewValue value={activeData.studentDob} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td
                        colSpan={2}
                        rowSpan={2}
                        className="border border-paper-border p-1.5 font-body align-top"
                      >
                        <p className="text-[9px] text-light-on-surface-variant border-b border-paper-border/50 pb-0.5 mb-1">
                          {copy.tableRows.fatherMergedTitle}
                        </p>
                        <ParentMergedDetails
                          nameMm={activeData.fatherNameMm}
                          occupation={activeData.fatherOccupation}
                          address={activeData.fatherAddress}
                          phone={activeData.fatherPhone}
                          emptyLabel={copy.emptyPlaceholder}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body">
                        {copy.tableRows.matric}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body">
                        <div className="flex flex-col gap-0.5">
                          <PreviewValue value={activeData.matricRollNo} emptyLabel={copy.emptyPlaceholder} />
                          <PreviewValue value={activeData.matricYear} emptyLabel={copy.emptyPlaceholder} />
                          <PreviewValue value={activeData.matricCenter} emptyLabel={copy.emptyPlaceholder} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-body align-top">
                        {copy.tableRows.studentPermanentAddress}
                      </td>
                      <td className="border border-paper-border p-1.5 font-body align-top">
                        <div className="flex flex-col gap-0.5">
                          <PreviewValue
                            value={activeData.studentPermanentAddress}
                            emptyLabel={copy.emptyPlaceholder}
                          />
                          {activeData.studentPhone.trim() ? (
                            <span className="font-mono text-blue-700 font-semibold">
                              {activeData.studentPhone.trim()}
                            </span>
                          ) : (
                            <span className="inline-block px-1 py-0.5 rounded bg-red-50 border border-red-200 text-light-error font-semibold w-fit">
                              {copy.emptyPlaceholder}
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        colSpan={2}
                        className="border border-paper-border p-1.5 font-body align-top"
                      >
                        <p className="text-[9px] text-light-on-surface-variant border-b border-paper-border/50 pb-0.5 mb-1">
                          {copy.tableRows.motherMergedTitle}
                        </p>
                        <ParentMergedDetails
                          nameMm={activeData.motherNameMm}
                          occupation={activeData.motherOccupation}
                          address={activeData.motherAddress}
                          phone={activeData.motherPhone}
                          emptyLabel={copy.emptyPlaceholder}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Past Exams Table */}
            <div className="flex flex-col gap-1.5">
              <p className="font-body text-xs font-semibold text-light-on-surface py-0.5">
                {copy.pastExamsTitle}
              </p>
              <div className="overflow-x-auto -mx-1 px-1">
                <table className="w-full min-w-[360px] border-collapse border border-paper-border text-left text-[10px] leading-relaxed">
                  <thead>
                    <tr className="bg-light-surface-container-low">
                      <th className="border border-paper-border p-1.5">{copy.pastExamsHeaders.yearLevel}</th>
                      <th className="border border-paper-border p-1.5">{copy.pastExamsHeaders.major}</th>
                      <th className="border border-paper-border p-1.5">{copy.pastExamsHeaders.rollNo}</th>
                      <th className="border border-paper-border p-1.5">{copy.pastExamsHeaders.year}</th>
                      <th className="border border-paper-border p-1.5">{copy.pastExamsHeaders.result}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-paper-border p-1.5 font-medium">
                        {copy.pastExamsFirstYearLabel}
                      </td>
                      <td className="border border-paper-border p-1.5">
                        <PreviewValue value={activeData.pastExamMajor} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5">
                        <PreviewValue value={activeData.pastExamRollNo} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5">
                        <PreviewValue value={activeData.pastExamYear} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                      <td className="border border-paper-border p-1.5">
                        <PreviewValue value={activeData.pastExamResult} emptyLabel={copy.emptyPlaceholder} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* BACK PAGE */
          <div className="flex flex-col gap-3.5">
            <div className="border-b border-paper-border pb-2">
              <p className="font-title text-[14px] font-bold leading-relaxed text-light-on-surface py-0.5">
                {copy.backHeaderTitle}
              </p>
            </div>

            {/* Section 3: Sponsor */}
            <div className="grid grid-cols-1 gap-1.5 border border-paper-border rounded-lg p-3 bg-light-surface text-xs leading-relaxed">
              <p className="font-semibold text-light-on-surface py-0.5">{copy.sponsorSectionTitle}</p>
              <p className="text-light-on-surface-variant py-0.5">
                {copy.sponsorLabels.name}:{' '}
                <PreviewValue value={activeData.sponsorName} emptyLabel={copy.emptyPlaceholder} />
              </p>
              <p className="text-light-on-surface-variant py-0.5">
                {copy.sponsorLabels.relationship}:{' '}
                <PreviewValue value={activeData.sponsorRelation} emptyLabel={copy.emptyPlaceholder} />
              </p>
              <p className="text-light-on-surface-variant py-0.5">
                {copy.sponsorLabels.occupation}:{' '}
                {activeData.sponsorOccupation.trim() ? (
                  <span className="text-blue-700 font-semibold">{activeData.sponsorOccupation.trim()}</span>
                ) : (
                  <span className="text-light-on-surface-variant">—</span>
                )}
              </p>
              <p className="text-light-on-surface-variant py-0.5">
                {copy.sponsorLabels.address}:{' '}
                <PreviewValue value={activeData.sponsorAddress} emptyLabel={copy.emptyPlaceholder} />
              </p>

              {/* Section 4: Grant Status */}
              <div className="pt-2 mt-1 border-t border-paper-border/50 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-light-on-surface font-medium py-0.5">{copy.grantLabel}</span>
                <div className="inline-flex items-center gap-2">
                  {(['ပြု', 'မပြု'] as const).map((opt, idx) => (
                    <span key={opt} className="inline-flex items-center gap-1.5">
                      {idx > 0 && <span className="text-light-on-surface-variant">/</span>}
                      <span
                        className={
                          activeData.grantStatus === opt
                            ? 'text-blue-700 font-semibold underline decoration-blue-700/40'
                            : 'line-through text-light-on-surface-variant/60'
                        }
                      >
                        {opt}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Self-Declaration Block */}
            <div className="border border-paper-border rounded-lg p-3 bg-light-surface flex flex-col gap-2.5 text-[11px] leading-relaxed">
              <p className="font-title text-xs font-bold text-center text-light-on-surface py-0.5">
                {copy.declarationHeading}
              </p>
              <ul className="flex flex-col gap-1 text-light-on-surface">
                {copy.declarationItems.map((clause) => (
                  <li key={clause} className="py-0.5">{clause}</li>
                ))}
              </ul>

              {/* Date Line */}
              <p className="text-light-on-surface pt-1 leading-relaxed">
                {copy.datePrefix}{' '}
                <PreviewValue value={activeData.declarationYear} emptyLabel={copy.emptyPlaceholder} />{' '}
                {copy.yearUnit}{' '}
                <PreviewValue value={activeData.declarationMonth} emptyLabel={copy.emptyPlaceholder} />{' '}
                {copy.monthUnit} ({' '}
                <PreviewValue value={activeData.declarationDay} emptyLabel={copy.emptyPlaceholder} /> ){' '}
                {copy.dayUnit}
              </p>

              {/* Bottom-Left Address Box + Bottom-Right Signature */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 items-end">
                <div className="border border-paper-border rounded p-2.5 bg-paper">
                  <p className="text-[10px] font-semibold text-light-on-surface-variant border-b border-paper-border/40 pb-0.5 mb-1">
                    {copy.currentAddressLabel}
                  </p>
                  <p className="text-[11px] leading-relaxed py-0.5">
                    <PreviewValue
                      value={activeData.currentContactAddress}
                      emptyLabel={copy.emptyPlaceholder}
                    />
                  </p>
                </div>

                <div className="flex flex-col items-center justify-end gap-1 pt-4">
                  <div className="inline-flex items-center gap-1 text-[10px] text-indigo-accent font-medium">
                    <PenLine className="w-3 h-3" aria-hidden="true" />
                    <span>Sign on Paper</span>
                  </div>
                  <div className="w-full border-t border-dashed border-paper-border pt-1 text-center text-[10px] leading-relaxed text-light-on-surface-variant">
                    {copy.signatureLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Office-Only Read-Only Zone */}
            <div className="border border-dashed border-paper-border rounded-lg p-3 bg-light-surface-container/60 flex flex-col gap-2">
              <div className="flex items-center justify-center gap-1.5 text-center">
                <Lock className="w-3.5 h-3.5 text-light-on-surface-variant shrink-0" aria-hidden="true" />
                <p className="font-body text-xs font-semibold leading-relaxed text-light-on-surface-variant py-0.5">
                  {copy.officeOnlyBanner}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-dashed border-paper-border rounded p-2 text-center bg-light-surface/70">
                  <span className="font-body text-[10px] leading-relaxed text-light-on-surface-variant">
                    {copy.officeStamps.universityCheck}
                  </span>
                </div>
                <div className="border border-dashed border-paper-border rounded p-2 text-center bg-light-surface/70">
                  <span className="font-body text-[10px] leading-relaxed text-light-on-surface-variant">
                    {copy.officeStamps.hod}
                  </span>
                </div>
                <div className="border border-dashed border-paper-border rounded p-2 text-center bg-light-surface/70">
                  <span className="font-body text-[10px] leading-relaxed text-light-on-surface-variant">
                    {copy.officeStamps.finance}
                  </span>
                </div>
                <div className="border border-dashed border-paper-border rounded p-2 text-center bg-blue-soft/60">
                  <span className="font-body text-[10px] leading-relaxed text-blue-700 font-medium">
                    {copy.officeStamps.library}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
