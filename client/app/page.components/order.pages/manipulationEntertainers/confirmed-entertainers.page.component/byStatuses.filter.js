export default ( ) => (data, statusesAllow) => _.filter(data, item => statusesAllow.indexOf(item.status) >= 0);
