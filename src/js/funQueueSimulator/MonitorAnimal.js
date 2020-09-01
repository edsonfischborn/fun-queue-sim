import BasicElement from '../util/BasicElement';
import MonitorAnimalComponent from './baseComponents/MonitorAnimal';

/**
 * Creates a animal status inside monitor
 * @author Édson Fischborn
 */
export default class MonitorAnimal extends BasicElement {
  constructor() {
    super({ ...MonitorAnimalComponent });
  }

  // Dot/Circle represents if the animal is in the queue or not
  get dot() {
    return this.childs[0];
  }

  set dot({ currentClass, newClass } = obj) {
    return this.dot.replaceClass(currentClass, newClass);
  }

  get img() {
    return this.childs[1];
  }

  set img(src) {
    this.img.addAttributes({ src });
  }

  get name() {
    return this.childs[2].childs[0].childs[0];
  }

  set name(name) {
    this.name.setProp({ innerText: name });
  }

  get lifePercent() {
    return this.childs[2].childs[0].childs[1];
  }

  set lifePercent(value) {
    value = value > 100 ? 100 : value;
    this.lifePercent.setProp({ innerText: `${value}%` });
  }

  get progress() {
    return this.childs[2].childs[1].childs[0];
  }

  set progress({ classList, width } = obj) {
    this.progress.clearClass();
    this.progress.addStyle({ width: `${width}%` });
    this.progress.addClass(classList);
  }

  set status(config) {
    const { img, name, lifePercent, lifebarClassList } = config;
    this.img = img;
    this.name = name;
    this.lifePercent = lifePercent;
    this.progress = { classList: lifebarClassList, width: lifePercent };
  }
}
