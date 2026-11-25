import { AlertTriangle } from 'lucide-react';
import { GLOBAL_DISCLAIMER } from '@/data/enrollmentData';

export function DisclaimerBanner() {
  return (
    <div
      role="alert"
      className="bg-amber-bg border-b border-amber-border/40 px-4 py-3 flex items-start gap-2.5 text-amber-text"
    >
      <AlertTriangle className="w-[18px] h-[18px] shrink-0 mt-0.5" aria-hidden="true" />
      <p className="font-body text-xs leading-relaxed py-0.5 text-pretty">
        {GLOBAL_DISCLAIMER.text}
      </p>
    </div>
  );
}
