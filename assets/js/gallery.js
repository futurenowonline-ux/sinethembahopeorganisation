/**
 * Sinethemba Hope Organization - Slideshow & Lightbox Gallery
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slideshow-slide');
  const dots = document.querySelectorAll('.gallery-dot');
  const counter = document.querySelector('.gallery-counter');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;

  const showSlide = (index) => {
    // Wrap around
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    if (counter) {
      counter.textContent = `${currentSlide + 1}/${totalSlides}`;
    }
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  const startAutoPlay = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(slideInterval);
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  const container = document.querySelector('.slideshow-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  // Lightbox Modal
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (img && lightbox && lightboxImg) {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        stopAutoPlay();
      });
    }
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      startAutoPlay();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        startAutoPlay();
      }
    });
  }

  // Start auto play initially
  startAutoPlay();
});