// components/LanguageSelector.tsx
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white/90"
          aria-label="Select language"
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={
            language === "en"
              ? "bg-purple-50 dark:bg-purple-900/20 text-black dark:text-purple-300"
              : ""
          }
        >
          <span className="mr-2">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("es")}
          className={
            language === "es"
              ? "bg-purple-50 dark:bg-purple-900/20 text-black dark:text-purple-300"
              : ""
          }
        >
          <span className="mr-2">🇪🇸</span> Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
