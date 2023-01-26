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
      this.element.classList.add("border--pressed");
      console.log(this);
    }
  };
  flagCell = (e) => {
    e.preventDefault();
    this.isFlagged = !this.isFlagged;
    this.element.classList.toggle("cell--flagged");
    console.log(this);
  };
}
