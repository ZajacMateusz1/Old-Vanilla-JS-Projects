import { UI } from "./ui.js";

export class Counter extends UI {
  constructor() {
    super();
  }

  countFlags() {
    const flags = this.getElements(this.UISelectors.flags);
    return flags.length;
  }
}
