import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/sections/PageHero";
import { EVENTS } from "@/data/content";

export default function Evenements() {
  const register = (title) => {
    toast.success("Inscription enregistrée !", {
      description: `Nous vous avons réservé une place pour « ${title} ». (Démonstration)`,
    });
  };

  return (
    <div data-testid="evenements-page">
      <PageHero
        overline="Rejoignez-nous"
        title="Nos événements à venir."
        text="Galas, courses solidaires, ateliers : autant d'occasions d'agir ensemble et de rencontrer nos équipes."
        image={EVENTS[0].image}
      />

      <section className="bg-[#FDFDFD] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 space-y-6">
          {EVENTS.map((e, i) => (
            <motion.article
              key={i}
              data-testid={`event-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center rounded-2xl border border-zinc-200 bg-white p-5 md:p-6 hover:border-[#D62828] transition-colors"
            >
              <div className="md:col-span-3 relative overflow-hidden rounded-xl aspect-[16/10]">
                <img
                  src={e.image}
                  alt={e.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-3 md:gap-0">
                <span className="font-heading font-black text-5xl md:text-6xl text-zinc-900 leading-none">
                  {e.day}
                </span>
                <span className="font-body font-bold uppercase tracking-widest text-[#D62828]">
                  {e.month} 2026
                </span>
              </div>

              <div className="md:col-span-5">
                <span className="font-body text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  {e.type}
                </span>
                <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-zinc-900 mt-1">
                  {e.title}
                </h2>
                <p className="font-body text-zinc-600 mt-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#D62828]" />
                  {e.location}
                </p>
                <p className="font-body text-zinc-500 text-sm mt-2 leading-relaxed">{e.text}</p>
              </div>

              <div className="md:col-span-2 flex md:justify-end">
                <button
                  data-testid={`event-register-${i}`}
                  onClick={() => register(e.title)}
                  className="group/btn inline-flex items-center gap-2 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
                >
                  S’inscrire
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
