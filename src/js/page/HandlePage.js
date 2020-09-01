import HandleQueue from '../funQueueSimulator/HandleQueue';

// Util
import { returnElement } from '../util/viewFunctions';
import { loadAssets } from '../util/Misc';

// Elements
import FormContainer from './FormContainer';
import Loader from './Loader';

class HandlePage {
  constructor() {
    this.header = returnElement('header');
    this.main = returnElement('main');
    this.monitor = returnElement('#monitor');
    this.game = returnElement('#game');

    this.formContainer = new FormContainer();
    this.formContainer.form.element.addEventListener('submit', (evt) =>
      this.onFormSubmit(evt)
    );

    this.cancelBtn = returnElement('#cancelQueue');
    this.cancelBtn.addEventListener('click', () => this.cancelQueue());

    this.header.classList.add('animate__fadeIn');
    setTimeout(() => this.header.classList.remove('animate__fadeIn'), 800);

    this.handleQueue = null;
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    this.formContainerOnSubmit();
  }

  formContainerOnSubmit() {
    this.header.classList.add('animate__backOutUp');
    setTimeout(() => {
      this.header.classList.add('d-none');
      if (!this.handleQueue) this.mainOnSubmit();
    }, 1000);
  }

  formContainerAfterHandleQueue() {
    this.header.classList.replace('animate__backOutUp', 'animate__backInDown');
    this.header.classList.remove('d-none');
  }

  async mainOnSubmit() {
    this.main.classList.add('d-flex');

    this.handleQueue = new HandleQueue(this.formContainer.data);

    this.monitor.classList.add('animate__slideInLeft');
    this.game.classList.add('animate__slideInRight');

    await this.handleQueue.autoProcess();

    this.mainAfterHandleQueue();
  }

  cancelQueue() {
    this.mainAfterHandleQueue();
  }

  mainAfterHandleQueue() {
    this.monitor.classList.replace(
      'animate__slideInLeft',
      'animate__slideOutLeft'
    );
    this.game.classList.replace(
      'animate__slideInRight',
      'animate__slideOutRight'
    );

    setTimeout(() => {
      this.main.classList.replace('d-flex', 'd-none');
      this.game.classList.remove('animate__slideOutRight');
      this.monitor.classList.remove('animate__slideOutLeft');

      this.handleQueue.destroy();
      delete this.handleQueue;

      this.formContainerAfterHandleQueue();
    }, 1000);
  }
}

let loader;

if (
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  loader = new Loader();

  loadAssets(
    // Chicken
    './assets/chicken-left-1.png',
    './assets/chicken-right-1.png',
    './assets/chicken-left-walk.gif',
    './assets/chicken-right-walk.gif',
    './assets/chicken-right-eat.png',
    // Cow
    './assets/cow-left-4.png',
    './assets/cow-right-4.png',
    './assets/cow-left-walk.gif',
    /* './assets/cow-right-walk.gif', */
    './assets/cow-right-eat.gif',
    // Pig
    'assets/pig-left-4.png',
    'assets/pig-right-4.png',
    'assets/pig-left-walk.gif',
    'assets/pig-right-walk.gif',
    'assets/pig-right-eat.gif',
    // Sheep
    'assets/sheep-left-1.png',
    'assets/sheep-right-1.png',
    'assets/sheep-left-walk.gif',
    'assets/sheep-right-walk.gif',
    'assets/sheep-right-eat.gif',
    // Map
    './assets/sky.png',
    './assets/grass.png',
    './assets/montain.png',
    './assets/eat.png',
    './assets/sign.png'
  ).then(() => {
    loader.domRemove();
    new HandlePage();
  });
} else {
  loader = new Loader('Sorry. Open in Desktop!');
}
