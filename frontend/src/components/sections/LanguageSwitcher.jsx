import { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGS = [
  { code: "FR", label: "Français" },
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "AR", label: "العربية" },
];

const getInitial = () => {
  if (typeof window === "undefined") return "FR";
  return localStorage.getItem("cdc_lang") || "FR";
};

export const LanguageSwitcher = ({ solid = true, full = false }) => {
  const [current, setCurrent] = useState(getInitial);

  useEffect(() => {
    const onChange = (e) => setCurrent(e.detail);
    window.addEventListener("cdc-langchange", onChange);
    document.documentElement.lang = current.toLowerCase();
    return () => window.removeEventListener("cdc-langchange", onChange);
  }, [current]);

  const select = (code) => {
    setCurrent(code);
    localStorage.setItem("cdc_lang", code);
    window.dispatchEvent(new CustomEvent("cdc-langchange", { detail: code }));
    const lang = LANGS.find((l) => l.code === code);
    toast(`Langue : ${lang.label}`, {
      description: "Maquette — la traduction sera gérée par Joomla.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-testid="language-switcher"
          aria-label="Changer de langue"
          className={`flex items-center gap-1.5 font-body font-semibold transition-colors outline-none ${
            full
              ? "text-2xl font-heading font-bold text-zinc-900"
              : `text-sm ${
                  solid ? "text-zinc-700 hover:text-[#D62828]" : "text-white/90 hover:text-white"
                }`
          }`}
        >
          <Globe className={full ? "h-6 w-6" : "h-4 w-4"} />
          {full ? "Langue" : current}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            data-testid={`lang-option-${l.code}`}
            onClick={() => select(l.code)}
            className="flex items-center justify-between cursor-pointer font-body"
          >
            <span>
              <span className="font-bold mr-2">{l.code}</span>
              <span className="text-zinc-500">{l.label}</span>
            </span>
            {current === l.code && <Check className="h-4 w-4 text-[#D62828]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
