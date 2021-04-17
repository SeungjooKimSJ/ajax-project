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
var $myPlaceLi = document.querySelector('.my-place-li');

var $searchResult = document.querySelector('.search-result');
var $searchedUl = document.querySelector('.searched-ul');
var $searchedLi = document.querySelector('.searched-li');
var $searchResultH2 = document.querySelector('.search-result-h2');

var $modalContainer = document.querySelector('.modal-container');
var $modalForm = document.querySelector('.modal-form');
var $modalNoBtn = document.querySelector('.modal-no-btn');

var $footerHomeIcon = document.querySelector('.footer-home-icon');
var $footerPlusIcon = document.querySelector('.footer-plus-icon');
var $footerAlbumIcon = document.querySelector('.footer-album-icon');

var $views = document.querySelectorAll('.view');

var selectedImage;

$headerSearchIcon.addEventListener('click', clickChangeDataView);
$homeFirstBtn.addEventListener('click', clickChangeDataView);
$footerPlusIcon.addEventListener('click', clickChangeDataView);

$homeSecontBtn.addEventListener('click', clickChangeDataView);
$footerAlbumIcon.addEventListener('click', clickChangeDataView);

$footerHomeIcon.addEventListener('click', clickChangeDataView);

$formSearchBar.addEventListener('submit', retrieveResult);

$modalNoBtn.addEventListener('click', closeModalForm);

$modalForm.addEventListener('submit', submitModalForm);

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
    $homeHeader.className = 'home-header';
    $footerAlbumIcon.className = 'footer-album-icon on';
    $footerHomeIcon.className = 'footer-home-icon';
    $footerPlusIcon.className = 'footer-plus-icon';

    var renderMyPlace = renderMyPlacesPage();

    $myPlaceLi.appendChild(renderMyPlace);
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

    selectedImage = {
      photographerName: name,
      photoUrl: url
    };
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

function closeModalForm(event) {
  $modalContainer.className = 'modal-container hidden';
}

function submitModalForm(event) {
  event.preventDefault();

  var savedImageInfo = {
    name: $modalForm.elements.name.value,
    description: $modalForm.elements.description.value
  };

  savedImageInfo.imageInfo = selectedImage;

  // eslint-disable-next-line no-undef
  savedData.push(savedImageInfo);

  $modalForm.reset();
  $modalContainer.className = 'modal-container hidden';
}

function renderMyPlacesPage() {
  var $domMyPlace = document.createElement('div');
  $domMyPlace.setAttribute('class', 'my-place-page');

  var $savedImage = document.createElement('img');
  $savedImage.setAttribute('src', './images/night-sky-and-street-with-stars.jpg');
  $savedImage.setAttribute('class', 'saved-img');

  var $savedInfo = document.createElement('div');
  $savedInfo.setAttribute('class', 'saved-info');

  var $labelName = document.createElement('label');
  $labelName.setAttribute('class', 'saved-img-name');
  $labelName.textContent = 'Name';

  var $inputName = document.createElement('input');
  $inputName.setAttribute('class', 'input-img-name');
  $inputName.textContent = 'Street night view';

  var $labelDescription = document.createElement('label');
  $labelDescription.setAttribute('class', 'saved-img-description');
  $labelDescription.textContent = 'Description';

  var $textAreaDescription = document.createElement('textarea');
  $textAreaDescription.setAttribute('class', 'text-description');
  $textAreaDescription.textContent = 'Lavender night sky with many stars!';

  $domMyPlace.append($savedImage, $savedInfo);
  $savedInfo.append($labelName, $labelDescription);
  $labelName.appendChild($inputName);
  $labelDescription.appendChild($textAreaDescription);

  return $domMyPlace;
}
