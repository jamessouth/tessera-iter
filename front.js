import '@alenaksu/json-viewer';
import Pusher from 'pusher-js';

//from pusher tutorial
function getPusherClient() {
  Pusher.logToConsole = true;
  return new Pusher('fe257281aabc7cebb6f2', { cluster: 'us2' });
}
//adapted from pusher tutorial
function setCookie({ name, value, expiryInDays }) {
  const date = new Date();
  date.setTime(date.getTime() + expiryInDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
}
//adapted from mdn document.cookie ex 5
function cookieExists() {
      return document.cookie.split(";").some((k) => k.trim().startsWith("tessera_iter_username="));
  }
function getNameCookieValue() {
      return document.cookie.split(";").find((k) => k.trim().startsWith("tessera_iter_username=")).split('=')[1];
  }

let socket_id = null;
let totalstate_channel, player_channel;

// const msgs = document.querySelector('.container');
let cookiebool = false;
if (cookieExists()){
    console.log('cookie');
    cookiebool = true;
} else {
    console.log('no cookie');
}

const input = document.querySelector('#data');
const select = document.querySelector('#actions');

document.querySelector('#enter').addEventListener('click', async (e) => {
  const message = input.value;
  const action = select.value;
  if (action + message === '') {
    return;
  }
  if (action === 'discard dest ticket' && message === '') {
    alert('must input index to discard');
  }
  if (action === 'discard dest ticket' && message !== '') {
    const bod = {
      message,
      socket_id,
    };

    const resp = await fetch('/returndestticket/' + socket_id, {
      method: 'POST',
      body: JSON.stringify(bod),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //   console.log('bd987', resp);
  }
  if (action === 'enter name' && (message !== '' || cookiebool)) {
let name;
    if (!cookiebool){

        name = message.replace(/\W/ig, '').slice(0,12);
        setCookie({ name: 'tessera_iter_username', value: name, expiryInDays: 1 });
    } else {
        name = getNameCookieValue();
    }

    const pusher = getPusherClient();

    pusher.connection.bind('connected', () => {
      socket_id = pusher.connection.socket_id;
    
      totalstate_channel = pusher.subscribe('private-totalstate-channel');
      player_channel = pusher.subscribe(`private-${socket_id}-channel`);
    
      totalstate_channel.bind('client-totalstate-event', (data) => {
        if (data) {
          document.querySelector('#json').data = data;
        }
      });

      totalstate_channel.bind('pusher:subscription_count', (data) => {
        if (data) {
        console.log(data);

            const sub_count = document.createElement('p');
            const player_name = document.createElement('p');
            sub_count.textContent = 'players: '+data.subscription_count;
            player_name.textContent = 'hello '+name;
            document.querySelector('.messages').insertAdjacentElement('afterbegin',sub_count);
            document.querySelector('.messages').insertAdjacentElement('afterbegin',player_name);


        }
      });
    
      player_channel.bind('player-event', (data) => {
        if (data) {
          document.querySelector('#json2').data = data;
        }
      });
    });
    
  }
  console.log(message, action);
  //   channel.trigger('client-chat-event', {
  //     message,
  //   });

  input.value = '';
});

document.querySelector('#trig').addEventListener('click', async (e) => {
  const bod = {
    book_id: 87,
    fred: true,
    wilma: 'bart',
    socket_id,
  };

  const resp = await fetch('/updatestate', {
    method: 'POST',
    body: JSON.stringify(bod),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //   console.log('bd6666', resp);
});

// });
