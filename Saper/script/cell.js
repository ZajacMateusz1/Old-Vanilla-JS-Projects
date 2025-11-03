import { UI } from "./ui.js";

export class Cell extends UI {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.isMine = false;
    this.isReveal = false;
    this.isFlagged = false;
    this.cell = null;
    this.value = 0;
    this.selector = `[data-x='${this.x}'][data-y='${this.y}']`;
  }
  createCell() {
    this.cell = `<div class="cell" data-x='${this.x}' data-y='${this.y}'></div>`;
    return this.cell;
  }
  toggleFlag(element) {
    if (!this.isReveal) {
      element.classList.toggle("flag");
      this.isFlagged = element.classList.contains("flag");
    }
  }
  revealCell(element) {
    if (!this.isReveal && !element.classList.contains("flag")) {
      element.classList.add("reveal");
      this.isReveal = true;
      element.classList.add(`value${this.value}`);
      if (this.isMine) {
        element.textContent = "";
        element.classList.add("bomb");
      } else {
        element.textContent = this.value > 0 ? this.value : "";
      }
    }
  }
}
