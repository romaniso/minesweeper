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
  #buttons = {
    reset: this.getElement(this.selectors.buttons.reset),
    easy: this.getElement(this.selectors.buttons.easy),
    normal: this.getElement(this.selectors.buttons.normal),
    expert: this.getElement(this.selectors.buttons.expert),
  };
  #mood = this.#buttons.reset.querySelector("svg use");

  #board = this.getElement(this.selectors.board);
  #cellsElements = [];
  #counterElement = this.getElement(this.selectors.counter);
  #counter = new Counter(this.#config.easy.flags, this.#counterElement);
  #timer = new Timer();

  #gameOver = false;

  #rows = this.#config.easy.rows;
  #columns = this.#config.easy.columns;
  #mines = this.#config.easy.mines;
  #flags = this.#config.easy.flags;
  #cells = [];

  initGame() {
    this.#addCells();
    if (!this.#gameOver) {
      this.#cells.flat().forEach((cell) => {
        this.#addEventListenerOnCell(cell);
        cell.removeFlags();
      });
    }
    this.#buttonsEventListeners();
  }
  #createCells() {
    for (let row = 0; row < this.#rows; row++) {
      //const row = [];
      this.#cellsElements.push([]);
      this.#cells.push([]);
      for (let colsInGame = 0; colsInGame < this.#columns; colsInGame++) {
        const cell = new Cell(colsInGame, row, this.#counter);
        this.#cells[row].push(cell);
        this.#cellsElements[row].push(cell.createCell());
      }
    }
    this.#setMines(this.#cells.flat());
    this.#cells.flat().forEach((cell) => cell.numberOfMinesAround(this.#cells));
    // this.#cells.flat()[44].numberOfMinesAround(this.#cells);
    // this.#cells.flat()[44].element.style.backgroundColor = "pink";
  }
  #addEventListenerOnCell(cell) {
    cell.element.addEventListener("click", () => {
      cell.revealCell(this.#cells);
      if (cell.isFired) {
        this.#endGame();
        return;
      } else {
        this.#startGame();
      }
    });
    cell.element.addEventListener("contextmenu", (e) => {
      cell.flagCell(e);
    });
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
    if (!this.#gameOver) {
      this.#timer.startTimer();
    }
  }
  #endGame() {
    this.#gameOver = true;
    this.#timer.stopTimer();

    setTimeout(() => {
      this.#cells
        .flat()
        .filter((cell) => cell.isMined)
        .forEach((mine) => {
          mine.element.classList.add("cell--mined");
          mine.element = null;
        });
      this.#cells.flat().forEach((cell) => {
        if (!cell.isMined) {
          cell.element.style.opacity = ".3";
          // Remove bonding between class object and an DOM element
          cell.element = null;
        }
      });
      this.#mood.setAttribute("href", "./assets/sprite.svg#sad");
    }, 500);
  }
  #resetGame = () => {
    this.#gameOver = false;
    this.#cells.length = 0;
    this.#cellsElements.length = 0;
    this.#board.innerHTML = "";
    this.#mood.setAttribute("href", "./assets/sprite.svg#neutral");
    this.#timer.resetTimer();
    this.initGame();
  };
  #buttonsEventListeners() {
    this.#buttons.reset.addEventListener("click", this.#resetGame);
  }
}

const game = new Game();
game.initGame();
