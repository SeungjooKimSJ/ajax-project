var $homePage = document.querySelector('.home-page-view');
var $mainH2AndImg = document.querySelector('.main-h2-and-img-view');
var $mainTwoBtns = document.querySelector('.main-two-btns-view');
var $footerHomeIcons = document.querySelector('.footer-home-icons-view');

var $searchPage = document.querySelector('.search-page-view');
var $searchH2AndImg = document.querySelector('.search-h2-and-img-view');
var $footerSearchIcons = document.querySelector('.footer-search-icons-view');

function clickSearch(event) {
  $homePage.className = 'home-page-view hidden';
  $mainH2AndImg.className = 'main-h2-and-img-view hidden';
  $mainTwoBtns.className = 'main-two-btns-view hidden';
  $footerHomeIcons.className = 'footer-home-icons-view hidden';

  $searchPage.className = 'search-page-view';
  $searchH2AndImg.className = 'search-h2-and-img-view';
  $footerSearchIcons.className = 'footer-search-icons-view'
};

var $headerSearchIcon = document.querySelector('.header-search-icon');
var $mainFirstBtn = document.querySelector('.main-first-btn');

$headerSearchIcon.addEventListener('click', clickSearch);
$mainFirstBtn.addEventListener('click', clickSearch);


function getPlacesData(query) {
  var xhr = new XMLHttpRequest();
  var url = 'https://api.unsplash.com/search/photos/?client_id=FOyQYe0Rid3QLEMMV75PxVbRJNk-AowlsdW9TTbeo_8&query=' + query;
  console.log('URL for request:', url);
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
}
getPlacesData('');


function retrieveResult(event) {
  event.preventDefault();

  getPlacesData();
  console.log(getPlacesData);

  var resultsData = {
    name: results.user.first_name.value + results.user.last_name.value,
    url: results.user.urls.raw.value
  };

  var $divDom = document.createElement('div');
  $divDom.setAttribute('class', 'search-result');
  var $searchResultH2 = document.createElement('h2');
  $searchResultH2.setAttribute('class', 'search-result-h2');
  $searchResultH2.textContent = 'Show search keyword';

  for (var i = 0; i < resultsData.length; i++) {
    var searchDomTree = renderSearchResultPage(resultsData[i]);

  }




  $searchIconBtn.reset();
};

// var $formSearchBar = document.querySelector('search-bar');
var $searchIconBtn = document.querySelector('.search-btn');

$searchIconBtn.addEventListener('submit', retrieveResult);


function renderSearchResultPage(resultsData) {
  var $newDiv = document.createElement('div');
  $newDiv.setAttribute('class', 'new-search-result');

  var $photographerNameH2 = document.createElement('h2');
  $photographerNameH2.setAttribute('class', 'photographer-name-h2');
  $photographerNameH2.textContent = resultsData.name;

  var $searchedImg = document.createElement('img');
  $searchedImg.setAttribute('src', resultsData.url);

  var $addIconBtn = document.createElement('button');
  $addIconBtn.setAttribute('class', 'add-icon-btn');



}
