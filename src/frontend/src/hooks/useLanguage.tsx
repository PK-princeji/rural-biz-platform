import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type Lang = "en" | "hi";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (en: string, hi: string) => string;
}

// ─── Context ───────────────────────────────────────────────────────────────────

const LangContext = createContext<LangContextValue>({
  lang: "en",
  toggle: () => {},
  t: (en) => en,
});

// ─── Provider ──────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem("rb_lang");
      return stored === "hi" ? "hi" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("rb_lang", lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const t = useCallback(
    (en: string, hi: string) => (lang === "hi" ? hi : en),
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useLanguage() {
  return useContext(LangContext);
}
