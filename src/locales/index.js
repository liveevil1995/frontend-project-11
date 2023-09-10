import i18next from 'i18next';
import en from './_en';
import ru from './_ru';
import elements from '../elements';

const i18nextInstance = i18next.createInstance(
  {
    lng: 'ru',
    debug: true,
    resources: {
      en,
      ru,
    },
  },
  (err) => {
    if (err) {
      throw new Error(err);
    }
  },
);

const setLocales = () => {
  elements.getLanguagesElements().forEach((locale) => {
    const newLocale = locale;
    newLocale.textContent = i18nextInstance.t(locale.dataset.i18next);
  });
};

export { i18nextInstance, setLocales };
