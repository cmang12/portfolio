/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

const carousels = {}; // To track the current index of each carousel

function updateCarousel(id) {
  const carousel = document.getElementById(id);
  const currentIndex = carousels[id] || 0;
  const imageWidth = carousel.children[0].clientWidth;
  carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

function prevImage(id) {
  if (!carousels[id]) carousels[id] = 0;
  if (carousels[id] > 0) {
    carousels[id]--;
    updateCarousel(id);
  }
}

function nextImage(id) {
  const carousel = document.getElementById(id);
  if (!carousels[id]) carousels[id] = 0;
  if (carousels[id] < carousel.children.length - 1) {
    carousels[id]++;
    updateCarousel(id);
  }
}

// Adjust all carousels on window resize
window.addEventListener('resize', () => {
  Object.keys(carousels).forEach(updateCarousel);
});

