import type { Story } from './stories';
import { createStory  } from './stories';
import { getComments } from './api';
import { formatDate } from './utils';

export interface Comment {
  id: number;
  by: string;
  text: string;
  time: number;
}

function commentContainer(comment: Comment) {
  const container = document.createElement('div');
  container.classList.add('comment');
  const commentMeta = document.createElement('div');
  commentMeta.classList.add('comment-meta');
  const commentAuthor = document.createElement('a');
  commentAuthor.classList.add('comment-author');
  commentAuthor.href = `#${comment.by}`;
  commentAuthor.textContent = comment.by;
  commentMeta.appendChild(commentAuthor);
  const commentTime = document.createElement('span');
  commentTime.classList.add('comment-time');
  commentTime.textContent = ` on ${formatDate(comment.time)}`;
  commentMeta.appendChild(commentTime);
  container.appendChild(commentMeta);
  const commentText = document.createElement('div');
  commentText.classList.add('comment-text');
  commentText.innerHTML = comment.text;
  container.appendChild(commentText);
  return container;
}

export default async function comments(story: Story) {
  const comments = await getComments(story.kids);
  const container = document.createDocumentFragment();
  const storyContainer = await createStory(story, { containerTag: 'div', titleHeading: true });
  container.appendChild(storyContainer);
  const commentsContainer = document.createElement('div');
  commentsContainer.classList.add('comments');
  comments.forEach((comment: Comment) => {
    commentsContainer.appendChild(commentContainer(comment));
  });
  container.appendChild(commentsContainer);
  return container;
}