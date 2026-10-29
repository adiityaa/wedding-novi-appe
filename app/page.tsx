"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Cover from "@/components/sections/Cover";
import Story from "@/components/sections/Story";
import Details from "@/components/sections/Details";
import Gallery from "@/components/sections/Gallery";
import Closing from "@/components/sections/Closing";

export default function Page() {
  const scrollerRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const sectionRef = useRef(0);
  const gestureLockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = ["pointerdown", "click", "touchend", "keydown"] as const;

    const unlock = () => {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setStarted(true);
          setMuted(false);
          events.forEach((e) => window.removeEventListener(e, unlock));
        })
        .catch(() => {
          audio.muted = true; // try again on the next gesture
        });
    };

    events.forEach((e) =>
      window.addEventListener(e, unlock, { passive: true }),
    );

    const scroller = scrollerRef.current;
    const revealControls = () => setShowControls(true);
    scroller?.addEventListener("scroll", revealControls, { once: true });

    return () => {
      events.forEach((e) => window.removeEventListener(e, unlock));
      scroller?.removeEventListener("scroll", revealControls);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const moveOnePage = (direction: 1 | -1) => {
      if (gestureLockRef.current) return;
      const nextIndex = Math.max(
        0,
        Math.min(4, sectionRef.current + direction),
      );
      if (nextIndex === sectionRef.current) return;
      gestureLockRef.current = true;
      sectionRef.current = nextIndex;
      scroller
        .querySelectorAll<HTMLElement>(".section-panel")
        [nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        gestureLockRef.current = false;
      }, 700);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      moveOnePage(event.deltaY > 0 ? 1 : -1);
    };
    const onTouchStart = (event: TouchEvent) => {
      const target = event.target as HTMLElement | null;
      touchStartYRef.current = target?.closest("[data-no-page-swipe]")
        ? null
        : (event.touches[0]?.clientY ?? null);
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const distance =
        touchStartYRef.current -
        (event.changedTouches[0]?.clientY ?? touchStartYRef.current);
      touchStartYRef.current = null;
      if (Math.abs(distance) > 35) moveOnePage(distance > 0 ? 1 : -1);
    };

    const onScroll = () => {
      if (!gestureLockRef.current)
        sectionRef.current = Math.round(
          scroller.scrollTop / scroller.clientHeight,
        );
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchend", onTouchEnd, { passive: true });
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchend", onTouchEnd);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (index: number) => {
    sectionRef.current = index;
    scrollerRef.current
      ?.querySelectorAll<HTMLElement>(".section-panel")
      [index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => undefined);
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <main ref={scrollerRef} className="invitation-scroll">
      <audio
        ref={audioRef}
        loop
        muted
        preload="metadata"
        src="/backsound/diakhirperang-nadineamizah.mp3"
        aria-label="Background music"
      />
      {showControls && (
        <button
          className="audio-toggle"
          aria-label={muted ? "Turn music on" : "Mute music"}
          onClick={toggleAudio}
        >
          {muted ? (
            <VolumeX size={16} strokeWidth={1.5} />
          ) : (
            <Volume2 size={16} strokeWidth={1.5} />
          )}
        </button>
      )}

      <Cover ref={coverRef} onOpen={() => goTo(1)} />
      <Story onNext={() => goTo(2)} />
      <Details onNext={() => goTo(3)} />
      <Gallery
        galleryIndex={galleryIndex}
        setGalleryIndex={setGalleryIndex}
        onNext={() => goTo(4)}
      />
      <Closing />
    </main>
  );
}
