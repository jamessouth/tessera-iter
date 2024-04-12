

import Pusher from 'pusher-js';

function setCookie({ name, value, expiryInDays }) {
  const date = new Date();
  date.setTime(date.getTime() + expiryInDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}
function createElement({ type, className, html }) {
  const element = document.createElement(type);
  element.className = className;
  element.innerHTML = html;
  return element;
}
function renderMessage({ query, message, className }) {
  const container = document.querySelector(query);
  const eventElement = createElement({ type: 'div', className, html: message });
  container.appendChild(eventElement);
  eventElement.scrollIntoView();
}


let channel;

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const input = document.querySelector('#username');
  const username = input.value;

  //   if (!dummyUsers.find((user) => user.user_info.name === username)) {
  //     alert('User not found');
  //     return;
  //   }
  setCookie({ name: 'username', value: username, expiryInDays: 1 });
  renderMessage({
    query: '#username-display',
    message: `You have joined as ${username}`,
    className: 'heading',
  });

  loginForm.style.display = 'none';
  document.querySelector('#chat-area').style.display = 'flex';

  // ...code continues below
  // ...continues from above
  //   const pusherClient = await getPusherClient();
  const pusher = new Pusher('aab0494ac1e7c4890e70', {
    cluster: 'us2',
  });
  console.log(pusher);
  channel = pusher.subscribe('private-chat-channel');
  channel.bind('client-chat-event', (data) => {
    if (data) {
      renderMessage({
        query: '.messages',
        message: typeof data === 'string' ? data : data?.message,
        className: 'message',
      });
    }
  });
});

const messageForm = document.querySelector('#message-form');
messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const input = document.querySelector('#message');
  const message = input.value;

  await channel.trigger('client-chat-event', {
    message,
  });

  renderMessage({
    query: '.messages',
    message: `You: ${message}`,
    className: 'message message-me',
  });

  input.value = '';
});

