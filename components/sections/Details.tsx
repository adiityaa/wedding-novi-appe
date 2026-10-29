import { ChevronDown, MapPin } from "lucide-react";

interface DetailsProps {
  onNext: () => void;
}

export default function Details({ onNext }: DetailsProps) {
  return (
    <section className="details section-panel" aria-labelledby="details-title">
      <div className="details-inner">
        <div>
          <p className="eyebrow">Hari yang kami nantikan</p>
          {/* <h2 id="details-title">
            Meet us
            <br />
            <em>under the trees.</em>
          </h2> */}
          <div className="events">
            <article>
              <span>01</span>
              <div>
                <p className="event-type">Pemberkatan</p>
                <h3>09:00 — 11:30</h3>
                <p>
                  Gereja Kristen Jawa Purwodadi
                  <br />
                  Jl. Pemuda No.9, Purwodadi, Kec. Purwodadi, Kabupaten
                  Grobogan, Jawa Tengah 58111
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <p className="event-type">Resepsi</p>
                <h3>12:00 — selesai</h3>
                <p>
                  Pendopo Kendi Cinta
                  <br />
                  Jl. Piere Tendean No.27, Purwodadi, Kec. Purwodadi, Kabupaten
                  Grobogan, Jawa Tengah 58111
                </p>
              </div>
            </article>
          </div>
          <a
            className="directions"
            href="https://maps.app.goo.gl/uUkmDM1uc1AMxha58"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={16} /> buka lokasi
          </a>
        </div>
        <div className="map-card" aria-label="Map of the reception venue">
          <iframe
            title="GKJ Purwodadi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.349037540966!2d110.91423047508007!3d-7.085474792917507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70b065707bb329%3A0xf390a578fe69724d!2sGKJ%20Purwodadi%2C%20Grobogan%2C%20Jawa%20Tengah!5e0!3m2!1sen!2sid!4v1793239758467!5m2!1sen!2sid"
            loading="lazy"
          />
        </div>
      </div>
      <button className="next-cue" onClick={onNext} aria-label="Next section">
        <span>03</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
