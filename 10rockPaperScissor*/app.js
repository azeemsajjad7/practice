let userScore = 0
let computerScore = 0
const userScore_Span = document.getElementById("user-score")
const computerScore_Span = document.getElementById("computer-score")
const result = document.querySelector(".result>p")
const paper = document.getElementById("p")
const scissor = document.getElementById("s")
const rock = document.getElementById("r")

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissor'];
    const randomNumber = (Math.floor(Math.random() * 3))
    return choices[randomNumber]
}


function main() {
    rock.addEventListener('click', function () {
        game('Rock')
    })

    paper.addEventListener('click', function () {
        game('Paper')
    })

    scissor.addEventListener('click', function () {
        game('Scissor')
    })
}
main()

function game(userChoice) {
    var computerChoice = getComputerChoice()

    switch (userChoice + computerChoice) {
        case "RockScissor":
        case "PaperRock":
        case "ScissorPaper":
            win();
            break;

        case "RockPaper":
        case "PaperScissor":
        case "ScissorRock":
            lose();
            break;

        case "RockRock":
        case "PaperPaper":
        case "ScissorScissor":
            tie();
            break;
    }
}

function win(userChoice, computerChoice) {
    computerChoice = getComputerChoice()
    userScore++
    userScore_Span.innerHTML = userScore
    result.innerHTML = `${computerChoice}  beats  ${userChoice}   YOU WIN!!`
}

function lose(userChoice, computerChoice) {
    // computerChoice = getComputerChoice()
    computerScore++
    computerScore_Span.innerHTML = computerScore
    result.innerHTML = `${computerChoice}  beats  ${userChoice}  YOU LOSE:(!`
}

function tie() {
    result.innerHTML = "It's a TIE :p"
}

