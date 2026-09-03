import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import entryCard from "../assets/kalyana-mandapam/entry-card.jpg";

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

function WeddingHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const video = videoRef.current;
    video?.play().catch(() => undefined);
    const timer = window.setTimeout(() => setCoverGone(true), 1250);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

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