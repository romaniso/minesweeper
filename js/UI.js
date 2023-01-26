export class UI {
  selectors = {
    board: "[data-board]",
  };

  getElement(selector) {
    return document.querySelector(selector);
  }
  getAllElements(selector) {
    return document.querySelectorAll(selector);
  }
}
