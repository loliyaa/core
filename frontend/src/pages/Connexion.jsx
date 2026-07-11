import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Heart, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { HERO_SLIDES } from "@/data/content";

const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

export default function Connexion() {
  const [tab, setTab] = useState("connexion");
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    toast.success(
      tab === "connexion" ? "Connexion réussie !" : "Compte créé avec succès !",
      { description: "Bienvenue dans votre espace membre (maquette)." }
    );
    setTimeout(() => navigate("/espace-membre"), 600);
  };

  const inputWrap =
    "relative flex items-center rounded-xl border border-zinc-300 bg-white focus-within:border-[#D62828] focus-within:ring-2 focus-within:ring-[#D62828]/20 transition";
  const inputBase =
    "w-full bg-transparent py-3.5 pl-11 pr-4 font-body text-zinc-900 placeholder:text-zinc-400 outline-none";
  const iconCls = "absolute left-3.5 h-5 w-5 text-zinc-400";

  return (
    <div data-testid="connexion-page" className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — branding */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 xl:p-16 pt-32 xl:pt-32 bg-zinc-900 overflow-hidden">
        <img
          src={HERO_SLIDES[2].image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-zinc-900/40" />

        <Link to="/" className="relative flex items-center gap-3">
          <Heart className="h-8 w-8 fill-[#D62828] text-[#D62828]" />
          <div className="leading-none">
            <span className="font-heading font-extrabold text-xl text-white block uppercase tracking-tight">
              Cris d&apos;un Cœur
            </span>
            <span className="font-body text-[11px] uppercase tracking-[0.22em] text-white/60">
              La voix des sans voix
            </span>
          </div>
        </Link>

        <div className="relative">
          <p className="font-heading font-bold text-white text-3xl xl:text-4xl leading-snug tracking-tight max-w-md">
            Rejoignez la communauté de celles et ceux qui agissent.
          </p>
          <p className="font-body text-white/70 mt-5 max-w-sm leading-relaxed">
            Suivez l&apos;impact de vos dons, gérez vos parrainages et accédez à vos
            reçus fiscaux depuis votre espace membre.
          </p>
        </div>

        <div className="relative flex items-center gap-3 text-white/60 text-sm">
          <ShieldCheck className="h-5 w-5 text-[#D62828]" />
          Vos données sont protégées et ne sont jamais revendues.
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-5 sm:px-8 py-28 lg:py-16 bg-[#FDFDFD]">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Heart className="h-7 w-7 fill-[#D62828] text-[#D62828]" />
            <span className="font-heading font-extrabold text-lg uppercase tracking-tight text-zinc-900">
              Cris d&apos;un Cœur
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-zinc-100 rounded-full mb-8">
            {[
              { id: "connexion", label: "Connexion" },
              { id: "inscription", label: "Inscription" },
            ].map((t) => (
              <button
                key={t.id}
                data-testid={`tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-3 rounded-full font-bold text-sm transition-colors ${
                  tab === t.id ? "bg-[#D62828] text-white" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900">
                {tab === "connexion" ? "Content de vous revoir" : "Créez votre compte"}
              </h1>
              <p className="font-body text-zinc-500 mt-2 mb-8">
                {tab === "connexion"
                  ? "Connectez-vous pour accéder à votre espace."
                  : "Quelques secondes suffisent pour nous rejoindre."}
              </p>

              <button
                data-testid="google-auth-button"
                onClick={() =>
                  toast("Connexion Google", { description: "Maquette — à connecter sur Joomla." })
                }
                className="w-full flex items-center justify-center gap-3 border border-zinc-300 rounded-xl py-3.5 font-body font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
              >
                <GoogleIcon />
                Continuer avec Google
              </button>

              <div className="flex items-center gap-4 my-6">
                <span className="h-px flex-1 bg-zinc-200" />
                <span className="font-body text-xs uppercase tracking-widest text-zinc-400">ou</span>
                <span className="h-px flex-1 bg-zinc-200" />
              </div>

              <form onSubmit={submit} data-testid="auth-form" className="space-y-4">
                {tab === "inscription" && (
                  <div className={inputWrap}>
                    <User className={iconCls} />
                    <input
                      data-testid="auth-name"
                      className={inputBase}
                      placeholder="Nom complet"
                      autoComplete="name"
                    />
                  </div>
                )}
                <div className={inputWrap}>
                  <Mail className={iconCls} />
                  <input
                    data-testid="auth-email"
                    type="email"
                    className={inputBase}
                    placeholder="Adresse email"
                    autoComplete="email"
                  />
                </div>
                <div className={inputWrap}>
                  <Lock className={iconCls} />
                  <input
                    data-testid="auth-password"
                    type={showPwd ? "text" : "password"}
                    className={inputBase}
                    placeholder="Mot de passe"
                    autoComplete={tab === "connexion" ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label="Afficher le mot de passe"
                    className="absolute right-3.5 text-zinc-400 hover:text-zinc-700"
                  >
                    {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {tab === "connexion" ? (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 font-body text-zinc-600 cursor-pointer">
                      <input type="checkbox" className="accent-[#D62828] h-4 w-4" />
                      Se souvenir de moi
                    </label>
                    <button
                      type="button"
                      data-testid="forgot-password"
                      onClick={() => toast("Réinitialisation", { description: "Maquette." })}
                      className="font-body font-semibold text-[#D62828] hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                ) : (
                  <label className="flex items-start gap-2 font-body text-sm text-zinc-600 cursor-pointer">
                    <input type="checkbox" className="accent-[#D62828] h-4 w-4 mt-0.5" />
                    J&apos;accepte les conditions générales et la politique de confidentialité.
                  </label>
                )}

                <motion.button
                  data-testid="auth-submit"
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold py-4 rounded-xl transition-colors"
                >
                  {tab === "connexion" ? "Se connecter" : "Créer mon compte"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </form>

              <p className="font-body text-sm text-zinc-500 mt-6 text-center">
                {tab === "connexion" ? "Pas encore de compte ? " : "Déjà membre ? "}
                <button
                  data-testid="switch-tab"
                  onClick={() => setTab(tab === "connexion" ? "inscription" : "connexion")}
                  className="font-semibold text-[#D62828] hover:underline"
                >
                  {tab === "connexion" ? "Inscrivez-vous" : "Connectez-vous"}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
