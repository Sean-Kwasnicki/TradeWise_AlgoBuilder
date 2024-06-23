const WebSocket = require('ws');
const API_KEY = 'clt3pdhr01qhnjgr4v0gclt3pdhr01qhnjgr4v10';
const ws = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

const subscribe = (symbol, callback) => {
  ws.send(JSON.stringify({ type: 'subscribe', symbol }));

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.s === symbol) {
      callback(message.p);
    }
  };
};

const unsubscribe = (symbol) => {
  ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
};

export { subscribe, unsubscribe };
