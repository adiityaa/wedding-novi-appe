import { useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface GalleryProps {
  galleryIndex: number;
  setGalleryIndex: (index: number) => void;
  onNext: () => void;
}

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
  const next = () => setGalleryIndex((galleryIndex + 1) % gallery.length);
  const prev = () =>
    setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length);

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
          <AnimatePresence mode="wait">
            <motion.div
              key={galleryIndex}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45 }}
              className="gallery-image-wrap"
              data-no-page-swipe
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 || info.velocity.x < -400) next();
                else if (info.offset.x > 50 || info.velocity.x > 400) prev();
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
          <div className="gallery-meta">
            <span>
              0{galleryIndex + 1} / 0{gallery.length}
            </span>
            <p>{gallery[galleryIndex].label}</p>
            <div className="gallery-controls">
              <button
                aria-label="Previous photo"
                onClick={() =>
                  setGalleryIndex(
                    (galleryIndex - 1 + gallery.length) % gallery.length,
                  )
                }
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Next photo"
                onClick={() =>
                  setGalleryIndex((galleryIndex + 1) % gallery.length)
                }
              >
                <ChevronRight size={18} />
              </button>
            </div>
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
