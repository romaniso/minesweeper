import { Cell } from "./Cell.js";
import { UI } from "./UI.js";

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
      this.#cells.push(row);
      for (let colsInGame = 0; colsInGame < this.#columns; colsInGame++) {
        const cell = new Cell(colsInGame, rowsInGame);
        this.#cells[rowsInGame].push(cell.createCell());
      }
    }
  }
  #addCells() {
    this.#createCells();
    const cellsToAdd = this.#cells.flat();
    cellsToAdd.forEach((cell) => {
      this.#board.appendChild(cell);
    });
  }
}

const game = new Game();
game.initGame();
