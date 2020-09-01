import BasicElement from '../util/BasicElement';
import BasicAnimalComponent from './baseComponents/BasicAnimal';
import { stylePropToInt, moveToAsync } from '../util/viewFunctions';
import { execAsync } from '../util/Misc';

/**
 * Creates a basic animal element for a game
 * @author Édson Fischborn
 */
export default class BasicAnimal extends BasicElement {
  constructor(config) {
    super({ ...BasicAnimalComponent });

    this.config = {
      name: 'animal',
      life: 0,
      fullLife: 100,
      animalImg: {
        stopedRight: 'src',
        stopedLeft: 'src',
        walkLeft: 'src',
        walkRight: 'src',
        eat: 'src',
      },
      style: {
        left: '1px',
        height: '10px',
      },
      ...config,
    };

    this.readyToWalk = true;

    this.addStyle(this.config.style);
    this.updateLife(this.config.life);
    this.updateImg(this.config.animalImg.stopedRight);
    this.name.setProp({ innerText: this.config.name });
  }

  /**
   * Move animal on x axis
   * @param {Number} posX
   * @param {number} step
   */
  async goToX(posX = 20, step = 1) {
    const left = stylePropToInt(this.style.left);

    const direction = left < posX ? 'right' : 'left';
    const animateConfig = this.getMoveConfig(direction);

    this.beforeMove(animateConfig);

    await moveToAsync(this.element, posX, 'x', step);

    const newLeft = stylePropToInt(this.element.style.left);
    this.addStyle({ left: `${newLeft}px` });

    this.afterMove(animateConfig);
  }

  /**
   * Promise await animal to be ready to walk
   */
  awaitReadyToWalk() {
    return execAsync({
      finishCondition: () => this.readyToWalk,
    });
  }

  /**
   * Returns a style object for picked move direction.
   * This object is used in afterMove or beforeMove methods.
   * @param {String} direction left or right
   * @returns {object}
   */
  getMoveConfig(direction = 'left') {
    const {
      walkRight,
      stopedRight,
      walkLeft,
      stopedLeft,
    } = this.config.animalImg;

    const config = {
      left: {
        zIndex: '1',
        moveImg: walkLeft,
        stopImg: stopedLeft,
      },
      right: {
        zIndex: '2',
        moveImg: walkRight,
        stopImg: stopedRight,
      },
    };

    return config[direction];
  }

  /**
   * Actions before animal move
   * @param {object} config
   */
  beforeMove(config) {
    this.updateImg(config.moveImg);
    this.addStyle({ zIndex: config.zIndex });
    this.readyToWalk = false;
  }

  /**
   * Actions after animal move
   * @param {object} config
   */
  afterMove(config) {
    this.updateImg(config.stopImg);
    this.addStyle({ zIndex: config.zIndex });
    this.readyToWalk = true;
  }

  /**
   * Increase life of a animal
   * @param {Number} eatTime Eating time
   * @param {Number} cb Function performed with each life increase
   * @param {Number} lifeCharge Number of life that will be added to each life increase
   */
  async eat(eatTime = 5000, cb, lifeCharge = 10) {
    this.beforeEat();

    // Condition to finish promise before all eating time
    const fullLife = () => this.config.fullLife <= this.life;

    await execAsync({
      callBack: () => {
        this.updateLife(lifeCharge); // Update lifebar stts
        cb(); // User function
      },
      interval: 500, // Interval to increase life
      finishTime: eatTime,
      finishCondition: fullLife,
    });

    this.afterEat();

    return fullLife();
  }

  /**
   * Increase all life of a animal
   * @param {Number} cb Function performed with each life increase
   * @param {Number} lifeCharge Number of life that will be added to each life increase
   */
  async fullEat(cb, lifeCharge) {
    return this.eat(2147483647, cb, lifeCharge);
  }

  /**
   * Actions before animal eat
   */
  beforeEat() {
    this.updateImg(this.config.animalImg.eat);
    this.addStyle({ zIndex: 2 });
  }

  /**
   * Actions after animal eat
   */
  afterEat() {
    this.updateImg(this.config.animalImg.stopedRight);
  }

  /**
   * Add more charge to animal life and update animal sttatus
   */
  updateLife(lifeCharge) {
    this.life += lifeCharge;
    this.updateLifeStyle();
  }

  /**
   * Add colors to animal status based on the animal life
   */
  updateLifeStyle() {
    // Update progress bar width
    const percent = this.lifePercent;

    this.lifeBar.addStyle({
      width: `${percent}%`,
    });

    const classList = {
      success: 'bg-success',
      warning: 'bg-warning text-dark',
      danger: 'bg-danger',
    };

    // Remove old color
    for (let [, value] of Object.entries(classList)) {
      this.name.removeClass(value);
      this.lifeBar.removeClass(value);
    }

    // Set new color
    let list = classList.success; // Success by default

    if (percent <= 50) list = classList.danger;
    else if (percent >= 51 && percent <= 99) list = classList.warning;

    // Add color
    this.name.addClass(list);
    this.lifeBar.addClass(list);
  }

  /**
   * Set amimal image
   * @param {String} src
   */
  updateImg(src) {
    this.img.addAttributes({ src });
  }

  // Get
  get life() {
    return this.config.life;
  }

  get fullLife() {
    return this.config.fullLife;
  }

  get lifePercent() {
    return Math.round((this.life * 100) / this.config.fullLife);
  }

  get name() {
    return this.childs[0];
  }

  get lifeBar() {
    return this.childs[1].childs[0];
  }

  get img() {
    return this.childs[2];
  }

  // Set
  set fullLife(fullLife) {
    return (this.config.fullLife = fullLife);
  }

  set life(life) {
    return (this.config.life = life);
  }

  set name(innerText) {
    return this.name.setProp({ innerText });
  }
}
