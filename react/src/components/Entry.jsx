import { useEffect, useState } from 'react';
import { Home } from './Home.jsx';

const nameCookieKey = 'tessera_iter_username=';
const NAME_MAX_LENGTH = 12;

//adapted from mdn document.cookie ex 5
function isCookieSet(key) {
  return document.cookie.split(';').some((k) => k.trim().startsWith(key));
}
function getCookieValue(key) {
  return document.cookie
    .split(';')
    .find((k) => k.trim().startsWith(key))
    .split('=')[1];
}
//adapted from pusher tutorial
function setCookie({ name, value, expiryInDays }) {
  const date = new Date();
  date.setTime(date.getTime() + expiryInDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}${value};${expires};path=/;SameSite=Strict`;
}

export const Entry = () => {
  const [inputVal, setInputVal] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [goIn, setGoIn] = useState(false);

  useEffect(() => {
    if (playerName === '') return;
    setCookie({
      name: nameCookieKey,
      value: playerName,
      expiryInDays: 10,
    });
    setGoIn(true);

  }, [playerName]);

  useEffect(() => {
    if (isCookieSet(nameCookieKey)) {
      console.log('cookie');
      setPlayerName(getCookieValue(nameCookieKey));
    } else {
      console.log('no cookie');
    }
  }, []);

  return (
    <div>
      {playerName !== '' && goIn && <Home playerName={playerName} />}
      {playerName !== '' && !goIn && <h2>Welcome back {playerName}!</h2>}
      {!goIn && playerName === '' && (
        <input
          autoComplete="off"
          autoFocus
          id="inputbox"
          onChange={(e) => setInputVal(e.target.value)}
          // ref={inputBox}
          spellCheck="false"
          type="text"
          value={inputVal}
        />
      )}
      
      {!goIn && (
        <button
          id="enter"
          className="m-4 bg-blue-600"
          onClick={() => {
            if (inputVal + playerName === '') {
              return;
            } else if (playerName !== '') {
              setGoIn(true);
            } else if (playerName === '' && inputVal !== '') {
              setPlayerName(
                inputVal.replace(/\W/g, '').slice(0, NAME_MAX_LENGTH)
              );
            }
          }}
          type="button"
        >
          enter
        </button>
      )}
    </div>
  );
};
