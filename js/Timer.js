import { UI } from "./UI.js";

export class Timer extends UI {
  #element = this.getElement(this.selectors.timer);
  #interval = null;
  #currentSecond = 0;
  #started = false;

  resetTimer() {
    this.#currentSecond = 0;
    this.#element.innerHTML = `00${this.#currentSecond}`;
    clearInterval(this.#interval);
    this.#started = false;
  }
  startTimer() {
    if (!this.#started) {
      this.#currentSecond = 0;
      this.#started = true;
      this.#interval = setInterval(() => {
        this.#currentSecond++;
        this.#element.innerHTML = this.#currentSecond;
      }, 1000);
    }
  }
  stopTimer() {
    clearInterval(this.#interval);
    this.#started = false;
  }
}
