import onChange from 'on-change';
import * as yup from 'yup';
import _ from 'lodash';
import state from './state';
import elements from './elements';
import render from './view';
import { i18nextInstance, setLocales } from './locales';
import request from './request';
import update from './update';

const app = () => {
  setLocales();
  const watchedState = onChange(state, (path, value) => {
    render(path, value, watchedState);
  });

  let updateTimer = setTimeout(function tick() {
    update(watchedState);
    updateTimer = setTimeout(tick, 5000);
  }, 5000);

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
    if (Object.keys(validation).length === 0) {
      watchedState.status = 'pending';
      request(url).then((result) => {
        if (result.message) {
          watchedState.errors = result;
          watchedState.formState = 'invalid';
          watchedState.status = '';
        } else {
          watchedState.feeds.push(url);
          watchedState.status = '';
          watchedState.formState = 'valid';
          const feedID = _.uniqueId();
          const { items, ...rest } = result;
          const formattedResult = {
            ...rest,
            id: feedID,
          };
          const updatedPosts = items
            .map((item) => ({
              ...item,
              feedID,
              postID: _.uniqueId(),
            }))
            .reverse();
          watchedState.feedList.push(formattedResult);
          watchedState.feedListItems.push(...updatedPosts);
        }
      });
    } else {
      watchedState.formState = 'invalid';
      watchedState.errors = validation;
    }
  });
};

export default app;
