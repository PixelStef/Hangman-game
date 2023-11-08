// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')
let wordArray = [
    "Meow",
    "Whiskers",
    "Purr",
    "Kitten",
    "Feline",
    "Claws",
    "Tabby",
    "Siamese",
    "Tuna",
    "Naptime"
];
let guessHistory = [];
let hyphenWord;
let userGuess;
let winCounter = 0;
let loseCounter = 0;
let numAttempts = 8;

let correctWord =  wordArray[Math.floor(Math.random() * wordArray.length)];
function hintWord (correctWord) {
    hyphenWord = '-'.repeat(correctWord.length); // Create a hyphen string with the remaining length
}
hintWord(correctWord);

console.log(`H A N G M A N\n`);
let userAction = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `);


function hangman () {
    userGuess = input(`Input a letter: `);
    return userGuess
}

function repeatUser() {
    userAction = userAction = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `);
}

function resetGame() {
    correctWord =  wordArray[Math.floor(Math.random() * wordArray.length)];
    hintWord(correctWord); // Generate a new hyphenWord based on the new correctWord
    guessHistory = [];
    numAttempts = 8; // Reset the number of attempts
}

while (userAction !== "exit") {
    switch (userAction) {
        case "play":

            while (numAttempts > 0 && hyphenWord !== correctWord) {
                console.log(`\n${hyphenWord}`);
                hangman();

                switch (true) {

                    case userGuess.length !== 1:
                        console.log('Please, input a single letter.\n');
                        break;

                    case !userGuess.match(/[a-z]/):
                        console.log(`Please, enter a lowercase letter from the English alphabet.\n`);
                        break;

                    case guessHistory.includes(userGuess):
                        console.log("You've already guessed this letter.");
                        break;

                    case correctWord.includes(userGuess) && numAttempts > 0:
                        for (let i = 0; i < correctWord.length; i++) {
                            if (correctWord[i] === userGuess) {
                                hyphenWord = hyphenWord.substring(0, i) + userGuess + hyphenWord.substring(i + 1);
                            }
                        }
                        guessHistory.push(userGuess);
                        break;

                    case numAttempts > 0:
                        numAttempts--;
                        console.log("That letter doesn't appear in the word.");
                        guessHistory.push(userGuess);
                        break;

                    default:
                        break;
                }
            }
            if (hyphenWord === correctWord){
                console.log(`You guessed the word ${hyphenWord}!`);
                console.log("You survived!");
                resetGame();
                winCounter++;
            } else {
                loseCounter++;
                console.log(`You lost!`);
            }
            repeatUser();
            break;

        case "results":
            console.log(`You won: ${winCounter} times.`);
            console.log(`You lost: ${loseCounter} times.`);
            repeatUser();
            break;
    }
}
