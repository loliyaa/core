import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/sections/PageHero";
import { VIDEO_POSTER } from "@/data/content";

const INFOS = [
  { icon: Mail, label: "Email", value: "contact@crisduncoeur.org" },
  { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89" },
  { icon: MapPin, label: "Adresse", value: "12 rue de la Solidarité, 75001 Paris" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Merci de remplir tous les champs obligatoires.");
      return;
    }
    toast.success("Message envoyé !", {
      description: "Notre équipe vous répondra sous 48h. (Démonstration)",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3.5 font-body text-zinc-900 placeholder:text-zinc-400 focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/20 outline-none transition";

  return (
    <div data-testid="contact-page">
      <PageHero
        overline="Contact"
        title="Parlons-en. Nous sommes à l'écoute."
        text="Une question, un projet de partenariat, une demande presse ? Écrivez-nous, une personne vous répondra."
        image={VIDEO_POSTER}
      />

      <section className="bg-[#FDFDFD] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <motion.form
            data-testid="contact-form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm font-bold text-zinc-700 mb-2 block">
                  Nom *
                </label>
                <input
                  data-testid="contact-name"
                  className={inputClass}
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={update("name")}
                />
              </div>
              <div>
                <label className="font-body text-sm font-bold text-zinc-700 mb-2 block">
                  Email *
                </label>
                <input
                  data-testid="contact-email"
                  type="email"
                  className={inputClass}
                  placeholder="vous@email.com"
                  value={form.email}
                  onChange={update("email")}
                />
              </div>
            </div>
            <div>
              <label className="font-body text-sm font-bold text-zinc-700 mb-2 block">
                Sujet
              </label>
              <input
                data-testid="contact-subject"
                className={inputClass}
                placeholder="Objet de votre message"
                value={form.subject}
                onChange={update("subject")}
              />
            </div>
            <div>
              <label className="font-body text-sm font-bold text-zinc-700 mb-2 block">
                Message *
              </label>
              <textarea
                data-testid="contact-message"
                rows={6}
                className={`${inputClass} resize-none`}
                placeholder="Comment pouvons-nous vous aider ?"
                value={form.message}
                onChange={update("message")}
              />
            </div>
            <motion.button
              data-testid="contact-submit"
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex items-center gap-3 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              Envoyer le message
              <Send className="h-4 w-4" />
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#18181B] text-white rounded-3xl p-8 md:p-10">
              <h2 className="font-heading font-bold text-2xl mb-8">Nos coordonnées</h2>
              <div className="space-y-7">
                {INFOS.map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="h-11 w-11 shrink-0 rounded-full bg-[#D62828] flex items-center justify-center">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-widest text-white/50">
                        {info.label}
                      </p>
                      <p className="font-body text-white mt-1">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="font-body text-white/60 text-sm leading-relaxed">
                  Horaires : du lundi au vendredi, de 9h à 18h. Pour les urgences terrain,
                  une ligne dédiée est disponible 24/7.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
