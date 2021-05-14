const openMenuBtns = document.querySelectorAll(".hamburger");
const menu = document.querySelector(".menu");
const featuresSwitch = document.querySelector(".featuresSwitch");
const featuresNames = document.querySelectorAll(".featuresName");
const featuresDetail = document.querySelector(".featuresDetail");
const QandAQuestions = document.querySelector(".QandAQuestions");

// Menu
openMenuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});

// Features
const features = {
  1: {
    title: "Bookmark in one click",
    desciption:
      "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
  },
  2: {
    title: "Intelligent search",
    desciption:
      "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
  },
  3: {
    title: "Share your bookmarks",
    desciption:
      "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
  },
};

function renderFeature(event, num) {
  event.target.classList.add("active");
  featuresDetail.innerHTML = `
    <div class="featuresImg">
      <img src="./images/illustration-features-tab-${num}.svg" alt="feature" />
    </div>
    <div class="featuresDetailIntro">
      <h1>${features[num].title}</h1>
      <p>
        ${features[num].desciption}
      </p>
    </div>
  `;
}

featuresSwitch.addEventListener("click", (event) => {
  featuresNames.forEach((item) => {
    item.classList.remove("active");
  });
  if (event.target.classList.contains("item-1")) {
    renderFeature(event, 1);
  }
  if (event.target.classList.contains("item-2")) {
    renderFeature(event, 2);
  }
  if (event.target.classList.contains("item-3")) {
    renderFeature(event, 3);
  }
});

// Q&A

QandAQuestions.addEventListener("click", (event) => {
  const quetionContainer = event.target.parentNode.parentNode.parentNode;
  if (quetionContainer.classList.contains("quetionContainer")) {
    if (quetionContainer.classList.contains("active")) {
      event.target.style =
        "transform: rotateZ(0deg); transition: transform 0.5s ease";
      quetionContainer.classList.remove("active");
    } else {
      event.target.style =
        "transform: rotateZ(180deg); transition: transform 0.5s ease";
      quetionContainer.classList.add("active");
    }
  }
});
