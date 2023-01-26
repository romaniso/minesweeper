export class Counter {
  constructor(maxNumberOfFlags = 10, counterElement) {
    this.maxNumberOfFlags = maxNumberOfFlags;
    this.counter = counterElement;
  }
  usedFlags = 0;
  increaseCounter() {
    this.usedFlags++;
    this.counter.innerHTML = this.usedFlags;
  }
  decreaseCounter() {
    if (this.usedFlags) {
      this.usedFlags--;
      this.counter.innerHTML = this.usedFlags;
    }
  }
}
