const data = {}
let localStorage = {
  getItem(key) {return data[key]},
  setItem(key){return data[key]}
}

try {
  // try to use localStorage
  window.localStorage.test = 'test';
  localStorage = window.localStorage
} catch (e) {
  console.log(localStorage)

}

export default localStorage
