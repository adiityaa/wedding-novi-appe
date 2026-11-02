"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { forwardRef } from "react";

type GreetingProps = { onOpen?: () => void };

const Greeting = forwardRef<HTMLDivElement, GreetingProps>(
  ({ onOpen }, ref) => {
    return (
      <section
        className="greeting section-panel"
        aria-labelledby="greeting-title"
      >
        <motion.div
          className="greeting-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="eyebrow">Dengan penuh syukur</p>
          <h2 id="greeting-title">
            Dear,
            <br />
          </h2>
          <h2 className="greeting-guest">
            <em>Tamu Undangan</em>
          </h2>
          <span className="greeting-rule" aria-hidden="true" />
          <p className="greeting-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            corrupti delectus officiis soluta sunt consequuntur molestiae autem
            quisquam libero odio mollitia animi dolorum nihil odit ratione, ipsa
            consequatur ullam voluptas.
          </p>
        </motion.div>

        <button
          className="cover-arrow"
          onClick={onOpen}
          aria-label="Next section"
        >
          <ChevronDown size={25} />
        </button>
      </section>
    );
  },
);

Greeting.displayName = "Greeting";

export default Greeting;
