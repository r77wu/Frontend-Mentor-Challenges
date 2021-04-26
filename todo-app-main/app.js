const body = document.body;
const header = document.querySelector("header");
const themeSelecter = document.querySelector(".themeSelecter");
const lightMode = document.querySelector(".light");
const darkMode = document.querySelector(".dark");
const searchArea = document.querySelector(".searchArea");
const listContainer = document.querySelector(".listContainer");
const inputForm = document.querySelector(".inputForm");
const inputText = document.querySelector(".inputText");
const toDoListEl = document.querySelector(".toDoList");
const clearBtn = document.querySelector(".clearBtn");
const itemLeft = document.querySelector(".itemLeft");
const statusAll = document.querySelector(".statusAll");
const statusActive = document.querySelector(".statusActive");
const statusCompleted = document.querySelector(".statusCompleted");
const desktopStatus = document.querySelector(".desktopStatus");
const mobileStatus = document.querySelector(".mobileStatus");

class toDo {
  #discription;
  #status;
  #id;
  constructor(discription) {
    this.#discription = discription;
    this.#status = "active";
    this.#id = new Date().getTime();
  }

  _getDiscription() {
    return this.#discription;
  }
  _getStatus() {
    return this.#status;
  }
  _getId() {
    return this.#id;
  }
  _completed() {
    this.#status = "completed";
  }
}

class App {
  #nightMode;
  #toDoList = [];
  constructor() {
    this.#nightMode = false;
    themeSelecter.addEventListener("click", this._changeTheme.bind(this));
    inputForm.addEventListener("submit", this._createToDo.bind(this));
    clearBtn.addEventListener("click", this._clearCompleted.bind(this));
    statusAll.addEventListener("click", () => {
      this._renderDom("all");
      this._clearStatus(statusAll);
    });
    statusActive.addEventListener("click", () => {
      this._renderDom("active");
      this._clearStatus(statusActive);
    });
    statusCompleted.addEventListener("click", () => {
      this._renderDom("completed");
      this._clearStatus(statusCompleted);
    });
  }

  _clearStatus(status) {
    statusAll.classList.remove("active");
    statusActive.classList.remove("active");
    statusCompleted.classList.remove("active");
    status.classList.add("active");
  }

  _createToDo(event) {
    event.preventDefault();
    const newToDo = new toDo(inputText.value);
    this.#toDoList.push(newToDo);
    this._createEl(newToDo);
    inputText.value = "";
    this._countActive();
  }

  _createEl(newToDo) {
    let newEL = document.createElement("div");
    newEL.classList.add("toDoItem");
    newEL.innerHTML = `
    <div class="checkBox">
      <div class="checkCircle" data-statusId="${newToDo._getId()}">
      </div>
    </div>
    <div class="inputBox"><p>${newToDo._getDiscription()}</p></div>
    <div class="deleteBox" data-delId="${newToDo._getId()}">
      <img src="./images/icon-cross.svg" alt="delete" />
    </div>`;

    toDoListEl.appendChild(newEL);
    const deleteBtn = document.querySelector(
      `[data-delId="${newToDo._getId()}"]`
    );
    deleteBtn.addEventListener("click", () => {
      this.#toDoList = this.#toDoList.filter((toDoItem) => {
        if (toDoItem._getId() !== newToDo._getId()) {
          return toDoItem;
        }
      });
      newEL.remove();
      this._countActive();
    });
    const completedBtn = document.querySelector(
      `[data-statusId="${newToDo._getId()}"]`
    );
    if (newToDo._getStatus() === "completed") {
      completedBtn.classList.add("completed");
      newEL.style.textDecoration = "line-through";
    }
    completedBtn.addEventListener("click", () => {
      completedBtn.classList.add("completed");
      newToDo._completed();
      newEL.style.textDecoration = "line-through";
      this._countActive();
    });
  }

  _renderDom(status) {
    let filteredList;
    if (status === "all") {
      filteredList = this.#toDoList;
    } else {
      filteredList = this.#toDoList.filter((toDoItem) => {
        if (toDoItem._getStatus() === `${status}`) {
          return toDoItem;
        }
      });
    }
    toDoListEl.innerHTML = "";
    for (let item of filteredList) {
      this._createEl(item);
    }
    this._countActive();
  }

  _clearCompleted() {
    this.#toDoList = this.#toDoList.filter((toDoItem) => {
      if (toDoItem._getStatus() !== "completed") {
        return toDoItem;
      }
    });
    this._renderDom("all");
  }

  _countActive() {
    const count = this.#toDoList.reduce((acc, curr) => {
      if (curr._getStatus() === "active") {
        acc++;
      }
      return acc;
    }, 0);
    itemLeft.innerHTML = `${count} items left`;
  }

  _changeTheme() {
    console.log(screen.width);
    this.#nightMode = !this.#nightMode;
    if (this.#nightMode) {
      if (screen.width > 375) {
        header.style.background =
          'url("./images/bg-desktop-dark.jpg") no-repeat center center';
      } else {
        header.style.background =
          'url("./images/bg-mobile-dark.jpg") no-repeat center center';
      }
      body.style.backgroundColor = "hsl(235, 21%, 11%)";
      darkMode.classList.remove("hiddenIron");
      lightMode.classList.add("hiddenIron");

      searchArea.style.backgroundColor = "hsl(235, 24%, 19%)";
      listContainer.style.backgroundColor = "hsl(235, 24%, 19%)";
      inputText.style.backgroundColor = "hsl(235, 24%, 19%)";
      desktopStatus.style.backgroundColor = "hsl(235, 24%, 19%)";
      mobileStatus.style.backgroundColor = "hsl(235, 24%, 19%)";
    } else {
      if (screen.width > 375) {
        header.style.background =
          'url("./images/bg-desktop-light.jpg") no-repeat center center';
      } else {
        header.style.background =
          'url("./images/bg-mobile-light.jpg") no-repeat center center';
      }
      body.style.backgroundColor = "hsl(236, 33%, 92%)";
      darkMode.classList.add("hiddenIron");
      lightMode.classList.remove("hiddenIron");

      searchArea.style.backgroundColor = "#ffffff";
      listContainer.style.backgroundColor = "#ffffff";
      inputText.style.backgroundColor = "#ffffff";
      desktopStatus.style.backgroundColor = "#ffffff";
      mobileStatus.style.backgroundColor = "#ffffff";
    }
  }
}

const app = new App();
