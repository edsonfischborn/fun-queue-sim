/**
 * @author Édson Fischborn
 * @param {Function} callBack
 * @param {Function} finishCondition Optional. Clear interval and resolve the promise by function result, boolean.
 */

export const requestAnimationFrameAsync = (
  callBack,
  finishCondition = () => true
) => {
  return new Promise((resolve) => {
    const animate = () => {
      // Resolve promisse by boolean
      const _animate = requestAnimationFrame(animate);

      if (finishCondition()) {
        cancelAnimationFrame(_animate);
        resolve(true);
      }

      callBack();
    };

    animate();
  });
};

/**
 * @author Édson Fischborn
 * @param {Object} config keys:
 *  - callBack: Function,
 *  - interval: Number, await to execute callback
 *  - finishTime: Number, finish promise by time
 *  - finishCondition: Function returns boolean, finish promise by boolean result
 */
export const execAsync = (config) => {
  const {
    callBack = () => null,
    interval = 0,
    finishTime = 2147483647,
    finishCondition = () => false,
  } = config;

  return new Promise((resolve) => {
    const _interval = setInterval(() => {
      // Resolve promisse by boolean
      if (finishCondition()) {
        finish();
      }

      callBack();
    }, interval);

    // Resolve the promise by finish time
    const _timeOut = setTimeout(() => finish(), finishTime);

    const finish = () => {
      clearInterval(_interval);
      clearTimeout(_timeOut);
      resolve(true);
    };
  });
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const loadAssets = async (...urls) => {
  for (let url of urls) {
    const response = await fetch(url);
    const img = new Image();
    img.src = response.url;
  }
};
