import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import bg from './locales/bg/translation.json';
import { languageToLocale } from '@shared/enums';

const language = JSON.parse(localStorage.getItem('preferences'))?.language;

// TODO: Translate validation errors
// TODO: Structure translations better
const resources = {
  en: {
    translation: en,
  },
  bg: {
    translation: bg,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: languageToLocale[language] ?? 'en',
    fallbackLgn: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
