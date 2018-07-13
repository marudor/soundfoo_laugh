"use strict";

var _playSound = _interopRequireDefault(require("./playSound"));

var _twit = _interopRequireDefault(require("twit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

function createStream() {
  const t = new _twit.default(auth);

  try {
    const stream = t.stream('statuses/filter', {
      track: '#dorfleaks'
    });
    stream.on('tweet', tweet => {
      console.log('Found tweet:', tweet);
      (0, _playSound.default)();
    });
    stream.on('disconnect', message => {
      console.log(`Disconnected from twitter, ${message}`);
      createStream();
    });
  } catch (e) {
    console.log(`failed to create twitter stream. ${e}`);
    setTimeout(createStream, 5000);
  }
}

createStream();