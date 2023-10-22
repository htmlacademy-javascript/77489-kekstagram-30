const stringLength = (string, length) => string.length <= length;

stringLength('проверяемая строка', 20);
stringLength('проверяемая строка', 18);
stringLength('проверяемая строка', 10);

function isPalindrome(rawString) {
  const string = rawString.replaceAll(' ', '').toLowerCase();
  for(let i = 0; i < string.length / 2; i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }
  return true;
}

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Лёша на полке клопа нашёл');


function extractNumber(arg) {
  const string = arg.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))){
      result += string[i];
    }
  }

  return parseInt(result, 10);
}

extractNumber('1988 age');
extractNumber('1.5 землекопа');
