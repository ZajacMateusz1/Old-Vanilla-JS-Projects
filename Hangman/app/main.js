import { Quote } from "./quote.js";

class Game {
  constructor({
    lettersWrapper,
    categoryWrapper,
    wordWrapper,
    outputImg,
    modal,
    modalText,
  }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputImg = outputImg;
    this.modal = modal;
    this.modalText = modalText;
    this.quotes = [
      {
        text: "Pan Tadeusz",
        category: "Utwór literacki",
      },
      {
        text: "Antygona",
        category: "Utwór literacki",
      },
      {
        text: "Adam Mickiweicz",
        category: "Pisarz",
      },
      {
        text: "Potop",
        category: "Utwór literacki",
      },
      {
        text: "Skazani na Shawshank",
        category: "Film",
      },
      {
        text: "Makbet",
        category: "Utwór literacki",
      },
      {
        text: "Hamlet",
        category: "Utwór literacki",
      },
      {
        text: "Truskawka",
        category: "Owoc",
      },
      {
        text: "Wilk",
        category: "Zwierzę",
      },
      {
        text: "Pies",
        category: "Zwierzę",
      },
      {
        text: "Lionel Messi",
        category: "Znana osoba",
      },
      {
        text: "Cristiano Ronaldo",
        category: "Znana osoba",
      },
    ];
    const { text, category } =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.categoryWrapper.textContent = category;
    this.drawQuote = new Quote(text);
    this.userMistakes = 0;
    this.maxMistakes = 6;
  }
  startLetters() {
    for (let i = 10; i < 36; i++) {
      const letter = i.toString(36);
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", (e) => {
        this.guess(button.textContent, e);
      });
      this.lettersWrapper.appendChild(button);
    }
  }
  winGame() {
    this.modal.classList.add("active");
    this.modalText.textContent =
      "Gratulacje, udało ci się wygrać!!! 😎😎😎😃😃😃";
  }
  loseGame() {
    this.modal.classList.add("active");
    this.modalText.textContent =
      "Niestety, ale tym raze przegrałeś!!! 😭😭😭😭😭😭";
  }
  changeImg() {
    this.outputImg.setAttribute("src", `./img/${this.userMistakes}.svg`);
  }
  guess(letter, e) {
    e.target.disabled = "true";
    e.target.style.backgroundColor = "gray";
    e.target.style.color = "#333";
    const check = this.drawQuote.guess(letter);
    this.wordWrapper.textContent = this.drawQuote.getContent();
    if (!check) {
      this.userMistakes++;
    }
    this.changeImg();
    if (this.userMistakes == this.maxMistakes) {
      this.loseGame();
    } else if (!this.drawQuote.getContent().includes("_")) {
      this.winGame();
    }
  }
  start() {
    this.startLetters();
    this.wordWrapper.textContent = this.drawQuote.getContent();
  }
}

const game = new Game({
  lettersWrapper: document.querySelector("div.letters"),
  categoryWrapper: document.querySelector("div.category"),
  wordWrapper: document.querySelector("div.word"),
  outputImg: document.querySelector("div.output img"),
  modal: document.querySelector("div.modal"),
  modalText: document.querySelector("div.modal p"),
});
game.start();
