const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('#url-input'),
  message: document.querySelector('.feedback'),
  getLanguagesElements: () => document.querySelectorAll('[data-i18next]'),
};

export default elements;
