export const utilService = {
  makeId,
  formatedPrice,
  getRandomInt,
  saveToStorage,
  loadFromStorage
}

function formatedPrice(lang, currency, price) {
  return new Intl.NumberFormat(lang, { style: 'currency', currency }).format(price)
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function makeId(length = 8) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return (data) ? JSON.parse(data) : undefined;
}
