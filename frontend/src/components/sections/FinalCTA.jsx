import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Check } from "lucide-react";
import { toast } from "sonner";

const AMOUNTS = [25, 50, 100, 250];

export const FinalCTA = () => {
  const [amount, setAmount] = useState(50);
  const [freq, setFreq] = useState("mensuel");

  const donate = () => {
    toast.success("Merci de votre générosité !", {
      description: `Don ${freq} de ${amount}€ — la démonstration s'arrête ici (paiement non activé).`,
    });
  };

  return (
    <section
      id="don"
      data-testid="final-cta-section"
      className="bg-[#D62828] text-white py-28 md:py-40 relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5" />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-black/5" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <Heart className="h-12 w-12 fill-white text-white mb-8" />
            <h2 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter">
              Votre don change des vies.
            </h2>
            <p className="font-body text-white/85 text-lg mt-7 max-w-md leading-relaxed">
              Un geste régulier permet de planifier l&apos;aide sur le long terme.
              Rejoignez les 42 000 donateurs qui agissent avec nous.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 bg-white rounded-3xl p-8 md:p-10 text-zinc-900"
          >
            <div className="flex gap-2 p-1 bg-zinc-100 rounded-full mb-8">
              {["mensuel", "ponctuel"].map((f) => (
                <button
                  key={f}
                  data-testid={`freq-${f}`}
                  onClick={() => setFreq(f)}
                  className={`flex-1 py-3 rounded-full font-bold text-sm capitalize transition-colors ${
                    freq === f ? "bg-[#D62828] text-white" : "text-zinc-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  data-testid={`amount-${a}`}
                  onClick={() => setAmount(a)}
                  className={`relative py-5 rounded-xl border-2 font-heading font-bold text-xl transition-colors ${
                    amount === a
                      ? "border-[#D62828] bg-[#D62828]/5 text-[#D62828]"
                      : "border-zinc-200 text-zinc-800 hover:border-zinc-400"
                  }`}
                >
                  {amount === a && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-[#D62828]" />
                  )}
                  {a}€
                </button>
              ))}
            </div>

            <motion.button
              data-testid="submit-donation-button"
              whileTap={{ scale: 0.98 }}
              onClick={donate}
              className="w-full bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold text-lg py-5 rounded-xl transition-colors"
            >
              Je donne {amount}€ {freq === "mensuel" ? "/ mois" : ""}
            </motion.button>
            <p className="text-center text-xs text-zinc-400 mt-4">
              Paiement 100% sécurisé · Reçu fiscal automatique
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
