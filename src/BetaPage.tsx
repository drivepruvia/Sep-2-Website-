import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const IOS_BETA_URL = "https://testflight.apple.com/join/wuSQw4rt";
const ANDROID_BETA_URL =
  "https://play.google.com/apps/internaltest/4701602666101202468";

type MobilePlatform = "ios" | "android" | null;

function detectMobilePlatform(): MobilePlatform {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) return "android";

  const isAppleMobile = /iPad|iPhone|iPod/i.test(userAgent);
  const isIPadDesktopMode =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return isAppleMobile || isIPadDesktopMode ? "ios" : null;
}

export default function BetaPage() {
  const [detectedPlatform] = useState<MobilePlatform>(detectMobilePlatform);

  useEffect(() => {
    if (detectedPlatform === "ios") window.location.replace(IOS_BETA_URL);
    if (detectedPlatform === "android") window.location.replace(ANDROID_BETA_URL);
  }, [detectedPlatform]);

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground flex items-center justify-center">
      <div className="w-full max-w-2xl text-center">
        <section className="rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-soft)] sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <img
              src="/favicon.png"
              alt="Pruvia app icon"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl">Get the Drive Pruvia beta</h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Test the latest Drive Pruvia experience and help us build calmer, more
            structured driving practice for families.
          </p>

          {detectedPlatform && (
            <p className="mt-5 text-sm font-medium text-accent" role="status">
              We detected your {detectedPlatform === "ios" ? "Apple" : "Android"} device. Taking you to the beta&hellip;
            </p>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={IOS_BETA_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Download for iOS <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={ANDROID_BETA_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Download for Android <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Mobile visitors are sent automatically to the beta for their device.
            If the redirect does not open, choose an option above.
          </p>
        </section>
      </div>
    </main>
  );
}
