// @flow
import playSound from './playSound';
import Twit from 'twit';

const auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

function createStream() {
  const t = new Twit(auth);

  try {
    const stream = t.stream('statuses/filter', {
      track: '#dorfleaks',
    });

    stream.on('tweet', tweet => {
      // eslint-disable-next-line no-console
      console.log('Found tweet:', tweet);
      playSound();
    });

    stream.on('disconnect', message => {
      // eslint-disable-next-line no-console
      console.log(`Disconnected from twitter, ${message}`);
      createStream();
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`failed to create twitter stream. ${e}`);
    setTimeout(createStream, 5000);
  }
}

createStream();
