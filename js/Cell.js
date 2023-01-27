export class Cell {
  constructor(x, y) {
    this.y = y;
    this.x = x;
    this.value = null;
    this.isMined = false;
    this.isFlagged = false;
    this.isRevealed = false;
  }
  element = null;
  createCell() {
    this.element = document.createElement("div");
    this.element.className = "cell border border--convex";
    this.element.setAttribute("data-cell", "");
    this.element.setAttribute("data-x", this.x);
    this.element.setAttribute("data-y", this.y);
    // this.element.setAttribute("data-mined", this.isMined);
    // this.element.setAttribute("data-flagged", this.isFlagged);
    // this.element.setAttribute("data-revealed", this.isRevealed);
    return this.element;
  }
  revealCell = () => {
    if (!this.isFlagged) {
      this.isRevealed = true;
      this.element.classList.remove("border--convex");
      this.element.classList.add("cell--revealed");
      if (this.isMined) this.element.classList.add("cell--mined");
      console.log(this);
    }
  };
  flagCell = (counter, e) => {
    e.preventDefault();
    if (this.isFlagged) {
      this.isFlagged = !this.isFlagged;
      this.element.classList.toggle("cell--flagged");
      counter.decreaseCounter();
      return;
    }
    if (counter.usedFlags !== counter.maxNumberOfFlags && !this.isRevealed) {
      this.isFlagged = !this.isFlagged;
      this.element.classList.toggle("cell--flagged");
      counter.increaseCounter();
    }
  };
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
}
