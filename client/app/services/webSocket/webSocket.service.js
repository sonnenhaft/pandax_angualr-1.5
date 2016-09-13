export default class WebSocket {

  constructor (Constants, $websocket) {
    'ngInject';

    _.assign(this, {
      Constants, 
      $websocket,
      dataStream: {}
    });

  }

  open (channelName, cbOnOpen, cbOnClose) {    
    this.dataStream = this.$websocket(this.Constants.api.ws.invites.uri(channelName));

    this.dataStream.onOpen((response) => {
console.log('onOpen:', response)
      if (cbOnOpen) {
        cbOnOpen();
      }
    });

    this.dataStream.onClose((response) => {
console.log('onClose:', response)
      if (cbOnClose) {
        cbOnClose();
      }
    });

    return this.dataStream;
  }

  invites (channelName = '', cbOnMessage, cbOnOpen) {
    this.open(channelName, cbOnOpen);
    
    this.dataStream.onMessage((message) => {
console.log('onmessage:', message)
      if (cbOnMessage) {
        cbOnMessage(JSON.parse(message.data));
      }
    });
  }

  close () {
console.log('close manualy');
    this.dataStream.close();
  }

}
