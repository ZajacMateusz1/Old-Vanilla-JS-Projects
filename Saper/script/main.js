import { Cell } from "./cell.js";
import { UI } from "./ui.js";
import { Timer } from "./timer.js";
import { Counter } from "./counter.js";

class Game extends UI {
  constructor() {
    super();
    this.select = document.getElementById("selectDifficulty");
    this.gameBoard = document.querySelector("div.gameBoard");
    this.main = document.querySelector("main.game");
    this.timerMinutes = document.querySelector("div.timeCount p span.minutes");
    this.timerSeconds = document.querySelector("div.timeCount p span.seconds");
    this.divCounter = document.querySelector("div.counter p");
    this.modal = document.querySelector("div.modal");
    this.modalText = document.querySelector("div.modal p");
    this.playAgainBtn = document.querySelector("button.playAgain");
    this.resetBtn = document.querySelector("button.reset");

    this.cellArr = [];
    this.rows = null;
    this.columns = null;
    this.mines = null;
    this.size = null;
    this.gameResult = false;
    this.countReveledCells = 0;

    this.difficultes = {
      0: {
        rows: 8,
        columns: 8,
        mines: 10,
        size: "3rem",
        boardWidth: "27.5rem",
      },
      1: {
        rows: 16,
        columns: 16,
        mines: 40,
        size: "1.8rem",
        boardWidth: "30.5rem",
      },
      2: {
        rows: 16,
        columns: 30,
        mines: 99,
        size: "1.3rem",
        boardWidth: "40.5rem",
      },
    };

    this.timer = new Timer(this.timerMinutes, this.timerSeconds);
    this.counter = new Counter(this.mines);
  }
  #selectDifficultyLevel() {
    const difficulty = this.difficultes[this.select.selectedIndex];
    this.rows = difficulty.rows;
    this.columns = difficulty.columns;
    this.mines = difficulty.mines;
    document.documentElement.style.setProperty("--size", difficulty.size);
    document.documentElement.style.setProperty(
      "--boardWidth",
      difficulty.boardWidth
    );
    this.#removeCellEvents();
    this.#resetGame();
    this.#createGameBoard(this.rows, this.columns, this.mines);
    this.#createMines();
    this.#addCellEvents();
    this.divCounter.textContent = this.mines;
  }
  #createGameBoard(rows, columns) {
    for (let row = 0; row < rows; row++) {
      this.cellArr[row] = [];
      for (let col = 0; col < columns; col++) {
        const cell = new Cell(row, col);
        this.cellArr[row][col] = cell;
        this.gameBoard.insertAdjacentHTML("beforeend", cell.createCell());
      }
    }
  }
  #getRandomInt(number) {
    const random = Math.floor(Math.random() * (number - 1));
    return random;
  }

  #createMines() {
    let minesToPlace = this.mines;
    do {
      const x = this.#getRandomInt(this.rows);
      const y = this.#getRandomInt(this.columns);
      const cell = this.cellArr[x][y];
      if (!cell.isMine) {
        minesToPlace--;
        cell.isMine = true;
      }
    } while (minesToPlace);
  }
  #getAllCells() {
    const elements = this.getElements(this.UISelectors.cells);
    return elements;
  }
  #addCellEvents() {
    const elements = this.#getAllCells();
    elements.forEach((element) => {
      element.addEventListener("click", this.#cellLeftClick.bind(this));
      element.addEventListener("contextmenu", this.#cellRightClick.bind(this));
    });
  }
  #removeCellEvents() {
    const elements = this.#getAllCells();
    elements.forEach((element) => {
      element.removeEventListener("click", this.#cellLeftClick.bind(this));
      element.removeEventListener(
        "contextmenu",
        this.#cellRightClick.bind(this)
      );
    });
  }
  #findElement(target) {
    const x = target.getAttribute("data-x");
    const y = target.getAttribute("data-y");
    const cell = this.cellArr[x][y];
    return cell;
  }
  #setCellValue(cell, element) {
    if (cell.isReveal) {
      return;
    }
    if (cell.isFlagged) {
      return;
    }
    let mines = 0;
    for (
      let row = Math.max(cell.x - 1, 0);
      row <= Math.min(cell.x + 1, this.rows - 1);
      row++
    ) {
      for (
        let col = Math.max(cell.y - 1, 0);
        col <= Math.min(cell.y + 1, this.columns - 1);
        col++
      ) {
        const findedCell = this.cellArr[row][col];
        if (findedCell.isMine) {
          mines++;
        }
      }
    }
    cell.value = mines;
    cell.revealCell(element);
    this.countReveledCells++;
    if (!mines) {
      for (
        let row = Math.max(cell.x - 1, 0);
        row <= Math.min(cell.x + 1, this.rows - 1);
        row++
      ) {
        for (
          let col = Math.max(cell.y - 1, 0);
          col <= Math.min(cell.y + 1, this.columns - 1);
          col++
        ) {
          const findedCell = this.cellArr[row][col];
          const findedElement = this.getElement(findedCell.selector);
          this.#setCellValue(findedCell, findedElement);
        }
      }
    }
  }
  #cellLeftClick(e) {
    const cell = this.#findElement(e.target);
    this.#setCellValue(cell, e.target);
    if (cell.isMine && cell.isReveal) {
      this.gameResult = false;
      this.#endGame();
    } else if (
      this.countReveledCells ===
      this.columns * this.rows - this.mines
    ) {
      this.gameResult = true;
      this.#endGame();
    }
  }
  #cellRightClick(e) {
    e.preventDefault();
    const cell = this.#findElement(e.target);
    let flags = this.counter.countFlags();
    if (flags < this.mines || (flags == this.mines && cell.isFlagged)) {
      cell.toggleFlag(e.target);
      flags = this.counter.countFlags();
      this.divCounter.textContent = this.mines - flags;
    }
  }
  #showAllBombs() {
    const bombs = this.cellArr.flat().filter((bomb) => bomb.isMine);
    bombs.forEach((bomb) => {
      const element = this.getElement(bomb.selector);
      element.classList.remove("flag");
      bomb.revealCell(element);
    });
  }
  #endGame() {
    this.modal.classList.add("active");
    if (this.gameResult) {
      this.modalText.textContent = "Gratulacje, udało ci się wygrać!";
    } else {
      this.#showAllBombs();
      this.modalText.textContent = "Niestety, tym razem przegrałeś!";
    }
  }
  #resetGame() {
    while (this.gameBoard.firstChild) {
      this.gameBoard.lastChild.remove();
    }
    this.cellArr = [];
    this.modal.classList.remove("active");
    this.countReveledCells = 0;
    this.timer.resetTimer();
  }
  start() {
    this.select.addEventListener(
      "change",
      this.#selectDifficultyLevel.bind(this)
    );
    this.resetBtn.addEventListener(
      "click",
      this.#selectDifficultyLevel.bind(this)
    );
    this.playAgainBtn.addEventListener(
      "click",
      this.#selectDifficultyLevel.bind(this)
    );
    this.#selectDifficultyLevel();
    this.timer.countTime();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.start();
});
