import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface GalleryProps {
  galleryIndex: number;
  setGalleryIndex: (index: number) => void;
  onNext: () => void;
}

const FLIP = { duration: 0.8, ease: [0.645, 0.045, 0.355, 1] as const };
const INSTANT = { duration: 0 };

const pageVariants: Variants = {
  enter: (dir: number) =>
    dir > 0 ? { rotateY: 0, zIndex: 1 } : { rotateY: -100, zIndex: 3 },
  center: {
    rotateY: 0,
    zIndex: 2,
    transition: { rotateY: FLIP, zIndex: INSTANT },
  },
  exit: (dir: number) =>
    dir > 0
      ? {
          rotateY: -100,
          zIndex: 3,
          transition: { rotateY: FLIP, zIndex: INSTANT },
        }
      : {
          rotateY: 0,
          zIndex: 1,
          transition: { rotateY: FLIP, zIndex: INSTANT },
        },
};

const gallery = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xJ08Bq6MxsmJRDfvRsdndSfmJZgUT9.png",
    label: "Lorem ipsum",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Hz4qh8COocQI72q8VNu5acE65HdlbT.png",
    label: "dolor sitt",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tLrPXsVfwaPsfO8Cg6nt1dFf7iAFUJ.png",
    label: "amet consectetur",
  },
];

export default function Gallery({
  galleryIndex,
  setGalleryIndex,
  onNext,
}: GalleryProps) {
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setGalleryIndex((galleryIndex + 1) % gallery.length);
  };
  const prev = () => {
    setDirection(-1);
    setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length);
  };

  return (
    <section
      className="gallery-section section-panel"
      aria-labelledby="gallery-title"
    >
      <div className="gallery-inner">
        <div className="gallery-heading">
          <p className="eyebrow">Potongan kecil dari kami</p>
          <h2 id="gallery-title">
            Lorem Ipsum
            <br />
            <em>dolor.</em>
          </h2>
        </div>
        <div className="gallery-card">
          <div className="gallery-image-wrap">
            <motion.div
              className="gallery-image-animation"
              style={{ perspective: 1400 }}
              data-no-page-swipe
              onPanEnd={(_, info) => {
                if (info.offset.x < -50 || info.velocity.x < -400) next();
                else if (info.offset.x > 50 || info.velocity.x > 400) prev();
              }}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={galleryIndex}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={gallery[galleryIndex].src}
                    alt={gallery[galleryIndex].label}
                    fill
                    sizes="(max-width: 768px) 82vw, 440px"
                    className="gallery-image"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            {/* Navigation Buttons - Always Visible */}
            <button
              type="button"
              className="gallery-nav gallery-nav-prev"
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              className="gallery-nav gallery-nav-next"
              onClick={next}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
      <button className="next-cue" onClick={onNext} aria-label="Next section">
        <span>04</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
