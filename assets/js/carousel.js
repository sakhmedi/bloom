// Loading screen
window.addEventListener('load', function () {
  setTimeout(function () {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 800);
});

// Carousel
const track = document.getElementById('carouselTrack');
const wrapper = document.getElementById('carousel');
const slides = track.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
let currentIndex = 0;

// Build dot indicators
const indicatorsEl = document.getElementById('indicators');
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  dot.dataset.index = i;
  dot.addEventListener('click', function () {
    goToSlide(parseInt(this.dataset.index));
  });
  indicatorsEl.appendChild(dot);
}

function updateDots() {
  const dots = indicatorsEl.querySelectorAll('.carousel-dot');
  for (let i = 0; i < dots.length; i++) {
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
let startX = 0;
let currentX = 0;
let isDragging = false;
const threshold = 50;

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
  const diff = currentX - startX;
  const offset = -(currentIndex * wrapper.offsetWidth) + diff;
  track.style.transform = 'translateX(' + offset + 'px)';
});

wrapper.addEventListener('pointerup', function (e) {
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove('dragging');
  const diff = currentX - startX;
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
