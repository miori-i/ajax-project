/* exported data */

var data = {
  view: 'home',
  details: null,
  favorites: [],
  conversation: []
};

// To write the data in entries property before unload, stginfy it
window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-storage', dataJSON);
});

// For iOS Safari (including Chrome and Firefox for iOS) beccause they do not support 'beforeunload'
window.addEventListener('pagehide', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-storage', dataJSON);
});

var $data = localStorage.getItem('javascript-storage');
if ($data !== null) {
  data = JSON.parse($data);
}
