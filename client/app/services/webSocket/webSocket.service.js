export default class WebSocket {

  constructor (Constants, $websocket) {
    'ngInject';

    _.assign(this, {
      Constants, 
      $websocket,
      dataStream: {}
    });

  }

  open (channelName, cbOnOpen) {    
    /*  
      ToDo: add check  
      if (channelName || !channelName.length) {
        return;
      }
    */

    this.dataStream = this.$websocket(this.Constants.api.ws.invites.uri(channelName));

    this.dataStream.onOpen((response) => {
console.log('open', response);
      if (cbOnOpen) {
        cbOnOpen();
      }
    });

    return this.dataStream;
  }

  invites (channelName = '', cbOnMessage, cbOnOpen) {
    this.open(channelName, cbOnOpen);
    
    this.dataStream.onMessage((message) => {
console.log('message', message);
      if (cbOnMessage) {
        cbOnMessage();
      }
    });
  }

}
