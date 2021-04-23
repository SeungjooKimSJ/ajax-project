/* exported savedData */

var savedData = {
  editing: null,
  nextId: 1,
  entries: []
};

var previousSavedDataJSON = localStorage.getItem('bucket-place-storage');

if (previousSavedDataJSON !== null) {
  savedData = JSON.parse(previousSavedDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var savedDataJSON = JSON.stringify(savedData);
  localStorage.setItem('bucket-place-storage', savedDataJSON);
});
