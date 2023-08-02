import { createStory } from './stories';
import { getUser, getUserStories } from './api';
import { formatDate } from './utils';

export interface User {
  id: string;
  created: number;
  karma: number;
  about: string;
  submitted: number[];
}

export default async function user(id: string) {
  const userData = await getUser(id);
  const userStories = await getUserStories(userData.submitted);
  const container = document.createDocumentFragment();
  const userContainer = document.createElement('div');
  userContainer.classList.add('user');
  const userMeta = document.createElement('div');
  userMeta.classList.add('user-meta');
  const username = document.createElement('h1');
  username.textContent = userData.id;
  const userSubdata = document.createElement('div');
  userSubdata.classList.add('user-subdata');
  const userJoined = document.createElement('strong');
  userJoined.classList.add('user-created');
  userJoined.textContent = formatDate(userData.created);
  const userKarmaNumber = document.createElement('strong');
  userKarmaNumber.textContent = userData.karma;
  const userAbout = document.createElement('div');
  userAbout.innerHTML = userData.about;
  const userStoriesContainer = document.createElement('div');
  userStoriesContainer.classList.add('user-stories');
  const storyContainer = document.createElement('ul');
  userStories.forEach((story) => {
    storyContainer.appendChild(createStory(story));
  });
  userStoriesContainer.appendChild(storyContainer);
  
  container.appendChild(userContainer);
  userContainer.appendChild(userMeta);
  userMeta.appendChild(username);
  userMeta.appendChild(userSubdata);
  userSubdata.appendChild(document.createTextNode('joined '));
  userSubdata.appendChild(userJoined);
  userSubdata.appendChild(document.createTextNode(' has '));
  userSubdata.appendChild(userKarmaNumber);
  userSubdata.appendChild(document.createTextNode(' karma'));
  userMeta.appendChild(userAbout);
  userContainer.appendChild(userStoriesContainer);
  return container;
};