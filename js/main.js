var $homePage = document.querySelector('.home-page-view');
var $mainH2AndImg = document.querySelector('.main-h2-and-img-view');
var $mainTwoBtns = document.querySelector('.main-two-btns-view');
// var $footerHomeIcons = document.querySelector('.footer-home-icons-view');
var $footerIcons = document.querySelector('.footer-icons-view');
var $footerHomeIcon = document.querySelector('.footer-home-icon');
var $footerPlusIcon = document.querySelector('.footer-plus-icon');
var $footerAlbumIcon = document.querySelector('.footer-album-icon');

var $searchPage = document.querySelector('.search-page-view');
var $searchH2AndImg = document.querySelector('.search-h2-and-img-view');
// var $footerSearchIcons = document.querySelector('.footer-search-icons-view');

var $form = document.querySelector('.search-bar');
var $searchResultView = document.querySelector('.search-result-view');
var $searchResultH2 = document.querySelector('.search-result-h2');
var $ulSearch = document.querySelector('.search-ul-view');
var $liSearchResult = document.querySelector('.search-result-listed');

var $headerSearchIcon = document.querySelector('.header-search-icon');
var $mainFirstBtn = document.querySelector('.main-first-btn');
var $mainSecondBtn = document.querySelector('.main-second-btn');

var $myPlace = document.querySelector('.my-place-view');
var $ulMyPlace = document.querySelector('.my-place-ul-view');
var $liMyPlace = document.querySelector('.my-place-listed');

var $modalContent = document.querySelector('.modal-content');
// var $modalForm = document.querySelector('.modal-form');

var selectedImage;

$headerSearchIcon.addEventListener('click', showSearchPage);
$mainFirstBtn.addEventListener('click', showSearchPage);
$mainSecondBtn.addEventListener('click', showAlbumPage);
$footerHomeIcon.addEventListener('click', showMainPage);
$footerPlusIcon.addEventListener('click', showSearchPage);
$footerAlbumIcon.addEventListener('click', showAlbumPage);
$form.addEventListener('submit', retrieveResult);
// $modalForm.addEventListener('submit', function () {
//     event.preventDefault();

//     var savedImageInfo = {
//       name: $modalForm.elements.name.value,
//       description: $modalForm.elements.description.value,
//     };

//     savedImageInfo.imageInfo = selectedImage;

//     savedData.push(savedImageInfo);

//     $modalForm.reset();
//     $modalContent.className = 'modal-content ' + 'hidden';
//   });


function showSearchPage(event) {
  $homePage.className = 'home-page-view hidden';
  $mainH2AndImg.className = 'main-h2-and-img-view hidden';
  $mainTwoBtns.className = 'main-two-btns-view hidden';
  $myPlace.className = 'my-place-view hidden';
  $ulMyPlace.className = 'my-place-ul-view hidden';
  // $footerHomeIcons.className = 'footer-home-icons-view hidden';
  $footerHomeIcon.className = 'footer-home-icon';
  $footerAlbumIcon.className = 'footer-album-icon';

  $searchPage.className = 'search-page-view';
  $searchH2AndImg.className = 'search-h2-and-img-view';
  // $footerSearchIcons.className = 'footer-search-icons-view';
  $footerPlusIcon.className = 'footer-plus-icon on';
};

function showSearchResultView(event) {
  $homePage.className = 'home-page-view hidden';
  $mainH2AndImg.className = 'main-h2-and-img-view hidden';
  $mainTwoBtns.className = 'main-two-btns-view hidden';
  $searchH2AndImg.className = 'search-h2-and-img-view hidden';
  $myPlace.className = 'my-place-view hidden';
  $ulMyPlace.className = 'my-place-ul-view hidden';
  $footerHomeIcon.className = 'footer-home-icon';
  $footerAlbumIcon.className = 'footer-album-icon';
  // $footerHomeIcons.className = 'footer-home-icons-view hidden';

  $searchPage.className = 'search-page-view';
  $footerPlusIcon.className = 'footer-plus-icon on';
};

function showAlbumPage(event) {
  $mainH2AndImg.className = 'main-h2-and-img-view hidden';
  $mainTwoBtns.className = 'main-two-btns-view hidden';
  $searchH2AndImg.className = 'search-h2-and-img-view hidden';
  $searchResultView.className = 'search-result-view hidden';
  $ulSearch.className = 'search-ul-view hidden';
  $footerHomeIcon.className = 'footer-home-icon';
  $footerPlusIcon.className = 'footer-plus-icon';

  $homePage.className = 'home-page-view';
  $myPlace.className = 'my-place-view';
  $ulMyPlace.className = 'my-place-ul-view';
  $footerAlbumIcon.className = 'footer-album-icon on';

  for (var i = 0; i < savedData.length; i++) {
    var savedImageDomTree = renderMyPlacesPage(savedData[i]);
      $liMyPlace.appendChild(savedImageDomTree);
  };

};

function showMainPage(event) {
  $searchPage.className = 'search-page-view hidden';
  $searchH2AndImg.className = 'searchh2-and-img-view hidden';
  $myPlace.className = 'my-place-view hidden';
  $ulMyPlace.className = 'my-place-ul-view hidden';
  $searchResultView.className = 'search-result-view hidden';
  $ulSearch.className = 'search-ul-view hidden';
  $footerPlusIcon.className = 'footer-plus-icon';
  $footerAlbumIcon.className = 'footer-album-icon';

  $homePage.className = 'home-page-view';
  $mainH2AndImg.className = 'main-h2-and-img-view';
  $mainTwoBtns.className = 'main-two-btns-view';
  $footerHomeIcon.className = 'footer-home-icon on';
}


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
    $ulSearch.className = 'search-ul-view';

    showSearchResultView(event);

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

  $addIconBtn.addEventListener('click', function () {
    $modalContent.className = 'modal-content';
    selectedImage = {
      name: name,
      url: url
    };
  });

  var $noBtn = document.querySelector('.no-btn');

  $noBtn.addEventListener('click', function () {
    $modalContent.className = 'modal-content ' + 'hidden';
  });

  var $addThisPlaceBtn = document.querySelector('.add-this-place-btn');

  var $plusIcon = document.createElement('i');
  $plusIcon.setAttribute('class', 'fas fa-plus');

  $newDiv.append($nameH2AndIconBtn, $searchedImg);
  $nameH2AndIconBtn.append($photographerNameH2, $addIconBtn);
  $addIconBtn.appendChild($plusIcon);

  return $newDiv;
};

var $modalForm = document.querySelector('.modal-form');



$modalForm.addEventListener('submit', function () {
    event.preventDefault();

    var savedImageInfo = {
      name: $modalForm.elements.name.value,
      description: $modalForm.elements.description.value
    };

    savedImageInfo.imageInfo = selectedImage;

    savedData.push(savedImageInfo);

    $modalForm.reset();
    $modalContent.className = 'modal-content ' + 'hidden';
  });


function renderMyPlacesPage(savedData) {
  // console.log('savedData:', savedData);

  var $myPlacesImage = document.createElement('div');
  $myPlacesImage.setAttribute('class', 'my-places-image');

  var $savedImage = document.createElement('img');
  $savedImage.setAttribute('src', imageInfo.url);
  $savedImage.setAttribute('class', 'saved-image');

  var $savedInfo = document.createElement('div');
  $savedInfo.setAttribute('class', 'saved-info');

  var $labelName = document.createElement('label');
  $labelName.setAttribute('class', 'saved-img-name');

  // var $editInfoIcon = document.createElement();

  var $inputName = document.createElement('input');
  $inputName.setAttribute('class', 'input-name');
  $inputName.textContent = savedData.name;

  var $labelDescription = document.createElement('label');
  $labelDescription.setAttribute('class', 'saved-img-description');

  var $textAreaDescription = document.createElement('textarea');
  $textAreaDescription.setAttribute('class', 'textarea-description');
  $textAreaDescription.textContent = savedData.description;

  return $myPlacesImage;
};
