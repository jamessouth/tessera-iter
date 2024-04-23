import Pusher from 'pusher-js';
import {
    useRef,
    useState,
} from 'react';

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




export const Home = () => {
    const inputBox = useRef(null);
    const [inputText, setInputText] = useState('');
    const [socket_id, setSocket_id] = useState(null);
    const [totalstate_channel, setTotalstate_channel] = useState(null);
    const [player_channel, setPlayer_channel] = useState(null);
    const [cookiebool, setCookiebool] = useState(false);


    // useEffect(() => {
    
    //   }, []);

    if (cookieExists()){
        console.log('cookie');
        setCookiebool(true);
    } else {
        console.log('no cookie');
    }


    return (
        <div className="container">
          <div id="chat-area">
            <div className="messages"></div>
            <select name="actions" id="actions">
              <option value="enter name">enter name</option>
              <option value="draw train card from deck">draw train card from deck</option>
              <option value="draw train card from table">draw train card from table</option>
              <option value="discard dest ticket">discard dest ticket</option>
              <option value="">p1</option>
              <option value="">p2</option>
            </select>



            <input
        autoComplete="off"
        autoFocus
        id="inputbox"
        onChange={(e) => setInputText(e.target.value)}
        ref={inputBox}
        spellCheck="false"
        type="text"
        value={inputText}
      />



            <button id="enter">enter</button>
            <button id="trig">trig</button>
          </div>
          <h2>total state</h2>
          <h2>personal state</h2>
        </div>
    );
}




