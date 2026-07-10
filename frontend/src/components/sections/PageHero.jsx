import { motion } from "framer-motion";

export const PageHero = ({ overline, title, text, image }) => {
  return (
    <section
      data-testid="page-hero"
      className="relative pt-40 pb-20 md:pt-52 md:pb-28 overflow-hidden bg-zinc-900"
    >
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-zinc-900/30" />
        </>
      )}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-[#D62828]" />
          <span className="font-body text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-white/70">
            {overline}
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-extrabold text-white text-5xl md:text-7xl leading-[0.95] tracking-tighter max-w-4xl"
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-body text-white/80 text-lg mt-7 max-w-2xl leading-relaxed"
          >
            {text}
          </motion.p>
        )}
      </div>
    </section>
  );
};
