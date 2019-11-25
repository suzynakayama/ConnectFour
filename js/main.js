// Constants
const COLORS = {
    '1': 'pink', //#cc99ff
    '-1': 'blue', //#4dd2ff
    '0': 'white',
};

// App's States (Variables) - global variables
let board, winner, turn;

// Cached Element References
let msgEl = document.getElementById('msg');

// Event Listeners --> we can call the function before because they are functions declarations, so it is hoisted
document.getElementById('markers').addEventListener('click', handleMarkerClick);

// Functions

init(); //initialize the game

function handleMarkerClick(event) {
    const markerEl = event.target; //gets the one that was clicked

    //get the column number
    const colIndex = parseInt(markerEl.id.replace('col', ''));

    //if column number is NaN return or if there is a winner
    if (isNaN(colIndex) || winner) return;

    //get the index of the next available 0
    const rowIdx = board[colIndex].indexOf(0);

    //if there is no more 0, player can't play here. IndexOf will return -1 if nothing is found
    if (rowIdx === -1) return;

    //set the right cell in the board to the player that played
    board[colIndex][rowIdx] = turn;

    //check if there is a winner
    setWinner();

    //change which player's turn it is
    turn *= -1;

    //render the board again after all state has been updated
    render();
}

function setWinner() {
    let foundZero = false;

    for (let colIdx = 0; colIdx < board.length; colIdx++) {

        for (let rowIdx = 0; rowIdx < board[colIdx].length; rowIdx++) {
            
            winner = checkUp(colIdx, rowIdx) || checkRight (colIdx, rowIdx) || checkDiag(colIdx, rowIdx, 1) || checkDiag(colIdx, rowIdx, -1)

            if (winner) break;
            
            foundZero = foundZero || (board[colIdx][rowIdx]) === 0
        }
        if (winner) break;

        if (!winner && !foundZero) {
            winner = 'T'
        }
    }


}

function checkUp(colIdx, rowIdx) {
    if (rowIdx > 2) return null;

    const column = board[colIdx];
    const cell = column[rowIdx];

    if (cell === column[rowIdx + 1] && cell === column[rowIdx + 2] && cell === column[rowIdx + 2] && cell === column[rowIdx + 3]) {
        return cell
    }
    return null;
}

function checkRight(colIdx, rowIdx) {
    if (colIdx > 3) return null;

    const cell = board[colIdx][rowIdx];
    if (cell === 0) return null;

    if (
        cell === board[colIdx + 1][rowIdx] &&
        cell === board[colIdx + 2][rowIdx] &&
        cell === board[colIdx + 3][rowIdx] 
    ) {
        return cell;
    }
    return null;
}

function checkDiag(colIdx, rowIdx, vertOffset) {
    if (colIdx > 3 || (vertOffset > 0 && rowIdx > 2) || (vertOffset < 0 && rowIdx < 3)) return null;

    const cell = board[colIdx][rowIdx];

    if (cell === 0) return null;

    if (
        cell === board[colIdx + 1][rowIdx + vertOffset * 1] &&
        cell === board[colIdx + 2][rowIdx + vertOffset * 2] &&
        cell === board[colIdx + 3][rowIdx + vertOffset * 3] 
    ) {
        return cell;
    }
    return null;
}

function render() {
    board.forEach((columnArray, columnIndex) => {
        const markerEl = document.getElementById(`col${columnIndex}`);
        markerEl.style.borderTopColor = columnArray.includes(0) ? 'rgb(11, 233, 203)' : 'white';

        columnArray.forEach((cell, rowIndex) => {
            const cellEl = document.getElementById(`c${columnIndex}r${rowIndex}`);
            cellEl.style.backgroundColor = COLORS[cell];
        });
    });

    //Change the message
    if (winner) {
        if (winner === 'T') {
            msgEl.textContent = "It's a tie!";
        } else {
            const winnerColor = COLORS[winner];
            msgEl.innerHTML = `<span style="color:${winnerColor}">${winnerColor.toUpperCase()}</span> Wins!`;
        }
    } else {
        const turnColor = COLORS[turn];
        msgEl.innerHTML = `<span style="color:${turnColor}">${turnColor.toUpperCase()}</span>'s Turn`;
    }
}

function init() {
    turn = 1;
    winner = null;

    board = [
       //r0/r1/r2/r3/r4/r5
        [0, 0, 0, 0, 0, 0], //col 0
        [0, 0, 0, 0, 0, 0], //col 1
        [0, 0, 0, 0, 0, 0], //col 2
        [0, 0, 0, 0, 0, 0], //col 3
        [0, 0, 0, 0, 0, 0], //col 4
        [0, 0, 0, 0, 0, 0], //col 5
        [0, 0, 0, 0, 0, 0], //col 6
    ]

    render();
}
