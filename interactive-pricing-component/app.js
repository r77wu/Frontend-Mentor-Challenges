const toggleBtn = document.querySelector(".toggleBtn");
const toggle = document.querySelector(".toggle");
const pageviews = document.querySelector(".pageviews");
const pricebox = document.querySelector(".pricebox");
const slider = document.querySelector(".slider");
const selectBtn = document.querySelector(".selectBtn");
const process = document.querySelector(".process");

let discount = 1;

function updatePriceAndPage(selectedValue) {
  let price, pages;

  switch (selectedValue) {
    case "0":
      price = 8 * discount;
      pages = "10K";
      break;
    case "25":
      price = 12 * discount;
      pages = "50K";
      break;
    case "50":
      price = 16 * discount;
      pages = "100K";
      break;
    case "75":
      price = 24 * discount;
      pages = "500K";
      break;
    case "100":
      price = 36 * discount;
      pages = "1M";
      break;
    default:
      price = 16 * discount;
      pages = "100K";
  }
  pageviews.innerHTML = `${pages} pageviews`;
  pricebox.innerHTML = `$${price}.00`;
}

slider.addEventListener("input", (event) => {
  event.preventDefault();
  selectBtn.style.left = `${slider.value}%`;
  process.style.width = `${slider.value}%`;
  updatePriceAndPage(slider.value);
});

toggleBtn.addEventListener("click", (event) => {
  event.preventDefault();
  toggle.classList.toggle("yearly");

  discount = toggle.classList.contains("yearly") ? 0.75 : 1;
  updatePriceAndPage(slider.value);
});
