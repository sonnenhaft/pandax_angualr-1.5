let statusCorrection = function(Constants) {
	'ngInject';
	
	let statusesViewCorrection = Constants.order.statusesViewCorrection;

  return function(status) {
    return statusesViewCorrection[status] || status;
  };
};

export default statusCorrection;