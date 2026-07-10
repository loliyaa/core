import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NEWS } from "@/data/content";

export const NewsGrid = () => {
  return (
    <section
      id="actualites"
      data-testid="news-section"
      className="bg-[#FDFDFD] py-24 md:py-36"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#D62828]" />
              <span className="font-body text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-zinc-500">
                Actualités &amp; histoires
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-zinc-900">
              Des nouvelles du terrain.
            </h2>
          </motion.div>
          <motion.a
            href="#actualites"
            data-testid="all-news-link"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ x: 4 }}
            className="group inline-flex items-center gap-2 font-bold text-zinc-900 hover:text-[#D62828] transition-colors"
          >
            Toutes les histoires
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {NEWS.map((n, i) => (
            <motion.article
              key={i}
              data-testid={`news-card-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-6">
                <img
                  src={n.image}
                  alt={n.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-zinc-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {n.category}
                </span>
              </div>
              <p className="font-body text-sm text-zinc-500 mb-2">{n.date}</p>
              <h3 className="font-heading font-bold text-xl md:text-2xl tracking-tight text-zinc-900 leading-snug group-hover:text-[#D62828] transition-colors">
                {n.title}
              </h3>
              <span className="inline-flex items-center gap-2 mt-4 font-body font-bold text-sm text-zinc-900">
                Lire la suite
                <ArrowRight className="h-4 w-4 text-[#D62828] transition-transform group-hover:translate-x-1" />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
