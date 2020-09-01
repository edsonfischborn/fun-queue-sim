import QueueAnimal from '.././QueueAnimal';
import pigLeft from '../../../assets/fun-pig/pig-left/pig-left-4.png';
import pigRight from '../../../assets/fun-pig/pig-right/pig-right-4.png';
import pigWalkLeft from '../../../assets/fun-pig/pig-left/pig-left-walk.gif';
import pigWalkRight from '../../../assets/fun-pig/pig-right/pig-right-walk.gif';
import pigEat from '../../../assets/fun-pig/pig-right/pig-right-eat.gif';

/**
 * Creates pig animal element for queue
 * @author Édson Fischborn
 */

export default class Pig extends QueueAnimal {
  constructor(config) {
    super({
      minLife: 280,
      maxLife: 300,
      ...config,
      animalImg: {
        stopedRight: pigRight,
        stopedLeft: pigLeft,
        walkLeft: pigWalkLeft,
        walkRight: pigWalkRight,
        eat: pigEat,
      },
      style: {
        bottom: '12px',
      },
      eat: {
        eatAt: 355,
        maxEatTime: 3000,
        minEatTime: 3000,
        maxLifeIncreaseByStep: 10,
        minLifeIncreaseByStep: 10,
        ...config.eat,
      },
      name: 'pig',
    });
  }
}
