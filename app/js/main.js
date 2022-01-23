const mainContent = document.querySelector(".wrapper__main-content");

// меню =======================
const buttonClous = document.querySelector(".button-clous");
const buttonClousLink = document.querySelector(".button-clous-link");
const buttonOpen = document.querySelector(".button-open");

buttonClous.addEventListener("click", () => {
  mainContent.classList.remove("_active");
});
buttonClousLink.addEventListener("click", (e) => {
  //e.preventDefault();
  //setTimeout(() => window.location.replace(e.target.href), 500);

  mainContent.classList.remove("_active");
  mainContent.classList.add("_active-following");
});
buttonOpen.addEventListener("click", () => {
  mainContent.classList.add("_active");
});
// меню =======================

// portfolio - paralacs-object ==========================
const cards = document.querySelectorAll(".paralacs-object");

for (let i = 0; i < cards.length; i++) {
  const element = cards[i];
  element.addEventListener("mousemove", (event) => {
    const halfHeidht = element.offsetHeight / 2;
    const halfWidth = element.offsetWidth / 2;

    const card = element.querySelector(".paralacs-object__content");

    card.style.transform =
      "rotateX(" +
      -(event.offsetY - halfHeidht) / 4 +
      "deg) rotateY(" +
      (event.offsetX - halfWidth) / 4 +
      "deg)";
  });
  element.addEventListener("mouseout", () => {
    element.querySelector(".paralacs-object__content").style.transform =
      "rotate(0)";
  });
}
// portfolio - paralacs-object ==========================
