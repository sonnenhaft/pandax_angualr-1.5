let config = require('./development');
module.exports = Object.assign(config, {
  API_URL: ``,
  WS_URL: `wss://${window.location.host}/ws`
});
