const openMenuBtn = document.querySelector(".openMenuBtn");
const closeMenuBtn = document.querySelector(".closeMenuBtn");
const dropdown = document.querySelector(".dropdown");

openMenuBtn.addEventListener("click", (event) => {
  event.preventDefault();
  dropdown.style.display = "block";
});

closeMenuBtn.addEventListener("click", (event) => {
  event.preventDefault();
  dropdown.style.display = "none";
});
