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

export function wordsToString(anArray) {
    console.log(anArray.constructor.name);

    let aTextString = "";
    anArray.forEach((element, index) => {
        if(element.innerText) {
            element = element.innerText;
        }
        console.log(element);
        if (index > 0 && !element.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")) {
            aTextString = aTextString + (" " + element);
        } else {
            aTextString = aTextString + element;
        }
    });
    return aTextString;
}

export function wordsScrambled(anArray) {
    return true;
}

// internal utility function
function isNodeList(nodes) {
    var stringRepr = Object.prototype.toString.call(nodes);

    return typeof nodes === 'object' &&
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
        nodes.hasOwnProperty('length') &&
        (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
}