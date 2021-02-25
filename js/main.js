var $searchIcon = document.querySelector('.header-search-icon');
var $mainFirstBtn = document.querySelector('.main-first-btn');

function clickSearch(event) {
  var $greeting = document.querySelector('.greeting');
  $greeting.textContent = 'Where are your places';
};

$searchIcon.addEventListener('click', clickSearch);
$mainFirstBtn.addEventListener('click', clickSearch);


// function searchPlaces(event) {
//   var $formSearch = document.createElement('form');
//   var $label = document.createElement('label');

//   var $labelInput = document.createElement('input');
//   $labelInput.setAttribute('type', 'search');
//   $labelInput.setAttribute('placeholder', 'search bucket places');
// }
