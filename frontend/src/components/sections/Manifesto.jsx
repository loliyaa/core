import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MANIFESTO } from "@/data/content";

export const Manifesto = () => {
  return (
    <section
      data-testid="manifesto-section"
      className="bg-[#18181B] py-24 md:py-36 text-white"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#D62828]" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-white/60">
              Notre manifeste
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
            Quatre convictions qui guident chacune de nos actions.
          </h2>
        </motion.div>

        <div className="border-t border-white/15">
          {MANIFESTO.map((m, i) => (
            <motion.div
              key={m.n}
              data-testid={`manifesto-row-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group border-b border-white/15 py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start cursor-default transition-colors hover:bg-white/[0.03] px-2 md:px-4 -mx-2 md:-mx-4"
            >
              <div className="md:col-span-2 font-heading font-black text-4xl md:text-5xl text-white/25 group-hover:text-[#D62828] transition-colors">
                {m.n}
              </div>
              <h3 className="md:col-span-4 font-heading font-bold text-2xl md:text-3xl tracking-tight">
                {m.title}
              </h3>
              <p className="md:col-span-5 font-body text-white/60 text-base md:text-lg leading-relaxed">
                {m.text}
              </p>
              <div className="md:col-span-1 hidden md:flex justify-end">
                <ArrowRight className="h-6 w-6 text-white/0 group-hover:text-[#D62828] -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
