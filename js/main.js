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
getPlacesData();


function retrieveResult(event) {
  // getPlacesData();
  // console.log(getPlacesData);

  // event.preventDefault();
};

// var $formSearchBar = document.querySelector('search-bar');
// var $searchIconBtn = document.querySelector('.search-btn');

// $formSearchBar.addEventListener('submit', retrieveResult);


// function renderAlbum(something) {
//   var divDom = document.createElement('div');
//   var pictureDom = document.createAttribute('img');
//   pictureDom.setAttribute('src', something.url);

//   var labelName = document.createElement('label');


// }
