import { UI } from "./UI.js";

export class Timer extends UI {
  #element = this.getElement(this.selectors.timer);
  #interval = null;
  #currentSecond = 0;
  #started = false;

  startTimer() {
    if (!this.#started) {
      this.#started = true;
      this.#interval = setInterval(() => {
        this.#currentSecond++;
        this.#element.innerHTML = this.#currentSecond;
      }, 1000);
    }
  }
  stopTimer() {
    clearInterval(this.#interval);
    console.log("stop");
  }
}