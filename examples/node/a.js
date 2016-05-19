var pubsubBuilder = require('../..');
console.log(pubsubBuilder);

var pubSub = pubsubBuilder();
pubSub.subscribe('someEvent', function handler(eventName, data) {
  console.log('Some event fired', data);
});

pubSub.publish('someEvent', 'someData');