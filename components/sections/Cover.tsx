import Image from "next/image";

export const coverImage = "/images/cover.jpeg";

export default function Cover() {
  return (
    <section
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
    </section>
  );
}
