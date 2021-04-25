const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const rock = document.querySelector(".rock");
const section2 = document.querySelector(".section-2");
const count = document.querySelector(".count");
const ruleBtn = document.querySelector(".ruleBtn");
const rules = document.querySelector(".rules");
const closeRules = document.querySelector(".closeRules");

const step1 = () => {
  return `
    <div class="step-1">
      <img src="./images/bg-triangle.svg" alt="bg-triangle" />
      <div class="option paper">
        <img src="./images/icon-paper.svg" alt="paper" />
      </div>
      <div class="option scissors">
        <img src="./images/icon-scissors.svg" alt="scissors" />
      </div>
      <div class="option rock">
        <img src="./images/icon-rock.svg" alt="rock" />
      </div>
    </div>
  `;
};

const step2 = (userPick) => {
  return `
    <div class="step-2">
      <div>
        <div class="option ${userPick}">
          <img src="./images/icon-${userPick}.svg" alt="${userPick}" />
        </div>
        <div>YOU PICKED</div>
      </div>
      <div>
        <div class="waiting"></div>
        <div>THE HOUSE PICKED</div>
      </div>
    </div>
  `;
};

const step3 = (userPick, randomPick) => {
  return `
    <div class="step-3">
      <div>
        <div class="option ${userPick}">
          <img src="./images/icon-${userPick}.svg" alt="${userPick}" />
        </div>
        <div>YOU PICKED</div>
      </div>
      <div>
        <div class="option ${randomPick}">
          <img src="./images/icon-${randomPick}.svg" alt="${randomPick}" />
        </div>
        <div>THE HOUSE PICKED</div>
      </div>
    </div>
  `;
};

const step4 = (userPick, randomPick, message) => {
  return `
    <div class="step-4">
    <div>
      <div class="option ${userPick} you">
        <img src="./images/icon-${userPick}.svg" alt="${userPick}" />
      </div>
      <div>YOU PICKED</div>
    </div>
    <div>
      <div class="option ${randomPick}">
        <img src="./images/icon-${randomPick}.svg" alt="${randomPick}" />
      </div>
      <div>THE HOUSE PICKED</div>
    </div>
  </div>
  <div class="result">
    <div class="winLose">${message}</div>
    <button class='playAgain'>PLAY AGAIN</button>
  </div>
  `;
};

class App {
  #score;
  #options = ["paper", "scissors", "rock"];
  constructor() {
    this.#score = 12;
    paper.addEventListener("click", () => {
      this._start("paper");
    });
    scissors.addEventListener("click", () => {
      this._start("scissors");
    });
    rock.addEventListener("click", () => {
      this._start("rock");
    });
    ruleBtn.addEventListener("click", () => {
      this._showRules();
    });
    closeRules.addEventListener("click", () => {
      this._closeRules();
    });
  }

  _start(userPick) {
    this._select(userPick);
    let randomPick;
    const systemPicks = setInterval(() => {
      randomPick = this._randomPick();
      this._renderSysPick(userPick, randomPick);
    }, 200);
    setTimeout(() => {
      clearInterval(systemPicks);
      this._result(userPick, randomPick);
    }, 600);
  }

  _select(userPick) {
    section2.innerHTML = step2(userPick);
  }

  _randomPick() {
    return this.#options[Math.floor(Math.random() * 3)];
  }

  _renderSysPick(userPick, randomPick) {
    section2.innerHTML = step3(userPick, randomPick);
  }

  _result(userPick, randomPick) {
    const message = this._winOrLose(userPick, randomPick);
    section2.innerHTML = step4(userPick, randomPick, message);
    count.innerHTML = `${this.#score}`;
    const playAgain = document.querySelector(".playAgain");
    playAgain.addEventListener("click", () => {
      this._rednerStart();
    });
  }

  _winOrLose(userPick, randomPick) {
    if (userPick === randomPick) {
      return "TIE";
    } else if (
      (userPick === "paper" && randomPick === "rock") ||
      (userPick === "rock" && randomPick === "scissors") ||
      (userPick === "scissors" && randomPick === "paper")
    ) {
      this.#score += 1;
      return "YOU WIN";
    } else {
      this.#score -= 1;
      return "YOU LOSE";
    }
  }

  _rednerStart() {
    section2.innerHTML = step1();
    const paper = document.querySelector(".paper");
    const scissors = document.querySelector(".scissors");
    const rock = document.querySelector(".rock");
    paper.addEventListener("click", () => {
      this._start("paper");
    });
    scissors.addEventListener("click", () => {
      this._start("scissors");
    });
    rock.addEventListener("click", () => {
      this._start("rock");
    });
  }

  _showRules() {
    rules.style.display = "flex";
  }

  _closeRules() {
    rules.style.display = "none";
  }
}

const app = new App();
