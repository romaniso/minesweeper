import { UI } from "./UI.js";
import { Cell } from "./Cell.js";
import { Counter } from "./Counter.js";
import { Timer } from "./Timer.js";

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
  #timer = new Timer();

  #rows = this.#config.easy.rows;
  #columns = this.#config.easy.columns;
  #mines = this.#config.easy.mines;
  #flags = this.#config.easy.flags;
  #cells = [];

  initGame() {
    this.#addCells();
  }
  #createCells() {
    for (let row = 0; row < this.#rows; row++) {
      //const row = [];
      this.#cellsElements.push([]);
      this.#cells.push([]);
      for (let colsInGame = 0; colsInGame < this.#columns; colsInGame++) {
        const cell = new Cell(colsInGame, row);
        this.#cells[row].push(cell);
        this.#cellsElements[row].push(cell.createCell());
        cell.element.addEventListener("click", () => {
          cell.revealCell(this.#cells);
          this.#startGame();
        });
        cell.element.addEventListener("contextmenu", (e) => {
          cell.flagCell(this.#counter, e);
        });
      }
    }
    this.#setMines(this.#cells.flat());
    this.#cells.flat().forEach((cell) => cell.numberOfMinesAround(this.#cells));
    // this.#cells.flat()[44].numberOfMinesAround(this.#cells);
    // this.#cells.flat()[44].element.style.backgroundColor = "pink";
  }

  #addCells() {
    this.#createCells();

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
  #startGame() {
    this.#timer.startTimer();
  }
  #endGame() {
    this.#timer.stopTimer();
  }
}

const game = new Game();
game.initGame();
