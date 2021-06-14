/* global savedData */

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

var $editModalContainer = document.querySelector('.edit-modal-container');
var $editModalForm = document.querySelector('.edit-modal-form');
var $editModalNoBtn = document.querySelector('.edit-modal-no-btn');

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

$editModalNoBtn.addEventListener('click', closeEditModalForm);

// $editModalForm.addEventListener('submit', submitEditModalForm);

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

    $myPlaceLi.textContent = '';

    for (var i = 0; i < savedData.entries.length; i++) {
      var eachSavedData = savedData.entries[i];
      var url = eachSavedData.imageInfo.photoUrl;
      var name = eachSavedData.name;
      var description = eachSavedData.description;
      var dataNextId = eachSavedData.nextId;

      var renderMyPlace = renderMyPlacesPage(dataNextId, name, url, description);

      $myPlaceLi.appendChild(renderMyPlace);
    }
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

    $searchedLi.textContent = '';

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

  var dataNextId = savedData.nextId;
  savedImageInfo.nextId = dataNextId;

  savedData.nextId++;

  savedData.entries.unshift(savedImageInfo);

  $modalForm.reset();

  $modalContainer.className = 'modal-container hidden';
}

function renderMyPlacesPage(dataNextId, name, url, description) {
  var $domMyPlace = document.createElement('div');
  $domMyPlace.setAttribute('class', 'my-place-page');
  // $domMyPlace.setAttribute('data-entry-id', dataNextId);

  var $savedImage = document.createElement('img');
  $savedImage.setAttribute('src', url);
  $savedImage.setAttribute('class', 'saved-img');

  var $savedInfo = document.createElement('div');
  $savedInfo.setAttribute('class', 'saved-info');

  var $savedNameH3 = document.createElement('h3');
  $savedNameH3.setAttribute('class', 'saved-name-h3');
  $savedNameH3.textContent = 'Name';

  var $editBtn = document.createElement('button');
  $editBtn.setAttribute('class', 'edit-btn');

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'edit-icon');
  $editIcon.setAttribute('class', 'fas fa-edit');
  $editIcon.setAttribute('data-entry-id', dataNextId);

  var $savedNameP = document.createElement('p');
  $savedNameP.setAttribute('class', 'saved-name-p');
  $savedNameP.textContent = name;

  var $savedDescriptionH3 = document.createElement('h3');
  $savedDescriptionH3.setAttribute('class', 'saved-description-h3');
  $savedDescriptionH3.textContent = 'Description';

  var $savedDescriptionP = document.createElement('p');
  $savedDescriptionP.setAttribute('class', 'saved-description-p');
  $savedDescriptionP.textContent = description;

  $editIcon.addEventListener('click', function () {
    var $editName = document.querySelector('#edit-name');
    var $editDescription = document.querySelector('#edit-description');

    $editModalContainer.className = 'edit-modal-container';

    var dataEntryId = event.target.getAttribute('data-entry-id');
    dataEntryId = parseInt(dataEntryId);

    for (var m = 0; m < savedData.entries.length; m++) {
      var currentEntry = savedData.entries[m];

      if (currentEntry.nextId === dataEntryId) {
        $editName.value = currentEntry.name;
        $editDescription.value = currentEntry.description;
        savedData.editing = currentEntry;
        // console.log('savedData.editing:', savedData.editing);
      }
    }
  });

  $editModalForm.addEventListener('submit', function () {
    event.preventDefault();

    if (event.target.value === savedData.editing.nextId) {
      var editSavedImageInfo = {
        name: $editModalForm.elements.name.value,
        description: $editModalForm.elements.description.value,
        id: savedData.editing.nextId
      };

      savedData.editing = editSavedImageInfo;
    }
    // console.log('checking:', editSavedImageInfo);

    // var editSavedImageInfo = {
    //   name: $editModalForm.elements.name.value,
    //   description: $editModalForm.elements.description.value
    // };

    // console.log('editSavedImageInfo:', editSavedImageInfo);

    // editSavedImageInfo.imageInfo = selectedImage;

    // savedData.editing = editSavedImageInfo;

    $editModalForm.reset();

    $editModalContainer.className = 'edit-modal-container hidden';

    // $savedNameP.textContent = savedData.editing.name;
    // $savedDescriptionP.textContent = savedData.editing.description;
  });

  $domMyPlace.append($savedImage, $savedInfo);
  $savedNameH3.appendChild($editBtn);
  $editBtn.appendChild($editIcon);
  $savedInfo.append($savedNameH3, $savedNameP, $savedDescriptionH3, $savedDescriptionP);

  return $domMyPlace;
}

// function submitEditModalForm(event) {
//   event.preventDefault();

//   var editSavedImageInfo = {
//     name: $editModalForm.elements.name.value,
//     description: $editModalForm.elements.description.value
//   };

//   editSavedImageInfo.imageInfo = selectedImage;

//   // savedData.editing.unshift(editSavedImageInfo);
//   savedData.editing = editSavedImageInfo;

//   $editModalForm.reset();
//   $editModalContainer.className = 'edit-modal-container hidden';

//   $savedNameP.textContent = savedData.editing.name;

//   $savedDescriptionP.textContent = savedData.editing.description;
// }

function closeEditModalForm(event) {
  $editModalContainer.className = 'edit-modal-container hidden';
}
