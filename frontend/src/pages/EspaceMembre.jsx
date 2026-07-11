import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  HeartHandshake,
  Repeat,
  TrendingUp,
  FileText,
  User,
  LogOut,
  Download,
  Plus,
  CheckCircle2,
  CreditCard,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import {
  MEMBER,
  MEMBER_STATS,
  SUBSCRIPTION,
  DONATIONS,
  SUPPORTED_CAUSES,
  RECEIPTS,
} from "@/data/content";

const NAV = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "dons", label: "Mes dons", icon: HeartHandshake },
  { id: "abonnements", label: "Abonnements", icon: Repeat },
  { id: "causes", label: "Suivi des causes", icon: TrendingUp },
  { id: "recus", label: "Reçus fiscaux", icon: FileText },
  { id: "profil", label: "Mon profil", icon: User },
];

const StatCard = ({ s, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: i * 0.06 }}
    className="bg-white rounded-2xl border border-zinc-200 p-6"
    data-testid={`member-stat-${i}`}
  >
    <p className="font-body text-sm text-zinc-500">{s.label}</p>
    <p className="font-heading font-black text-3xl md:text-4xl text-zinc-900 tracking-tight mt-2">
      {s.value}
    </p>
    <p className="font-body text-xs text-zinc-400 mt-1">{s.sub}</p>
  </motion.div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
    <CheckCircle2 className="h-3.5 w-3.5" />
    {children}
  </span>
);

const SubscriptionCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8" data-testid="subscription-card">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-heading font-bold text-xl text-zinc-900">Abonnement mensuel</h3>
            <Badge>Actif</Badge>
          </div>
          <p className="font-body text-zinc-500 text-sm">
            Merci pour votre soutien régulier à « {SUBSCRIPTION.cause} ».
          </p>
        </div>
        <p className="font-heading font-black text-4xl text-[#D62828] tracking-tight">
          {SUBSCRIPTION.amount}€<span className="text-base text-zinc-400 font-body font-medium"> /mois</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Calendar className="h-4 w-4 text-zinc-400" /> Depuis {SUBSCRIPTION.since}
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Repeat className="h-4 w-4 text-zinc-400" /> Prochain : {SUBSCRIPTION.next}
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <CreditCard className="h-4 w-4 text-zinc-400" /> {SUBSCRIPTION.method}
        </div>
      </div>

      <div className="flex gap-3 mt-7">
        <button
          data-testid="manage-subscription"
          onClick={() => navigate("/")}
          className="bg-zinc-900 hover:bg-[#D62828] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          Modifier le montant
        </button>
        <button
          data-testid="cancel-subscription"
          onClick={() => toast("Gestion de l'abonnement", { description: "Maquette — à brancher sur Joomla." })}
          className="border border-zinc-300 hover:border-zinc-900 text-zinc-700 font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          Suspendre
        </button>
      </div>
    </div>
  );
};

const DonationsTable = ({ limit }) => {
  const rows = limit ? DONATIONS.slice(0, limit) : DONATIONS;
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden" data-testid="donations-table">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              {["Date", "Cause", "Type", "Montant", "Statut", "Reçu"].map((h) => (
                <th key={h} className="font-body text-xs uppercase tracking-wider text-zinc-500 font-bold px-5 py-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => (
              <tr key={i} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                <td className="px-5 py-4 font-body text-sm text-zinc-700 whitespace-nowrap">{d.date}</td>
                <td className="px-5 py-4 font-body text-sm text-zinc-900 font-medium">{d.cause}</td>
                <td className="px-5 py-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">
                    {d.type}
                  </span>
                </td>
                <td className="px-5 py-4 font-heading font-bold text-zinc-900">{d.amount}€</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {d.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => toast("Téléchargement", { description: "Maquette du reçu." })}
                    className="text-[#D62828] hover:underline text-sm font-semibold inline-flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function EspaceMembre() {
  const [tab, setTab] = useState("dashboard");
  const navigate = useNavigate();

  const logout = () => {
    toast.success("Déconnexion", { description: "À bientôt !" });
    navigate("/");
  };

  return (
    <div data-testid="member-page" className="min-h-screen bg-[#F4F4F5] pt-28 md:pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[268px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <div className="flex items-center gap-3 pb-6 border-b border-zinc-100">
              <div className="h-12 w-12 rounded-full bg-[#D62828] text-white font-heading font-bold flex items-center justify-center">
                {MEMBER.initials}
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-zinc-900 truncate">{MEMBER.name}</p>
                <p className="font-body text-xs text-zinc-500">Membre depuis {MEMBER.since}</p>
              </div>
            </div>

            <nav className="flex lg:flex-col gap-1 mt-4 overflow-x-auto">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  data-testid={`member-nav-${n.id}`}
                  onClick={() => setTab(n.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-semibold whitespace-nowrap transition-colors ${
                    tab === n.id
                      ? "bg-[#D62828] text-white"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  <n.icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                  {n.label}
                </button>
              ))}
            </nav>

            <button
              data-testid="logout-button"
              onClick={logout}
              className="hidden lg:flex items-center gap-3 px-4 py-3 mt-4 w-full rounded-xl font-body text-sm font-semibold text-zinc-500 hover:text-[#D62828] hover:bg-zinc-100 transition-colors border-t border-zinc-100 pt-5"
            >
              <LogOut style={{ width: 18, height: 18 }} />
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Main */}
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* DASHBOARD */}
              {tab === "dashboard" && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900">
                        Bonjour, {MEMBER.firstName} 👋
                      </h1>
                      <p className="font-body text-zinc-500 mt-1">Voici un aperçu de votre engagement.</p>
                    </div>
                    <button
                      data-testid="new-donation-button"
                      onClick={() => navigate("/")}
                      className="inline-flex items-center gap-2 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold px-6 py-3 rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4" /> Faire un don
                    </button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {MEMBER_STATS.map((s, i) => (
                      <StatCard key={i} s={s} i={i} />
                    ))}
                  </div>

                  <SubscriptionCard />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-heading font-bold text-xl text-zinc-900">Dons récents</h2>
                      <button
                        onClick={() => setTab("dons")}
                        className="font-body text-sm font-semibold text-[#D62828] hover:underline"
                      >
                        Tout voir
                      </button>
                    </div>
                    <DonationsTable limit={4} />
                  </div>
                </div>
              )}

              {/* DONS */}
              {tab === "dons" && (
                <div className="space-y-6">
                  <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900">
                    Mes dons
                  </h1>
                  <p className="font-body text-zinc-500 -mt-2">Historique complet de vos contributions.</p>
                  <DonationsTable />
                </div>
              )}

              {/* ABONNEMENTS */}
              {tab === "abonnements" && (
                <div className="space-y-6">
                  <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900">
                    Mes abonnements
                  </h1>
                  <p className="font-body text-zinc-500 -mt-2">Gérez vos dons récurrents en toute liberté.</p>
                  <SubscriptionCard />
                  <div className="bg-white rounded-2xl border border-dashed border-zinc-300 p-8 text-center">
                    <p className="font-body text-zinc-500">Vous souhaitez soutenir une autre cause chaque mois ?</p>
                    <button
                      onClick={() => navigate("/causes")}
                      className="mt-4 inline-flex items-center gap-2 border border-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4" /> Nouvel abonnement
                    </button>
                  </div>
                </div>
              )}

              {/* CAUSES */}
              {tab === "causes" && (
                <div className="space-y-6">
                  <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900">
                    Suivi des causes
                  </h1>
                  <p className="font-body text-zinc-500 -mt-2">L&apos;impact des programmes que vous soutenez.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SUPPORTED_CAUSES.map((c, i) => (
                      <div
                        key={i}
                        data-testid={`supported-cause-${i}`}
                        className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="p-5">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#D62828]">
                            {c.tag}
                          </span>
                          <h3 className="font-heading font-bold text-lg text-zinc-900 mt-1">{c.title}</h3>
                          <p className="font-body text-sm text-zinc-500 mt-1">
                            Votre contribution : <span className="font-bold text-zinc-900">{c.given}€</span>
                          </p>
                          <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden mt-4">
                            <div className="h-full rounded-full bg-[#D62828]" style={{ width: `${c.progress}%` }} />
                          </div>
                          <p className="font-body text-xs text-zinc-400 mt-2">{c.progress}% de l&apos;objectif atteint</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RECUS */}
              {tab === "recus" && (
                <div className="space-y-6">
                  <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900">
                    Reçus fiscaux
                  </h1>
                  <p className="font-body text-zinc-500 -mt-2">
                    66% de vos dons sont déductibles de vos impôts.
                  </p>
                  <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-100">
                    {RECEIPTS.map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-5" data-testid={`receipt-${i}`}>
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-xl bg-zinc-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-[#D62828]" />
                          </div>
                          <div>
                            <p className="font-heading font-bold text-zinc-900">Reçu fiscal {r.year}</p>
                            <p className="font-body text-sm text-zinc-500">Total des dons : {r.amount}</p>
                          </div>
                        </div>
                        {r.issued === "Disponible" ? (
                          <button
                            onClick={() => toast("Téléchargement", { description: "Maquette du reçu." })}
                            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-[#D62828] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
                          >
                            <Download className="h-4 w-4" /> Télécharger
                          </button>
                        ) : (
                          <span className="text-sm font-semibold text-zinc-400">{r.issued}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PROFIL */}
              {tab === "profil" && (
                <div className="space-y-6">
                  <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900">
                    Mon profil
                  </h1>
                  <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { label: "Nom complet", value: MEMBER.name },
                        { label: "Email", value: MEMBER.email },
                        { label: "Téléphone", value: "+33 6 12 34 56 78" },
                        { label: "Ville", value: "Lyon, France" },
                      ].map((f, i) => (
                        <div key={i}>
                          <label className="font-body text-sm font-bold text-zinc-700 mb-2 block">{f.label}</label>
                          <input
                            defaultValue={f.value}
                            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-body text-zinc-900 focus:border-[#D62828] focus:ring-2 focus:ring-[#D62828]/20 outline-none transition"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      data-testid="save-profile"
                      onClick={() => toast.success("Profil mis à jour", { description: "Maquette." })}
                      className="mt-7 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold px-8 py-3.5 rounded-full transition-colors"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
