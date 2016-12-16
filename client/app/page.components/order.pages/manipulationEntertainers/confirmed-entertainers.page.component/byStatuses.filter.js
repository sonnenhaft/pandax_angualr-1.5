let byStatuses = function() {
  return function(data, statusesAllow) {
    return _.filter(data, item => statusesAllow.indexOf(item.status) >= 0);
  };
}

export default byStatuses;