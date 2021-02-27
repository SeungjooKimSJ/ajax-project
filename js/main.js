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
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);

    // console.log(xhr.response.results[0].user);
    // console.log(xhr.response.results[0].urls.raw);

    var dataResult = xhr.response.results;

    for (var j = 0; j < dataResult.length; j++) {
      // var userData = dataResult.results[j];
      var userData = dataResult[j];

      var resultPageDom = renderSearchResultPage(userData);

      $main.appendChild(resultPageDom);
    }

  });
  xhr.send();
};
getPlacesData();


var $main = document.querySelector('main');

  var $divDom = document.createElement('div');
  $divDom.setAttribute('class', 'search-result-view hidden');
  var $searchResultH2 = document.createElement('h2');
  $searchResultH2.setAttribute('class', 'search-result-h2');
  $searchResultH2.textContent = 'Show search keyword';

  var $ul = document.createElement('ul');
  $ul.setAttribute('class', 'ul-view hidden')
  var $li = document.createElement('li');
  $li.setAttribute('class', 'search-result-listed');

  $main.append($divDom, $ul);
  $divDom.appendChild($searchResultH2);
  $ul.appendChild($li)


function retrieveResult(event) {
  event.preventDefault();

  getPlacesData();

  $divDom.className = 'search-result-view';
  $ul.className = 'ul-view';

  $homePage.className = 'home-page-view hidden';
  $mainH2AndImg.className = 'main-h2-and-img-view hidden';
  $mainTwoBtns.className = 'main-two-btns-view hidden';
  $footerHomeIcons.className = 'footer-home-icons-view hidden';

  $searchPage.className = 'search-page-view hidden';
  $searchH2AndImg.className = 'search-h2-and-img-view hidden';
  $footerSearchIcons.className = 'footer-search-icons-view hidden';



  for (var i = 0; i < userData.length; i++) {
    var searchDomTree = renderSearchResultPage(userData[i]);
    $li.appendChild(searchDomTree);
  }

  $searchIconBtn.reset();
};

var $searchIconBtn = document.querySelector('.search-icon-btn');

$searchIconBtn.addEventListener('submit', retrieveResult);


function renderSearchResultPage(dataResult) {
  var $newDiv = document.createElement('div');
  $newDiv.setAttribute('class', 'new-search-result');

  var $photographerNameH2 = document.createElement('h2');
  $photographerNameH2.setAttribute('class', 'photographer-name-h2');
  // $photographerNameH2.textContent = userData.user.first_name;

  var $searchedImg = document.createElement('img');
  // $searchedImg.setAttribute('src', userData.user.urls.raw);

  var $addIconBtn = document.createElement('button');
  $addIconBtn.setAttribute('class', 'add-icon-btn');

  $newDiv.append($photographerNameH2, $searchedImg, $addIconBtn);

  return $newDiv;
};
