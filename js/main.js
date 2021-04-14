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

$headerSearchIcon.addEventListener('click', showSearchPage);
$homeFirstBtn.addEventListener('click', showSearchPage);
$footerPlusIcon.addEventListener('click', showSearchPage);

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
