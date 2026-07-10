import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/content";
import { scrollToId } from "@/lib/scroll";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target) => {
    setOpen(false);
    scrollToId(target);
  };

  return (
    <motion.header
      data-testid="main-navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-zinc-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
        <button
          data-testid="logo-home"
          onClick={() => go("hero")}
          className="flex items-center gap-2 group"
        >
          <Heart
            className={`h-6 w-6 fill-[#D62828] text-[#D62828] transition-transform group-hover:scale-110`}
          />
          <span
            className={`font-heading font-extrabold text-lg tracking-tight ${
              scrolled ? "text-zinc-900" : "text-white"
            }`}
          >
            Cris du Cœur
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <button
              key={l.target}
              data-testid={`nav-${l.target}`}
              onClick={() => go(l.target)}
              className={`font-body text-sm font-medium relative group ${
                scrolled ? "text-zinc-700" : "text-white/90"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#D62828] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <motion.button
            data-testid="nav-donate-button"
            whileTap={{ scale: 0.96 }}
            onClick={() => go("don")}
            className="bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
          >
            Faire un don
          </motion.button>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          className={`md:hidden ${scrolled ? "text-zinc-900" : "text-white"}`}
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
                <button
                  key={l.target}
                  data-testid={`mobile-nav-${l.target}`}
                  onClick={() => go(l.target)}
                  className="text-left font-heading text-2xl font-bold text-zinc-900"
                >
                  {l.label}
                </button>
              ))}
              <button
                data-testid="mobile-donate-button"
                onClick={() => go("don")}
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
