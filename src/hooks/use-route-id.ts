"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { STATIC_FALLBACK_ID } from "@/lib/staticParams";
import { getRouteParam } from "@/lib/utils";

function getIdFromPathname(segment: string): string | undefined {
  if (typeof window === "undefined") return undefined;

  const parts = window.location.pathname.split("/").filter(Boolean);
  const idx = parts.indexOf(segment);
  if (idx === -1 || idx >= parts.length - 1) return undefined;

  return decodeURIComponent(parts[idx + 1]);
}

function resolveRouteId(
  segments: string[],
  paramValue: string | undefined,
): string | undefined {
  if (paramValue && paramValue !== STATIC_FALLBACK_ID) {
    return paramValue;
  }

  for (const segment of segments) {
    const fromPath = getIdFromPathname(segment);
    if (fromPath && fromPath !== STATIC_FALLBACK_ID) {
      return fromPath;
    }
  }

  return undefined;
}

export function useRouteId(segment: string | string[], paramKey = "id") {
  const params = useParams();
  const segmentKey = Array.isArray(segment) ? segment.join("|") : segment;
  const segments = segmentKey.split("|");
  const paramValue = getRouteParam(params[paramKey]);

  const [id, setId] = useState<string | undefined>(() =>
    resolveRouteId(segments, paramValue),
  );

  useEffect(() => {
    setId(resolveRouteId(segments, getRouteParam(params[paramKey])));
  }, [params, paramKey, segmentKey]);

  return id;
}
