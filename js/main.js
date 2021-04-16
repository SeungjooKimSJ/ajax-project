var $homeHeader = document.querySelector('.home-header');
var $headerSearchIcon = document.querySelector('.header-search-icon');
var $homeH2andImg = document.querySelector('.home-h2-and-img');
var $homeTwoBtns = document.querySelector('.home-two-btns');
var $homeFirstBtn = document.querySelector('.home-first-btn');
var $homeSecontBtn = document.querySelector('.home-second-btn');

var $searchHeader = document.querySelector('.search-header');
var $formSearchBar = document.querySelector('.search-bar');
var $searchH2andImg = document.querySelector('.search-h2-and-img');

var $myPlace = document.querySelector('.my-place');
var $myPlaceUl = document.querySelector('.my-place-ul');

var $searchResult = document.querySelector('.search-result');
var $searchedUl = document.querySelector('.searched-ul');
var $searchedLi = document.querySelector('.searched-li');
var $searchResultH2 = document.querySelector('.search-result-h2');

var $modalContainer = document.querySelector('.modal-container');

var $footerHomeIcon = document.querySelector('.footer-home-icon');
var $footerPlusIcon = document.querySelector('.footer-plus-icon');
var $footerAlbumIcon = document.querySelector('.footer-album-icon');

var $views = document.querySelectorAll('.view');

$headerSearchIcon.addEventListener('click', clickChangeDataView);
$homeFirstBtn.addEventListener('click', clickChangeDataView);
$footerPlusIcon.addEventListener('click', clickChangeDataView);

$homeSecontBtn.addEventListener('click', clickChangeDataView);
$footerAlbumIcon.addEventListener('click', clickChangeDataView);

$footerHomeIcon.addEventListener('click', clickChangeDataView);

$formSearchBar.addEventListener('submit', retrieveResult);

function clickChangeDataView(event) {
  var dataView = event.target.getAttribute('data-view');

  for (var k = 0; k < $views.length; k++) {
    if ($views[k].getAttribute('data-view') !== dataView) {
      $views[k].classList.add('hidden');
    } else {
      $views[k].classList.remove('hidden');
    }
  }

  if (dataView === 'home-page') {
    $footerHomeIcon.className = 'footer-home-icon on';
    $footerPlusIcon.className = 'footer-plus-icon';
    $footerAlbumIcon.className = 'footer-album-icon';
  } else if (dataView === 'search-page') {
    $footerPlusIcon.className = 'footer-plus-icon on';
    $footerHomeIcon.className = 'footer-home-icon';
    $footerAlbumIcon.className = 'footer-album-icon';
  } else if (dataView === 'album-page') {
    $footerAlbumIcon.className = 'footer-album-icon on';
    $footerHomeIcon.className = 'footer-home-icon';
    $footerPlusIcon.className = 'footer-plus-icon';
  }
}

function searchResultPage(event) {
  $homeHeader.className = 'home-header hidden';
  $homeH2andImg.className = 'home-h2-and-img hidden';
  $homeTwoBtns.className = 'home-two-btns hidden';
  $searchH2andImg.className = 'search-h2-and-img hidden';
  $myPlace.className = 'my-place hidden';
  $myPlaceUl.className = 'my-place-ul hidden';
  $footerHomeIcon.className = 'footer-home-icon';
  $footerAlbumIcon.className = 'footer-album-icon';

  $searchHeader.className = 'search-header';
  $footerPlusIcon.className = 'footer-plus-icon on';
}

function getSearchResultData(query) {
  var xhr = new XMLHttpRequest();
  var url = 'https://api.unsplash.com/search/photos/?client_id=FOyQYe0Rid3QLEMMV75PxVbRJNk-AowlsdW9TTbeo_8&query=' + query;

  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var dataResult = xhr.response.results;

    $searchResult.className = 'search-result';
    $searchedUl.className = 'searched-ul';

    searchResultPage(event);

    for (var i = 0; i < dataResult.length; i++) {
      var eachResult = dataResult[i];

      var url = eachResult.urls.raw;
      var name = eachResult.user.name;

      var domTree = renderSearchResultPage(name, url);
      $searchedLi.appendChild(domTree);
    }
  });
  xhr.send();
}

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

  $addIconBtn.addEventListener('click', function () {
    $modalContainer.className = 'modal-container';
  });

  $domResultPage.append($resultH2andAddIcon, $searchedImg);
  $resultH2andAddIcon.append($photographerH2, $addIconBtn);
  $addIconBtn.appendChild($resultPlusIcon);

  return $domResultPage;
}

function retrieveResult(event) {
  event.preventDefault();

  var searchTerm = $formSearchBar.elements.search.value;
  $searchResultH2.textContent = searchTerm;

  getSearchResultData(searchTerm);

  $formSearchBar.reset();
}
