const endToStartLetter = {
  "ם": "מ",
  "ן": "נ",
  "ך": "כ",
  "ף": "פ",
  "ץ": "צ"
}

export default class HebrewUtils {
  static isEndLetter = letter => Object.keys(endToStartLetter).includes(letter);

  static isRegularLetter = letter => !this.isEndLetter(letter);

  static hasEnd = letter => Object.values(endToStartLetter).includes(letter);

  static setToRegular = letter => this.isEndLetter(letter) ? endToStartLetter[letter] : letter;

  static setToEnd = letter => this.isRegularLetter(letter) && this.hasEnd(letter) ?
    Object.keys(endToStartLetter).find(end => endToStartLetter[end] === letter) :
    letter;

  static fixWord = word =>
    word.split('')
    .map((letter, i) => i === word.length - 1 ?
      this.setToEnd(letter) :
      this.setToRegular(letter))
    .join('');
}