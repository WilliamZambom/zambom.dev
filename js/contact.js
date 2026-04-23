document.addEventListener("DOMContentLoaded", () => {
  const emailLink = document.querySelector(".footer__link");

  if (!emailLink) {
    return;
  }

  emailLink.addEventListener("click", () => {
    emailLink.classList.add("is-active");
    window.setTimeout(() => {
      emailLink.classList.remove("is-active");
    }, 1200);
  });
});
