// BETTER PLAYER LOGIC
// check for rows/cols that don't have opponent value in them, make that move next, pick random value from that row?
// if none are available, check for ones that have player value, make move there

// template for strategy function with switch option
function one() {
    console.log('function one was called');
    return false;
}
function two() {
    console.log('function two was called');
    return true;
}
function three() {
    console.log('function three was called');
    return true;
}

var isTrue = true;
switch (isTrue) {
case one():
    console.log('one is true');
    break;
case two():
    console.log('two is true');
    break;
case three():
    console.log('three is true');
    break;
default:
    console.log('nothing is real');
}
// (function checkTrue() {
//     if (one()) {
//         console.log('one is true');
//     } else if (two()) {
//         console.log('two is true');
//     }
// })();

// template for strategy switch functions
var isTrue = true, x = false, y = false;

(function runScenarios() {
    for(count = 0; count < 1; count++) {
        if (true) {
            x = true;
            console.log({x});
            break;
        }
    }
    for(count = 0; count < 1; count++) {
        if (true) {
            y = true;
            console.log({y});
            break;
        }
    }})();
switch (isTrue) {
case x:
    console.log('x is true');
    // break;
case y:
    console.log('y is true');
    // break;
default:
    console.log('nothing is real');
}

// check for wins------------------------------------------------

// not enough plays to check for win yet ------------------------------------------------
    // update a variable every time we succesfully exit make play and enter check for win
    // compare this number to total boxes (with some math to determine plays for different board sizes) and determine if enough plays have taken place for a win to be possible
    // if win is possible, check these cases:

    // rows ------------------------------------------------
        for (i = 0; i < rows; i++) {
            for (compareIndex = 0; compareIndex < (rows - 1); comopareIndex + rows) {

            }
        }
            // go through each row and check if the first is equal to each one after it (index ++)
            //     if they are all equal, get player name and display as winner
            //         break out of game functions
            //         ask to start new game?

    // i=0; 0<3 is true; check row one
    // i=1; 1<3 is true; check row two
    // i=2; 2<3 is true; check row three
    // i=3; 3<3 is false;, exit


    // columns ------------------------------------------------
        // for loop
            // go through each column

    // diagonals ------------------------------------------------

    // tie ------------------------------------------------
        // is number of plays less than number of boxes?
            // no win yet
        // else
            // display tie



//--------------------------------------------------
// Compare an array of a possible win in any direction
//--------------------------------------------------

function allEqual(element, index, array) {
	return element === array[0] && element != '';
}
['x', 'x', 'x'].every(allEqual);    // true
['o', 'o', 'o'].every(allEqual);    // true
['x', 'o', 'x'].every(allEqual);    // false
['', '', ''].every(allEqual);       // false
['o', 'o', ''].every(allEqual);     // false
['o', 'o', '', 'x'].every(allEqual);     // false
['o', 'o', 'o', 'o'].every(allEqual);     // true

//--------------------------------------------------
// Compare row wins in a game
//--------------------------------------------------

function checkRowWin(game) {
    for(count = 0; count < boardRows; count++) {
        rowArr = game[count];
        console.log(rowArr);
        if(rowArr.every(allEqual)) {
            console.log('row win');
            return;
        }
    }
}

//--------------------------------------------------
// Compare column wins in a game
//--------------------------------------------------

function checkColWin(game) {
    // console.log(game);
    var colIndex = 0;
    var colBox = 0;
    for(count = 0; count < boardRows; count++) {
        // console.log('loop: ', count);
        var rowIndex = 0;
        var colArr = [];
        for (countBox = 0; countBox < boardRows; countBox++) {
            // console.log('inner loop: ', countBox);
            // console.log('column box: ', colBox);
            colArr.push(game[rowIndex][colBox]);
            rowIndex ++ ;
        }
        console.log(colArr);

        if (colArr.every(allEqual)) {
            console.log('column win');
            return;
        }
        colIndex ++ ;
        colBox ++ ;
        // console.log('end of outside loop, count: ', count);
    }
}

//--------------------------------------------------
// Compare a diagonal wins in a matrix of arrays
//--------------------------------------------------

// extension of column win function

        // left to right
        for (countBox = 0; countBox < boardRows; countBox++) {
            colDiag.push(game[rowIndex][colBox]);
            rowIndex + boardRows ;
            console.log(colDiag);
            if (colDiag.every(allEqual)) {
                console.log('column win');
                return;
            }
        }

        // right to left
        for (countBox = 0; countBox < boardRows; countBox++) {
            colBox = boardRows - 1;
            colDiag.push(game[rowIndex][colBox]);
            rowIndex -- ;
            console.log(colDiag);
            if (colDiag.every(allEqual)) {
                console.log('column win');
                return;
            }
        }

//--------------------------------------------------
// Check for a tie
//--------------------------------------------------

    if (plays === rowBoxes) {
        console.log('Game is a tie!');
    }

//--------------------------------------------------
// Check all directions of a win, row, column and diagonal
//--------------------------------------------------

function allEqual(element, index, array) {
	return element === array[0] && element != '';
}

function checkWin(game) {

    // check for row win
    for(count = 0; count < boardRows; count++) {
        rowArr = game[count];
        if(rowArr.every(allEqual)) {
            console.log('row win: ', rowArr);
            return;
        }
    }

    // check for column win
    var colIndex = 0;
    var colBox = 0;
    for(count = 0; count < boardRows; count++) {
        var rowIndex = 0;
        var colArr = [];
        for (countBox = 0; countBox < boardRows; countBox++) {
            colArr.push(game[rowIndex][colBox]);
            rowIndex ++ ;
        }

        if (colArr.every(allEqual)) {
            console.log('column win: ', colArr);
            return;
        }
        colIndex ++ ;
        colBox ++ ;
    }

    // left to right
    rowIndexLR = 0;
    colBoxLR = 0;
    var diagArrLR = [];
    for (countDiagLR = 0; countDiagLR < boardRows; countDiagLR++) {
        diagArrLR.push(game[rowIndexLR][colBoxLR]);
        rowIndexLR ++ ;
        colBoxLR ++ ;
    }
    if (diagArrLR.every(allEqual)) {
        console.log('diagonal L to R win: ', diagArrLR);
        return;
    }

    // right to left
    rowIndexRL = 0;
    colBoxRL = boardRows - 1;
    var diagArrRL = [];
    for (countDiagRL = 0; countDiagRL < boardRows; countDiagRL++) {
        diagArrRL.push(game[rowIndexRL][colBoxRL]);
        rowIndexRL ++ ;
        colBoxRL --;
    }

    if (diagArrRL.every(allEqual)) {
        console.log('diagonal R to L win: ', diagArrRL);
        return;
    }

    // tied game
    if (plays === totalBoxes) {
        console.log('Game is a tie!');
        return;
    }

    // no results yet
    console.log('no results yet');
}
