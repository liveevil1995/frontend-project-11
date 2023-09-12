import axios from 'axios';
import { i18nextInstance } from './locales/index.js';
import rssParser from './parser.js';

const getLink = (url) => {
  const resultUrl = new URL('https://allorigins.hexlet.app/get');
  resultUrl.searchParams.set('disableCache', 'true');
  resultUrl.searchParams.set('url', url);
  return resultUrl;
};

const request = (url) => axios
  .get(getLink(url), { timeout: 5000 })
  .then((data) => rssParser(data, url))
  .catch(() => ({ message: i18nextInstance.t('networkError') }));

export default request;
