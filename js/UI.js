export class UI {
  selectors = {
    board: "[data-board]",
    cell: "[data-cell]",
    counter: "[data-counter]",
  };

  getElement(selector) {
    return document.querySelector(selector);
  }
  getAllElements(selector) {
    return document.querySelectorAll(selector);
  }
}
