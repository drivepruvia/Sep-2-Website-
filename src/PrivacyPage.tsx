import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './taste.css';

export default function PrivacyPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    document.title = 'Pruvia Privacy Policy';
    canonical?.setAttribute('href', 'https://www.drivepruvia.com/privacy');
    return () => {
      document.title = previousTitle;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, []);

  return <div className="taste t-policy-page">
    <a href="#policy-content" className="t-skip">Skip to content</a>
    <header className="t-nav t-wrap">
      <a href="/" aria-label="Pruvia home"><img className="t-logo" src="/pruvia-logo.png" alt="Pruvia" width="140" height="36" /></a>
      <a className="t-nav-cta" href="/"><ArrowLeft size={17} /> Home</a>
    </header>

    <main id="policy-content" className="t-policy-main t-wrap">
      <header className="t-policy-heading">
        <p className="t-eyebrow">Privacy · Beta 1</p>
        <h1>Pruvia Privacy Policy</h1>
        <p className="t-policy-date">Last updated: September 2, 2026.</p>
        <p className="t-policy-lead">This Privacy Policy explains the data practices of the current Pruvia Beta 1 Android app. It does not describe or promise the data practices of future versions of Pruvia.</p>
      </header>

      <div className="t-policy-body">
        <section aria-labelledby="policy-scope">
          <h2 id="policy-scope">About Pruvia Beta 1</h2>
          <p>Pruvia is intended to assist parents and teen drivers with driving education and supervised practice. Pruvia is not affiliated with or endorsed by any Department of Motor Vehicles, other motor vehicle agency, or government agency.</p>
        </section>

        <section aria-labelledby="information-we-collect">
          <p className="t-policy-number">01</p><h2 id="information-we-collect">Information We Collect</h2>
          <p>Pruvia Beta 1 does not require an account. The app does not ask for or collect names, email addresses, phone numbers, account credentials, or other directly identifying information.</p>
          <p>The current app does not collect location, driving routes, driving speed, contacts, photos, microphone recordings, or advertising identifiers. Lesson and exercise selections may exist temporarily in the app's memory while it is running, but Beta 1 does not save that information after the app session or send it to Pruvia.</p>
        </section>

        <section aria-labelledby="device-sensor-data">
          <p className="t-policy-number">02</p><h2 id="device-sensor-data">Device and Sensor Data</h2>
          <p>Our review of the released Beta 1 Android code and package found no use of the accelerometer, gyroscope, DeviceMotion, GPS, or other motion or location sensor APIs. Beta 1 therefore does not access, store, or transmit accelerometer readings, gyroscope readings, location data, or other driving telemetry.</p>
          <p>The Android package includes standard Expo and React Native runtime components, but the current Pruvia application code does not use those components to collect or transmit sensor data. Future driving exercises may use device sensors; if they do, this policy will be updated before those practices are represented here as current.</p>
        </section>

        <section aria-labelledby="how-we-use-information">
          <p className="t-policy-number">03</p><h2 id="how-we-use-information">How We Use Information</h2>
          <p>Because Beta 1 does not collect personal information or driving telemetry, Pruvia does not use that information for profiling, advertising, analytics, or automated decisions. The app processes only the temporary on-screen state needed to present its lessons and driving exercise experience during the active session.</p>
        </section>

        <section aria-labelledby="data-sharing">
          <p className="t-policy-number">04</p><h2 id="data-sharing">Data Sharing</h2>
          <p>Pruvia Beta 1 does not include advertising SDKs, analytics SDKs, crash-reporting SDKs, or tracking technologies. We do not sell or share personal information for advertising. Because the current app does not transmit personal information or driving telemetry to Pruvia, there is no such app data for us to disclose to third parties.</p>
          <p>If you choose to leave the app by following an external link, the destination's own privacy practices apply.</p>
        </section>

        <section aria-labelledby="data-retention">
          <p className="t-policy-number">05</p><h2 id="data-retention">Data Retention</h2>
          <p>Beta 1 does not retain personal information, sensor readings, location data, or driving telemetry. Temporary lesson and exercise state is not designed to persist after the active app session ends.</p>
        </section>

        <section aria-labelledby="childrens-privacy">
          <p className="t-policy-number">06</p><h2 id="childrens-privacy">Children's Privacy</h2>
          <p>Pruvia is designed for families engaged in supervised driving education, including parents and teen drivers. Beta 1 does not require an account or collect personal information from children or other users. A parent or legal guardian should supervise a minor's use of the app and all driving practice.</p>
        </section>

        <section aria-labelledby="security">
          <p className="t-policy-number">07</p><h2 id="security">Security</h2>
          <p>Beta 1 limits privacy risk by not collecting or transmitting personal information or driving telemetry. No method of operating software is entirely risk-free, and users should keep their device and operating system protected and up to date.</p>
        </section>

        <section aria-labelledby="policy-changes">
          <p className="t-policy-number">08</p><h2 id="policy-changes">Changes to This Privacy Policy</h2>
          <p>We may update this policy as Pruvia introduces new features or its data practices change. Future versions may not have the same data practices as Beta 1. We will revise the “Last updated” date and describe the practices applicable to the version covered by the updated policy.</p>
        </section>

        <section aria-labelledby="contact-us">
          <p className="t-policy-number">09</p><h2 id="contact-us">Contact Us</h2>
          <p>Questions about this Privacy Policy or Pruvia's privacy practices can be sent to:</p>
          <a className="t-policy-contact" href="mailto:hello@drivepruvia.com">hello@drivepruvia.com <ArrowUpRight size={18} /></a>
        </section>
      </div>
    </main>

    <footer className="t-footer t-wrap">
      <div className="t-footer-grid">
        <div className="t-footer-brand"><a href="/" aria-label="Pruvia home"><img className="t-logo" src="/pruvia-logo.png" alt="Pruvia" width="140" height="36" /></a><p>Better practice. Together.</p></div>
        <nav className="t-footer-pages" aria-label="Footer navigation"><h2>Explore</h2><a href="/#features">How it works</a><a href="/#curriculum">Curriculum</a><a href="/#about">Why Pruvia</a><a href="/#faq">FAQ</a></nav>
        <div className="t-footer-contact"><h2>Get in touch</h2><a href="mailto:hello@drivepruvia.com">hello@drivepruvia.com <ArrowUpRight size={16} /></a><a href="/book/website">Book a call <ArrowUpRight size={16} /></a></div>
      </div>
      <div className="t-footer-bottom"><span>© {new Date().getFullYear()} Pruvia Inc. All rights reserved.</span><a href="/privacy" aria-current="page">Privacy</a></div>
    </footer>
  </div>;
}
