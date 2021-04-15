const navItems = document.querySelectorAll(".navList > li");
const subMenus = document.querySelectorAll(".subMenu");

function removeActiveMenu() {
  navItems.forEach((item) => {
    item.classList.remove("activeMenu");
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    removeActiveMenu();
    item.classList.toggle("activeMenu");
  });
});

subMenus.forEach((subMenu) => {
  subMenu.addEventListener("mouseleave", (event) => {
    event.preventDefault();
    removeActiveMenu();
  });
});
