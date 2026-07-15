import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Heart, Check, ShieldCheck, ArrowRight, Repeat, Zap } from "lucide-react";
import { toast } from "sonner";
import { CAUSES } from "@/data/content";

const PRESETS = {
  mensuel: [10, 20, 30, 50],
  ponctuel: [25, 50, 100, 250],
};

const IMPACT = {
  10: "≈ 2 mois d'eau potable pour une famille",
  20: "≈ des fournitures scolaires pour 4 enfants",
  25: "≈ un kit d'urgence pour une personne",
  30: "≈ un suivi prénatal complet",
  50: "≈ la scolarité d'un enfant pendant un trimestre",
  100: "≈ un abri d'urgence pour une famille",
  250: "≈ un point d'eau partagé par un village",
};

export default function FaireUnDon() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [freq, setFreq] = useState("mensuel");
  const [amount, setAmount] = useState(30);
  const [custom, setCustom] = useState("");
  const [cause, setCause] = useState(params.get("cause") || "general");
  const [donor, setDonor] = useState({ name: "", email: "" });

  const value = custom ? Number(custom) : amount;

  const pickPreset = (a) => {
    setAmount(a);
    setCustom("");
  };

  const changeFreq = (f) => {
    setFreq(f);
    setAmount(PRESETS[f][f === "mensuel" ? 2 : 1]);
    setCustom("");
  };

  const submit = () => {
    if (!value || value <= 0) {
      toast.error("Veuillez choisir un montant.");
      return;
    }
    const c = CAUSES.find((x) => x.slug === cause);
    toast.success("Merci pour votre générosité !", {
      description: `Don ${freq} de ${value}€ ${
        c ? `pour « ${c.title} »` : "au fonds général"
      }. Maquette — paiement à connecter sur Joomla.`,
    });
    setTimeout(() => navigate("/"), 1200);
  };

  const inputCls =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-body text-zinc-900 placeholder:text-zinc-400 focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/20 outline-none transition";

  return (
    <div data-testid="don-page" className="min-h-screen bg-[#F4F4F5] pt-28 md:pt-36 pb-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-[#D62828]" />
          <span className="font-body text-xs uppercase tracking-[0.25em] font-bold text-zinc-500">
            Votre soutien
          </span>
        </div>
        <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tighter text-zinc-900 max-w-3xl">
          Faites un don qui change des vies.
        </h1>
        <p className="font-body text-zinc-500 text-lg mt-4 max-w-2xl">
          Choisissez la fréquence, le montant et la cause. Chaque euro est tracé et publié.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          {/* Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Frequency */}
            <section className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8">
              <h2 className="font-heading font-bold text-xl text-zinc-900 mb-5">
                <span className="text-[#D62828]">1.</span> Fréquence du don
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "mensuel", label: "Mensuel", icon: Repeat, hint: "Soutien régulier" },
                  { id: "ponctuel", label: "Ponctuel", icon: Zap, hint: "Une seule fois" },
                ].map((f) => (
                  <button
                    key={f.id}
                    data-testid={`freq-${f.id}`}
                    onClick={() => changeFreq(f.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-colors ${
                      freq === f.id
                        ? "border-[#D62828] bg-[#D62828]/5"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <f.icon className={`h-6 w-6 ${freq === f.id ? "text-[#D62828]" : "text-zinc-400"}`} />
                    <div>
                      <p className="font-heading font-bold text-zinc-900">{f.label}</p>
                      <p className="font-body text-xs text-zinc-500">{f.hint}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Amount */}
            <section className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8">
              <h2 className="font-heading font-bold text-xl text-zinc-900 mb-5">
                <span className="text-[#D62828]">2.</span> Montant
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESETS[freq].map((a) => (
                  <button
                    key={a}
                    data-testid={`amount-${a}`}
                    onClick={() => pickPreset(a)}
                    className={`relative py-5 rounded-xl border-2 font-heading font-bold text-xl transition-colors ${
                      !custom && amount === a
                        ? "border-[#D62828] bg-[#D62828]/5 text-[#D62828]"
                        : "border-zinc-200 text-zinc-800 hover:border-zinc-400"
                    }`}
                  >
                    {(!custom && amount === a) && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-[#D62828]" />
                    )}
                    {a}€
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <label className="font-body text-sm text-zinc-500 mb-2 block">Autre montant</label>
                <div className="relative">
                  <input
                    data-testid="custom-amount"
                    type="number"
                    min="1"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="Montant libre"
                    className={inputCls + " pr-9"}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">€</span>
                </div>
              </div>
              {IMPACT[value] && (
                <p className="mt-4 flex items-center gap-2 font-body text-sm text-zinc-600 bg-[#D62828]/5 rounded-lg px-4 py-3">
                  <Heart className="h-4 w-4 fill-[#D62828] text-[#D62828]" /> {IMPACT[value]}
                </p>
              )}
            </section>

            {/* Cause */}
            <section className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8">
              <h2 className="font-heading font-bold text-xl text-zinc-900 mb-5">
                <span className="text-[#D62828]">3.</span> Affecter mon don
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  data-testid="cause-general"
                  onClick={() => setCause("general")}
                  className={`text-left p-4 rounded-xl border-2 transition-colors ${
                    cause === "general"
                      ? "border-[#D62828] bg-[#D62828]/5"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <p className="font-heading font-bold text-zinc-900">Là où le besoin est urgent</p>
                  <p className="font-body text-xs text-zinc-500 mt-1">
                    Nous affectons votre don au programme prioritaire.
                  </p>
                </button>
                {CAUSES.map((c) => (
                  <button
                    key={c.slug}
                    data-testid={`cause-${c.slug}`}
                    onClick={() => setCause(c.slug)}
                    className={`text-left p-4 rounded-xl border-2 transition-colors ${
                      cause === c.slug
                        ? "border-[#D62828] bg-[#D62828]/5"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <p className="font-heading font-bold text-zinc-900">{c.tag}</p>
                    <p className="font-body text-xs text-zinc-500 mt-1 line-clamp-1">{c.title}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Donor */}
            <section className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8">
              <h2 className="font-heading font-bold text-xl text-zinc-900 mb-5">
                <span className="text-[#D62828]">4.</span> Vos coordonnées
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  data-testid="donor-name"
                  className={inputCls}
                  placeholder="Nom complet"
                  value={donor.name}
                  onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                />
                <input
                  data-testid="donor-email"
                  type="email"
                  className={inputCls}
                  placeholder="Adresse email"
                  value={donor.email}
                  onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                />
              </div>
              <p className="font-body text-xs text-zinc-400 mt-3">
                Un reçu fiscal vous sera envoyé (66% de votre don déductible des impôts).
              </p>
            </section>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-7">
              <h2 className="font-heading font-bold text-xl text-zinc-900 mb-6">Récapitulatif</h2>
              <div className="space-y-3 font-body text-zinc-600">
                <div className="flex justify-between">
                  <span>Fréquence</span>
                  <span className="font-semibold text-zinc-900 capitalize">{freq}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cause</span>
                  <span className="font-semibold text-zinc-900 text-right max-w-[60%]">
                    {cause === "general"
                      ? "Fonds prioritaire"
                      : CAUSES.find((c) => c.slug === cause)?.tag}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-zinc-200 mt-5 pt-5">
                <span className="font-heading font-bold text-lg text-zinc-900">Total</span>
                <span className="font-heading font-black text-3xl text-[#D62828]">
                  {value || 0}€
                  {freq === "mensuel" && (
                    <span className="text-sm text-zinc-400 font-body font-medium"> /mois</span>
                  )}
                </span>
              </div>

              <motion.button
                data-testid="submit-donation"
                whileTap={{ scale: 0.98 }}
                onClick={submit}
                className="group w-full mt-6 flex items-center justify-center gap-2 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold py-4 rounded-xl transition-colors"
              >
                Je donne {value || 0}€
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <div className="flex items-center gap-2 justify-center mt-4 text-zinc-400 text-xs">
                <ShieldCheck className="h-4 w-4" /> Paiement 100% sécurisé
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
