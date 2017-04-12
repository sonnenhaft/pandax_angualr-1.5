const packageJSON = require('../package.json');

const apiurl = 'dev3-panda-aws.isdev.info/api';

module.exports = {
  VERSION: packageJSON.version,
  // API_URL: `https://${apiurl}`,
  API_URL: '',
  WS_URL: `wss://${apiurl}/ws`
};
