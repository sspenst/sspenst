var words = ['QUICK', 'KLUTZ', 'FIELD', 'HAIRY', 'ABIDE', 'BEARD', 'DAIRY', 'CANDY', 'WOVEN', 'ZEBRA'];
var answer = words[Math.floor(Math.random() * words.length)];
var greens = [];
var yellows = [];
var blacks = [];

function makeGuess() {
    var guess = document.getElementById('guess').value;

    if (guess.length != 5) {
        return;
    }

    guess = guess.toUpperCase();

    var guessFrag = document.createDocumentFragment();
    var newDiv = document.createElement('div');
    var guessStr = '';

    for (var i = 0; i < guess.length; i++) {
        var letter = guess[i];

        if (letter === answer[i]) {
            guessStr = guessStr + '<span class="green">' + letter + '</span>';

            if (!greens.includes(letter)) {
                greens.push(letter);
            }
        } else if (answer.includes(letter)) {
            guessStr = guessStr + '<span class="yellow">' + letter + '</span>';

            if (!yellows.includes(letter)) {
                yellows.push(letter);
            }
        } else {
            guessStr = guessStr + letter;

            if (!blacks.includes(letter)) {
                blacks.push(letter);
            }
        }
    }

    newDiv.innerHTML = guessStr;
    guessFrag.appendChild(newDiv);
    document.getElementById('guesses').appendChild(guessFrag);
    document.getElementById('guess').value = '';
    updateAlphabet();
};

function updateAlphabet() {
    var alphabetStr = '';

    for (var i = 0; i < 26; i++) {
        var chr = String.fromCharCode(65 + i);

        if (greens.includes(chr)) {
            alphabetStr = alphabetStr + '<span class="green">' + chr + '</span>';
        } else if (yellows.includes(chr)) {
            alphabetStr = alphabetStr + '<span class="yellow">' + chr + '</span>';
        } else if (blacks.includes(chr)) {
            alphabetStr = alphabetStr + chr;
        } else {
            alphabetStr = alphabetStr + '<span class="gray">' + chr + '</span>';
        }
    }
    console.log(alphabetStr);
    document.getElementById('alphabet').innerHTML = alphabetStr;
}
