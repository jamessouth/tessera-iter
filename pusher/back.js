import cors from "cors";
import { config } from 'dotenv';
import express from 'express';
import * as path from 'path';
import Pusher from 'pusher';
import { fileURLToPath } from 'url';
// import { produce } from 'immer';
import GameState from "./GameState.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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



// this.players[0].name = 'Kappi';
// this.players[1].name = 'Maour';
// this.players[2].name = "Klo"
// this.players[3].name = "Von"
// this.players[4].name = "Skuggi"


const baseState = new GameState([
    {name: 'Kappi', socketId: 1},
    {name: 'Maour', socketId: 2},
]);



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
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
//   const cookies = parseCookies(req);
//   const { username } = cookies;

  const user = dummyUsers[0];
//   if (!user) return res.status(403).send('Invalid username');
  
  const authResponse = pusher.authorizeChannel(socketId, channel, user);
  
  return res.json({
      ...authResponse,
      channel_data: JSON.stringify(user),
    });
});

app.post("/updatestate", (req, res) => {
    // const socketId = req.body.socket_id;
    console.log();
    console.log(req.body);
    console.log();
    pusher.trigger(
      "private-totalstate-channel",
      "client-totalstate-event",
      baseState,
    //   {
    //     message: "hello world",
    //     data: "5",
    //     num:3
    //   },
    //   {
    //     socket_id: socketId,
    //   }
    );
    res.json({
        message : "Book added successfully"});
  });
app.post("/returndestticket/:socket_id", (req, res) => {
    const socket_id_body = req.body.socket_id;
    const socket_id_query = req.params.socket_id;
    console.log(socket_id_body,socket_id_query);
    console.log(req.body);
    console.log();
    pusher.trigger(
      "private-plr_Kappi-channel",
      "plr_Kappi-event",
      baseState,
    //   {
    //     message: "hello world",
    //     data: "5",
    //     num:3
    //   },
    //   {
    //     socket_id: socketId,
    //   }
    );
    res.json({
        message : "Book added succesfully"});
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use((req, res, next) => {
  res.status(404).send('error');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


// function parseCookies(request) {
//   const parsedCookies = {};
//   const cookieHeader = request.headers?.cookie;
//   if (!cookieHeader) return parsedCookies;

//   cookieHeader.split(';').forEach((cookie) => {
//     let [name, ...rest] = cookie.split('=');
//     name = name?.trim();
//     if (!name) return;
//     const value = rest.join('=').trim();
//     if (!value) return;
//     parsedCookies[name] = decodeURIComponent(value);
//   });

//   return parsedCookies;
// }
