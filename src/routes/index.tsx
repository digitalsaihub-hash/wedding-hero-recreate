import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock3, Instagram, MapPin, Music, Share2, VolumeX, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const ASSETS = "/assets";
const entryCard = `${ASSETS}/entry-card.jpg`;
const footerCard = `${ASSETS}/footer-card.jpg`;
const heroPoster = `${ASSETS}/hero-poster.jpg`;
const ceremonyCornerUrl = `${ASSETS}/ceremony-corner.png`;
const cornerBlUrl = `${ASSETS}/corner-bl.png`;
const cornerBrUrl = `${ASSETS}/corner-br.png`;
const cornerTlUrl = `${ASSETS}/corner-tl.png`;
const cornerTrUrl = `${ASSETS}/corner-tr.png`;
const railBottomUrl = `${ASSETS}/rail-bottom.png`;
const railLeftUrl = `${ASSETS}/rail-left.png`;
const railRightUrl = `${ASSETS}/rail-right.png`;
const railTopUrl = `${ASSETS}/rail-top.png`;
const templeSceneryUrl = `${ASSETS}/temple-scenery.png`;
const countdownWallUrl = `${ASSETS}/countdown-wall.webp`;
const musicUrl = "/Kalyanam_Vibhogam.mp3";

const WEDDING_DATE = new Date("2026-10-26T00:00:00+05:30");

const pad2 = (value: number) => String(value).padStart(2, "0");

function useCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(WEDDING_DATE.getTime() - Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = Math.max(0, remaining ?? 0);
  return {
    days: remaining === null ? "--" : String(Math.floor(total / 86_400_000)),
    hours: remaining === null ? "--" : pad2(Math.floor(total / 3_600_000) % 24),
    minutes: remaining === null ? "--" : pad2(Math.floor(total / 60_000) % 60),
    seconds: remaining === null ? "--" : pad2(Math.floor(total / 1_000) % 60),
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vijay & Rashmika — Wedding Invitation" },
      {
        name: "description",
        content: "The wedding invitation of Vijay and Rashmika at ITC Mementos, Udaipur.",
      },
      { property: "og:title", content: "Vijay & Rashmika — Wedding Invitation" },
      {
        property: "og:description",
        content: "Join Vijay and Rashmika for their wedding celebration in Udaipur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingHero,
});

const splitName = (name: string) =>
  name.split("").map((character, index) => (
    <span className="hero-character" style={{ animationDelay: `${0.46 + index * 0.07}s` }} key={`${character}-${index}`}>
      {character}
    </span>
  ));

const borderTiles = (source: string, count: number) =>
  Array.from({ length: count }, (_, index) => <img src={source} alt="" key={index} />);

function BrandingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`branding-section ${isVisible ? "branding-section--visible" : ""}`}
      aria-labelledby="branding-title"
    >
      <div className="branding-card">
        <div className="branding-ornament" aria-hidden="true"><i /><span>◆</span><i /></div>
        <p className="branding-label branding-reveal">Captured by</p>
        <h2 id="branding-title" className="branding-name branding-reveal">Passion Photography</h2>
        <a className="branding-phone branding-reveal" href="tel:+919959990503">+91 99599 90503</a>
        <a
          className="branding-email branding-reveal"
          href="mailto:Passionphotography7878@gmail.com"
        >
          Passionphotography7878@gmail.com
        </a>

        <div className="branding-social branding-reveal">
          <a
            className="branding-social-link"
            href="https://www.instagram.com/passionphotography_in_kurnool"
            target="_blank"
            rel="noreferrer"
            aria-label="Passion Photography on Instagram"
          >
            <Instagram aria-hidden="true" /> <span>Instagram</span>
          </a>
          <span className="branding-social-divider" aria-hidden="true" />
          <a
            className="branding-social-link"
            href="https://www.youtube.com/@PassionPhotographyy"
            target="_blank"
            rel="noreferrer"
            aria-label="Passion Photography on YouTube"
          >
            <Youtube aria-hidden="true" /> <span>YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function WeddingHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const [coupleVisible, setCoupleVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const coupleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const video = videoRef.current;
    video?.play().catch(() => undefined);
    const timer = window.setTimeout(() => setCoverGone(true), 1250);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const section = coupleRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCoupleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const openInvitation = () => {
    if (!isOpen) setIsOpen(true);
  };

  return (
    <main className="wedding-experience">
      <section className={`wedding-hero ${isOpen ? "wedding-hero--revealed" : ""}`} aria-label="Wedding invitation hero">
        <video
          ref={videoRef}
          className="hero-procession"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-hidden="true"
        >
          <source src="/hero-procession.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" />

        <div className="hero-content">
          <p className="hero-invocation">|| Shree Ganeshay Namah ||</p>
          <h1 className="hero-name">{splitName("Vijay")}</h1>
          <p className="hero-ampersand">&amp;</p>
          <p className="hero-name">{splitName("Rashmika")}</p>
          <p className="hero-date">Monday, October 26, 2026</p>
          <p className="hero-venue">
            <span className="hero-at">at</span>{" "}
            <span className="hero-location">ITC Mementos, Udaipur, Rajasthan, India</span>
          </p>
        </div>
      </section>

      <section
        ref={coupleRef}
        className={`couple-section ${coupleVisible ? "couple-section--visible" : ""}`}
        aria-labelledby="couple-title"
      >
        <img className="couple-scenery" src={templeSceneryAsset.url} alt="" aria-hidden="true" />
        <div className="couple-frame" aria-hidden="true">
          <div className="couple-rail couple-rail--top">{borderTiles(railTopAsset.url, 16)}</div>
          <div className="couple-rail couple-rail--right">{borderTiles(railRightAsset.url, 14)}</div>
          <div className="couple-rail couple-rail--bottom">{borderTiles(railBottomAsset.url, 16)}</div>
          <div className="couple-rail couple-rail--left">{borderTiles(railLeftAsset.url, 14)}</div>
          <img className="couple-corner couple-corner--tl" src={cornerTlAsset.url} alt="" />
          <img className="couple-corner couple-corner--tr" src={cornerTrAsset.url} alt="" />
          <img className="couple-corner couple-corner--bl" src={cornerBlAsset.url} alt="" />
          <img className="couple-corner couple-corner--br" src={cornerBrAsset.url} alt="" />
        </div>
        <div className="couple-inner">
          <header className="couple-heading couple-reveal">
            <span className="couple-flourish" aria-hidden="true">◆</span>
            <h2 id="couple-title">The Couple</h2>
            <p>Two families, many blessings, one timeless celebration.</p>
          </header>

          <div className="couple-details">
            <article className="couple-person couple-person--groom couple-reveal">
              <p className="couple-role">The Groom</p>
              <h3>Vijay Deverakonda</h3>
              <span className="couple-relation">Son of</span>
              <p className="couple-parents">Deverakonda Govardhan Rao <span>&amp;</span> Deverakonda Madhavi</p>
            </article>

            <div className="couple-union couple-reveal" aria-hidden="true">
              <span className="couple-union-line" />
              <span className="couple-union-mark">&amp;</span>
              <span className="couple-union-line" />
            </div>

            <article className="couple-person couple-person--bride couple-reveal">
              <p className="couple-role">The Bride</p>
              <h3>Rashmika Mandanna</h3>
              <span className="couple-relation">Daughter of</span>
              <p className="couple-parents">Madan Mandanna <span>&amp;</span> Suman Mandanna</p>
            </article>
          </div>

          <div className="couple-closing couple-reveal" aria-hidden="true">
            <span />
            <i>शुभ विवाह</i>
            <span />
          </div>
        </div>
      </section>

      <CountdownSection />
      <AuspiciousHourSection />
      <VenueSection />
      <InvitationFooter />
      <BrandingSection />

      {!coverGone && (
        <div
          className={`invitation-cover ${isOpen ? "invitation-cover--opening" : ""}`}
          onClick={openInvitation}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") openInvitation();
          }}
          role="button"
          tabIndex={isOpen ? -1 : 0}
          aria-label="Open invitation"
        >
          <div className="cover-veil" />
          <div className="cover-card">
            <img className="cover-art" src={entryCard} alt="Traditional South Indian wedding illustration" />
            <div className="cover-bloom" />
            <div className="cover-content">
              <div className="cover-group">
                <p className="cover-label">The Wedding Of</p>
                <p className="cover-names">
                  <span>Vijay</span>
                  <span className="cover-amp"><i>&amp;</i></span>
                  <span>Rashmika</span>
                </p>
              </div>

              <div className="cover-group cover-meta">
                <p className="cover-date">26 October 2026</p>
                <p className="cover-city">ITC Mementos, Udaipur, Rajasthan, India</p>
              </div>

              <button className="cover-cta" type="button" onClick={openInvitation}>
                <span>Open Invitation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown();
  const cells = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <section className="countdown-section" aria-labelledby="countdown-title">
      <h2 id="countdown-title" className="countdown-sr">Our Muhurtham In</h2>
      <div className="countdown-wall" role="timer" aria-label="Countdown to the wedding">
        <img className="countdown-art" src={countdownWallAsset.url} alt="" aria-hidden="true" />
        <div className="countdown-cells">
          {cells.map((cell) => (
            <div className="countdown-cell" key={cell.label}>
              <span className="countdown-value">{cell.value}</span>
              <span className="countdown-label">{cell.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuspiciousHourSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`muhurtham-section ceremonial-section ${isVisible ? "ceremonial-section--visible" : ""}`}
      aria-labelledby="muhurtham-title"
    >
      <img className="muhurtham-art" src={ceremonyCornerAsset.url} alt="Traditional brass lamp, kalash and flowers" />
      <div className="muhurtham-content">
        <header className="ceremonial-heading ceremonial-reveal">
          <p>Auspicious Hour</p>
          <h2 id="muhurtham-title">Sumuhurtham</h2>
          <span className="ceremonial-divider" aria-hidden="true"><i />◆<i /></span>
        </header>

        <div className="muhurtham-timeline ceremonial-reveal">
          <span className="muhurtham-marker" aria-hidden="true"><i /></span>
          <article className="muhurtham-card">
            <span className="muhurtham-ribbon">Muhurtham</span>
            <h3>Sumuhurtham (Muhurtham)</h3>
            <p className="muhurtham-description">The sacred vows, followed by a traditional lunch.</p>
            <div className="muhurtham-meta">
              <p><CalendarDays aria-hidden="true" /> Monday, 26th October 2026</p>
              <p><Clock3 aria-hidden="true" /> At the auspicious hour</p>
              <p><MapPin aria-hidden="true" /> ITC Mementos · Udaipur</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function VenueSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mapsUrl = "https://maps.google.com/?q=ITC+Mementos+Udaipur+Rajasthan+India";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const shareLocation = async () => {
    const shareData = { title: "Vijay & Rashmika's Wedding Venue", text: "ITC Mementos, Udaipur, Rajasthan, India", url: mapsUrl };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(mapsUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      return;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`venue-section ceremonial-section ${isVisible ? "ceremonial-section--visible" : ""}`}
      aria-labelledby="venue-title"
    >
      <div className="venue-inner">
        <header className="ceremonial-heading ceremonial-reveal">
          <p>The Venue</p>
          <h2 id="venue-title">ITC Mementos</h2>
          <span className="ceremonial-divider" aria-hidden="true"><i />◆<i /></span>
          <address>Udaipur, Rajasthan, India</address>
        </header>

        <div className="venue-map ceremonial-reveal">
          <iframe
            title="Map showing ITC Mementos in Udaipur"
            src="https://www.google.com/maps?q=ITC%20Mementos%20Udaipur%20Rajasthan%20India&output=embed"
            width="100%"
            height="320"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="venue-actions ceremonial-reveal">
          <Button asChild variant="outline" className="venue-button venue-button--outline">
            <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /> Open in maps</a>
          </Button>
          <Button className="venue-button venue-button--solid" onClick={shareLocation}>
            <Share2 aria-hidden="true" /> {copied ? "Location copied" : "Share location"}
          </Button>
        </div>
      </div>
    </section>
  );
}

function InvitationFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className={`invitation-footer ${isVisible ? "invitation-footer--visible" : ""}`}>
      <div className="footer-card">
        <img className="footer-art" src={footerCard} alt="Traditional wedding ceremony at a South Indian temple" loading="lazy" />

        <div className="footer-greeting">
          <p className="footer-lead footer-reveal">We await your gracious presence</p>
          <p className="footer-blessings footer-reveal">and your blessings</p>
          <p className="footer-telugu footer-reveal">శుభమస్తు</p>

          <div className="footer-hosts footer-reveal" aria-label="Invited by Pathange Swetha and Pathange Venkatesh">
            <span className="footer-hosts-label">Invited by</span>
            <span className="footer-hosts-name">Pathange Swetha</span>
            <span className="footer-hosts-join">and</span>
            <span className="footer-hosts-name">Pathange Venkatesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
