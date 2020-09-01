import BasicAnimal from './BasicAnimal';
import { randomNumber } from '../util/Misc';
import MonitorAnimal from './MonitorAnimal';

/**
 * Creates a basic animal element for queue
 * @author Édson Fischborn
 */
export default class QueueAnimal extends BasicAnimal {
  constructor(config) {
    super({
      minLife: 100,
      maxLife: 200,
      ...config,
      style: {
        left: '0px',
        height: '80px',
        ...config.style,
      },
      eat: {
        eatAt: 400,
        maxEatTime: 5000,
        minEatTime: 2000,
        maxLifeIncreaseByStep: 40,
        minLifeIncreaseByStep: 10,
        lifeStepCharge: 10, // In not a random case
        ...config.eat,
      },
    });

    this.monitor = new MonitorAnimal();
    this.updateMonitor();

    this.fullLife = randomNumber(this.config.minLife, this.config.maxLife);
  }

  /**
   * Get random eat config
   */
  getEatConfig() {
    const {
      maxEatTime,
      minEatTime,
      maxLifeIncreaseByStep,
      minLifeIncreaseByStep,
    } = this.config.eat;

    return {
      lifeStepCharge: randomNumber(
        minLifeIncreaseByStep,
        maxLifeIncreaseByStep
      ),
      eatTime: randomNumber(minEatTime, maxEatTime),
    };
  }

  /**
   * Go to at eat position and start eat
   * @param {Boolean} fullEat true for Increase all life of a animal
   */
  async goToEat(fullEat = false) {
    const { eatAt, lifeStepCharge } = this.config.eat;
    const { eatTime } = this.getEatConfig();

    await this.goToX(eatAt);

    const eatCb = () => {
      this.updateMonitor();
      this.monitor.name.element.classList.toggle('text-danger');
    };

    const eat = fullEat
      ? await this.fullEat(eatCb, lifeStepCharge)
      : await this.eat(eatTime, eatCb, lifeStepCharge);

    this.monitor.name.removeClass('text-danger');

    return eat;
  }

  /**
   * Move the animal to queue again
   */
  async backToQueue(pos) {
    if (pos < 0) {
      return this.addStyle({ left: `${pos}px` });
    }

    this.addStyle({ left: `-${this.element.style.width}` });
    await this.goToX(pos);
  }

  /**
   * Move the animal off the map
   */
  async getOutQueue() {
    await this.goToX(780);
  }

  /**
   * Actions before animal move
   * @param {object} config
   */
  beforeMove(config) {
    super.beforeMove(config);
    this.updateMonitor();
  }

  /**
   * Actions after animal move
   * @param {object} config
   */
  afterMove(config) {
    super.afterMove(config);
    this.updateMonitor();
  }

  /**
   * Get animal status to uptade this in monitor
   */
  getStatus() {
    return {
      name: this.name.element.innerText,
      img: this.img.config.attributes.src,
      lifebarClassList: this.lifeBar.config.classList,
      lifePercent: this.lifePercent,
    };
  }

  /**
   * Update this animal status in monitor
   */
  updateMonitor() {
    this.monitor.status = this.getStatus();
  }
}
