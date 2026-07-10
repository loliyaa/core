import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { STATS } from "@/data/content";

const CountUp = ({ value, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");
  const target = parseFloat(value);
  const decimals = value.includes(".") ? 1 : 0;

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1800;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((eased * target).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-[#D62828]">{suffix}</span>
    </span>
  );
};

export const Impact = () => {
  return (
    <section
      id="impact"
      data-testid="impact-section"
      className="bg-[#F4F4F5] py-24 md:py-36"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#D62828]" />
              <span className="font-body text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-zinc-500">
                Notre impact
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-zinc-900 max-w-3xl">
              La confiance se mesure. Voici la nôtre, en chiffres.
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14 border-t border-zinc-300 pt-14">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              data-testid={`stat-card-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <p className="font-heading font-black text-zinc-900 text-7xl md:text-8xl lg:text-[7rem] leading-none tracking-tighter">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="font-body text-zinc-600 text-base md:text-lg mt-5 max-w-xs leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Transparency = () => {
  return (
    <section
      id="transparence"
      data-testid="transparency-section"
      className="bg-[#FDFDFD] py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-zinc-200 bg-[#F4F4F5] p-10 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
        >
          <div className="max-w-2xl">
            <h3 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-zinc-900 leading-snug">
              Chaque euro raconte une histoire vérifiable.
            </h3>
            <p className="font-body text-zinc-600 text-base md:text-lg mt-5 leading-relaxed">
              Nos comptes sont audités par un cabinet indépendant et publiés
              intégralement. Consultez le détail de l&apos;affectation de vos dons dans
              notre rapport annuel.
            </p>
          </div>
          <motion.a
            href="#transparence"
            data-testid="annual-report-link"
            whileHover={{ x: 4 }}
            className="group shrink-0 inline-flex items-center gap-3 border-2 border-zinc-900 hover:border-[#D62828] hover:text-[#D62828] text-zinc-900 font-bold px-8 py-4 rounded-full transition-colors"
          >
            Voir le rapport annuel
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
