const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isEscKey = (event) => event.keyCode === 27;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInt, isEscKey, debounce };
