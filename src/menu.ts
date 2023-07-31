import stories from './stories';

async function handleMenuClick(event: MouseEvent) {
  event.preventDefault();
  const { currentTarget } = event;
  const { hash } = currentTarget as HTMLAnchorElement;
  const activeItem = document.querySelector('.menu-item.active');
  if (activeItem) {
    activeItem.classList.remove('active');
  }
  if (currentTarget instanceof HTMLElement) {
    currentTarget.classList.toggle('active');
  }
  let storyList: DocumentFragment;
  if (hash === '#topstories') {
    storyList = await stories('top');
  } else if (hash === '#newstories') {
    storyList = await stories('new');
  } else {
    const empty = document.createDocumentFragment();
    empty.appendChild(document.createTextNode('No stories found'));
    storyList = empty;
  }
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
    main.appendChild(storyList);
  }
}

export default function menu() {
  const container = document.createDocumentFragment();
  const menu = document.createElement('nav');
  menu.classList.add('menu');
  const menuItems = [
    {
      name: 'Top',
      url: 'topstories',
    },
    {
      name: 'New',
      url: 'newstories',
    },
  ];
  menuItems.forEach((item, i) => {
    const menuItem = document.createElement('a');
    menuItem.classList.add('menu-item');
    if (i === 0) {
      menuItem.classList.add('active');
    }
    menuItem.textContent = item.name;
    menuItem.href = `#${item.url}`;
    menuItem.addEventListener('click', handleMenuClick);
    menu.appendChild(menuItem);
  }
  );
  container.appendChild(menu);
  return container;
};
