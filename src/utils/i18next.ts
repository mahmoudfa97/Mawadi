import i18next from 'i18next';
import * as i18nextMiddleware from 'i18next-http-middleware'; // Adjust import here
import Backend from 'i18next-fs-backend';

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'ar'],
    ns: ['aboutUs'],
    defaultNS: 'aboutUs',
    backend: {
      loadPath: '../translations/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

  export const languageHandler = i18nextMiddleware.handle(i18next)
