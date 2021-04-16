/* exported data */

var savedData = [];

var previousSavedDataJSON = localStorage.getItem('bucket-place-storage');

if (previousSavedDataJSON !== null) {
  savedData = JSON.parse(previousSavedDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var savedDataJSON = JSON.stringify(savedData);
  localStorage.setItem('bucket-place-storage', savedDataJSON);
});
