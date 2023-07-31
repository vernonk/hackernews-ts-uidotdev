import { getNewStories, getStory, getTopStories } from './api';

type StoryTypes = 'top' | 'new';

export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  time: number;
  title: string;
  url: string;
}

function commentsHandler(event: MouseEvent) {
  event.preventDefault();
  const { currentTarget } = event;
  const { hash } = currentTarget as HTMLAnchorElement;
  const storyId = hash.split('#')[1];
  document.dispatchEvent(new CustomEvent('story:comments', {
    detail: {
      id: storyId,
    },
  }));
}

function userHandler(event: MouseEvent) {
  event.preventDefault();
  const { currentTarget } = event;
  const { hash } = currentTarget as HTMLAnchorElement;
  const userId = hash.split('#')[1];
  document.dispatchEvent(new CustomEvent('story:user', {
    detail: {
      id: userId,
    },
  }));
}

function createStory(story: Story) : HTMLLIElement {
  const storyContainer = document.createElement('li');
  storyContainer.classList.add('story');
  const storyTitle = document.createElement('a');
  storyTitle.classList.add('story-title');
  storyTitle.href = story.url;
  storyTitle.textContent = story.title;
  const storyDetails = document.createElement('p');
  storyDetails.classList.add('story-details');
  const byText = document.createTextNode('by ');
  const storyAuthor = document.createElement('a');
  storyAuthor.classList.add('story-author');
  storyAuthor.href = `#${story.by}`;
  storyAuthor.textContent = story.by;
  storyAuthor.addEventListener('click', userHandler);
  const storyTime = document.createElement('span');
  storyTime.classList.add('story-time');
  storyTime.textContent = ` on ${new Date(story.time * 1000).toLocaleString()}`;
  const withText = document.createTextNode(' with ');
  const comments = document.createElement('a');
  comments.classList.add('story-comments');
  comments.href = `#${story.id}`;
  comments.textContent = `${story.descendants}`;
  comments.addEventListener('click', commentsHandler);
  const commentsText = document.createTextNode(' comments');
  storyDetails.appendChild(byText);
  storyDetails.appendChild(storyAuthor);
  storyDetails.appendChild(storyTime);
  storyDetails.appendChild(withText);
  storyDetails.appendChild(comments);
  storyDetails.appendChild(commentsText);
  storyContainer.appendChild(storyTitle);
  storyContainer.appendChild(storyDetails);
  return storyContainer;
}

let newStoriesCache: Story[] = [];
let topStoriesCache: Story[] = [];

export default async function stories(type: StoryTypes) {
  let storyCache = type === 'top' ? topStoriesCache : newStoriesCache;
  let storyList: Story[] | number[];
  if (storyCache.length) {
    storyList = storyCache.map((story) => story.id);
  } else {
    storyList = type === 'top' ? await getTopStories() : await getNewStories();
  }
  const container = document.createDocumentFragment();
  const storiesContainer = document.createElement('ul');
  storiesContainer.classList.add('stories');
  let storyData: Story[];
  if (storyCache.length) {
    storyData = storyCache;
  } else {
    storyData = await Promise.all(storyList.map(getStory));
    if (type === 'top') {
      topStoriesCache = storyData;
    } else {
      newStoriesCache = storyData;
    }
  }
  storyData.forEach((story) => {
    storiesContainer.appendChild(createStory(story));
  });
  container.appendChild(storiesContainer);
  return container;
};