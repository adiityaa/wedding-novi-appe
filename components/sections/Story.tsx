import { ChevronDown } from "lucide-react";

interface StoryProps {
  onNext: () => void;
}

export default function Story({ onNext }: StoryProps) {
  return (
    <section className="story section-panel" aria-labelledby="story-title">
      <div className="story-inner">
        <p className="eyebrow">Kisah Novi &amp; Appe</p>
        {/* <h2 id="story-title">
          Somewhere between
          <br />
          <em>here &amp; forever.</em>
        </h2> */}
        <div className="story-columns">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            voluptatem voluptates sit iste dolore aut quis, optio ipsum
            asperiores, veritatis vitae harum sunt dignissimos perferendis.
            Provident velit distinctio asperiores, molestias sint aperiam nemo.
            Nam repudiandae dicta, dolor ab tenetur maiores officiis laudantium
            quod quisquam id dolorem eius rem porro minus, dignissimos explicabo
            voluptatibus ut nisi consequuntur quasi illo saepe nobis esse
            molestias. Unde architecto quis nostrum saepe animi, nihil quibusdam
            nemo perferendis dignissimos laborum.
          </p>
        </div>
        <span className="story-signature">N &amp; A</span>
      </div>
      <button className="next-cue" onClick={onNext} aria-label="Next section">
        <span>02</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
