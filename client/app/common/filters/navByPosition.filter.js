function navByPosition() {
  return function(navs, field, val) {
    return _.filter(navs, item => item[field] == val);
  };
}

export default navByPosition;