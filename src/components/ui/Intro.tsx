import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useSite } from "../../hooks/useSite";

type IntroProps = {
  leaving: boolean;
  onReveal: () => void;
  onComplete: () => void;
};

const Intro = ({ leaving, onReveal, onComplete }: IntroProps) => {
  const site = useSite();
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (value) =>
    String(Math.round(value)).padStart(2, "0"),
  );

  useEffect(() => {
    const animation = animate(progress, 100, {
      duration: 1.2,
      ease: "easeInOut",
      onComplete: onReveal,
    });

    return () => animation.stop();
  }, [progress, onReveal]);

  return (
    <motion.div
      data-intro
      aria-hidden="true"
      initial={{ y: 0 }}
      animate={{ y: leaving ? "-100%" : 0 }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) onComplete();
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#000000] p-6 text-white sm:p-12"
    >
      <div className="flex justify-between text-xs uppercase tracking-[0.18em]">
        <span>Portfolio</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      <div className="font-display text-[clamp(3.5rem,14vw,11rem)] font-medium leading-[0.95] tracking-[-0.06em]">
        {site.name.split(" ").map((word, index) => (
          <span key={word + index} className="block overflow-hidden pb-2">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.65,
                delay: index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>

      <div className="flex items-end justify-between gap-4">
        <span className="text-sm">{site.role}</span>

        <motion.span className="font-display text-6xl leading-none tabular-nums sm:text-8xl">
          {counter}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Intro;