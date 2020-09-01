import QueueAnimal from '.././QueueAnimal';
import sheepLeft from '../../../assets/fun-sheep/sheep-left/sheep-left-1.png';
import sheepRight from '../../../assets/fun-sheep/sheep-right/sheep-right-1.png';
import sheepWalkLeft from '../../../assets/fun-sheep/sheep-left/sheep-left-walk.gif';
import sheepWalkRight from '../../../assets/fun-sheep/sheep-right/sheep-right-walk.gif';
import sheepEat from '../../../assets/fun-sheep/sheep-right/sheep-right-eat.gif';

/**
 * Creates sheep animal element for queue
 * @author Édson Fischborn
 */
export default class Sheep extends QueueAnimal {
  constructor(config) {
    super({
      minLife: 200,
      maxLife: 250,
      ...config,
      animalImg: {
        stopedRight: sheepRight,
        stopedLeft: sheepLeft,
        walkLeft: sheepWalkLeft,
        walkRight: sheepWalkRight,
        eat: sheepEat,
      },
      style: {
        bottom: '15px',
      },
      eat: {
        eatAt: 355,
        maxEatTime: 3000,
        minEatTime: 3000,
        maxLifeIncreaseByStep: 10,
        minLifeIncreaseByStep: 10,
        ...config.eat,
      },
      name: 'shp',
    });
  }
}
