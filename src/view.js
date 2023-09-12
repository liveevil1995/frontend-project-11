import elements from './elements.js';
import { i18nextInstance, setLocales } from './locales/index.js';
import { renderFeed, renderPost } from './renders.js';

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
    case 'feedList':
      renderFeed();
      break;
    case 'feedListItems':
    case 'openModal':
      renderPost();
      break;
    case 'modal': {
      const { title, link, description } = watchedState.modal;
      elements.modalTitle.textContent = title;
      elements.modalBody.textContent = description;
      elements.modalFooterLink.setAttribute('href', link);
      break;
    }
    case 'status':
      if (value === 'pending') {
        elements.button.setAttribute('disabled', true);
      } else {
        elements.button.removeAttribute('disabled');
      }
      break;
    default:
      break;
  }
};

export default render;
