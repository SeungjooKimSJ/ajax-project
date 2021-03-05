/* exported data */

var savedData = [];

var previousSavedDataJSON = localStorage.getItem('javascript-local-storage');

if (previousSavedDataJSON !== null) {
  savedData = JSON.parse(previousSavedDataJSON);
};

window.addEventListener('beforeunload', function (event) {
  var savedDataJSON = JSON.stringify(savedData);
  localStorage.setItem('javascript-local-storage', savedDataJSON);
});
