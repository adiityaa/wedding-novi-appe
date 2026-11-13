"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Greeting from "@/pages/sections/Guest";
import Cover from "@/pages/sections/Cover";
import Story from "@/pages/sections/Story";
import Details from "@/pages/sections/Details";
import Gallery from "@/pages/sections/Gallery";
import Closing from "@/pages/sections/Closing";

const TOTAL = 6; // greeting, cover, story, details, gallery, closing

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

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const i = Math.max(0, Math.min(TOTAL - 1, index));
    sectionRef.current = i;
    scroller.scrollTo({ top: i * scroller.clientHeight, behavior: "smooth" });
  }, []);

  // Audio unlock on real user gestures
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

  // Mouse wheel = one section per gesture. Touch is left to native scroll-snap.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const moveOnePage = (direction: 1 | -1) => {
      if (gestureLockRef.current) return;
      gestureLockRef.current = true;
      scrollToIndex(sectionRef.current + direction);
      window.setTimeout(() => {
        gestureLockRef.current = false;
      }, 800);
    };

    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      const box = target?.closest<HTMLElement>("[data-no-page-swipe]");
      if (box) {
        const atTop = box.scrollTop <= 0;
        const atBottom =
          box.scrollTop + box.clientHeight >= box.scrollHeight - 1;
        // let the text scroll; only change section once it hits the end
        if (!((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)))
          return;
      }
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      moveOnePage(event.deltaY > 0 ? 1 : -1);
    };

    const onScroll = () => {
      sectionRef.current = Math.round(
        scroller.scrollTop / scroller.clientHeight,
      );
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [scrollToIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let timer: number | undefined;
    const realign = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const h = scroller.clientHeight;
        const target = Math.round(scroller.scrollTop / h) * h;
        if (Math.abs(scroller.scrollTop - target) > 2) {
          scroller.scrollTo({ top: target, behavior: "auto" });
        }
      }, 200);
    };

    window.addEventListener("resize", realign);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", realign);
    };
  }, []);

  const goTo = (index: number) => scrollToIndex(index);

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
        preload="auto"
        src="/backsound/hara.mp3"
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

      <Greeting ref={coverRef} onOpen={() => goTo(1)} />
      <Cover />
      <Story onNext={() => goTo(3)} />
      <Details onNext={() => goTo(4)} />
      <Gallery
        galleryIndex={galleryIndex}
        setGalleryIndex={setGalleryIndex}
        onNext={() => goTo(5)}
      />
      <Closing />
    </main>
  );
}
