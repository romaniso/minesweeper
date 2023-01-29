export class UI {
  selectors = {
    board: "[data-board]",
    cell: "[data-cell]",
    counter: "[data-counter]",
    timer: "[data-timer]",
    buttons: {
      reset: "[data-reset]",
      easy: "[data-easy]",
      normal: "[data-normal]",
      expert: "[data-expert]",
    },
  };

  getElement(selector) {
    return document.querySelector(selector);
  }
  getAllElements(selector) {
    return document.querySelectorAll(selector);
  }
}
