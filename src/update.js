import _ from 'lodash';
import request from './request.js';

const update = (watchedState) => {
  watchedState.feeds.forEach((url) => request(url).then((result) => {
    const getCorrectFeed = (element) => element.link === url;
    const correctFeed = watchedState.feedList.find(getCorrectFeed);
    const filteredItems = _.differenceBy(
      result.items,
      watchedState.feedListItems,
      'title',
    );
    const newItems = filteredItems.map((item) => ({
      ...item,
      feedID: correctFeed.id,
      postID: _.uniqueId(),
    }));
    watchedState.feedListItems.push(...newItems);
  }));
};

export default update;
