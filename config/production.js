let config = require('./development');
module.exports = Object.assign(config, {
  API_URL: `${window.location.protocol}//${window.location.host}/api`,
  WS_URL: `wss://${window.location.host}/ws`,
  STRIPE: {
    PUBLIC_KEY: 'pk_test_53uGNlHfMPbElFTnPN8sXQ9N'
  },
});
