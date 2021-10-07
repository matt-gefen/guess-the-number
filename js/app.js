/*-------------------------------- Constants --------------------------------*/
let biggestNum = 100
let smallestNum = 1


/*-------------------------------- Variables --------------------------------*/
// The number to be guessed
let secretNum = Math.floor(Math.random() * biggestNum + 1)
// Array of all inputed guesses to be displayed
let guessList = []
// Whether or not the player has won the game
let isWinner = false


/*------------------------ Cached Element References ------------------------*/
const form = document.querySelector("form")
const guessInput = document.querySelector("#guess-input")
const guessesEl = document.querySelector("#prev-guesses")
const messageEl = document.querySelector("#message")
const resetBtn = document.querySelector("#reset-button")
const prevGuessMsg = document.querySelector("#prev-guesses-msg")
const titleEl = document.querySelector("#title")
const kazoo = new Audio('../audio/kazoo.wav')


/*----------------------------- Event Listeners -----------------------------*/
form.addEventListener("reset", init)
form.addEventListener("submit", function(event) {
  event.preventDefault()
  console.log(parseInt(guessInput.value))
  if (isWinner === false) {
    checkGuess(parseInt(guessInput.value))
  }
})

/*-------------------------------- Functions --------------------------------*/
function init() {
  titleEl.className = ""
  guessesEl.innerText = ""
  messageEl.innerText = `Please enter a guess between ${smallestNum} and ${biggestNum}`
  messageEl.className = ""
  resetBtn.setAttribute("hidden", true)
  prevGuessMsg.innerText = ''
  guessList = []
  isWinner = false
  // number between 1 and 100 inclusive
  secretNum = Math.floor(Math.random() * biggestNum + 1)
}

// the only job of this is to change the state of the game - pushing user guess into guess list and discerning winner
function checkGuess(guess) {
  guessInput.value = ""
  if (isNaN(guess) || guess < smallestNum || guess > biggestNum)  {
    // this is an error
    renderError(`WRONG MOVE, DUMBASS. Enter a number between ${smallestNum} and ${biggestNum}!`)
    return    
  }
  else if (guess === secretNum){
    isWinner = true
    // You win!
  }
  guessList.push(guess)
  render()
}

function renderError(error) {
  // This takes advantage of our styling for error messages
  messageEl.className = "error"
  messageEl.innerText = error
}

function render() {
  const lastGuess = guessList[guessList.length - 1]
  const div = document.createElement("div")
  div.innerText = lastGuess

  if (guessList.length === 1) {
    prevGuessMsg.innerText = "Previous Guesses:"
    resetBtn.removeAttribute("hidden")
  }

  if (isWinner) {
    renderWin(div)
  } else if (lastGuess > secretNum || lastGuess < secretNum) {
    renderGuess(div, lastGuess)
  }
}

function renderWin(div) {
  messageEl.className = "winner"
  div.className = "winner"
  titleEl.className = 'animate__animated animate__tada' 
  guessesEl.appendChild(div)
  if (guessList.length === 1) {
    messageEl.innerText = "You brilliant bastard...You got it in one!"
  }
  else {
    messageEl.innerText = `You don did it! You found the mystery number ${secretNum} in ${guessList.length} guesses!`
  }
  setTimeout(function(){
    kazoo.play();
  },1000);
}

function renderGuess(div, lastGuess) {
  if (lastGuess < secretNum) {
    messageEl.className = 'low'
    div.className = 'low'
    messageEl.innerText = `${lastGuess} is too dang low`
  }
  else if (lastGuess > secretNum) {
    messageEl.className = 'high'
    div.className = 'high'
    messageEl.innerText = `${lastGuess} is too gosh dern high`    
  }
  guessesEl.appendChild(div)
}