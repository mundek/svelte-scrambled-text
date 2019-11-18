export function sentenceWords(aSentence, retainPunctuation) {
    let onlyLetters = "";
    // the following conditions allow for some consideration of punctuation
    if(retainPunctuation === 'strip') {
        // STRIP: remove a wide range of common punctuation (excludes apostrophe)
        // regex from https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
        onlyLetters = aSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        // regex to replace multiple whitespace characters with a single space
        onlyLetters = onlyLetters.replace(/\s{2,}/g," ");
        return onlyLetters.split(" ");

    } else if (retainPunctuation == 'retain') {
        // RETAIN: keep punctuation where found in the aSentence
        // use regex to replace multiple whitespace characters with a single space
        onlyLetters = aSentence.replace(/\s{2,}/g," ");
        return onlyLetters.split(" ");

    } else if (retainPunctuation == 'separate') {
        // SEPARATE: use regex to replace multiple whitespace characters with a single space
        onlyLetters = aSentence.replace(/([.,\/#!$%\^&\*;:{}=\-_`~()])/g," \$1");
        return onlyLetters.split(" ");

    } else {
        // retainPunctuation flag not set; return -1
        return -1;
    }
}

export function wordsToString(anArray) {
    let aTextString = "";
    anArray.forEach((element, index) => {
        // Not all arrays are created equal?
        // check for Array elements with innerText property; reassign element that value if true
        if(element.innerText) {
            element = element.innerText;
        }
        // console.log(element);
        if (index > 0 && !element.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")) {
            aTextString = aTextString + (" " + element);
        } else {
            aTextString = aTextString + element;
        }
    });
    // console.log(aTextString);
    return aTextString;
}

export function wordsScrambled(anArray) {
    // local newArray avoids changing original array, which will have been passed as a reference
    let newArray = anArray.slice();
    // Array randomization code from https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
    for(let i = newArray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}
