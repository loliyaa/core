import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHero } from "@/components/sections/PageHero";
import { CAUSES } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

const euro = (n) => n.toLocaleString("fr-FR");

export default function Causes() {
  const navigate = useNavigate();

  const donate = () => {
    navigate("/");
    setTimeout(() => scrollToId("don"), 500);
  };

  return (
    <div data-testid="causes-page">
      <PageHero
        overline="Nos combats"
        title="Des causes concrètes, un impact mesurable."
        text="Choisissez le combat qui vous parle. Chaque programme est suivi, chiffré et publié en toute transparence."
        image={CAUSES[0].image}
      />

      <section className="bg-[#FDFDFD] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {CAUSES.map((c, i) => {
              const pct = Math.round((c.raised / c.goal) * 100);
              return (
                <motion.article
                  key={c.slug}
                  data-testid={`cause-card-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
                  className="group flex flex-col"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-6">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-zinc-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {c.tag}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-zinc-900 leading-snug">
                    {c.title}
                  </h2>
                  <p className="font-body text-zinc-600 mt-3 leading-relaxed">{c.text}</p>

                  <div className="mt-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-heading font-bold text-xl text-zinc-900">
                        {euro(c.raised)}€
                      </span>
                      <span className="font-body text-sm text-zinc-500">
                        objectif {euro(c.goal)}€
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full bg-[#D62828]"
                      />
                    </div>
                    <p className="font-body text-xs text-zinc-500 mt-2">{pct}% financé</p>
                  </div>

                  <button
                    data-testid={`cause-donate-${i}`}
                    onClick={donate}
                    className="group/btn mt-6 inline-flex items-center gap-2 self-start bg-zinc-900 hover:bg-[#D62828] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
                  >
                    Soutenir cette cause
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
