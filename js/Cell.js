import { Timer } from "./Timer.js";
export class Cell extends Timer {
  constructor(x, y, counter) {
    super();
    this.y = y;
    this.x = x;
    this.value = null;
    this.isMined = false;
    this.isFlagged = false;
    this.isRevealed = false;
    this.isFired = false;
    this.counter = counter;
  }
  element = null;
  createCell() {
    this.element = document.createElement("div");
    this.element.className = "cell border border--convex";
    this.element.setAttribute("data-cell", "");
    this.element.setAttribute("data-x", this.x);
    this.element.setAttribute("data-y", this.y);
    return this.element;
  }
  revealCell = (cells) => {
    if (!this.element) return;
    if (!this.isFlagged) {
      this.isRevealed = true;
      this.element.classList.remove("border--convex");
      this.element.classList.add("cell--revealed");
      if (this.isMined) {
        this.element.classList.add("cell--mined");
        this.isFired = true;
        return;
      }
      if (this.value) {
        this.#showValue(this.value);
      } else {
        this.#revealMany(cells);
      }
    }
  };
  flagCell = (e) => {
    e.preventDefault();
    if (!this.element) return;
    if (this.isFlagged) {
      this.isFlagged = !this.isFlagged;
      this.element.classList.toggle("cell--flagged");
      this.counter.decreaseCounter();
      return;
    }
    if (
      this.counter.usedFlags !== this.counter.maxNumberOfFlags &&
      !this.isRevealed
    ) {
      this.isFlagged = !this.isFlagged;
      this.element.classList.toggle("cell--flagged");
      this.counter.increaseCounter();
    }
  };
  removeFlags() {
    this.isFlagged = false;
    this.element.classList.remove("cell--flagged");
    this.counter.decreaseCounter();
  }
  numberOfMinesAround(cells) {
    const cellX = this.x;
    const cellY = this.y;
    for (let row = 0; row < cells.length; row++) {
      for (let col = 0; col < cells[row].length; col++) {
        if (
          (cellY === row - 1 || cellY === row + 1 || cellY === row) &&
          (cellX === col - 1 || cellX === col + 1 || cellX === col)
        ) {
          if ((row !== cellY || col !== cellX) && cells[row][col].isMined) {
            this.value++;
          }
        }
      }
    }
  }
  #showValue(value) {
    if (value) {
      this.element.textContent = value;
      this.element.classList.add(`cell--value-${value}`);
      this.removeFlags();
    }
  }
  #revealMany(cells) {
    const cellX = this.x;
    const cellY = this.y;
    const rows = cells.length;
    // console.log(this);

    let cellsToReveal = 0;
    do {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cells[row].length; col++) {
          if (
            (cellY === row - 1 || cellY === row + 1 || cellY === row) &&
            (cellX === col - 1 || cellX === col + 1 || cellX === col)
          ) {
            const neigboringCell = cells[row][col];
            if (!neigboringCell.isMined) {
              cellsToReveal++;
            } else return;

            if (neigboringCell.value) {
              neigboringCell.#showValue(neigboringCell.value);
              neigboringCell.isRevealed = true;
              neigboringCell.element.classList.remove("border--convex");
              neigboringCell.element.classList.add("cell--revealed");
              cellsToReveal--;
            } else if (!neigboringCell.value) {
              neigboringCell.removeFlags();
              neigboringCell.isRevealed = true;
              neigboringCell.element.classList.remove("border--convex");
              neigboringCell.element.classList.add("cell--revealed");
              cellsToReveal--;
              //  this.#revealMany(cells);

              //Loop once again
            }
          }
          console.log(cellsToReveal);
        }
      }
    } while (cellsToReveal);
  }
}
