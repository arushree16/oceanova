import React from "react";
import { useI18n, Locale } from "@/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  fixed?: boolean;
  className?: string;
};

export function LanguageSwitcher({ fixed = false, className }: Props) {
  const { locale, setLocale } = useI18n();

  const SelectEl = (
    <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
      <SelectTrigger className={`w-36 h-9 ${fixed ? 'bg-background/80 backdrop-blur' : ''} ${className || ''}`}>
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिन्दी</SelectItem>
      </SelectContent>
    </Select>
  );

  if (fixed) {
    return <div className="fixed top-3 right-3 z-50">{SelectEl}</div>;
  }

  return SelectEl;
}

export default LanguageSwitcher;
