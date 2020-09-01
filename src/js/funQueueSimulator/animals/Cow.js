import QueueAnimal from '.././QueueAnimal';
import cowLeft from '../../../assets/fun-cow/cow-left/cow-left-4.png';
import cowRight from '../../../assets/fun-cow/cow-right/cow-right-4.png';
import cowWalkLeft from '../../../assets/fun-cow/cow-left/cow-left-walk.gif';
import cowWalkRight from '../../../assets/fun-cow/cow-right/cow-right-walk.gif';
import cowEat from '../../../assets/fun-cow/cow-right/cow-right-eat.gif';

/**
 * Creates cow animal element for queue
 * @author Édson Fischborn
 */
export default class Cow extends QueueAnimal {
  constructor(config) {
    super({
      minLife: 320,
      maxLife: 350,
      ...config,
      animalImg: {
        stopedRight: cowRight,
        stopedLeft: cowLeft,
        walkLeft: cowWalkLeft,
        walkRight: cowWalkRight,
        eat: cowEat,
      },
      style: {
        bottom: '25px',
      },
      eat: {
        eatAt: 350,
        maxEatTime: 3000,
        minEatTime: 3000,
        maxLifeIncreaseByStep: 10,
        minLifeIncreaseByStep: 10,
        ...config.eat,
      },
      name: 'cow',
    });
  }
}
