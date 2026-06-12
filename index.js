function showPage(pageId) {
  var allPages = document.querySelectorAll('.page');
  allPages.forEach(function(page) {
    page.classList.remove('active-page');
  });

  var selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.add('active-page');
  }

  var allNavItems = document.querySelectorAll('.nav-item');
  allNavItems.forEach(function(item) {
    item.classList.remove('active');
  });

  allNavItems.forEach(function(item) {
    if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(pageId)) {
      item.classList.add('active');
    }
  });

  closeAllZooms();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  checkFadeElements();
}

function toggleMenu() {
  var mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
  } else {
    mobileMenu.classList.add('open');
  }
}

function checkFadeElements() {
  var fadeElements = document.querySelectorAll('.fade-box');
  fadeElements.forEach(function(element) {
    var elementPosition = element.getBoundingClientRect();
    var screenBottom = window.innerHeight;
    if (elementPosition.top < screenBottom - 50) {
      element.classList.add('visible');
    }
  });
}

var backdrop = document.createElement('div');
backdrop.classList.add('zoom-backdrop');
document.body.appendChild(backdrop);

function closeAllZooms() {
  var allCards = document.querySelectorAll('.game-card');
  allCards.forEach(function(card) {
    card.classList.remove('zoomed');
  });
  backdrop.classList.remove('active');
}

document.addEventListener('contextmenu', function(event) {
  var card = event.target.closest('.game-card');
  if (card) {
    event.preventDefault();
    closeAllZooms();
    card.classList.add('zoomed');
    backdrop.classList.add('active');
  }
});

backdrop.addEventListener('click', function() {
  closeAllZooms();
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAllZooms();
  }
});

window.addEventListener('scroll', function() {
  checkFadeElements();
});

window.addEventListener('load', function() {
  checkFadeElements();
});

document.addEventListener('click', function(event) {
  var mobileMenu = document.getElementById('mobileMenu');
  var hamburger = document.querySelector('.hamburger');
  if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
    mobileMenu.classList.remove('open');
  }
});