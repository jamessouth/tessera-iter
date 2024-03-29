import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import Pusher from 'pusher';

// const morgan = require('morgan');
// const helmet = require('helmet');
// const middlewares = require('./middlewares');
// const api = require('./api');

config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

const dummyUsers = [
  {
    user_id: 0,
    user_info: {
      name: 'Phil',
    },
  },
  {
    user_id: 1,
    user_info: {
      name: 'Bill',
    },
  },
];

function parseCookies(request) {
  const parsedCookies = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return parsedCookies;

  cookieHeader.split(';').forEach((cookie) => {
    // eslint-disable-next-line prefer-const
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    if (!value) return;
    parsedCookies[name] = decodeURIComponent(value);
  });

  return parsedCookies;
}

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app.use(morgan('dev'));
// app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'front')));

// app.get('/', (req, res) => {
//   res.json({
//     message: 'hello',
//   });
// });

// app.use('/api/v1', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

// module.exports = app;

app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const cookies = parseCookies(req);
  const { username } = cookies;

  const user = dummyUsers.find((u) => u.user_info.name === username);
  if (!user) return res.status(403).send('Invalid username');

  const authResponse = pusher.authorizeChannel(socketId, channel, user);

  return res.json({
    ...authResponse,
    channel_data: JSON.stringify(user),
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'front/index.html'));
});

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
