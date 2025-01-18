//Variablen

const CLASS_SELECTED = "selected";

const CLASS_RESULT_WIN = "win";
const CLASS_RESULT_LOSE = "lose";
const CLASS_RESULT_DRAW = "draw";

const CHOICE_ROCK = "Stein";
const CHOICE_PAPER = "Papier";
const CHOICE_SCISSORS = "Schere"

const ID_BUTTON_ROCK = "rock";
const ID_BUTTON_PAPER = "paper";
const ID_BUTTON_SCISSORS = "scissors";

const ID_PLAYER_CHOICE = "player-choice";
const ID_COMPUTER_CHOICE = "computer-choice";

// Function zur Auswahl des Computer-Zugs
function computerChoice(){
    const choices = [CHOICE_ROCK, CHOICE_PAPER, CHOICE_SCISSORS];
    const randomIndex = Math.floor(Math.random() * 3);  
    return choices[randomIndex];
}

//Function zur Überprüfung des Spielstand und Anzeige des Ergebnisses
function checkResult(playerChoice, computerChoice){
if (playerChoice === computerChoice){
    return "Unentschieden";
} else if (
    (playerChoice=== CHOICE_PAPER && computerChoice === CHOICE_ROCK) ||
    (playerChoice === CHOICE_ROCK && computerChoice === CHOICE_SCISSORS)||
    (playerChoice === CHOICE_SCISSORS && computerChoice === CHOICE_PAPER)
) {
    return "Spieler gewinnt";
} else {
return "Computer gewinnt";
    };
}

// Function zum Update des Displays (Gewinner) und hervorheben des selektierten Buttons

function updateResult(result, selectedButtonId){

    //Ergebnistext anzeigen
    const resultElement = document.getElementById("result");
    resultElement.textContent = result;

    // Entferne zuerst alle .selectet Style-Klassen von allen Klassen
    const buttons  = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.classList.remove(CLASS_SELECTED);
    });

        //Hervorheben des geklickten Buttons
    const selectedButton = document.getElementById(selectedButtonId);
    selectedButton.classList.add(CLASS_SELECTED);

    //Timer zum automatischen entfernen des Selektierten Styles
    const timeout = setTimeout(() => {
        selectedButton.classList.remove(CLASS_SELECTED);
        clearTimeout(timeout);
    },2000);

    // Ergebnistext einfärben (bedingte Farbe)
    // Entferne zuerst alle vorherigen Ergebnis-Style-Klassen
    resultElement.classList.remove(CLASS_RESULT_WIN,CLASS_RESULT_LOSE,CLASS_RESULT_DRAW);

    // Füge den richtigen Style für das Ergebnis zu

    if(result === "Spieler gewinnt"){
        resultElement.classList.add(CLASS_RESULT_WIN);
        updatePoints(true);
    } else if (result === "Unentschieden"){
    resultElement.classList.add(CLASS_RESULT_DRAW);
    }
    else {
        resultElement.classList.add(CLASS_RESULT_LOSE)
        updatePoints(false);
        }
}

// Punktestand aktualisieren

function updatePoints(playerWins) {

    const elementId = playerWins ? "player-points" : "computer-points";
    const pointsElement = document.getElementById(elementId);
    const currentPoints = Number(pointsElement.innerText);
    pointsElement.textContent = currentPoints + 1;
}

//Event LIstener für die Spielbuttons

function playerAction (playerChoice){
    const computer = computerChoice();
    const result = checkResult(playerChoice, computer);

    //Aktualisiere die Spieler und Computer auswahl
    document.getElementById(ID_PLAYER_CHOICE).textContent = playerChoice;
    document.getElementById(ID_COMPUTER_CHOICE).textContent = computer;

    //Bestimme Id des geklickten Buttons

    let buttonId;
    switch (playerChoice){
        case CHOICE_SCISSORS:
            buttonId = ID_BUTTON_SCISSORS;
            break;
        case CHOICE_ROCK:
            buttonId = ID_BUTTON_ROCK;
            break;
        default:
            buttonId = ID_BUTTON_PAPER;
            break;
    }

    //Aktualisiere das Ergebnis
    updateResult (result, buttonId);

}

//Button - Stein
document.getElementById(ID_BUTTON_ROCK).addEventListener("click", function (){
    playerAction(CHOICE_ROCK);
});

//Button - Papier
document.getElementById(ID_BUTTON_PAPER).addEventListener("click", function(){
    playerAction(CHOICE_PAPER);
});

//Button - Schere
document.getElementById(ID_BUTTON_SCISSORS).addEventListener("click", function(){
    playerAction(CHOICE_SCISSORS);
});