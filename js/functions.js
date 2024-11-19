'use strict'

// длина строки

const checkLength = (string, length) => string.length <= length;

console.log(checkLength('строка', 5));


// палиндром

const isPalindrom = (string, index) => string[index] === string[string.length-1-index];

const getNormalString = (string) => String(string).replaceAll(' ', '').toLowerCase();

const getReverseString = (string) => getNormalString(string).split('').reverse().join('');

const checkPalindrom = (string) => getNormalString(string) === getReverseString(string);

// const checkPalindrom = (string) => {
//   const normalaizedString = getNormalString(string);
//   const result = true;
//   for (let i=0; i<Math.floor(normalaizedString.length/2); i++) {
//     if (!isPalindrom(normalaizedString,i)) {
//       result = false;
//       break;
//     }
//   }
//   return result;
// }

console.log(checkPalindrom('И городу дорог огород у дороги '));

// извлечь цифры из строки

// const isNumber = (value) => !isNaN(Math.abs(Number(value)));

// const getNumberFromString = (string) => {
//   const normalaizedString = getNormalString(string);
//   let result = '';
//   for (const symbol of normalaizedString) {
//     if (isNumber(symbol)) {
//       result += symbol;
//     }
//   }
//   return result ? Number(result) : NaN;
// }

const getNumberFromString = (string) => {
  const result = getNormalString(string).match(/\d+/g);
  return result ? Number(result.join('')) : NaN;
}

console.log(getNumberFromString('1.5'));


