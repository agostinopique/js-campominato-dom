/* 

Devo creare una griglia di un tot di celle a seconda del valore del select.
Quando clicchi su una cella deve cambiare il colore dello sfondo e apparire un numero random con un range a seconda della difficoltá selezionata. Il colore dello sfondo cambia a seconda se il numero é pari o dispari.
Devo creare una funzione che estrae randomicamente un numero a seconda della difficoltá selezionata.

    1. Crea una funzione che inserisce i quadratini a seconda della difficoltá;
    2. Creo una funzione che estrae un numero casuale controllando che non sia già stato estratto;
    3. Controllo se il numero é pari o dispari e, a seconda del risultato del controllo, aggiungo una classe odd o even all'innerHTML;
    4. Creo l'evento del click al cui interno chiamo la funzione che mette le classi e il contenuto;

*/


const MAP_BOMBS = 16;

let bombArr = [];

let elementBombs = [];

const grid = document.querySelector('.ap_container');

const main = document.querySelector('.center_section');

let click = 0;

const button = document.getElementById('difficulty-btn').addEventListener('click', playBtn);


// const arrRandomNumber = [];

// Funzione che determina quanti quadratini devono andare nella griglia a seconda del value del select;



/*
 * Creo un numero di celle n dettate dalla difficoltá selezionata dall'utente, stampo il numero estratto randomicamente dalla funzione.
 */
function playBtn() {
    // Modifica il testo del pulsante al click
    this.innerHTML = 'Reset';

    const gameStart = new Audio('audio_file/smb_powerup.wav');
    gameStart.play();

    // prendo il valore della difficoltá
    const squares = document.querySelector('#difficulty-selector').value; 

    // definisco l'indice delle difficoltá
    const difficultyNumber = [100, 81, 49];

    // indico il numero di celle in base all'indice preso dall'input
    const squareNumber = difficultyNumber[squares];

    // resetto la griglia
    grid.innerHTML = '';
    grid.classList.remove('pe-none', 'loser_grid');
    document.getElementById('results').innerHTML = '';
    click = 0;

    
    bombArr = bombGenerator(squareNumber);

    // genero le celle
    for(let i = 1; i <= squareNumber; i++){
        // Richiamo e appendo le celle dalla funzione dedicata
        const cell = cellGenerator(i, squareNumber);
        grid.append(cell);

        // Alternativa per lo scoppio di tutte le bombe, continua a riga 140;
        if(bombArr.includes(i)) {
            elementBombs.push(cell);
        }
    }
    // console.log('elementi bombe', elementBombs);
    // console.log('bombe array', bombArr);
    
}




/**
 * creo il contenitore delle celle all'interno del quale vado ad insrire i vari elementi
 * @param {number} n 
 * @param {number} squareNumber 
 * @returns 
 */
function cellGenerator(n, squareNumber){
    const sq = document.createElement('div');

    // Altermativa che da le misure delle celle in maniera dinamica
    const cellFactor = Math.sqrt(squareNumber);
    const cellSize = `calc(100% / ${cellFactor})`;
    sq.style.width = cellSize;
    sq.style.height = cellSize;

    // sq.className = 'square square_' + squareNumber;
    sq.className = 'square';

    // Soluzione per l'insrimento dei numeri in succcessione
    sq.innerHTML = `<span>${n}</span>`;

    //  Soluzione per l'inserimento dei numeri random
    // sq.innerHTML = `<span>${getRandomNumber(1, squareNumber)}</span>`;



    // aggiungo le classi al click della singola cella (this)
    sq.addEventListener('click', clickedCell);


    return sq;
}





/**
 * aggiunge le classi di stile al click della cella controllando che il numero sia una cella buona o una cella con una bomba;
 */
function clickedCell(){

    const resultAnn = document.getElementById('results');

    this.classList.add('clicked');

    if(!bombArr.includes(parseInt(this.innerText))){

        this.classList.add('light');
        click++;
        const cellClick = new Audio('audio_file/smb_fireball.wav');
        cellClick.play();

    } else {

        this.classList.add('bomb');

        for(let i = 0; i< elementBombs.length; i++){

            elementBombs[i].classList.add('bomb', 'clicked');

        }

        grid.classList.add('pe-none', 'loser_grid');
        resultAnn.innerHTML = `<h3>Hai perso dopo ${click} tentativi!</h3>`

        const gameOver = new Audio('audio_file/smb_gameover.wav');
        gameOver.play();

        // Alternativa per lo scoppio di tutte le bombe
        // loserGame();

    }

    winnerGame(resultAnn);
}



/**
 * Mostra tutte le bombe quando clicchi su una bomba;
 */
function loserGame(){
    const spanValue = document.querySelectorAll('span');
    // console.log('span', spanValue);

    const boxValue = document.querySelectorAll('.square');
    // console.log('boxValue', boxValue);

    for(let i = 0; i < spanValue.length; i++){

        const spanText = parseInt(spanValue[i].innerText);

        if(bombArr.includes(spanText)){
            boxValue[i].classList.add('bomb', 'clicked');
        }
    }
}



/**
 * Funzione per la vittoria della partita;
 * @param {element} resultAnn 
 */
function winnerGame(resultAnn){

    if(click === 12){
        resultAnn.innerHTML = `<h3>Hai Vinto dopo ${click} tentativi!</h3>`
        grid.classList.add('pe-none', 'loser_grid');

        const gameWin = new Audio('audio_file/smb_stage_clear.wav');
        gameWin.play();
    }
}




/**
 *  Estrae un numero random
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */

function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

}






/**
 * Crea bombe casuali ad ogni partita
 * @param {number} squareNumber 
 * @returns
 */
function bombGenerator(squareNumber){
    const generatedBomb = [];

    while(generatedBomb.length < MAP_BOMBS) {

        const bombNum = getRandomNumber(1, squareNumber);

        if(!generatedBomb.includes(bombNum)){
            generatedBomb.push(bombNum);
        }
    }

    // console.log(generatedBomb);

    return generatedBomb;
}