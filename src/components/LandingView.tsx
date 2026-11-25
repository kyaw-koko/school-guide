import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  Compass,
  FileEdit,
  RotateCcw,
  Wallet,
} from 'lucide-react';
import { GLOBAL_DISCLAIMER } from '@/data/enrollmentData';
import { AppView, BentoMiniTile, MajorEnrollmentConfig } from '@/types/enrollment';

interface LandingViewProps {
  config: MajorEnrollmentConfig;
  completedQuestsCount: number;
  hasSavedProgress: boolean;
  onNavigate: (view: AppView) => void;
  onResetProgress: () => void;
}

function TileIcon({ icon, isCritical }: { icon: BentoMiniTile['icon']; isCritical?: boolean }) {
  if (icon === 'building') {
    return <Building2 className="w-5 h-5 text-blue-primary shrink-0" aria-hidden="true" />;
  }
  if (icon === 'camera') {
    return <Camera className="w-5 h-5 text-indigo-accent shrink-0" aria-hidden="true" />;
  }
  return (
    <Wallet
      className={`w-5 h-5 shrink-0 ${isCritical ? 'text-light-error' : 'text-blue-primary'}`}
      aria-hidden="true"
    />
  );
}

export function LandingView({
  config,
  completedQuestsCount,
  hasSavedProgress,
  onNavigate,
  onResetProgress,
}: LandingViewProps) {
  const { prep, quest } = config.landingCards;
  const totalQuests = config.quests.length;
  const pct = Math.round((completedQuestsCount / totalQuests) * 100);
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 md:py-8 flex flex-col gap-4 md:gap-6">
      {/* Top Slim Pill-Shaped Notice Badge + Dept Label */}
      <div className="flex items-center justify-between gap-2">
        <div
          role="status"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-bg border border-amber-border/40 text-amber-text"
        >
          <BadgeCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="font-label text-xs font-semibold">
            {GLOBAL_DISCLAIMER.shortBadge}
          </span>
        </div>
        <span className="font-label text-xs font-semibold text-light-on-surface-variant">
          {config.badgeText}
        </span>
      </div>

      {/* Bento Hero Header Card with Progress Ring Indicator */}
      <header className="bg-light-surface border border-light-outline-variant rounded-2xl p-4 md:p-6 flex items-center justify-between gap-3 md:gap-6 shadow-sm">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h1 className="font-headline text-[22px] leading-[30px] md:text-[28px] md:leading-[38px] tracking-tight font-bold text-light-on-surface text-balance">
            {config.titleEn}
          </h1>
          <p className="font-body text-sm md:text-base leading-relaxed text-light-on-surface-variant py-1 text-pretty">
            {config.titleMm}
          </p>
        </div>

        {/* Circular SVG Progress Ring */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-light-surface-container-high"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-blue-primary transition-all duration-300"
              />
            </svg>
            <span className="absolute font-mono text-xs font-semibold text-light-on-surface tabular-nums">
              {pct}%
            </span>
          </div>
          <span className="font-label text-[11px] font-semibold text-light-on-surface-variant tabular-nums">
            {completedQuestsCount}/{totalQuests} Ready
          </span>
        </div>
      </header>

      {/* Bento Grid: 2 Primary Workflow Cards + Mini Info Tiles */}
      <section aria-label="Enrollment workflows" className="flex flex-col gap-3 md:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {/* Bento Card 1: Prep & Smart Form Pre-fill */}
          <button
            type="button"
            onClick={() => onNavigate('prep')}
            className="text-left group bg-light-surface border border-light-outline-variant rounded-2xl p-4 md:p-6 shadow-sm hover:border-indigo-accent active:scale-[0.99] transition-all duration-150 flex flex-col justify-between gap-3 cursor-pointer"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="w-11 h-11 rounded-xl bg-indigo-soft text-indigo-accent flex items-center justify-center shrink-0">
                  <FileEdit className="w-6 h-6" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-soft text-indigo-accent font-label text-xs font-semibold">
                  {prep.badge}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="font-headline text-lg font-bold text-light-on-surface">
                  {prep.titleEn}
                </h2>
                <p className="font-body text-sm leading-relaxed text-light-on-surface-variant py-0.5 text-pretty">
                  {prep.titleMm}
                </p>
              </div>
            </div>

            <div className="pt-2.5 border-t border-light-outline-variant flex items-center justify-between gap-2 w-full">
              <span className="font-body text-xs leading-relaxed text-light-on-surface-variant">
                {prep.footerText}
              </span>
              <ArrowRight
                className="w-5 h-5 text-indigo-accent shrink-0 group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              />
            </div>
          </button>

          {/* Bento Card 2: On-Campus Enrollment Quest (Royal Blue -> Indigo Gradient) */}
          <button
            type="button"
            onClick={() => onNavigate('quest')}
            className="text-left group bg-gradient-to-br from-blue-primary to-indigo-accent text-white border border-light-primary rounded-2xl p-4 md:p-6 shadow-sm hover:brightness-105 active:scale-[0.99] transition-all duration-150 flex flex-col justify-between gap-3 cursor-pointer"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="w-11 h-11 rounded-xl bg-white text-blue-ink flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white text-blue-ink font-label text-xs font-semibold">
                  {quest.badge}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="font-headline text-lg font-bold text-white">
                  {quest.titleEn}
                </h2>
                <p className="font-body text-sm leading-relaxed text-white/95 py-0.5 text-pretty">
                  {quest.titleMm}
                </p>
              </div>
            </div>

            <div className="pt-2.5 border-t border-white/25 flex items-center justify-between gap-2 w-full">
              <span className="font-body text-xs leading-relaxed text-white/95">
                {quest.footerText}
              </span>
              <ArrowRight
                className="w-5 h-5 text-white shrink-0 group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              />
            </div>
          </button>
        </div>

        {/* Bento Mini-Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {config.bentoMiniTiles.map((tile) => (
            <div
              key={tile.id}
              className={`bg-light-surface border rounded-xl p-3 md:p-4 flex flex-col gap-1 shadow-xs ${
                tile.fullWidth ? 'col-span-2 md:col-span-1' : ''
              } ${
                tile.isCritical
                  ? 'border-light-error/35 bg-light-error-container/20'
                  : 'border-light-outline-variant'
              }`}
            >
              <div className="flex items-center gap-2">
                <TileIcon icon={tile.icon} isCritical={tile.isCritical} />
                <span
                  className={`font-label text-xs font-semibold ${
                    tile.isCritical ? 'text-light-error' : 'text-light-on-surface'
                  }`}
                >
                  {tile.title}
                </span>
              </div>
              <span className="font-body text-xs leading-relaxed text-light-on-surface-variant py-0.5">
                {tile.subtitle}
              </span>
            </div>
          ))}
        </div>
      </section>

      {hasSavedProgress && (
        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={onResetProgress}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-label font-semibold text-light-on-surface-variant hover:text-light-error hover:bg-light-error-container/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{config.questUiCopy.resetButtonLabel}</span>
          </button>
        </div>
      )}
    </main>
  );
}
