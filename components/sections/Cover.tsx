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
        quality={75}
        sizes="100vw"
        className="cover-image"
      />
    </section>
  );
}
