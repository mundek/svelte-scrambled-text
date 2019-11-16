export function sentenceWords(aSentence, retainPunctuation) {
    let onlyLetters = "";
    if(retainPunctuation === 'strip') {
        // regex from https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
        onlyLetters = aSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        // regex to replace multiple whitespace characters with a single space
        onlyLetters = onlyLetters.replace(/\s{2,}/g," ");
        return onlyLetters.split(" ");
    } else if (retainPunctuation == 'retain') {
        // regex to replace multiple whitespace characters with a single space
        onlyLetters = aSentence.replace(/\s{2,}/g," ");
        return onlyLetters.split(" ");
    } else if (retainPunctuation == 'separate') {
        // regex to replace multiple whitespace characters with a single space
        onlyLetters = aSentence.replace(/([.,\/#!$%\^&\*;:{}=\-_`~()])/g," \$1");
        return onlyLetters.split(" ");
    } else {
        return -1;
    }
}