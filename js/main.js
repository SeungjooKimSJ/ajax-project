var $homeHeader = document.querySelector('.home-header');
var $searchHeader = document.querySelector('.search-header');

var $homeH2andImg = document.querySelector('.home-h2-and-img');
var $homeTwoBtns = document.querySelector('.home-two-btns');
var $searchH2andImg = document.querySelector('.search-h2-and-img');

var $footerHomeIcon = document.querySelector('.footer-home-icon');
var $footerPlusIcon = document.querySelector('.footer-plus-icon');
var $footerAlbumIcon = document.querySelector('.footer-album-icon');

var $headerSearchIcon = document.querySelector('.header-search-icon');
var $homeFirstBtn = document.querySelector('.home-first-btn');
var $formSearchBar = document.querySelector('.search-bar');

$headerSearchIcon.addEventListener('click', showSearchPage);
$homeFirstBtn.addEventListener('click', showSearchPage);
$footerPlusIcon.addEventListener('click', showSearchPage);

$footerHomeIcon.addEventListener('click', showHomePage);

function showSearchPage(event) {
  $homeHeader.className = 'home-header hidden';
  $homeH2andImg.className = 'home-h2-and-img hidden';
  $homeTwoBtns.className = 'home-two-btns hidden';
  $footerHomeIcon.className = 'footer-home-icon';
  $footerAlbumIcon.className = 'footer-album-icon';

  $searchHeader.className = 'search-header';
  $searchH2andImg.className = 'search-h2-and-img';
  $footerPlusIcon.className = 'footer-plus-icon on';
}

function showHomePage(event) {
  $searchHeader.className = 'search-header hidden';
  $searchH2andImg.className = 'search-h2-and-img hidden';
  $footerPlusIcon.className = 'footer-plus-icon';
  $footerAlbumIcon.className = 'footer-album-icon';

  $homeHeader.className = 'home-header';
  $homeH2andImg.className = 'home-h2-and-img';
  $homeTwoBtns.className = 'home-two-btns';
  $footerHomeIcon.className = 'footer-home-icon on';
}

// function showAlbumPage(event) {

// }

// function searchResultPage(event) {
//   $homeHeader.className = 'home-header hidden';
//   $homeH2andImg.className = 'home-h2-and-img hidden';
//   $homeTwoBtns.className = 'home-two-btns hidden';
//   $footerHomeIcon.className = 'footer-home-icon';
//   $footerAlbumIcon.className = 'footer-album-icon';
//   $searchH2andImg.className = 'search-h2-and-img hidden';

//   $searchHeader.className = 'search-header';
//   $footerPlusIcon.className = 'footer-plus-icon on';
// }

function getSearchResultData(query) {
  var xhr = new XMLHttpRequest();
  var url = 'https://api.unsplash.com/search/photos/?client_id=FOyQYe0Rid3QLEMMV75PxVbRJNk-AowlsdW9TTbeo_8&query=' + query;

  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
}
getSearchResultData('california');

function renderSearchResultPage(name, url) {
  var $domResultPage = document.createElement('div');
  $domResultPage.setAttribute('class', 'result-page');

  var $resultH2andAddIcon = document.createElement('div');
  $resultH2andAddIcon.setAttribute('class', 'result-h2-and-add-icon');

  var $photographerH2 = document.createElement('h2');
  $photographerH2.setAttribute('class', 'photographer-h2');
  $photographerH2.textContent = name;

  var $searchedImg = document.createElement('img');
  $searchedImg.setAttribute('src', url);
  $searchedImg.setAttribute('class', 'searched-img');

  var $addIconBtn = document.createElement('button');
  $addIconBtn.setAttribute('class', 'add-icon-btn');

  var $resultPlusIcon = document.createElement('i');
  $resultPlusIcon.setAttribute('class', 'fas fa-plus');

  $domResultPage.append($resultH2andAddIcon, $searchedImg);
  $resultH2andAddIcon.append($photographerH2, $addIconBtn);
  $addIconBtn.appendChild($resultPlusIcon);

  return $domResultPage;
}
