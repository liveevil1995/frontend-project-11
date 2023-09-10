import elements from './elements.js';
import state from './state.js';
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
    case 'feedList':
      elements.feeds.innerHTML = '';
      const card = document.createElement('div');
      card.classList.add('card', 'border-0');
      elements.feeds.append(card);
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      card.append(cardBody);
      const cardTitle = document.createElement('h2');
      cardTitle.classList.add('card-title', 'h4');
      cardTitle.textContent = 'Фиды';
      cardBody.append(cardTitle);
      const ul = document.createElement('ul');
      ul.classList.add('list-group', 'border-0', 'rounded-0');
      state.feedList.forEach((feed) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'border-0', 'border-end-0');
        const h3 = document.createElement('h3');
        h3.classList.add('h6', 'm-0');
        h3.textContent = feed.title;
        const p = document.createElement('p');
        p.classList.add('m-0', 'small', 'text-black-50');
        p.textContent = feed.description;
        li.append(h3, p);
        ul.prepend(li);
        elements.feeds.append(ul);
      });
      break;
    case 'feedListItems':
    case 'openModal':
      elements.posts.innerHTML = '';
      const cardPosts = document.createElement('div');
      cardPosts.classList.add('card', 'border-0');
      elements.posts.append(cardPosts);
      const cardBodyPosts = document.createElement('div');
      cardBodyPosts.classList.add('card-body');
      cardPosts.append(cardBodyPosts);
      const titlePosts = document.createElement('h2');
      titlePosts.classList.add('card-title', 'h4');
      titlePosts.textContent = 'Посты';
      cardBodyPosts.append(titlePosts);
      const ulPosts = document.createElement('ul');
      ulPosts.classList.add('list-group', 'border-0', 'rounded-0');
      state.feedListItems.forEach((item) => {
        const itemLi = document.createElement('li');
        itemLi.classList.add(
          'list-group-item',
          'd-flex',
          'justify-content-between',
          'align-items-start',
          'border-0',
          'border-end-0',
        );
        itemLi.setAttribute('data-postId', item.postID);
        const a = document.createElement('a');
        a.setAttribute('href', item.link);
        a.setAttribute('target', '_blank');
        a.textContent = item.title;
        if (state.openModal.includes(item.postID)) {
          a.classList.add('fw-normal', 'link-secondary');
        } else {
          a.classList.add('fw-bold');
        }
        itemLi.append(a);
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        button.textContent = 'Просмотр';
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#modal');
        button.setAttribute('data-bs-title', item.title);
        button.setAttribute('data-bs-link', item.link);
        button.setAttribute('data-bs-description', item.description);
        itemLi.append(button);
        ulPosts.prepend(itemLi);
        elements.posts.append(ulPosts);
      });
    case 'modal': {
      const { title, link, description } = watchedState.modal;
      elements.modalTitle.textContent = title;
      elements.modalBody.textContent = description;
      elements.modalFooterLink.setAttribute('href', link);
      break;
    }
    case 'status': {
      if (value === 'pending') {
        console.log(elements.button)
        elements.button.setAttribute('disabled', true);
      } else {
        elements.button.removeAttribute('disabled');
      }
    }
  }
};

export default render;
