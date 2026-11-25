'use client';

import { useEffect, useState } from 'react';
import {
  AcademicYearOption,
  AppView,
  CampusRouteId,
  EnrollmentFormData,
  MajorId,
  PersistedEnrollmentState,
} from '@/types/enrollment';
import {
  ENROLLMENT_DATA,
  STORAGE_KEY,
  STORAGE_VERSION,
} from '@/data/enrollmentData';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { LandingView } from '@/components/LandingView';
import { PrepAndPrefillView } from '@/components/PrepAndPrefillView';
import { QuestDashboard } from '@/components/QuestDashboard';

function createInitialState(majorId: MajorId): PersistedEnrollmentState {
  const config = ENROLLMENT_DATA[majorId];
  return {
    version: STORAGE_VERSION,
    selectedMajor: majorId,
    selectedYear: config.defaultClassYear,
    selectedGate: 'main',
    selectedRoute: 'uni-ave-to-science',
    checkedDocs: [],
    completedSubQuests: [],
    formData: { ...config.defaultFormData },
  };
}

export default function HomePage() {
  const [view, setView] = useState<AppView>('landing');
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<PersistedEnrollmentState>(() =>
    createInitialState('cs')
  );

  // Hydrate persisted state safely on client mount to prevent SSR hydration mismatches
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedEnrollmentState>;
        if (
          parsed &&
          parsed.version === STORAGE_VERSION &&
          parsed.selectedMajor &&
          ENROLLMENT_DATA[parsed.selectedMajor]
        ) {
          const majorConfig = ENROLLMENT_DATA[parsed.selectedMajor];
          setState({
            version: STORAGE_VERSION,
            selectedMajor: parsed.selectedMajor,
            selectedYear: parsed.selectedYear ?? majorConfig.defaultClassYear,
            selectedGate: parsed.selectedGate ?? 'main',
            selectedRoute:
              parsed.selectedRoute &&
              majorConfig.campusRoutes.some((r) => r.id === parsed.selectedRoute)
                ? parsed.selectedRoute
                : 'uni-ave-to-science',
            checkedDocs: Array.isArray(parsed.checkedDocs) ? parsed.checkedDocs : [],
            completedSubQuests: Array.isArray(parsed.completedSubQuests)
              ? parsed.completedSubQuests
              : [],
            formData: {
              ...majorConfig.defaultFormData,
              ...(parsed.formData ?? {}),
            },
          });
        }
      }
    } catch {
      // Ignore malformed storage entries and fall back to defaults
    } finally {
      setHydrated(true);
    }
  }, []);

  // Auto-save state changes to localStorage after initial hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota or private-browsing errors
    }
  }, [hydrated, state]);

  const config = ENROLLMENT_DATA[state.selectedMajor];

  const handleNavigate = (nextView: AppView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleDoc = (docId: string) => {
    setState((prev) => {
      const exists = prev.checkedDocs.includes(docId);
      return {
        ...prev,
        checkedDocs: exists
          ? prev.checkedDocs.filter((id) => id !== docId)
          : [...prev.checkedDocs, docId],
      };
    });
  };

  const handleUpdateField = <K extends keyof EnrollmentFormData>(
    key: K,
    value: EnrollmentFormData[K]
  ) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [key]: value,
      },
    }));
  };

  const handleUpdateFields = (patch: Partial<EnrollmentFormData>) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        ...patch,
      },
    }));
  };

  const handleSelectYear = (year: AcademicYearOption) => {
    const yearObj = config.classYears.find((y) => y.id === year);
    setState((prev) => ({
      ...prev,
      selectedYear: year,
      formData: {
        ...prev.formData,
        classYear: yearObj ? yearObj.labelMm : prev.formData.classYear,
      },
    }));
  };

  const handleSelectRoute = (route: CampusRouteId) => {
    setState((prev) => ({
      ...prev,
      selectedRoute: route,
      selectedGate: route === 'pyay-marlar-to-science' ? 'maler' : 'main',
    }));
  };

  const handleToggleSubQuest = (subQuestId: string) => {
    setState((prev) => {
      const exists = prev.completedSubQuests.includes(subQuestId);
      return {
        ...prev,
        completedSubQuests: exists
          ? prev.completedSubQuests.filter((id) => id !== subQuestId)
          : [...prev.completedSubQuests, subQuestId],
      };
    });
  };

  const handleResetProgress = () => {
    const fresh = createInitialState(state.selectedMajor);
    setState(fresh);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const completedQuestsCount = config.quests.filter(
    (quest) =>
      quest.subQuests.length > 0 &&
      quest.subQuests.every((sq) => state.completedSubQuests.includes(sq.id))
  ).length;

  const hasSavedProgress =
    state.checkedDocs.length > 0 ||
    state.completedSubQuests.length > 0 ||
    state.selectedRoute !== 'uni-ave-to-science' ||
    state.selectedYear !== config.defaultClassYear ||
    JSON.stringify(state.formData) !== JSON.stringify(config.defaultFormData);

  return (
    <div className="min-h-screen flex flex-col">
      <DisclaimerBanner />

      {view === 'landing' && (
        <LandingView
          config={config}
          completedQuestsCount={completedQuestsCount}
          hasSavedProgress={hasSavedProgress}
          onNavigate={handleNavigate}
          onResetProgress={handleResetProgress}
        />
      )}

      {view === 'prep' && (
        <PrepAndPrefillView
          config={config}
          selectedYear={state.selectedYear}
          checkedDocs={state.checkedDocs}
          formData={state.formData}
          onSelectYear={handleSelectYear}
          onToggleDoc={handleToggleDoc}
          onUpdateField={handleUpdateField}
          onUpdateFields={handleUpdateFields}
          onNavigate={handleNavigate}
          onResetProgress={handleResetProgress}
        />
      )}

      {view === 'quest' && (
        <QuestDashboard
          config={config}
          selectedYear={state.selectedYear}
          selectedRoute={state.selectedRoute}
          completedSubQuests={state.completedSubQuests}
          onSelectYear={handleSelectYear}
          onSelectRoute={handleSelectRoute}
          onToggleSubQuest={handleToggleSubQuest}
          onNavigate={handleNavigate}
          onResetProgress={handleResetProgress}
        />
      )}
    </div>
  );
}
