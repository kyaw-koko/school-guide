'use client';

import { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { ExternalLink, Footprints, Map as MapIcon, Navigation } from 'lucide-react';
import { SCIENCE_BUILDING_COORDS, ULB_COORDS } from '@/data/enrollmentData';
import { CampusRouteConfig, CampusRouteId } from '@/types/enrollment';

interface LiveCampusMapProps {
  routes: CampusRouteConfig[];
  selectedRouteId: CampusRouteId;
  onSelectRoute: (routeId: CampusRouteId) => void;
  title: string;
  landmarkBadge: string;
  openFullRouteLabel: string;
  fallbackNotice: string;
}

function DirectionsOverlay({
  route,
  onDirectionsError,
}: {
  route: CampusRouteConfig;
  onDirectionsError: () => void;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  useEffect(() => {
    if (!map || !routesLibrary) return;

    const directionsService = new routesLibrary.DirectionsService();
    const directionsRenderer = new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#2563EB',
        strokeWeight: 5,
        strokeOpacity: 0.9,
      },
    });

    let cancelled = false;

    directionsService
      .route({
        origin: route.origin,
        destination: route.destination,
        waypoints: route.waypoints,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        if (!cancelled) {
          directionsRenderer.setDirections(response);
        }
      })
      .catch(() => {
        if (!cancelled) {
          onDirectionsError();
        }
      });

    return () => {
      cancelled = true;
      directionsRenderer.setMap(null);
    };
  }, [map, routesLibrary, route, onDirectionsError]);

  return null;
}

function CampusSchematicSvg({
  selectedRouteId,
}: {
  selectedRouteId: CampusRouteId;
}) {
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-full bg-blue-soft/60"
      aria-label="University of Yangon walking route schematic to Science Building"
    >
      {/* Campus blocks */}
      <rect x="0" y="0" width="360" height="220" fill="#EFF6FF" />
      <rect x="34" y="22" width="112" height="58" rx="10" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
      <rect x="234" y="22" width="102" height="58" rx="10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="132" y="138" width="96" height="52" rx="10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Roads: Pyay Road / Convocation St / University Ave */}
      <path
        d="M 180 212 L 180 110 L 90 110 L 90 80"
        stroke="#CBD5E1"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 326 110 L 180 110"
        stroke="#CBD5E1"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 146 50 L 234 50"
        stroke="#CBD5E1"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Convocation Street label */}
      <text
        x="212"
        y="100"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="8.5"
        fontWeight="600"
        fill="#64748B"
      >
        Convocation Street
      </text>

      {/* Active Walking Route Highlight */}
      {selectedRouteId === 'pyay-marlar-to-science' && (
        <path
          d="M 320 110 L 90 110 L 90 80"
          stroke="#4F46E5"
          strokeWidth="4.5"
          strokeDasharray="6 4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {selectedRouteId === 'uni-ave-to-science' && (
        <path
          d="M 180 198 L 180 110 L 90 110 L 90 80"
          stroke="#2563EB"
          strokeWidth="4.5"
          strokeDasharray="6 4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {selectedRouteId === 'science-to-ulb' && (
        <path
          d="M 146 50 L 234 50"
          stroke="#2563EB"
          strokeWidth="4.5"
          strokeDasharray="6 4"
          fill="none"
          strokeLinecap="round"
        />
      )}

      {/* Landmark Nodes */}
      <circle cx="90" cy="46" r="9" fill="#2563EB" />
      <text x="90" y="66" textAnchor="middle" fontFamily="Noto Sans Myanmar, Inter, sans-serif" fontSize="9.5" fontWeight="700" fill="#1D4ED8">
        သိပ္ပံဆောင်
      </text>

      <circle cx="285" cy="46" r="9" fill={selectedRouteId === 'science-to-ulb' ? '#2563EB' : '#64748B'} />
      <text x="285" y="66" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9.5" fontWeight="700" fill="#0F172A">
        ULB (CS Dept)
      </text>

      <circle cx="180" cy="198" r="8" fill={selectedRouteId === 'uni-ave-to-science' ? '#0F172A' : '#64748B'} />
      <text x="180" y="184" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9.5" fontWeight="600" fill="#334155">
        Uni Ave Gate
      </text>

      <circle cx="320" cy="110" r="8" fill={selectedRouteId === 'pyay-marlar-to-science' ? '#4F46E5' : '#64748B'} />
      <text x="292" y="130" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9.5" fontWeight="600" fill="#334155">
        Marlar Bus Stop
      </text>
    </svg>
  );
}

export function LiveCampusMap({
  routes,
  selectedRouteId,
  onSelectRoute,
  title,
  landmarkBadge,
  openFullRouteLabel,
  fallbackNotice,
}: LiveCampusMapProps) {
  const [mapError, setMapError] = useState(false);

  const activeRoute =
    routes.find((r) => r.id === selectedRouteId) ?? routes[0];
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? '';
  const canRenderGoogleMap = Boolean(apiKey) && !mapError;

  return (
    <section
      aria-label="Live campus route tracker"
      className="bg-light-surface border border-light-outline-variant rounded-2xl p-4 shadow-sm flex flex-col gap-3"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-blue-primary shrink-0" aria-hidden="true" />
          <span className="font-label text-xs font-semibold text-light-on-surface">
            {title}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-blue-soft text-blue-ink font-mono text-[11px] font-semibold">
          {activeRoute.walkTime}
        </span>
      </div>

      {/* Prominent Verified Science Building Pin Badge */}
      <div className="rounded-xl bg-amber-bg border border-amber-border/40 px-3 py-2 text-amber-text">
        <p className="font-body text-xs font-semibold leading-relaxed py-0.5">
          {landmarkBadge}
        </p>
      </div>

      {/* 3 Prominent Route Toggle Pills */}
      <div className="grid grid-cols-1 gap-2">
        {routes.map((route) => {
          const isSelected = route.id === activeRoute.id;
          return (
            <button
              key={route.id}
              type="button"
              onClick={() => onSelectRoute(route.id)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-blue-soft border-blue-primary text-blue-ink shadow-xs'
                  : 'bg-light-surface-container-low border-light-outline-variant text-light-on-surface-variant hover:border-blue-primary/40'
              }`}
            >
              <span className="font-body text-xs font-semibold leading-relaxed py-0.5">
                {route.label}
              </span>
              <span className="font-mono text-xs font-semibold shrink-0">
                {route.walkTime}
              </span>
            </button>
          );
        })}
      </div>

      {/* Walking Direction Hint Banner */}
      <div className="rounded-xl bg-blue-soft px-3 py-2.5 flex items-start gap-2.5">
        <Footprints className="w-[18px] h-[18px] text-blue-primary shrink-0 mt-0.5" aria-hidden="true" />
        <p className="font-body text-xs leading-relaxed text-light-on-surface py-0.5 text-pretty">
          {activeRoute.hintText}
        </p>
      </div>

      {/* Embedded Map Container (Google Maps Directions API or Fallback Schematic) */}
      <div className="relative h-56 rounded-xl border border-light-outline-variant bg-light-surface-container-low overflow-hidden">
        {canRenderGoogleMap ? (
          <APIProvider apiKey={apiKey} onError={() => setMapError(true)}>
            <Map
              defaultCenter={SCIENCE_BUILDING_COORDS}
              defaultZoom={16}
              gestureHandling="greedy"
              disableDefaultUI
              className="w-full h-full"
            >
              <Marker
                position={SCIENCE_BUILDING_COORDS}
                title="သိပ္ပံဆောင် (ကျောင်းသားရေးရာ နှင့် ဘဏ္ဍာရေးဌာန)"
              />
              <Marker
                position={ULB_COORDS}
                title="ULB အပေါ်ဆုံးထပ် (ကွန်ပျူတာသိပ္ပံပညာဌာန)"
              />
              <DirectionsOverlay
                route={activeRoute}
                onDirectionsError={() => setMapError(true)}
              />
            </Map>
          </APIProvider>
        ) : (
          <div className="relative w-full h-full">
            <CampusSchematicSvg selectedRouteId={activeRoute.id} />
            <span className="absolute bottom-2 left-2 right-2 text-center px-2 py-1 rounded-md bg-white/90 border border-light-outline-variant font-label text-[10px] font-medium text-light-on-surface-variant">
              {fallbackNotice}
            </span>
          </div>
        )}
      </div>

      {/* Open Full Route in Google Maps App Fallback Button */}
      <a
        href={activeRoute.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-light-inverse-surface text-light-inverse-on-surface font-body text-xs font-semibold hover:bg-slate-800 transition-colors"
      >
        <MapIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="py-0.5">{openFullRouteLabel}</span>
        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      </a>
    </section>
  );
}
