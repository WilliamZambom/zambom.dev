document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".stats__item, .skills__item, .timeline__item"
  );
  const statItems = document.querySelectorAll(".stats__item");
  const projectTrack = document.querySelector(".projects__carousel-track");
  const projectItems = document.querySelectorAll(".projects__carousel-item");
  const prevButton = document.querySelector(".projects__carousel-btn--prev");
  const nextButton = document.querySelector(".projects__carousel-btn--next");
  const projectsTitle = document.querySelector(".projects__title");

  const animateCounter = (element, target) => {
    const duration = 1400;
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      element.textContent = Math.round(target * progress).toString();

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("animate");

        if (entry.target.classList.contains("stats__item")) {
          const value = Number(entry.target.dataset.value || 0);
          const numberElement = entry.target.querySelector(".stats__number");
          if (numberElement && !numberElement.dataset.animated) {
            numberElement.dataset.animated = "true";
            animateCounter(numberElement, value);
          }
        }

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((element) => observer.observe(element));

  if (projectsTitle) {
    requestAnimationFrame(() => {
      projectsTitle.style.opacity = "1";
      projectsTitle.style.transform = "translateY(0)";
    });
  }

  let currentIndex = 0;

  const getVisibleItems = () => {
    if (window.innerWidth <= 480) {
      return 1;
    }

    if (window.innerWidth <= 1024) {
      return 2;
    }

    return 3;
  };

  const updateCarousel = () => {
    if (!projectTrack || projectItems.length === 0) {
      return;
    }

    const itemWidth = projectItems[0].getBoundingClientRect().width;
    const gap = 24;
    projectTrack.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;

    const maxIndex = Math.max(projectItems.length - getVisibleItems(), 0);
    if (prevButton) {
      prevButton.disabled = currentIndex === 0;
      prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
    }

    if (nextButton) {
      nextButton.disabled = currentIndex >= maxIndex;
      nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
    }
  };

  prevButton?.addEventListener("click", () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCarousel();
  });

  nextButton?.addEventListener("click", () => {
    const maxIndex = Math.max(projectItems.length - getVisibleItems(), 0);
    currentIndex = Math.min(currentIndex + 1, maxIndex);
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
  statItems.forEach((item) => {
    const numberElement = item.querySelector(".stats__number");
    if (numberElement) {
      numberElement.textContent = "0";
    }
  });
});
