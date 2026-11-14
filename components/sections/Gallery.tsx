"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LoaderCircle,
} from "lucide-react";

interface GalleryProps {
  galleryIndex: number;
  setGalleryIndex: (index: number) => void;
  onNext: () => void;
}

interface Photo {
  id: string;
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

const FLIP = {
  duration: 0.8,
  ease: [0.645, 0.045, 0.355, 1] as const,
};

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

export default function Gallery({
  galleryIndex,
  setGalleryIndex,
  onNext,
}: GalleryProps) {
  const [direction, setDirection] = useState(1);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [loadedPhotos, setLoadedPhotos] = useState<Set<string>>(new Set());
  const [failedPhotos, setFailedPhotos] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  // Fetch photos from Cloudinary API
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function loadGallery() {
      try {
        setIsGalleryLoading(true);
        setError(null);

        const response = await fetch("/api/gallery", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const data: { photos: Photo[] } = await response.json();

        // Preload all photos before displaying the gallery
        const results = await Promise.all(
          data.photos.map(
            (photo) =>
              new Promise<boolean>((resolve) => {
                const img = new window.Image();

                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);

                img.src = photo.url;
              }),
          ),
        );

        if (cancelled) return;

        setPhotos(data.photos);

        setFailedPhotos(
          new Set(
            data.photos
              .filter((_, index) => !results[index])
              .map((photo) => photo.id),
          ),
        );
      } catch (err) {
        if (cancelled) return;

        console.error("Gallery error:", err);
        setError("Failed to load gallery photos");
      } finally {
        if (!cancelled) {
          setIsGalleryLoading(false);
        }
      }
    }

    loadGallery();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  // Keep index within available photo range
  const currentIndex = photos.length > 0 ? galleryIndex % photos.length : 0;

  const currentPhoto = photos[currentIndex];

  const isImageLoading = !currentPhoto || !loadedPhotos.has(currentPhoto.id);

  const isImageFailed = currentPhoto && failedPhotos.has(currentPhoto.id);

  const next = () => {
    if (photos.length <= 1) return;

    setDirection(1);
    setGalleryIndex((currentIndex + 1) % photos.length);
  };

  const prev = () => {
    if (photos.length <= 1) return;

    setDirection(-1);
    setGalleryIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleImageLoad = (id: string) => {
    setLoadedPhotos((prev) => new Set(prev).add(id));
  };

  const handleImageError = (id: string) => {
    setFailedPhotos((prev) => new Set(prev).add(id));
  };

  return (
    <section
      className="gallery-section section-panel"
      aria-labelledby="gallery-title"
    >
      <div className="gallery-inner">
        <div className="gallery-heading">
          <p className="eyebrow">Cerita yang ditulis lensa</p>
          <h2 id="gallery-title">Jalan Saja &mdash;</h2>
        </div>

        <div className="gallery-card">
          <div className="gallery-image-wrap">
            {/* Loading Overlay */}
            {isGalleryLoading && !error && !error && !isImageFailed && (
              <div className="gallery-loading">
                <LoaderCircle className="gallery-spinner" size={28} />
                <span>Memuat foto...</span>

                <div className="gallery-progress">
                  <div className="gallery-progress-bar" />
                </div>
              </div>
            )}

            {/* Error / Empty State */}
            {error && (
              <div className="gallery-loading">
                <span>{error}</span>
              </div>
            )}

            {isImageFailed && (
              <div className="gallery-loading">
                <span>Foto gagal dimuat.</span>
              </div>
            )}

            {/* Gallery Animation */}
            {!isGalleryLoading && currentPhoto && (
              <motion.div
                className="gallery-image-animation"
                style={{ perspective: 1400 }}
                data-no-page-swipe
                onPanEnd={(_, info) => {
                  if (info.offset.x < -50 || info.velocity.x < -400) {
                    next();
                  } else if (info.offset.x > 50 || info.velocity.x > 400) {
                    prev();
                  }
                }}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentPhoto.id}
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
                      src={currentPhoto.url}
                      alt={`Gallery photo ${currentIndex + 1}`}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 82vw, 440px"
                      className="gallery-image"
                      onError={() => {
                        setFailedPhotos((prev) =>
                          new Set(prev).add(currentPhoto.id),
                        );
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {!isGalleryLoading && photos.length > 1 && (
              <>
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
              </>
            )}
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
