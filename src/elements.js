const modal = document.querySelector('#modal');
const form = document.querySelector('.rss-form');
const elements = {
  form,
  input: form.querySelector('#url-input'),
  button: form.querySelector('.btn'),
  message: document.querySelector('.feedback'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  modal,
  modalTitle: modal.querySelector('.modal-title'),
  modalBody: modal.querySelector('.modal-body'),
  modalFooter: modal.querySelector('.modal-footer'),
  modalFooterLink: modal.querySelector('.modal-footer a'),
  getLanguagesElements: () => document.querySelectorAll('[data-i18next]'),
};

export default elements;
