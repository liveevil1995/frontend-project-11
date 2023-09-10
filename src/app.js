import onChange from 'on-change';
import * as yup from 'yup';
import state from './state';
import elements from './elements';
import render from './view';
import { i18nextInstance, setLocales } from './locales';

const app = () => {
  setLocales();

  const watchedState = onChange(state, (path, value) => {
    render(path, value, watchedState);
  });

  const schema = yup.lazy(() => yup.object().shape({
    url: yup
      .string(i18nextInstance.t('incorrectURL'))
      .required(i18nextInstance.t('empty'))
      .url(i18nextInstance.t('incorrectURL'))
      .notOneOf(watchedState.feeds, i18nextInstance.t('doubleURL')),
  }));

  const validate = (data) => {
    try {
      schema.validateSync(data, { abortEarly: false });
      return {};
    } catch (e) {
      return e;
    }
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const objectData = Object.fromEntries(formData);
    const validation = validate(objectData);
    console.log(validation);
    if (Object.keys(validation).length === 0) {
      watchedState.formState = 'valid';
      watchedState.feeds.push(url);
    } else {
      watchedState.formState = 'invalid';
      watchedState.errors = validation;
    }
  });
};

export default app;
