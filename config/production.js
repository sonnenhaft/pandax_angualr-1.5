let config = require('./development');
module.exports = Object.assign(config, {
  API_URL: `/api`,
  WS_URL: `wss://${window.location.host}/ws`,
  STRIPE_PUBLIC_KEY: 'pk_test_53uGNlHfMPbElFTnPN8sXQ9N'
});
