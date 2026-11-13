import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function Closing() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="closing section-panel" aria-labelledby="closing-title">
      <div className="closing-inner">
        <h2 id="closing-title">
          Terima kasih
          <br />
          atas segala
          <br />
          doa baikmu
        </h2>
        <p className="names">Novi &amp; Appe</p>
      </div>

      <div className="credits">
        <p>Kan terus ku tulis, sampai nafas ini habis</p>
      </div>
      <span className="closing-span">Jalan Saja</span>

      <div className="closing-map" aria-label="Map of the reception venue">
        {isLoading && (
          <div className="map-loading">
            <LoaderCircle className="map-spinner" size={28} />
            <span>Memuat peta...</span>
            <div className="map-progress">
              <div className="map-progress-bar" />
            </div>
          </div>
        )}

        <iframe
          title="GKJ Purwodadi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.349037540966!2d110.91423047508007!3d-7.085474792917507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70b065707bb329%3A0xf390a578fe69724d!2sGKJ%20Purwodadi%2C%20Grobogan%2C%20Jawa%20Tengah!5e0!3m2!1sen!2sid!4v1793239758467!5m2!1sen!2sid"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </section>
  );
}
