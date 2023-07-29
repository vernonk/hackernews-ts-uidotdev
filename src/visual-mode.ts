export default function visualMode() {
  const container = document.createDocumentFragment();
  const div = document.createElement('div');
  const button = document.createElement('button');
  button.innerHTML = '💡';
  button.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) {
      button.innerHTML = '🔦';
    } else {
      button.innerHTML = '💡';
    }
  });
  div.appendChild(button);
  container.appendChild(div);
  return container;
};
