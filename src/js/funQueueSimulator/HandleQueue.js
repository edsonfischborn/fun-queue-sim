import CreateMap from './CreateMap';
import Queue from '../util/Queue';

// Animals
import Chicken from './animals/Chicken';
import Cow from './animals/Cow';
import Pig from './animals/Pig';
import Sheep from './animals/Sheep';

// Util
import { stylePropToInt } from '../util/viewFunctions';

import Monitor from './Monitor';

/**
 * Handle full queue simulator
 * @author Édson Fischborn
 */
export default class HandleQueue {
  constructor(config) {
    this.config = {
      queueAnimalSpacing: 95,
      queueFirstAnimalPosition: 300,
      biggestFirst: false,
      switchProcess: true,
      animals: {
        chicken: {
          ammount: 1,
          /*...*/
          eat: {
            /*...*/
          },
        },
        sheep: {
          ammount: 1,
        },
        pig: {
          ammount: 1,
        },
        cow: {
          ammount: 1,
        },
      },
      ...config,
    };

    this.animals = [];

    this.queue = new Queue();

    this.map = new CreateMap();

    this.animalsAmmount = this.setAnimalsAmmount();

    this.monitor = new Monitor();
    this._monitorOrder = 0;

    this.init();
  }

  init() {
    const animals = this.startAnimals();
    const animalsPosition = this.getAnimalsPosition();

    this.orderAnimals(animals);

    animals.forEach((animal, i) => {
      const left = `${animalsPosition[i] - 200}px`; // Start queue spacing
      animal.addStyle({ left });

      const name = animal.name.element.innerText;
      const processId = (i + 1).toString().padStart(2, '0');
      animal.name = `${name}-${processId}`;

      this.monitor.pushChild(animal.monitor);
      this.animals.push(animal);
      this.map.pushChild(animal);
      this.queue.enqueue(animal);
    });

    this.updateAnimalsPosition();
    this.monitor.queueLength = this.queue.length;
  }

  /**
   * Execute first queue process
   */
  async process() {
    // Await first queue aimal ready to eat
    await this.queue.peek().awaitReadyToWalk();

    const fullEat = !this.config.switchProcess;

    // First animal go to eat
    const eatResult = await this.queue.peek().goToEat(fullEat);

    if (this.queue.length > 1) this.updateMonitor(++this._monitorOrder);

    if (eatResult) {
      await this.onProcessFinish();
      return true;
    } else {
      if (this.queue.length === 1) {
        await this.process();
        return true;
      }

      await this.queue.peek().goToX(235);

      for (let animal of this.queue) {
        await animal.awaitReadyToWalk();
      }

      await this.afterProcessExec();
      this.updateAnimalsPosition();

      return false;
    }
  }

  /**
   * Execute all queue process
   */
  async autoProcess() {
    while (!this.queue.isEmpty()) {
      await this.process();
    }

    return true;
  }

  /**
   * Actions when process execution
   */
  async afterProcessExec() {
    const { queueAnimalSpacing } = this.config;

    const lastAnimalStoped = this.queue[this.queue.length - 2];
    const lastAnimalPosition = stylePropToInt(lastAnimalStoped.style.left);

    const animalPos =
      this.queue.length > 2
        ? lastAnimalPosition - queueAnimalSpacing
        : lastAnimalPosition;

    this.queue.peek().backToQueue(animalPos);

    this.queue.enqueue(this.queue.dequeue());
  }

  /**
   * Actions when process finish
   */
  async onProcessFinish() {
    this.updateMonitor(Date.now());

    const animal = this.queue.peek();

    animal.monitor.addStyle({ opacity: '0.7' });
    animal.monitor.dot = { currentClass: 'bg-danger', newClass: 'bg-success' };

    if (this.queue.length === 1) {
      this.monitor.queueLength = 0;
      await animal.getOutQueue();
    } else {
      this.monitor.queueLength = this.queue.length - 1;
      animal.getOutQueue();
    }

    this.queue.dequeue();
    this.updateAnimalsPosition();
  }

  /**
   * Update the first queue animal on monitor
   * @param {number} order Integer of new position in monitor
   */
  updateMonitor(order) {
    const firstAnimalMonitor = this.queue.peek().monitor;

    firstAnimalMonitor.replaceClass(
      'animate__slideInLeft',
      'animate__slideOutLeft'
    );

    setTimeout(() => {
      firstAnimalMonitor.addStyle({ order });
      firstAnimalMonitor.replaceClass(
        'animate__slideOutLeft',
        'animate__slideInLeft'
      );
    }, 1000);
  }

  /**
   * Walk stopped animals to new queue positions
   */
  async updateAnimalsPosition() {
    const animalsPromises = [];
    const positions = this.getAnimalsPosition();

    for (let i in this.queue) {
      if (this.queue[i].readyToWalk) {
        animalsPromises.push(this.queue[i].goToX(positions[i]));
      }
    }

    await Promise.all(animalsPromises);
  }

  /** 
   Set a integer array of animals position
   @returns {Array}
  */
  getAnimalsPosition() {
    const { queueAnimalSpacing, queueFirstAnimalPosition } = this.config;
    const positions = [queueFirstAnimalPosition];

    for (let i = 1; i < this.animalsAmmount; i++) {
      const pos = positions[i - 1] - queueAnimalSpacing;
      positions.push(pos);
    }

    return positions;
  }

  /**
   * Order animals array by animal full life
   * @param {Array} animals
   */
  orderAnimals(animals) {
    animals.sort((a, b) => {
      if (a.fullLife < b.fullLife && this.config.biggestFirst) {
        return 1;
      }
      return -1;
    });
  }

  /**
   * Create a queue animals array
   * @returns {Array}
   */
  startAnimals() {
    const animals = [];

    for (let [animalName, config] of Object.entries(this.config.animals)) {
      while (config.ammount--) {
        const Animal = this.setAnimal(animalName);
        animals.push(new Animal(config));
      }
    }

    return animals;
  }

  /**
   * Set animal class by string animal name
   * @param {String} name
   * @returns class
   */
  setAnimal(name) {
    const animals = {
      cow: Cow,
      chicken: Chicken,
      pig: Pig,
      sheep: Sheep,
    };

    return animals[name];
  }

  /**
   * Returns initial animals ammount of queue
   * @returns {Number}
   */
  setAnimalsAmmount() {
    let animalsAmmount = 0;

    for (let [, config] of Object.entries(this.config.animals)) {
      animalsAmmount += config.ammount;
    }

    return animalsAmmount;
  }

  /**
   * Remove class props of memory and remove map and monitor of page
   */
  destroy() {
    this.map.domRemove();
    this.monitor.domRemove();

    for (let prop of Object.getOwnPropertyNames(this)) {
      delete this[prop];
    }
  }
}
