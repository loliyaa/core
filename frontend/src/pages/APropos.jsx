import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/PageHero";
import { VALUES, TEAM, STATS } from "@/data/content";

export default function APropos() {
  return (
    <div data-testid="apropos-page">
      <PageHero
        overline="À propos"
        title="Nous croyons en la force de chaque geste."
        text="Depuis 2009, Cris du Cœur agit aux côtés des communautés les plus vulnérables, avec une exigence : la dignité avant tout."
        image={TEAM[0].image}
      />

      {/* Mission */}
      <section className="bg-[#FDFDFD] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#D62828]" />
              <span className="font-body text-xs uppercase tracking-[0.25em] font-bold text-zinc-500">
                Notre mission
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl leading-tight tracking-tight text-zinc-900">
              Rendre l’aide humanitaire durable et transparente.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-5 font-body text-lg text-zinc-600 leading-relaxed"
          >
            <p>
              Née d’un élan citoyen, notre association intervient aujourd’hui dans 14 pays
              autour de quatre piliers : l’eau, l’éducation, la santé et la réponse
              d’urgence. Nous ne faisons pas l’aumône : nous investissons dans l’autonomie.
            </p>
            <p>
              Notre modèle repose sur la proximité — nos équipes vivent au sein des
              communautés — et sur une redevabilité totale. Chaque euro est suivi, audité
              et publié.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-[#18181B] text-white py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="font-heading font-black text-6xl md:text-7xl tracking-tighter">
                {s.value}
                <span className="text-[#D62828]">{s.suffix}</span>
              </p>
              <p className="font-body text-white/60 mt-3 max-w-xs">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F4F4F5] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900 mb-12">
            Nos valeurs.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-zinc-200"
              >
                <span className="font-heading font-black text-3xl text-[#D62828]">
                  0{i + 1}
                </span>
                <h3 className="font-heading font-bold text-2xl text-zinc-900 mt-4">
                  {v.title}
                </h3>
                <p className="font-body text-zinc-600 mt-3 leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#FDFDFD] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900 mb-12">
            L’équipe.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TEAM.map((m, i) => (
              <motion.div
                key={i}
                data-testid={`team-member-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4 bg-zinc-100">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-heading font-bold text-lg text-zinc-900">{m.name}</h3>
                <p className="font-body text-sm text-zinc-500">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
