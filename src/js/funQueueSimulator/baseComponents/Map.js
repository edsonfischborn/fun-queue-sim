import gameSky from '../../../assets/fun-map/sky.png';
import gameGrass from '../../../assets/fun-map/grass.png';
import gameMonatin from '../../../assets/fun-map/montain.png';
import waterEat from '../../../assets/fun-map/eat.png';
import waterSign from '../../../assets/fun-map/sign.png';

export default {
  element: 'section',
  target: '#game',
  style: {
    position: 'relative',
    height: '500px',
    width: '750px',
    backgroundPosition: 'top',
    overflow: 'hidden',
    backgroundImage: `url(${gameSky})`,
    backgroundSize: 'cover',
  },
  childsConfig: [
    {
      style: {
        position: 'absolute',
        width: '100%',
        height: '50px',
        bottom: '0px',
        backgroundSize: 'cover',
        zIndex: '2',
        backgroundImage: `url(${gameGrass})`,
      },
    },
    {
      style: {
        position: 'absolute',
        width: '50px',
        height: '45px',
        bottom: '15px',
        left: '390px',
        zIndex: '2',
        backgroundSize: 'cover',
        backgroundImage: `url(${waterEat})`,
      },
    },
    {
      classList: 'd-flex justify-content-center',
      style: {
        position: 'absolute',
        width: '45px',
        height: '40px',
        bottom: '50px',
        left: '430px',
        zIndex: '1',
        backgroundSize: 'cover',
        backgroundImage: `url(${waterSign})`,
      },
      childsConfig: [
        {
          classList: 'position-absolute font-weight-bold text-light',
          element: 'span',
          text: 'Water',
          style: {
            fontSize: '9px',
            top: '13px',
            letterSpacing: '0.5px',
          },
        },
      ],
    },
    {
      style: {
        position: 'absolute',
        height: '170px',
        zIndex: '2',
        width: '350px',
        bottom: '50px',
        left: '0px',
        backgroundPosition: 'right',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${gameMonatin})`,
      },
    },
  ],
};
