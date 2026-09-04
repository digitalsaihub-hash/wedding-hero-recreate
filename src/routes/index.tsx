import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import entryCard from "../assets/kalyana-mandapam/entry-card.jpg";
import heroPoster from "../assets/kalyana-mandapam/hero-poster.jpg";
import cornerBlAsset from "../assets/couple-frame/corner-bl.png.asset.json";
import cornerBrAsset from "../assets/couple-frame/corner-br.png.asset.json";
import cornerTlAsset from "../assets/couple-frame/corner-tl.png.asset.json";
import cornerTrAsset from "../assets/couple-frame/corner-tr.png.asset.json";
import railBottomAsset from "../assets/couple-frame/rail-bottom.png.asset.json";
import railLeftAsset from "../assets/couple-frame/rail-left.png.asset.json";
import railRightAsset from "../assets/couple-frame/rail-right.png.asset.json";
import railTopAsset from "../assets/couple-frame/rail-top.png.asset.json";
import templeSceneryAsset from "../assets/couple-frame/temple-scenery.png.asset.json";

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
          <div className="couple-rail couple-rail--top">{borderTiles(railTopAsset.url, 1)}</div>
          <div className="couple-rail couple-rail--right">{borderTiles(railRightAsset.url, 14)}</div>
          <div className="couple-rail couple-rail--bottom">{borderTiles(railBottomAsset.url, 1)}</div>
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