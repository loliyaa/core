import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NAV_LINKS } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const donate = () => {
    setOpen(false);
    if (isHome) {
      scrollToId("don");
    } else {
      navigate("/");
      setTimeout(() => scrollToId("don"), 500);
    }
  };

  return (
    <motion.header
      data-testid="main-navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 border-b border-zinc-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="logo-home"
          onClick={() => setOpen(false)}
          className="flex items-center group"
          aria-label="Cris d'un Cœur — accueil"
        >
          <img
            src="/logo.webp"
            alt="Cris d'un Cœur — La voix des sans voix"
            className="h-11 md:h-12 w-auto transition-transform group-hover:scale-[1.03]"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.to.replace("/", "")}`}
              className="font-body text-sm font-medium relative group text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#D62828] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <motion.button
            data-testid="nav-donate-button"
            whileTap={{ scale: 0.96 }}
            onClick={donate}
            className="bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
          >
            Faire un don
          </motion.button>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-zinc-900"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-zinc-200 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  data-testid={`mobile-nav-${l.to.replace("/", "")}`}
                  onClick={() => setOpen(false)}
                  className="text-left font-heading text-2xl font-bold text-zinc-900"
                >
                  {l.label}
                </Link>
              ))}
              <button
                data-testid="mobile-donate-button"
                onClick={donate}
                className="bg-[#D62828] text-white font-bold px-6 py-4 rounded-full mt-2"
              >
                Faire un don
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
