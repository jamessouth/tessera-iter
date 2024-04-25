// import Pusher from 'pusher-js';
import {
    useState
} from 'react';

//from pusher tutorial
// function getPusherClient() {
//     Pusher.logToConsole = true;
//     return new Pusher('fe257281aabc7cebb6f2', { cluster: 'us2' });
//   }






export const Home = ({playerName}) => {
    // const inputBox = useRef(null);
    // const select = useRef(null);
  
    const [inputVal, setInputVal] = useState('');
    const [selectVal, setSelectVal] = useState('');
    // const [socket_id, setSocket_id] = useState(null);
    // const [totalstate_channel, setTotalstate_channel] = useState(null);
    // const [player_channel, setPlayer_channel] = useState(null);


    // useEffect(() => {
    
    //   }, []);




    return (
        <div className="container">
          <div id="chat-area">
            {playerName}
            <div className="messages"></div>
            <select 
             id="actions"
             onChange={(e) => setSelectVal(e.target.value)}
            //  ref={select}
             value={selectVal}
             >
              <option value="enter name">enter name</option>
              <option value="draw train card from deck">draw train card from deck</option>
              <option value="draw train card from table">draw train card from table</option>
              <option value="discard dest ticket">discard dest ticket</option>
              <option value="p1">p1</option>
              <option value="p2">p2</option>
            </select>

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

            <button 
            id="enter" 
            onClick={async () => {
                if (inputVal + selectVal === ''){
                    return;
                }
                if (selectVal === 'discard dest ticket' && inputVal === '') {
                    alert('must input index to discard');
                    return;
                  }

                //   if (selectVal === 'discard dest ticket' && inputVal !== '') {
                //     const bod = {
                //       message:inputVal,
                //       socket_id,
                //     };
                
                //     const resp = await fetch('/returndestticket/' + socket_id, {
                //       method: 'POST',
                //       body: JSON.stringify(bod),
                //       headers: {
                //         'Content-Type': 'application/json',
                //       },
                //     });
                
                //     //   console.log('bd987', resp);
                //   }

                
              }}
            type="button"
            >enter</button>
            <button id="trig"  type="button">trig</button>
          </div>
          <h2>total state</h2>
          <h2>personal state</h2>
        </div>
    );
}




