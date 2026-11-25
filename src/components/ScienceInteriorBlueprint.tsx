'use client';

import { useState } from 'react';
import { Compass } from 'lucide-react';
import { ScienceInteriorConfig, ScienceWingId } from '@/types/enrollment';

interface ScienceInteriorBlueprintProps {
  config: ScienceInteriorConfig;
  defaultWing?: ScienceWingId;
}

export function ScienceInteriorBlueprint({
  config,
  defaultWing = 'right',
}: ScienceInteriorBlueprintProps) {
  const [activeWing, setActiveWing] = useState<ScienceWingId>(defaultWing);

  const isRight = activeWing === 'right';
  const isLeft = activeWing === 'left';
  const activeInfo = config.wings[activeWing];

  return (
    <div className="flex flex-col gap-2.5 pt-1">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-blue-primary shrink-0" aria-hidden="true" />
          <span className="font-label text-xs font-semibold text-light-on-surface">
            {config.title}
          </span>
        </div>
        <span className="font-body text-[11px] leading-relaxed text-light-on-surface-variant">
          {config.subtitle}
        </span>
      </div>

      {/* Wing Toggle Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {(['right', 'left'] as const).map((wingKey) => {
          const wing = config.wings[wingKey];
          const selected = activeWing === wingKey;
          return (
            <button
              key={wingKey}
              type="button"
              onClick={() => setActiveWing(wingKey)}
              className={`min-w-0 px-2.5 py-2 rounded-xl border text-left font-body text-[11px] leading-relaxed transition-colors cursor-pointer ${
                selected
                  ? 'bg-slate-900 border-cyan-400 text-cyan-300 font-semibold shadow-sm'
                  : 'bg-light-surface-container-low border-light-outline-variant text-light-on-surface-variant hover:border-slate-400'
              }`}
            >
              {wing.buttonLabel}
            </button>
          );
        })}
      </div>

      {/* Dark-Mode Architectural CAD Interior Blueprint SVG */}
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-2.5 shadow-inner">
        <svg
          viewBox="0 0 340 196"
          className="w-full h-auto"
          aria-label="Science Building Dark-Mode CAD Interior Blueprint"
        >
          <defs>
            <pattern
              id="cad-grid"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 16 0 L 0 0 0 16"
                fill="none"
                stroke="#1E293B"
                strokeWidth="0.75"
              />
            </pattern>
          </defs>

          {/* CAD Blueprint Grid Background */}
          <rect x="0" y="0" width="340" height="196" rx="8" fill="#0F172A" />
          <rect x="6" y="6" width="328" height="184" rx="6" fill="url(#cad-grid)" stroke="#334155" strokeWidth="1.2" />

          {/* Building Title */}
          <text
            x="170"
            y="22"
            textAnchor="middle"
            fontFamily="Inter, Noto Sans Myanmar, sans-serif"
            fontSize="9.5"
            fontWeight="700"
            letterSpacing="0.4"
            fill="#94A3B8"
          >
            {config.buildingTitle}
          </text>

          {/* Upper Main Wing Block (Lecture / Admin Hall) */}
          <rect
            x="24"
            y="30"
            width="292"
            height="18"
            rx="4"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* LEFT WING: Finance Dept (ဘဏ္ဍာရေး) with BOTTOM doorway gap */}
          <g
            onClick={() => setActiveWing('left')}
            className="cursor-pointer"
          >
            <rect
              x="24"
              y="72"
              width="116"
              height="70"
              rx="6"
              fill={isLeft ? '#172554' : '#1E293B'}
              stroke={isLeft ? '#38BDF8' : '#475569'}
              strokeWidth={isLeft ? '2' : '1.2'}
            />
            {/* Bottom Doorway Opening (Left Wing) */}
            <line
              x1="68"
              y1="142"
              x2="96"
              y2="142"
              stroke={isLeft ? '#0F172A' : '#1E293B'}
              strokeWidth="4"
            />
            <line
              x1="68"
              y1="142"
              x2="96"
              y2="142"
              stroke="#22D3EE"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
            <text
              x="82"
              y="102"
              textAnchor="middle"
              fontFamily="Noto Sans Myanmar, sans-serif"
              fontSize="12"
              fontWeight="700"
              fill={isLeft ? '#7DD3FC' : '#E2E8F0'}
            >
              {config.wings.left.roomTitle}
            </text>
            <text
              x="82"
              y="120"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="8.5"
              fill={isLeft ? '#BAE6FD' : '#94A3B8'}
            >
              {config.wings.left.roomSubtitle}
            </text>
          </g>

          {/* RIGHT WING: Student Affairs (ကျောင်းသားရေးရာ) with TOP doorway gap */}
          <g
            onClick={() => setActiveWing('right')}
            className="cursor-pointer"
          >
            <rect
              x="200"
              y="72"
              width="116"
              height="70"
              rx="6"
              fill={isRight ? '#172554' : '#1E293B'}
              stroke={isRight ? '#38BDF8' : '#475569'}
              strokeWidth={isRight ? '2' : '1.2'}
            />
            {/* Top Doorway Opening (Right Wing) */}
            <line
              x1="244"
              y1="72"
              x2="272"
              y2="72"
              stroke={isRight ? '#0F172A' : '#1E293B'}
              strokeWidth="4"
            />
            <line
              x1="244"
              y1="72"
              x2="272"
              y2="72"
              stroke="#22D3EE"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
            <text
              x="258"
              y="102"
              textAnchor="middle"
              fontFamily="Noto Sans Myanmar, sans-serif"
              fontSize="12"
              fontWeight="700"
              fill={isRight ? '#7DD3FC' : '#E2E8F0'}
            >
              {config.wings.right.roomTitle}
            </text>
            <text
              x="258"
              y="120"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="8.5"
              fill={isRight ? '#BAE6FD' : '#94A3B8'}
            >
              {config.wings.right.roomSubtitle}
            </text>
          </g>

          {/* Central Corridor Guide Lines */}
          <line x1="154" y1="62" x2="154" y2="162" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="186" y1="62" x2="186" y2="162" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

          {/* ACTIVE TRAJECTORY 1 — RIGHT WING: Straight up central corridor -> turn right -> enter top doorway */}
          {isRight && (
            <g>
              <path
                d="M 170 168 L 170 57 L 258 57 L 258 75"
                stroke="#38BDF8"
                strokeWidth="3"
                strokeDasharray="5 4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrowhead pointing down into Top Doorway */}
              <polygon points="253,73 263,73 258,81" fill="#38BDF8" />
            </g>
          )}

          {/* ACTIVE TRAJECTORY 2 — LEFT WING: Immediate left from entrance -> enter bottom doorway */}
          {isLeft && (
            <g>
              <path
                d="M 170 168 L 82 168 L 82 139"
                stroke="#38BDF8"
                strokeWidth="3"
                strokeDasharray="5 4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrowhead pointing up into Bottom Doorway */}
              <polygon points="77,141 87,141 82,133" fill="#38BDF8" />
            </g>
          )}

          {/* Bottom-Center Entrance (ဝင်ပေါက်) */}
          <rect
            x="132"
            y="168"
            width="76"
            height="20"
            rx="4"
            fill="#0284C7"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />
          <text
            x="170"
            y="181"
            textAnchor="middle"
            fontFamily="Noto Sans Myanmar, sans-serif"
            fontSize="10"
            fontWeight="700"
            fill="#FFFFFF"
          >
            {config.entranceLabel}
          </text>
        </svg>

        {/* CAD Path Hint Footer */}
        <p className="mt-2 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-body text-[11px] leading-relaxed text-cyan-200 text-pretty">
          {activeInfo.pathHint}
        </p>
      </div>
    </div>
  );
}
