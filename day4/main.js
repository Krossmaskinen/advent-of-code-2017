var fs = require('fs');
let inputFile = './input.txt';
let input = fs.readFileSync(inputFile, 'utf8');
let phrases = [];
let validPhrases = [];

phrases = input.split('\n');
phrases = phrases.map(phrase => phrase.split('\r')[0]);

// phrases = ['aa bb cc dd aa', 'aa bb cc dd'];

console.log(phrases[phrases.length - 1]);

phrases.forEach(phrase => {
    if (checkPhrase(phrase)) {
        validPhrases.push(phrase);
    }
});

console.log(validPhrases);
console.log(validPhrases.length);

function checkPhrase(phrase) {
    let words = phrase.split(' ');
    let checkedWords = [];
    let phraseIsValid = true;

    for(let i = 0; i < words.length; ++i) {
        let word = words[i];
        let isInCheckedList = (checkedWords.some(w => w === word));
        let filteredList;

        if (!isInCheckedList) {
            filteredList = words.filter(w => w === word);
            if (filteredList.length > 1) {
                return false;
            }
        }
    }

    return true;
}