import { Heart, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NAV_LINKS } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const donate = () => {
    if (location.pathname === "/") {
      scrollToId("don");
    } else {
      navigate("/");
      setTimeout(() => scrollToId("don"), 500);
    }
  };
  return (
    <footer data-testid="footer" className="bg-[#18181B] text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-7 w-7 fill-[#D62828] text-[#D62828]" />
              <div className="leading-none">
                <span className="font-heading font-extrabold text-xl tracking-tight block">
                  Cris d&apos;un Cœur
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/50">
                  La voix des sans voix
                </span>
              </div>
            </div>
            <p className="font-body text-white/60 text-base max-w-sm leading-relaxed">
              Une organisation humanitaire indépendante qui agit pour la dignité,
              l&apos;eau, l&apos;éducation et la santé dans 14 pays.
            </p>
            <div className="flex gap-3 mt-8">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#hero"
                  data-testid={`social-link-${i}`}
                  aria-label="Réseau social"
                  className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#D62828] hover:border-[#D62828] transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-body text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
              Contact
            </p>
            <ul className="space-y-3 font-body text-white/70">
              <li>contact@crisduncoeur.org</li>
              <li>+33 1 23 45 67 89</li>
              <li>12 rue de la Solidarité, Paris</li>
            </ul>
            <button
              data-testid="footer-donate-button"
              onClick={donate}
              className="mt-6 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              Faire un don
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-white/40 text-sm font-body">
          <p>© 2025 Cris d&apos;un Cœur. Association reconnue d&apos;utilité publique.</p>
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
