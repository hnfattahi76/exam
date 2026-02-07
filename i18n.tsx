// npm install react-i18next i18next --save
import i18n from "i18next";
import { useEffect, useEffectEvent, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
  fa: {
    translation: {
      "Welcome to React": "خوش آمدید به ریکت",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

type Lang = "fa" | "en";


export default function I18N() {
  const { t, i18n: I18n } = useTranslation();

  const [lang, setLang] = useState<Lang>(() => {
    const lang = localStorage.getItem("lang");
    return lang === "en" ? "en" : "fa";
  });

  const changeLang = useEffectEvent(() => {
    localStorage.setItem("lang", lang);
    I18n.changeLanguage(lang);
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.documentElement.lang = lang;
  });

  useEffect(() => {
    changeLang();
  }, [lang]);

  return (
    <div>
      <button
        onClick={() => {
          setLang(lang === "fa" ? "en" : "fa");
        }}
      >
        Change Language
      </button>
      <h1>{t("Welcome to React")}</h1>
    </div>
  );
}
