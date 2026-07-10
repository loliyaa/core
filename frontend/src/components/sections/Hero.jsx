import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HERO_SLIDES } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.12 },
  }),
};

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

  const next = useCallback(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next]);

  const slide = HERO_SLIDES[index];

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative h-[100svh] w-full overflow-hidden bg-zinc-900"
    >
      {/* Background image rotation */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 6.5, ease: "linear" } }}
          className="absolute inset-0"
        >
          <motion.img
            src={slide.image}
            alt=""
            style={{ y, scale }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col justify-end pb-20 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-10 bg-[#D62828]" />
              <span className="font-body text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-white">
                {slide.overline}
              </span>
            </motion.div>

            <h1 className="font-heading font-extrabold text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.92] tracking-tighter max-w-4xl">
              {slide.titleLines.map((line, i) => (
                <span className="mask-line" key={i}>
                  <motion.span
                    className="block"
                    custom={i}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="font-body text-white/85 text-base md:text-lg max-w-xl mt-7 leading-relaxed"
            >
              {slide.text}
            </motion.p>

            <motion.button
              data-testid="hero-cta-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToId(slide.ctaTarget)}
              className="group mt-9 inline-flex items-center gap-3 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold text-base px-8 py-4 rounded-full transition-colors"
            >
              {slide.cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex items-center gap-3 mt-12">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              data-testid={`hero-dot-${i}`}
              onClick={() => setIndex(i)}
              aria-label={`Aller à la diapositive ${i + 1}`}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i === index ? 48 : 20,
                background: i === index ? "#D62828" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-6 md:right-10 z-10 text-white/70 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] uppercase tracking-widest">Défiler</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
};
