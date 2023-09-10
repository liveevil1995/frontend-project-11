import elements from './elements.js';
import { i18nextInstance, setLocales } from './locales';

const languages = { ru: 'ru', eng: 'en' };

const render = (path, value, watchedState) => {
  switch (path) {
    case 'errors':
      elements.input.classList.add('is-invalid');
      elements.message.classList.remove('text-success');
      elements.message.classList.add('text-danger');
      elements.message.textContent = value.message;
      break;
    case 'formState':
      if (value === 'valid') {
        elements.form.reset();
        elements.input.focus();
        elements.input.classList.remove('is-invalid');
        elements.message.classList.remove('text-danger');
        elements.message.classList.add('text-success');
        elements.message.textContent = i18nextInstance.t('successMessage');
      }
      break;
    case 'language':
      i18nextInstance.changeLanguage(languages[value]).then(() => setLocales());
      break;
  }
};

export default render;
