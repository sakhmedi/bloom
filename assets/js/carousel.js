// Loading screen
window.addEventListener('load', function () {
  setTimeout(function () {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 2000);
});

// Carousel
var track = document.getElementById('carouselTrack');
var wrapper = document.getElementById('carousel');
var slides = track.querySelectorAll('.carousel-slide');
var totalSlides = slides.length;
var currentIndex = 0;

// Build dot indicators
var indicatorsEl = document.getElementById('indicators');
for (var i = 0; i < totalSlides; i++) {
  var dot = document.createElement('button');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  dot.dataset.index = i;
  dot.addEventListener('click', function () {
    goToSlide(parseInt(this.dataset.index));
  });
  indicatorsEl.appendChild(dot);
}

function updateDots() {
  var dots = indicatorsEl.querySelectorAll('.carousel-dot');
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('active', i === currentIndex);
  }
}

function goToSlide(index) {
  // Loop effect
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentIndex = index;
  track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
  updateDots();
}

// Touch / pointer swipe
var startX = 0;
var currentX = 0;
var isDragging = false;
var threshold = 50;

wrapper.addEventListener('pointerdown', function (e) {
  if (e.target.closest('a')) return; // don't interfere with link clicks
  isDragging = true;
  startX = e.clientX;
  currentX = startX;
  track.classList.add('dragging');
  wrapper.setPointerCapture(e.pointerId);
});

wrapper.addEventListener('pointermove', function (e) {
  if (!isDragging) return;
  currentX = e.clientX;
  var diff = currentX - startX;
  var offset = -(currentIndex * wrapper.offsetWidth) + diff;
  track.style.transform = 'translateX(' + offset + 'px)';
});

wrapper.addEventListener('pointerup', function (e) {
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove('dragging');
  var diff = currentX - startX;
  if (diff < -threshold) {
    goToSlide(currentIndex + 1);
  } else if (diff > threshold) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(currentIndex);
  }
});

wrapper.addEventListener('pointercancel', function () {
  isDragging = false;
  track.classList.remove('dragging');
  goToSlide(currentIndex);
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
  if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
});
