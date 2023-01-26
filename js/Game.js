import { UI } from "./UI.js";
import { Cell } from "./Cell.js";
import { Counter } from "./Counter.js";

class Game extends UI {
  #config = {
    easy: {
      rows: 8,
      columns: 8,
      mines: 10,
      flags: 10,
    },
    normal: {
      rows: 16,
      columns: 16,
      mines: 40,
      flags: 40,
    },
    expert: {
      rows: 30,
      columns: 16,
      mines: 99,
      flags: 99,
    },
  };

  #board = this.getElement(this.selectors.board);
  #cellsElements = [];
  #counterElement = this.getElement(this.selectors.counter);
  #counter = new Counter(this.#config.easy.flags, this.#counterElement);

  #rows = this.#config.easy.rows;
  #columns = this.#config.easy.columns;
  #mines = this.#config.easy.mines;
  #flags = this.#config.easy.flags;
  #cells = [];

  initGame() {
    this.#addCells();
  }
  #createCells() {
    for (let rowsInGame = 0; rowsInGame < this.#rows; rowsInGame++) {
      const row = [];
      this.#cellsElements.push(row);
      for (let colsInGame = 0; colsInGame < this.#columns; colsInGame++) {
        const cell = new Cell(colsInGame, rowsInGame);
        this.#cells.push(cell);
        this.#cellsElements[rowsInGame].push(cell.createCell());
        cell.element.addEventListener("click", cell.revealCell);
        cell.element.addEventListener("contextmenu", (e) => {
          cell.flagCell(this.#counter, e);
          console.log(cell);
        });
      }
    }
  }
  #addCells() {
    this.#createCells();
    this.#setMines(this.#cells);
    const cellsToAdd = this.#cellsElements.flat();
    cellsToAdd.forEach((cell) => {
      this.#board.appendChild(cell);
    });
  }
  #setMines(cells) {
    let minesToAdd = 0;
    while (minesToAdd < this.#mines) {
      const index = Math.floor(Math.random() * cells.length);
      if (!cells[index].isMined) {
        cells[index].isMined = true;
        //  this.#cellsElements.flat()[index].classList.add("cell--mined");
        minesToAdd++;
      }
    }
  }
}

const game = new Game();
game.initGame();
