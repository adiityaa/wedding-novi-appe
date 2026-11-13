"use client";

import { ChevronDown } from "lucide-react";

interface StoryProps {
  onNext: () => void;
}

const storyContent = `
Circa 2014, kami dipertemukan oleh sebuah sekolah menengah kejuruan—padahal tempat tinggal kami sangat berdekatan. Dari situ kami mulai menyadari keberadaan satu sama lain. Kemudian rasa kami bertumbuh di sebuah organisasi yang dibentuk pada zaman orde lama.

Di tahun yang sama, entah kapan tepatnya, kami sepertinya mulai menjalin hubungan yang lebih dari kakak kelas dan adik kelas. “Teman dekat?” Sepertinya lebih. “Sahabat? Bestie?”  Hmmm sepertinya juga lebih. “Pacar?” Mungkin, kami pun kurang tahu.

Awal 2016 kami menjalin hubungan jarak jauh. Beda kota. Tidak hanya beda kota, tapi juga beda selera. Mulai dari makanan, hiburan, hingga keyakinan. Semua berbeda.

“Tidak jadi masalah?” Ya pasti masalah.
Tapi selama masih seru dan menyenangkan, kami jalani saja prosesnya. Saking serunya, sampai sekarang sudah tahun ke-11 kurang lebih kami gedebag-gedebug, heboh sendiri.

Kata teman-teman, “Ngapain sampai 11 tahun pacaran?”
Ya ngapa-ngapain lah, masak nggak ngapa-ngapain. Selama ini kami berproses. Mulai mengusahakan kehidupan yang kami anggap ideal, hingga berusaha berdamai dengan masa lalu yang penuh kubangan.

Desember 2025—yang dulu berbeda kini mulai seirama. Gereja sedikit banyak ikut andil. Kami sudah mantap dengan keputusan yang kami ambil—kami lamaran. Sederhana, tanpa dekorasi dan hiasan warna-warni, cukup orang tua serta doa yang ikut mengiringi.

18 Januari 2027—hari Senin—kami akan mengucapkan janji untuk saling memiliki dan menjaga, dari sekarang sampai selama-lamanya. Pada waktu susah maupun senang, pada waktu kelimpahan maupun kekurangan, pada waktu sehat maupun sakit, untuk saling mengasihi dan menghargai, sampai maut memisahkan kami.

Terima kasih untuk orang tua, saudara, keluarga, dan sahabat yang telah menemani dan menjadi support sistem yang luar biasa menyenangkan. Terima kasih atas doa baik kalian.



`;

export default function Story({ onNext }: StoryProps) {
  return (
    <section className="story section-panel" aria-labelledby="story-title">
      <div className="story-inner">
        <span className="story-signature">Jalan Saja</span>
        <div className="story-scroll" data-no-page-swipe>
          <p className="story-credits-text">{storyContent}</p>
        </div>
      </div>
      <button className="next-cue" onClick={onNext} aria-label="Next section">
        <span>02</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
