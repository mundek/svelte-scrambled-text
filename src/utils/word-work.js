export function sentenceWords(aSentence) {

    // regex from https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
    let onlyLetters = aSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    onlyLetters = onlyLetters.replace(/\s{2,}/g," ");

    return onlyLetters.split(" ");
}