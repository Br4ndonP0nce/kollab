// contexts/LanguageContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations } from "@/locales/translations";

// Define supported languages
export type Language = "en" | "es";

// Define a type for our translations to fix TypeScript error
type TranslationsType = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

// Ensure our translations object has the correct type
const typedTranslations = translations as TranslationsType;

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Try to get language from localStorage first (user preference)
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;

      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
        setLanguageState(savedLanguage);
      } else {
        // Otherwise detect from browser
        const browserLanguage = navigator.language.split("-")[0];

        // Only set if it's one of our supported languages
        if (browserLanguage === "es") {
          setLanguageState("es");
        } else {
          // Default to English for anything else
          setLanguageState("en");
        }
      }
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    // Safely access translations with TypeScript checks
    return typedTranslations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
