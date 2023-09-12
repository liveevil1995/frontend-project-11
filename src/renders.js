import { i18nextInstance } from './locales/index.js';
import elements from './elements.js';
import state from './state.js';

const renderFeed = () => {
  elements.feeds.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  elements.feeds.append(card);
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18nextInstance.t('feeds');
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
};

const renderPost = () => {
  elements.posts.innerHTML = '';
  const cardPosts = document.createElement('div');
  cardPosts.classList.add('card', 'border-0');
  elements.posts.append(cardPosts);
  const cardBodyPosts = document.createElement('div');
  cardBodyPosts.classList.add('card-body');
  cardPosts.append(cardBodyPosts);
  const titlePosts = document.createElement('h2');
  titlePosts.classList.add('card-title', 'h4');
  titlePosts.textContent = i18nextInstance.t('posts');
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
    button.textContent = i18nextInstance.t('postButton');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.setAttribute('data-bs-title', item.title);
    button.setAttribute('data-bs-link', item.link);
    button.setAttribute('data-bs-description', item.description);
    itemLi.append(button);
    ulPosts.prepend(itemLi);
    elements.posts.append(ulPosts);
  });
};

export { renderFeed, renderPost };
