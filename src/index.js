(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.pubSubLib = factory();
  }
}(this, function () {
  //TODO: add sync/async option
  var subUid = 0;

  var subscribe = function(topic, func, store){
    if (!store[topic]) {
      store[topic] = [];
    }
    var token = (++subUid).toString();
    store[topic].push({
      token: token,
      func: func
    });
    return token;
  };

  var publish = function(topic, args, store){
    if (!store[topic]) {
      return false;
    }
    var handle = function(){
      var subscribers = store[topic],
        len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].func(topic, args);
      }
    };
    //setTimeout(hadle, 0);
    handle();
    return true;
  };

  var unsubscribe = function(token, store){
    for (var m in store) {
      if (store[m]) {
        for (var i = 0, j = store[m].length; i < j; i++) {
          if (store[m][i].token === token) {
            store[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  };

  var pubsubBuilder =  function(){
    var store = {};
    return {
      subscribe: function(topic, func){
        return subscribe(topic, func, store);
      },
      publish: function(topic, data){
        return publish(topic, data, store);
      },
      unsubscribe: function(token){
        return unsubscribe(token, store);
      }
    };
  };
  return pubsubBuilder;
}));
