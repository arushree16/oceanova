import React, { createContext, useContext, useMemo, useState } from "react";

export type Locale = "en" | "hi";

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const translations: Record<Locale, Record<string, string>> = {
  en: {
    "app.name": "Oceanova",

    "landing.citizenReporter": "Citizen Reporter",
    "landing.officialDashboard": "Official Dashboard",
    "landing.startReporting": "Start Reporting",

    "dashboard.title": "Official Dashboard",
    "dashboard.alerts": "Alerts",
    "dashboard.filter": "Filter",
    "dashboard.alertPreferences": "Alert Preferences",
    "dashboard.next24hRisk": "Next 24h Coastal Risk",
    "dashboard.next24hRisk.desc": "Confidence-weighted short-term risk forecast",
    "dashboard.threshold": "Risk threshold",
    "channel.push": "Push (in-app)",
    "channel.sms": "SMS",
    "channel.whatsapp": "WhatsApp",

    "citizen.title": "Citizen Reporter",
    "citizen.reportHazard": "Report a Coastal Hazard",
    "citizen.description": "Help protect your community by reporting coastal hazards you observe",
    "citizen.hazardType": "Hazard Type",
    "citizen.location": "Location",
    "citizen.descriptionLabel": "Description",
    "citizen.descriptionPlaceholder": "Describe what you observed (AI will help verify authenticity)...",
    "citizen.uploadHint": "Upload photos or videos (AI will automatically blur sensitive content)",
    "citizen.submit": "Submit Report",
  },
  hi: {
    "app.name": "ओशेनोवा",

    "landing.citizenReporter": "नागरिक रिपोर्टर",
    "landing.officialDashboard": "आधिकारिक डैशबोर्ड",
    "landing.startReporting": "रिपोर्टिंग शुरू करें",

    "dashboard.title": "आधिकारिक डैशबोर्ड",
    "dashboard.alerts": "अलर्ट",
    "dashboard.filter": "फ़िल्टर",
    "dashboard.alertPreferences": "अलर्ट वरीयताएँ",
    "dashboard.next24hRisk": "अगले 24 घंटे का तटीय जोखिम",
    "dashboard.next24hRisk.desc": "विश्वास-भारित अल्पकालिक जोखिम पूर्वानुमान",
    "dashboard.threshold": "जोखिम सीमा",
    "channel.push": "पुश (इन-ऐप)",
    "channel.sms": "एसएमएस",
    "channel.whatsapp": "व्हाट्सएप",

    "citizen.title": "नागरिक रिपोर्टर",
    "citizen.reportHazard": "तटीय खतरे की रिपोर्ट करें",
    "citizen.description": "अपने समुदाय की सुरक्षा के लिए देखे गए तटीय खतरों की रिपोर्ट करें",
    "citizen.hazardType": "खतरे का प्रकार",
    "citizen.location": "स्थान",
    "citizen.descriptionLabel": "विवरण",
    "citizen.descriptionPlaceholder": "आपने जो देखा उसका वर्णन करें (AI प्रामाणिकता की जाँच में मदद करेगा)...",
    "citizen.uploadHint": "फोटो या वीडियो अपलोड करें (AI संवेदनशील सामग्री धुंधली करेगा)",
    "citizen.submit": "रिपोर्ट सबमिट करें",
  },
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    return saved || "en";
  });

  const t = useMemo(() => {
    return (key: string) => {
      const dict = translations[locale] || translations.en;
      return dict[key] || translations.en[key] || key;
    };
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale: (l: Locale) => {
    localStorage.setItem("locale", l);
    setLocale(l);
  }, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
