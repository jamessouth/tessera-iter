import express from 'express';
import { config } from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Pusher from 'pusher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

const app = express();
const port = 3000;
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/pusher/auth', (req, res) => {
    console.log(req.body);
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

app.use((req, res, next) => {
  res.status(404).send('error');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

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
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    if (!value) return;
    parsedCookies[name] = decodeURIComponent(value);
  });

  return parsedCookies;
}

// const app = express();
// const port = process.env.PORT || 5000;
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'front')));

// app.get('/', (req, res) => {
//   res.json({
//     message: 'hello',
//   });
// });

// app.use('/api/v1', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

// module.exports = app;
