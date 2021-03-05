var $homePage = document.querySelector('.home-page-view');
var $mainH2AndImg = document.querySelector('.main-h2-and-img-view');
var $mainTwoBtns = document.querySelector('.main-two-btns-view');
var $footerHomeIcons = document.querySelector('.footer-home-icons-view');

var $searchPage = document.querySelector('.search-page-view');
var $searchH2AndImg = document.querySelector('.search-h2-and-img-view');
var $footerSearchIcons = document.querySelector('.footer-search-icons-view');

var $form = document.querySelector('.search-bar');
var $searchResultView = document.querySelector('.search-result-view');
var $searchResultH2 = document.querySelector('.search-result-h2');
var $searchUlView = document.querySelector('.search-ul-view');
var $liSearchResult = document.querySelector('.search-result-listed');

var $headerSearchIcon = document.querySelector('.header-search-icon');
var $mainFirstBtn = document.querySelector('.main-first-btn');


$headerSearchIcon.addEventListener('click', clickSearch);
$mainFirstBtn.addEventListener('click', clickSearch);
$form.addEventListener('submit', retrieveResult);


function clickSearch(event) {
  $homePage.className = 'home-page-view hidden';
  $mainH2AndImg.className = 'main-h2-and-img-view hidden';
  $mainTwoBtns.className = 'main-two-btns-view hidden';
  $footerHomeIcons.className = 'footer-home-icons-view hidden';

  $searchPage.className = 'search-page-view';
  $searchH2AndImg.className = 'search-h2-and-img-view';
  $footerSearchIcons.className = 'footer-search-icons-view'
};

function showSearchResultView() {
  $homePage.className = 'home-page-view hidden';
  $mainH2AndImg.className = 'main-h2-and-img-view hidden';
  $mainTwoBtns.className = 'main-two-btns-view hidden';
  $footerHomeIcons.className = 'footer-home-icons-view hidden';
  $searchH2AndImg.className = 'search-h2-and-img-view hidden';

  $searchPage.className = 'search-page-view';
  $footerSearchIcons.className = 'footer-search-icons-view';
};

function getPlacesData(query) {
  var xhr = new XMLHttpRequest();
  var url = 'https://api.unsplash.com/search/photos/?client_id=FOyQYe0Rid3QLEMMV75PxVbRJNk-AowlsdW9TTbeo_8&query=' + query;
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);

    var dataResult = xhr.response.results;

    $searchResultView.className = 'search-result-view';
    $searchUlView.className = 'search-ul-view';

    showSearchResultView();

    for (var i = 0; i < dataResult.length; i++) {
      var individualResult = dataResult[i];

      var url = individualResult.urls.raw;
      var name = individualResult.user.name;

      var domTree = renderSearchResultPage(name, url);
      $liSearchResult.appendChild(domTree);
    }
  });
  xhr.send();
};

function retrieveResult(event) {
  event.preventDefault();

  var searchKeyword = $form.elements.search.value;
  $searchResultH2.textContent = searchKeyword;

  getPlacesData(searchKeyword);

  $form.reset();
};

function renderSearchResultPage(name, url) {
  var $newDiv = document.createElement('div');
  $newDiv.setAttribute('class', 'new-search-result');

  var $nameH2AndIconBtn = document.createElement('div');
  $nameH2AndIconBtn.setAttribute('class', 'h2-and-btn');

  var $photographerNameH2 = document.createElement('h2');
  $photographerNameH2.setAttribute('class', 'photographer-name-h2');
  $photographerNameH2.textContent = name;

  var $searchedImg = document.createElement('img');
  $searchedImg.setAttribute('src', url);
  $searchedImg.setAttribute('class', 'searched-image');

  var $addIconBtn = document.createElement('button');
  $addIconBtn.setAttribute('class', 'add-icon-btn');

  var $plusIcon = document.createElement('i');
  $plusIcon.setAttribute('class', 'fas fa-plus');

  $newDiv.append($nameH2AndIconBtn, $searchedImg);
  $nameH2AndIconBtn.append($photographerNameH2, $addIconBtn);
  $addIconBtn.appendChild($plusIcon);

  return $newDiv;
};


var $modalContent = document.querySelector('.modal-content');
// var $addIconBtn = document.querySelector('.add-icon-btn');
// $addIconBtn.addEventListener('click', openModalForAdd);

// function openModalToAdd(event) {
//   $modalContent.className = 'modal-content';
// } How to make click eventlistener in domtree btn (102)?


var $noBtn = document.querySelector('.no-btn');
$noBtn.addEventListener('click', closeModal);

function closeModal(event) {
  $modalContent.className = 'modal-content ' + 'hidden';
};

var $modalForm = document.querySelector('.modal-form');
var $addThisPlaceBtn = document.querySelector('.add-this-place-btn');

$addThisPlaceBtn.addEventListener('submit', addThisPlace);

function addThisPlace(event) {
  event.preventDefault();

  var pictureData = {
    name: $modalForm.elements.name.value,
    description: $modalForm.elements.description.value
  };
  console.log('pictureData:', pictureData);

  $modalForm.reset();
  $modalContent.className = 'modal-content ' + 'hidden';
};


function renderMyPlacesPage() {
  var $myPlacesImage = document.createElement('div');
  $myPlacesImage.setAttribute('class', 'my-places-image');

  var $savedImage = document.createElement('img');
  $savedImage.setAttribute('src', './images/2021-ver1.jpg.jpg');
  $savedImage.setAttribute('class', 'saved-image');

  var $savedInfo = document.createElement('div');
  $savedInfo.setAttribute('class', 'saved-info');

  var $labelName = document.createElement('label');
  $labelName.setAttribute('class', 'saved-img-name');

  // var $editInfoIcon = document.createElement();

  var $inputName = document.createElement('input');
  $inputName.setAttribute('class', 'input-name');
  // $inputName.textContent = ;

  var $labelDescription = document.createElement('label');
  $labelDescription.setAttribute('class', 'saved-img-description');

  var $textAreaDescription = document.createElement('textarea');
  $textAreaDescription.setAttribute('class', 'textarea-description');
  // $textAreaDescription.textContent = ;

  return $myPlacesImage;
};
