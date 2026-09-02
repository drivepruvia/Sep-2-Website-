import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { IOS_BETA_URL, ANDROID_BETA_URL } from "./betaLinks";
import "./taste.css";

type MobilePlatform = "ios" | "android" | null;
function detectMobilePlatform(): MobilePlatform {
  if (/android/i.test(navigator.userAgent)) return "android";
  const appleMobile = /iPad|iPhone|iPod/i.test(navigator.userAgent);
  const iPadDesktopMode = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return appleMobile || iPadDesktopMode ? "ios" : null;
}

export default function BetaPage() {
  const [detectedPlatform] = useState<MobilePlatform>(detectMobilePlatform);
  useEffect(() => {
    if (detectedPlatform === "ios") window.location.replace(IOS_BETA_URL);
    if (detectedPlatform === "android") window.location.replace(ANDROID_BETA_URL);
  }, [detectedPlatform]);
  return <div className="taste t-utility-page">
    <header className="t-nav t-wrap"><a href="/" aria-label="Pruvia home"><img className="t-logo" src="/pruvia-logo.png" alt="Pruvia" width="140" height="36" /></a><a className="t-nav-cta" href="/"><ArrowLeft size={17} /> Home</a></header>
    <main className="t-utility-main t-wrap"><section className="t-utility-card">
      <p className="t-eyebrow">Early access</p><h1>Try the Pruvia beta.</h1>
      <p className="t-utility-intro">The coaching app for parents teaching their teen to drive. Choose your device to start with the current beta.</p>
      {detectedPlatform && <p className="t-platform-status" role="status">We detected your {detectedPlatform === "ios" ? "Apple" : "Android"} device. Taking you to the beta&hellip;</p>}
      <div className="t-downloads"><a href={IOS_BETA_URL} className="t-download-link">Try on iPhone <ArrowUpRight size={18} /></a><a href={ANDROID_BETA_URL} className="t-download-link">Try on Android <ArrowUpRight size={18} /></a></div>
      <p className="t-utility-note">On iPhone, install TestFlight and follow the invitation to install Pruvia. On Android, follow the Google Play testing instructions. Mobile visitors are sent to the option for their device.</p>
    </section></main>
  </div>;
}
