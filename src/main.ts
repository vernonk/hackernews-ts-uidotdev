import type { Story } from './stories';

import menu from './menu';
import visualMode from './visual-mode';
import stories from './stories';
import comments from './comments';
import user from'./user';
import './style.css'

async function render() {
  const appRoot = document.querySelector<HTMLDivElement>('#app')!;
  const layoutContainer = document.createDocumentFragment();
  const header = document.createElement('header');
  header.appendChild(menu());
  header.appendChild(visualMode());
  layoutContainer.appendChild(header);
  const main = document.createElement('main');
  const storiesEl = await stories('top');
  main.appendChild(storiesEl);
  layoutContainer.appendChild(main);
  appRoot.appendChild(layoutContainer);

  document.addEventListener('story:comments', async (event: Event) => {
    const customEvent = event as CustomEvent<{ id: number, story: Story }>;
    const { detail } = customEvent;
    const { story } = detail;
    // append comments container to main
    const commentsContainer = await comments(story);
    main.innerHTML = '';
    main.appendChild(commentsContainer);
  });

  document.addEventListener('story:user', async (event: Event) => {
    const customEvent = event as CustomEvent<{ id: string }>;
    const { detail } = customEvent;
    const { id } = detail;
    console.log('user', id);
    const userContainer = await user(id);
    main.innerHTML = '';
    main.appendChild(userContainer);
  });
}

render();