const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('#url-input'),
  message: document.querySelector('.feedback'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  getLanguagesElements: () => document.querySelectorAll('[data-i18next]'),
};

export default elements;
