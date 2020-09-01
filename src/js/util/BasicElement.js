import * as _ from './viewFunctions.js';

/**
 * @author Édson Fischborn
 * @param {Object} config
 */
export default class BasicElement {
  constructor(config = {}) {
    // Default element config
    this.config = {
      element: 'div',
      target: 'body',
      text: '',
      positionOnTarget: 'beforeEnd',
      append: true,
      classList: '',
      attributes: {},
      props: {},
      style: {},
      childsConfig: [],
      ...config,
    };

    // All BasicElements childs of the BasicElement
    this.childs = [];

    this.create();
  }

  // create element
  create() {
    const {
      style,
      attributes,
      element,
      classList,
      append,
      childsConfig,
      text,
      props,
    } = this.config;

    this.element = _.createElm(element);

    if (text) this.setProp({ innerText: text });

    this.setProp(props);

    this.addClass(classList);
    this.addAttributes(attributes);
    this.addStyle(style);

    this.config.childsConfig = [];
    this.createChild(...childsConfig);

    if (append) this.append();
  }

  // Create a child by object config
  createChild(...basicElementsConfig) {
    for (let config of basicElementsConfig) {
      config = {
        ...config,
        target: this.element,
      };

      this.pushChild(new BasicElement(config));
      this.config.childsConfig.push(config);
    }
  }

  // Insert a BasicElement child to the element
  pushChild(...basicElements) {
    for (let basicElement of basicElements) {
      _.appendCh(this.element, basicElement.element);
      this.childs.push(basicElement);
    }
  }

  // Adds style to the element
  addStyle(objStyle) {
    _.multiStyleAdd(objStyle, this.element);

    this.config.style = {
      ...this.config.style,
      ...objStyle,
    };
  }

  // Adds class to the element
  addClass(classString) {
    _.multiClassAdd(classString, this.element);

    classString.split(' ').forEach((className) => {
      if (!this.config.classList.includes(className))
        this.config.classList +=
          this.config.classList.length === 0 ? className : ` ${className}`;
    });
  }

  removeClass(classString) {
    _.multiClassRemove(classString, this.element);

    this.config.classList = this.config.classList
      .split(' ')
      .filter((className) => classString.split(' ').indexOf(className) < 0)
      .join(' ');
  }

  replaceClass(currentClass, newClass) {
    this.removeClass(currentClass);
    this.addClass(newClass);
  }

  clearClass() {
    this.removeClass(this.config.classList);
  }

  addAttributes(objectAttributes) {
    _.multiAttributeSet(objectAttributes, this.element);

    this.config.attributes = {
      ...this.config.attributes,
      ...objectAttributes,
    };
  }

  removeAttributes(attributesArray) {
    _.multiAttributeRemove(attributesArray, this.element);

    attributesArray.forEach((attr) => {
      delete this.config.attributes[attr];
    });
  }

  setProp(objProps) {
    _.multiPropAdd(objProps, this.element);
  }

  domRemove() {
    return _.domRemove(this.element);
  }

  append(target = this.config.target, position = this.config.positionOnTarget) {
    _.appendCh(target, this.element, position);
  }

  // get
  get target() {
    return this.config.target;
  }

  get style() {
    return this.config.style;
  }

  get classList() {
    return this.config.classList;
  }

  get attributes() {
    return this.config.attributes;
  }
}
