export class UI {
  selectors = {
    board: "[data-board]",
    cell: "[data-cell]",
    counter: "[data-counter]",
    timer: "[data-timer]",
  };

  getElement(selector) {
    return document.querySelector(selector);
  }
  getAllElements(selector) {
    return document.querySelectorAll(selector);
  }
}
