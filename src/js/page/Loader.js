import BasicElement from '../util/BasicElement';

export default class Loader extends BasicElement {
  constructor(text = 'Loading...', imgSrc) {
    super({
      classList: 'd-flex align-items-center justify-content-center',
      positionOnTarget: 'afterbegin',
      style: {
        height: '100vh',
        width: '100vw',
      },
      childsConfig: [
        {
          classList: 'd-flex justify-content-center flex-column',
          childsConfig: [
            {
              classList: 'd-flex align-items-center justify-content-center',
              childsConfig: [
                {
                  element: 'img',
                  attributes: {
                    src: imgSrc || './assets/cow-right-walk.gif',
                  },
                },
              ],
            },
            {
              element: 'h5',
              classList: 'text-white',
              text,
            },
          ],
        },
      ],
    });
  }
}
