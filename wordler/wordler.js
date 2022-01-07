var words = ['QUICK', 'KLUTZ', 'FIELD', 'HAIRY'];
var answer = words[Math.floor(Math.random() * words.length)];

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
        } else if (answer.includes(letter)) {
            guessStr = guessStr + '<span class="yellow">' + letter + '</span>';
        } else {
            guessStr = guessStr + letter;
        }
    }

    newDiv.innerHTML = guessStr;
    guessFrag.appendChild(newDiv);
    document.getElementById('guesses').appendChild(guessFrag);
    document.getElementById('guess').value = '';
};
