import config from 'config';

import 'angular-websocket';

class WebSocket {
  constructor ($websocket, Helper) {
    'ngInject';

    Object.assign(this, { $websocket, Helper });
  }

  invites (channelName = '', onMessage = angular.noop, onOpen = angular.noop) {
    this.dataStream = this.$websocket(`${config.WS_URL}/orders/${channelName}/invites`).onOpen(response => {
      console.log('onOpen:', response);
      onOpen( );
    }).onClose(response => {
      console.log('onClose:', response);
    }).onMessage(message => {
      console.log('onmessage:', message);
      const data = JSON.parse(message.data);
      if (data.action == 'close') {
        this.dataStream.close( );
      } else if (data.code == 404) {
        this.Helper.showToast(data.message, 8000);
      } else {
        onMessage(data);
      }
      return data;
    });
  }

  close ( ) {
    console.log('close directly:');
    this.dataStream.close( );
  }
}

export default angular.module('WebSocket', [
  'angular-websocket'
]).service('WebSocket', WebSocket).name;
