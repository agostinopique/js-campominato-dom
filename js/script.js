/* 

Devo creare una griglia di un tot di celle a seconda del valore del select.
Quando clicchi su una cella deve cambiare il colore dello sfondo e apparire un numero random con un range a seconda della difficoltá selezionata. Il colore dello sfondo cambia a seconda se il numero é pari o dispari.
Devo creare una funzione che estrae randomicamente un numero a seconda della difficoltá selezionata.

    1. Crea una funzione che inserisce i quadratini a seconda della difficoltá;
    2. Creo una funzione che estrae un numero casuale controllando che non sia già stato estratto;
    3. Controllo se il numero é pari o dispari e, a seconda del risultato del controllo, aggiungo una classe odd o even all'innerHTML;
    4. Creo l'evento del click al cui interno chiamo la funzione che mette le classi e il contenuto;

*/



document.getElementById('difficulty-btn').addEventListener('click', getDifficulty);

const grid = document.querySelector('.ap_container')
const MAP_BOMBS = 16;
const arrRandomNumber = [];

// Funzione che determina quanti quadratini devono andare nella griglia a seconda del value del select;

/*
 * Creo un numero di celle n dettate dalla difficoltá selezionata dall'utente, stampo il numero estratto randomicamente dalla funzione.
 */
function getDifficulty() {
    // Modifica il testo del pulsante al click
    this.innerHTML = 'Reset';

    // prendo il valore della difficoltá
    const squares = document.querySelector('#difficulty-selector').value; 

    // definisco l'indice delle difficoltá
    const difficultyNumber = [100, 81, 49];

    // indico il numero di celle in base all'indice preso dall'input
    const squareNumber = difficultyNumber[squares];

    // resetto la griglia
    grid.innerHTML = '';
    
    // genero le celle
    for(let i = 1; i <= squareNumber; i++){
        // Richiamo e appendo le celle dalla funzione dedicata
        const cell = cellGenerator(i, squareNumber);
        grid.appendChild(cell);

    }

    console.log(grid);

    const casualNumber = getRandomNumber(1, squareNumber);
    const bomb = bombGenerator(squareNumber);
}


/**
 * creo il contenitore delle celle all'interno del quale vado ad insrire i vari elementi
 * @param {number} n 
 * @param {number} squareNumber 
 * @returns 
 */
function cellGenerator(n, squareNumber){
    const sq = document.createElement('div');
/* 
    // Altermativa che da le misure delle celle in maniera dinamica
    const cellFactor = Math.sqrt(squareNumber);
    const cellSize = `calc(100% / ${cellFactor});
    sq.style.width = cellSize;
    sq.style.height = cellSize;
     */
    sq.className = 'square square_' + squareNumber;

    // Soluzione per l'insrimento dei numeri in succcessione
    // sq.innerHTML = `<span>${n}</span>`;

    //  Soluzione per l'inserimento dei numeri random
    sq.innerHTML = `<span>${getRandomNumber(1, squareNumber)}</span>`;

    // aggiungo le classi al click della singola cella (this)
    sq.addEventListener('click', clickedCell);

    return sq;
}

/**
 * aggiunge le classi di stile al click della cella;
 */
function clickedCell(){
    this.classList.add('clicked', 'light')
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

    // crea una logica che estrae un numero random finché il numero di bombe presenti nella mappa non viene raggiunto. Controlla se il numero estratto é presente nell'array di verifica e, se non presente viene incluso nell'array delle bombe, se invece é presente continuo ad estrarre finché non raggiunge il numero di bombe;

    while(generatedBomb < MAP_BOMBS) {
        const bombNum = getRandomNumber(1, squareNumber);

        if(!generatedBomb.includes(bombNum)){
            generatedBomb.push(bombNum);
            
        }
    }

    console.log(generatedBomb);
    return generatedBomb;
}