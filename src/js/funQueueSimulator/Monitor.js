import BasicElement from '../util/BasicElement';
import MonitorComponet from './baseComponents/Monitor';

/**
 * Creates a monitor container on left side for status of queue and animal
 * @author Édson Fischborn
 */
export default class Monitor extends BasicElement {
  constructor() {
    super({ ...MonitorComponet });
  }

  /**
   * @returns {BasicElement}
   */
  get queueLength() {
    return this.childs[0].childs[0];
  }

  /**
   * Update queue value and add style
   */
  set queueLength(value) {
    this.queueLength.element.classList.add('animate__pulse');
    setTimeout(() => {
      this.queueLength.element.classList.remove('animate__pulse');
    }, 2000);

    this.queueLength.setProp({ innerText: `Queue length: ${value}` });
  }
}
