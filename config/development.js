var apiurl = 'dev3-panda-aws.isdev.info/api';
module.exports = {
  API_URL: 'https://' + apiurl,
  COPYRIGHT: (new Date()).getFullYear() + 'Panda',
  VERSION: '0.0.1',
  STRIPE: {
  	PUBLIC_KEY: 'pk_test_53uGNlHfMPbElFTnPN8sXQ9N'
  },
  WS_URL: 'wss://' + apiurl + '/ws',
};
