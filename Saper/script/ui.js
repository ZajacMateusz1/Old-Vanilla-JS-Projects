export class UI {
  constructor() {
    this.UISelectors = {
      cells: "div.cell",
      flags: "div.cell.flag",
    };
  }
  getElement(selector) {
    return document.querySelector(selector);
  }
  getElements(selector) {
    return document.querySelectorAll(selector);
  }
}
