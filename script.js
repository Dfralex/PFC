const INPUT_PHASE = 0;
const RESULT_PHASE = 1;
let phase = INPUT_PHASE;



const ROCK = 1;
const SCISSORS = 2;
const PAPER = 3;

const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const messageBox = document.getElementById("message");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");

function setPhase(newPhase) {
    // si la phase actuel et la nouvelle phase sont identique arrêter la fonction 
    if (phase === newPhase) {
        return
    }
    console.log("old", phase);
    console.log("new", newPhase);
    // si on sort de phase de jeu 
    if (phase === INPUT_PHASE) {
        b1.disabled = true
        b2.disabled = true
        b3.disabled = true
    }

// si on entre dans la phase de jeu
    if (newPhase === INPUT_PHASE) {
        b1.disabled = false
        b2.disabled = false
        b3.disabled = false
    }
    // si on sort de la phase de résultat 
    if (phase === RESULT_PHASE) {
        showMessage("")
    }
    phase = newPhase;
}

//animation d'entrée des mains 
playerHand.classList.add("animation-start")
computerHand.classList.add("animation-start-computer")
setTimeout(() => {
    playerHand.classList.remove("animation-start")
    computerHand.classList.remove("animation-start-computer")
}, 2000);

function showMessage(text) {
    messageBox.textContent = text
}

function clickRock() {
    play(ROCK);
}
function clickPaper() {
    play(PAPER);
}
function clickScissors() {
    play(SCISSORS);
}

function getComputerChoice() {
    let r = Math.random() * 3;//trouver un nombre entre 0 et 3 (non inclus)
    let rEntier = Math.floor(r)//arrondir à l entier inferieur (resultat possible 0,1 et 2)
    const results = [ROCK, SCISSORS, PAPER]//tableau des resultats 
    return results[rEntier] //renvoyer un des trois resultats possible du tableau 
}

function play(playerChoice) {
    setPhase(RESULT_PHASE);
    // recuperer le choix du pc 
    let computerChoice = getComputerChoice();
    //animation des mouvements des mains 
    // playerHand.classList.add("animation-show")
    // setTimeout(() => {
    //     playerHand.classList.remove("animation-show")
    // }, 500);

    //changer les images 
    const images = ["/images/pierre.png", "/images/ciseaux.png", "/images/feuille.png"]
    playerHand.src = images[playerChoice - 1]
    computerHand.src = images[computerChoice - 1]

    // égalité 
    if (playerChoice === computerChoice) {
        showMessage("Egalité! ")
    }


    // victoire
    if (
        (playerChoice === SCISSORS && computerChoice === PAPER) ||
        (playerChoice === ROCK && computerChoice === SCISSORS) ||
        (playerChoice === PAPER && computerChoice === ROCK)
    ) {
        showMessage("Victoire!")
    }

    // défaite
    if (
        (playerChoice === ROCK && computerChoice === PAPER) ||
        (playerChoice === SCISSORS && computerChoice === ROCK) ||
        (playerChoice === PAPER && computerChoice === SCISSORS)
    ) {
        showMessage("Défaite…")
    }
    // repasser en phase de jeu après un délai 
    setTimeout(() => {
        setPhase(INPUT_PHASE)
    }, 3000);

}