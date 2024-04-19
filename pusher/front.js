import '@alenaksu/json-viewer';
import Pusher from 'pusher-js';

// function setCookie({ name, value, expiryInDays }) {
//   const date = new Date();
//   date.setTime(date.getTime() + expiryInDays * 24 * 60 * 60 * 1000);
//   const expires = `expires=${date.toUTCString()}`;
//   document.cookie = `${name}=${value};${expires};path=/`;
// }
// function createElement({ type, className, html }) {
//   const element = document.createElement(type);
//   element.className = className;
//   element.innerHTML = html;
//   return element;
// }
// function renderMessage({ query, message, className }) {
//   const container = document.querySelector(query);
//   const eventElement = document.createElement();
//   container.appendChild(eventElement);
// }

function getPusherClient() {
//   Pusher.logToConsole = true;
  return new Pusher('fe257281aabc7cebb6f2', { cluster: 'us2' });
}

let channel;

// const loginForm = document.querySelector('#login-form');
// loginForm.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   if (!dummyUsers.find((user) => user.user_info.name === username)) {
//     alert('User not found');
//     return;
//   }
//   setCookie({ name: 'username', value: username, expiryInDays: 1 });
//   renderMessage({
//     query: '#username-display',
//     message: `You have joined as ${username}`,
//     className: 'heading',
//   });

//   loginForm.style.display = 'none';
//   document.querySelector('#chat-area').style.display = 'flex';
const msgs = document.querySelector('.container');
// ...code continues below
// ...continues from above
//   const pusherClient = await getPusherClient();
const pusher = getPusherClient();
channel = pusher.subscribe('private-chat-channel');
//   console.log(channel);
let socketId = null;
pusher.connection.bind("connected", () => {
  socketId = pusher.connection.socket_id;
});
channel.bind('client-chat-event', (data) => {
  if (data) {
    // console.log(typeof data);
    // console.log(data.message);
    // console.log(data);
    // const p = document.createElement('pre');
    // const c = document.createElement('code');
    // p.insertAdjacentElement('beforeend',c);

    // const newContent = document.createTextNode(JSON.stringify(data));
    document.querySelector('#json').data =data;
    // p.appendChild(newContent);

    // msgs.insertAdjacentElement('beforeend', p);

    //   renderMessage({
    //     query: '.messages',
    //     message:  === 'string' ? data : data?.message,
    //     className: 'message',
    //   });
  }
});
// });

// const messageForm = document.querySelector('#message-form');
// messageForm.addEventListener('submit', async (event) => {
//   event.preventDefault();
// async function postBookData(id) {

//   }
//   const input = document.querySelector('#message');
const input = document.querySelector('#data');

document.querySelector('#enter').addEventListener('click', (e) => {
  const message = input.value;

  channel.trigger('client-chat-event', {
    message,
  });

  input.value = '';
});

document.querySelector('#trig').addEventListener('click', async (e) => {
  const bod = {
    book_id: 87,
    fred: true,
    wilma: 'bart',
    socket_id: socketId
  };

  const resp = await fetch('/trigger', {
    method: 'POST',
    body: JSON.stringify(bod),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('bd6666', resp);

  // const bookdata =  resp();
  // console.log("bd",bookdata);
});

// });
