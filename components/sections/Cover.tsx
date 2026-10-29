import { forwardRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export const coverImage =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nPq5rivzWLNm6xAt2aVdiIqkoYAMGE.png";

type CoverProps = { onOpen?: () => void };

const Cover = forwardRef<HTMLDivElement, CoverProps>(({ onOpen }, ref) => {
  return (
    <section
      ref={ref}
      className="cover section-panel"
      aria-label="Wedding invitation cover"
    >
      <Image
        src={coverImage}
        alt="Appe and Novi in white, holding a flower bouquet"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 720px"
        className="cover-image"
      />
      <div className="cover-wash" />

      <button
        className="cover-arrow"
        onClick={onOpen}
        aria-label="Next section"
      >
        <ChevronDown size={25} />
      </button>
    </section>
  );
});

Cover.displayName = "Cover";

export default Cover;
