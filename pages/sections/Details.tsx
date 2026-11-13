import { ChevronDown } from "lucide-react";

interface DetailsProps {
  onNext: () => void;
}

export default function Details({ onNext }: DetailsProps) {
  return (
    <section className="details section-panel" aria-labelledby="details-title">
      <div className="details-inner">
        <p className="eyebrow">Hari Bahagia</p>
        <h3 className="text-5xl">Senin,</h3>
        <h3 className="text-4xl">18 Januari 2027</h3>
        <div className="events">
          <article>
            <div>
              <p className="event-type">Pemberkatan</p>
              <h3>09:00 — 11:00 WIB</h3>
              <p className="text-bold">Gereja Kristen Jawa Purwodadi</p>
              <p>
                Jl. Pemuda No.9, Purwodadi, Kec. Purwodadi, Kabupaten Grobogan,
                Jawa Tengah
              </p>
            </div>
          </article>
          <article>
            <div>
              <p className="event-type">Resepsi</p>
              <h3>11:00 — 15.00 WIB</h3>
              <p className="text-bold">Pendopo Kendi Cinta</p>
              <p>
                Jl. Piere Tendean No.27, Purwodadi, Kec. Purwodadi, Kabupaten
                Grobogan, Jawa Tengah
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
