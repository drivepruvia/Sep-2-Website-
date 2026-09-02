import { randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";

const DEFAULT_BOOKING_URL =
  "https://outlook.office.com/book/TeenDriverParentDicoveryInterviews@gtvault.onmicrosoft.com/?ismsaljsauthenabled";
const SOURCE_PATTERN = /^[a-z0-9][a-z0-9_-]{0,49}$/;

export function normalizeSource(value) {
  const source = String(value || "").trim().toLowerCase();
  return SOURCE_PATTERN.test(source) ? source : "unknown";
}

export function getCampaign(query) {
  return {
    campaign: query.get("utm_campaign"),
    content: query.get("utm_content"),
    medium: query.get("utm_medium"),
    source: query.get("utm_source"),
    term: query.get("utm_term"),
  };
}

export function getCoarseGeo(geo) {
  if (!geo) return null;

  return {
    city: geo.city || null,
    country: geo.country?.code || null,
    subdivision: geo.subdivision?.code || null,
    timezone: geo.timezone || null,
  };
}

export default async function handler(request, context) {
  const destination = process.env.BOOKING_URL || DEFAULT_BOOKING_URL;
  const url = new URL(request.url);
  const source = normalizeSource(url.searchParams.get("source"));
  const timestamp = new Date().toISOString();
  const eventId = randomUUID();
  const userAgent = request.headers.get("user-agent");

  const scan = {
    id: eventId,
    source,
    scannedAt: timestamp,
    campaign: getCampaign(url.searchParams),
    referrer: request.headers.get("referer"),
    userAgent,
    isLikelyBot: /bot|crawler|spider|preview|headless/i.test(userAgent || ""),
    geo: getCoarseGeo(context.geo),
    requestId: context.requestId || request.headers.get("x-nf-request-id"),
  };

  try {
    const store = getStore("booking-scans");
    const day = timestamp.slice(0, 10);
    await store.setJSON(`${day}/${source}/${eventId}`, scan);
  } catch (error) {
    // A tracking outage must never prevent someone from booking.
    console.error("Could not store booking scan", {
      eventId,
      source,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      "Cache-Control": "no-store",
      Location: destination,
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
