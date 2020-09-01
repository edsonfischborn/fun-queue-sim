import QueueAnimal from '.././QueueAnimal';
import chickenLeft from '../../../assets/fun-chicken/chicken-left/chicken-left-1.png';
import chickenRight from '../../../assets/fun-chicken/chicken-right/chicken-right-1.png';
import chickenWalkLeft from '../../../assets/fun-chicken/chicken-left/chicken-left-walk.gif';
import chickenWalkRight from '../../../assets/fun-chicken/chicken-right/chicken-right-walk.gif';
import chickenEat from '../../../assets/fun-chicken/chicken-right/chicken-right-eat.png';

/**
 * Creates chicken animal element for queue
 * @author Édson Fischborn
 */
export default class Chicken extends QueueAnimal {
  constructor(config) {
    super({
      minLife: 100,
      maxLife: 120,
      ...config,
      animalImg: {
        stopedRight: chickenRight,
        stopedLeft: chickenLeft,
        walkLeft: chickenWalkLeft,
        walkRight: chickenWalkRight,
        eat: chickenEat,
      },
      style: {
        bottom: '10px',
      },
      eat: {
        eatAt: 370,
        maxEatTime: 3000,
        minEatTime: 3000,
        maxLifeIncreaseByStep: 10,
        minLifeIncreaseByStep: 10,
        ...config.eat,
      },
      name: 'chkn',
    });
  }
}
