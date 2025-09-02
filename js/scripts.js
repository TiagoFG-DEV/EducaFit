document.addEventListener("DOMContentLoaded", () => {
  const slidesWrapper = document.querySelector(".slides-wrapper");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = document.querySelectorAll(".dot");
  let index = 1; // começa no slide real 1
  let timer;

  // Clona primeiro e último slide
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  slidesWrapper.appendChild(firstClone);
  slidesWrapper.insertBefore(lastClone, slidesWrapper.firstChild);

  const allSlides = document.querySelectorAll(".slide");
  const total = allSlides.length;

  // Posição inicial
  slidesWrapper.style.transform = `translateX(-${100 * index}%)`;

  function moveToSlide(nextIndex) {
    index = nextIndex;
    slidesWrapper.style.transition = "transform 0.5s ease-in-out";
    slidesWrapper.style.transform = `translateX(-${100 * index}%)`;
  }

  slidesWrapper.addEventListener("transitionend", () => {
    if (allSlides[index] === firstClone) {
      slidesWrapper.style.transition = "none";
      index = 1;
      slidesWrapper.style.transform = `translateX(-${100 * index}%)`;
    } else if (allSlides[index] === lastClone) {
      slidesWrapper.style.transition = "none";
      index = total - 2;
      slidesWrapper.style.transform = `translateX(-${100 * index}%)`;
    }

    // Atualiza dots
    let dotIndex = (index - 1 + slides.length) % slides.length;
    dots.forEach((d, i) => d.classList.toggle("active", i === dotIndex));
  });

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => moveToSlide(index + 1), 5000);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  window.plusSlides = (n) => {
    stopAutoplay();
    moveToSlide(index + n);
    startAutoplay();
  };

  window.currentSlide = (n) => {
    stopAutoplay();
    moveToSlide(n); // dots começam em 1
    startAutoplay();
  };

  startAutoplay();
});
