import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

import { useSite } from "../../hooks/useSite";
import Button from "../ui/Button";

const content: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Hero = () => {
  const site = useSite();
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="flex relative mt-24 mb-20 grid w-full items-center gap-10 overflow-hidden py-30 lg:gap-12"
    >
      <motion.div
        variants={content}
        initial={reduce ? false : "hidden"}
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center gap-4"
      >
        <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-black lg:text-7xl">
          <span className="block overflow-hidden pb-2 text-center">
            <motion.span variants={item} className="block">
              {site.name}
            </motion.span>
          </span>

          <span className="mt-1 block overflow-hidden pb-2 text-4xl font-medium text-primary lg:text-6xl">
            <motion.span variants={item} className="block">
              {site.role}
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={item}
          className="text-base text-muted md:text-lg"
        >
          {site.littleDesc}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-2">
          <Button arrow link="#projects" variant="blue">
            {site.buttons.projectBtn}
          </Button>

          <Button arrow link="#contact" variant="outline">
            {site.buttons.contactBtn}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reduce ? 0 : 0.9,
          delay: reduce ? 0 : 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10"
      >
      </motion.div>
    </section>
  );
};

export default Hero;