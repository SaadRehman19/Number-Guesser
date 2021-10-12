//Game values
let min = 1,
    max = 10;
winningGuess = getRandom(min, max);
guessLeft = 3;

//UI elements 
const game = document.querySelector('.game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UI value to max and min 
minNum.textContent = min;
maxNum.textContent = max;

//play again even listener with the help of event delegation
game.addEventListener('mousedown', function(e) {
    // console.log("gegegge");
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
    // e.preventDefault();
});
//listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    // console.log(guess);
    if (isNaN(guess) || guess < min || guess > max) {
        //show error 
        setMessage(`Please enter number between ${min} and ${max}`, 'red');
    }

    //check win
    if (guess === winningGuess) {
        //disable input
        // guessInput.disabled = true;
        // //change color
        // guessInput.style.borderColor = 'green';
        // //show winning message
        // setMessage(`Congratulations, You guessed it right!!`, 'green');

        //OPTIMIZING CODE( ALL THAT ABOVE IN A FUNCTION)
        gameOver(true, `Congratulations, You guessed it right!!`);

    }

    //loose case
    else {
        // console.log("hee");
        //guess left case 
        guessLeft = guessLeft - 1;
        guessInput.style.borderColor = 'red';
        guessInput.value = '';
        setMessage(`Sorry ${guess} is wrong, your guesses left ${guessLeft}`, 'red');

        //if guess is zero, play again
        if (guessLeft === 0) {
            // guessInput.disabled = true;
            // //change color
            // guessInput.style.borderColor = 'red';
            // //show winning message
            // setMessage(`Game over YOU LOST!, Correct one was ${winningGuess}`);

            //OPTIMIZING CODE( ALL THAT ABOVE IN A FUNCTION)
            gameOver(false, `Game over YOU LOST!, Correct one was ${winningGuess}`)

        }
    }
});
//game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    //change color
    guessInput.style.borderColor = color;
    //show winning message
    setMessage(msg, color);

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'
}


//set message 
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

//get random value
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}