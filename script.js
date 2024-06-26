class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.results = results;
    this.reset();
    this.print();
  }

  reset() {
    this.times = [0, 0, 0];
    this.laps = []; // Clear lap history
    this.results.innerHTML = ''; // Clear lap display
    this.print();
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.time = performance.now();
      this.step();
    }
  }

  lap() {
    let li = document.createElement('li');
    li.innerText = this.format(this.times);
    this.results.appendChild(li);
  }

  stop() {
    if (this.running) {
      this.running = false;
    }
  }

  restart() {
    this.reset();
    this.start();
  }

  step() {
    if (!this.running) return;

    let diff = performance.now() - this.time;

    this.times[2] += diff / 10;

    if (this.times[2] >= 100) {
      this.times[1]++;
      this.times[2] -= 100;
    }

    if (this.times[1] >= 60) {
      this.times[0]++;
      this.times[1] -= 60;
    }

    this.print();
    this.time = performance.now();
    requestAnimationFrame(this.step.bind(this));
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times[0], 2)}:${pad0(times[1], 2)}:${pad0(Math.floor(times[2]), 2)}`;
  }
}

function pad0(value, count) {
  let result = value.toString();
  while (result.length < count) {
    result = '0' + result;
  }
  return result;
}

let stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'),
  document.querySelector('.results'));
