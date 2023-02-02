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

var $data = localStorage.getItem('javascript-storage');
if ($data !== null) {
  data = JSON.parse($data);
}
