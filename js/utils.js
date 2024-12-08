const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomUniqueInt = (min, max) => {
  const uinqueIntArr = [];
  return function () {
    while (uinqueIntArr.length < max - min + 1) {
      const randomInt = getRandomInt(min, max);
      if (!uinqueIntArr.includes(randomInt)) {
        uinqueIntArr.push(randomInt);
        return randomInt;
      }
    }
  };
};

const isEscKey = (event) => event.keyCode === 27;

export {getRandomInt, getRandomUniqueInt, isEscKey};
