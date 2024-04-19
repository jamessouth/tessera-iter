import '@alenaksu/json-viewer';
import Pusher from 'pusher-js';

function getPusherClient() {
    Pusher.logToConsole = true;
  return new Pusher('fe257281aabc7cebb6f2', { cluster: 'us2' });
}

let channel;

const msgs = document.querySelector('.container');

const pusher = getPusherClient();
channel = pusher.subscribe('private-totalstate-channel');
channel = pusher.subscribe('private-plr_Kappi-channel');
//   console.log(channel);
let socket_id = null;
pusher.connection.bind('connected', () => {
  socket_id = pusher.connection.socket_id;
});
channel.bind('client-totalstate-event', (data) => {
    console.log('here');
  if (data) {
    document.querySelector('#json').data = data;
  }
});

channel.bind('plr_Kappi-event', (data) => {
  if (data) {
    document.querySelector('#json2').data = data;
  }
});

const input = document.querySelector('#data');
const select = document.querySelector('#actions');

document.querySelector('#enter').addEventListener('click', async (e) => {
  const message = input.value;
  const action = select.value;
  if (action + message === ''){
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
      
      const resp = await fetch('/returndestticket/'+socket_id, {
        method: 'POST',
        body: JSON.stringify(bod),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('bd987', resp);

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

  console.log('bd6666', resp);
});

// });
