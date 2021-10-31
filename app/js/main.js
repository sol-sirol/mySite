const mainContent = document.querySelector(".wrapper__main-content");
const buttonClous = document.querySelector(".button-clous");
const buttonClousLink = document.querySelector(".button-clous-link");
const buttonOpen = document.querySelector(".button-open");

buttonClous.addEventListener("click", () => {
  mainContent.classList.remove("_active")
})
buttonClousLink.addEventListener("click", (e) => {
  //e.preventDefault();
  //setTimeout(() => window.location.replace(e.target.href), 500);
  
  mainContent.classList.remove("_active");
  mainContent.classList.add("_active-following");
})
buttonOpen.addEventListener("click", () => {
  mainContent.classList.add("_active")
})