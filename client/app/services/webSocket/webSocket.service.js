export default class WebSocket {

  constructor (Constants, $websocket) {
    'ngInject';

    _.assign(this, {
      Constants, 
      $websocket,
      dataStream: {}
    });

  }

  open (channelName) {    
console.log('WebSocket service. Open');
/*    if (channelName || !channelName.length) {
      return;
    }*/

    this.dataStream = this.$websocket(this.Constants.api.ws.invites.uri(channelName));

    return this.dataStream;
  }

  invites (channelName = '') {
    this.open(channelName);
    
    this.dataStream.onOpen((response) => {
console.log('open', response);
    });

    this.dataStream.onMessage((message) => {
console.log('message', message);
    });
  }

}
