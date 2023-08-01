import type { Story } from './stories';
import type { Comment } from './comments';

const MAX_STORIES = 30;
const ITEM_ENDPOINT_SUFFIX = '.json?print=pretty';
const NEW_STORIES_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
const TOP_STORIES_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
const STORY_ITEM_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/item/';
const USER_ITEM_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/user/';
const COMMENT_ITEM_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/item/';

export const getNewStories = async (): Promise<number[]> => {
  try {
    const response = await fetch(NEW_STORIES_ENDPOINT);
    const newStories = await response.json();
    return newStories.slice(0, MAX_STORIES);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopStories = async (): Promise<number[]> => {
  try {
    const response = await fetch(TOP_STORIES_ENDPOINT);
    const topStories = await response.json();
    return topStories.slice(0, MAX_STORIES);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getStory = async (id: number): Promise<Story> => {
  const response = await fetch(`${STORY_ITEM_ENDPOINT}${id}${ITEM_ENDPOINT_SUFFIX}`);
  const story = await response.json();
  return story;
};

export const getUser = async (id: string) => {
  const response = await fetch(`${USER_ITEM_ENDPOINT}${id}${ITEM_ENDPOINT_SUFFIX}`);
  const user = await response.json();
  return user;
};

export const getComment = async (id: number): Promise<Comment> => {
  const response = await fetch(`${COMMENT_ITEM_ENDPOINT}${id}${ITEM_ENDPOINT_SUFFIX}`);
  const comment = await response.json();
  return comment;
};

export const getComments = async (ids: number[]): Promise<Comment[]> => {
  const commentsData = await Promise.all(ids.map(getComment));
  return commentsData;
};
