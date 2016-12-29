var apiurl = 'dev3-panda-aws.isdev.info/api';

module.exports = Object.assign({
  VERSION: '0.0.2',
}, {
  // API_URL: `https://${apiurl}`,
  API_URL: `/api`,
  WS_URL: `wss://${apiurl}/ws`,
  STRIPE_PUBLIC_KEY: 'pk_test_53uGNlHfMPbElFTnPN8sXQ9N'
});
