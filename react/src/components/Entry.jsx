import { useState } from 'react';
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

export const Enter = () => {
  const [inputVal, setInputVal] = useState('');
  const [playerName, setPlayerName] = useState('');

  if (isCookieSet(nameCookieKey)) {
    console.log('cookie');
    setPlayerName(getCookieValue(nameCookieKey));
  } else {
    console.log('no cookie');
  }

  return (
    <div>
      {playerName !== '' && <h2>Welcome back {playerName}!</h2>}

      {playerName === '' && (
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

      <button
        id="enter"
        onClick={() => {
          if (inputVal + playerName === '') {
            return;
          } else if (playerName !== '') {
            <Home playerName={playerName} />;
          } else if (playerName === '' && inputVal !== '') {
            setPlayerName(
              inputVal.replace(/\W/g, '').slice(0, NAME_MAX_LENGTH),
              () =>
                setCookie({
                  name: nameCookieKey,
                  value: playerName,
                  expiryInDays: 10,
                })
            );
          }
        }}
        type="button"
      >
        enter
      </button>
    </div>
  );
};
