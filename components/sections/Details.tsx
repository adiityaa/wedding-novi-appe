import { ChevronDown, MapPin } from "lucide-react";

interface DetailsProps {
  onNext: () => void;
}

export default function Details({ onNext }: DetailsProps) {
  return (
    <section className="details section-panel" aria-labelledby="details-title">
      <div className="details-inner">
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
                Jl. Pemuda No.9, Purwodadi, Kec. Purwodadi, Kabupaten Grobogan,
                Jawa Tengah 58111
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
      </div>
      <button className="next-cue" onClick={onNext} aria-label="Next section">
        <span>03</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
