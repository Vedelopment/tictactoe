'use strict'

// alert('Welcome to Tic Tac Toe! This code was written by LD Dean. You can play any size grid in this game (3x3 is the classic, but try 10x10!) as the user against the computer and choose either "x" or "o". Click the button "Play a round!" to start a new game. Have fun!')
//
// alert('Note: If playing in the console only, enter "playRound();" to start a new game. Each square is numbered from left to right, top to bottom. Example, in a 3x3 board the top left box is #1, the bottom right is #9.')

// board object refactor
// var boardRows = prompt('Please enter how many rows you want to play.'),

// TODO delete unused variables
// TODO restore alerts and prompts

var boardRows = 3,
    totalBoxes = boardRows * boardRows,
    boxObj,
    boxRender,
    colBoxLR,
    colBoxRL,
    count,
    countBox,
    countDiagLR,
    countDiagRL,
    gameView,
    currPlayer,
    currPlayerIndex,
    symbol = '',
    // user = prompt('Please enter your name.'),
    user = 'LD',
    // userSymbol = prompt('Do you want x\'s or o\'s? Enter only lowercase "x" or lowercase "o".'),
    userSymbol = 'x',
    comp = 'Computer',
    compSymbol,
    boxPlay = '',
    smartPlay,
    rowCount,
    rowArr,
    rowIndex,
    rowIndexLR,
    rowIndexRL,
    arrCompare,
    arrCompKey,
    boardRender = document.getElementById('board'),
    winKey = [], // array used to check for wins
    openBoxes = [], // array computer can pick random valid boxes from
    key0,
    key1,
    blockWinStatus,
    noOpponentStatus,
    bestPlay = true,
    totalPlays = 0;

if (userSymbol === 'x') {
    compSymbol = 'o';
} else {
    compSymbol = 'x';
}

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

function PlayerList() {
    this.playersList = [];
}

PlayerList.prototype.createPlayers = function(name, symbol) {
    this.playersList.push(new Player(name, symbol));
}

function Box(num, symbol) {
    this.num = num;
    this.symbol = symbol;
}

function Board() {
    this.grid = [];
}

Board.prototype.createBoard = function(num, symbol) {
    gameboard = []; // empty gameboard array
    openBoxes = []; // empty openBoxes array

    var createBox,
        boxDisplay = 1;

    if (boardRender) {
        boardRender.innerHTML = ''; // clear DOM board container for new game
    }
    if (boardRows > 5 && boardRender) {
        document.getElementById('title').innerHTML = 'Tic Tac Nope'; // change game title for large boards
    }

    for(createBox = 0; createBox < totalBoxes; createBox++){ // create boxes equal to totalBoxes

        // DOM
        var boxWidth = 500/boardRows -6,
            boxHeight = 500/boardRows -6,
            text = boxDisplay,
            boxId = '' + boxDisplay,
            node = document.createElement('div'),
            textnode = document.createTextNode(text),
            style = 'width: ' + boxWidth + 'px; height: ' + boxWidth + 'px; font-size: ' + 7/boardRows + 'em; line-height: ' + boxWidth + 'px';

        node.appendChild(textnode);
        node.setAttribute('id', boxId);
        node.setAttribute('class', 'board-box');
        node.setAttribute('style', style);

        if (boardRender) {
            boardRender.appendChild(node);
        };

        // GAMEBOARD ARRAY
        gameboard.push(new Box(boxDisplay, '')); // create new box and push into board object
        openBoxes.push(createBox + 1);
        boxDisplay ++ ;
    }
    console.log({openBoxes});
}

var game = new Board();
var gameboard = game.grid;
var players = new PlayerList();
var player = players.playersList;

game.createBoard();
players.createPlayers(user, userSymbol);
players.createPlayers(comp, compSymbol);

////////////////////////////// COMPARE/STRATEGY FUNCTIONS //////////////////////////////
function onlyOpponent (el, array, index) { // check if only opponent symbols are in row, assumes only two players
    return el != symbol;
}
function noOpponentCheck (el, array, index) { // check for row with player symbol and no opponent symbols
    return el === '' || el === symbol;
}

function blockWinCheck(rowArr) {
    for(count = 0; count < boardRows; count++) {
        arrCompare = []; // to contain arrays of empty boxes' row and index values
        arrCompKey = []; // to contain empty boxes row and index value
        gameboard[count].forEach(function callback(el, index) {
            if (el.symbol === '') {
                arrCompKey.push(count); // push the row's index
                arrCompKey.push(index); // push the box's index
            }
        })
        if (arrCompare.length === 1 && gameboard.every(onlyOpponent)) { // if the compare array has only one value AND only has opponent's symbol in the remaining boxes, use the box's row and index values as keys to mark play
            console.log(arrCompKey);
            key0 = arrCompKey[0][0];
            key1 = arrCompKey[0][1];
            return true; // return true to if statement in blockWin
        }
    }
}

// currently only checks rows
function blockWin() {
    for(count = 0; count < boardRows; count++) {
        rowArr = gameboard[count];
        rowIndex = count;
        if (blockWinCheck(rowArr)) { // check each row in blockWinCheck function to see if it passes
            return true; // first row that satifies this condition will trigger switch case in smartMove function
        }
    }
}

// currently only checks rows
function noOpponent() {
    console.log('noOpponent called');
    for(count = 0; count < boardRows; count++) {
        rowArr = gameboard[count];
        if (gameboard.every(noOpponentCheck)) { // check for rows that do not have an opponent symbol in them or are empty
            key0 = count; // count is the index of the row we are evaluating, set the key to this value
            key1 = Math.floor(Math.random() * boardRows); // pick a random box on this row (TODO: use array to store unplayed boxes to prevent invalid moves)
            return true;
        }
    }
}

////////////////////////////// GAMEPLAY //////////////////////////////
function displayBoard() {
    gameView = '\nTIC TAC TOE\n\n';
    winKey = [];
    let boxIndex = 0;
    for(rowCount = 0; rowCount < boardRows; rowCount ++) {
        let row = [],
            boxCount;
        for(boxCount = 0; boxCount < boardRows; boxCount ++) {

            if(gameboard[boxIndex].symbol === '') {
                gameView += gameboard[boxIndex].num;
            } else {
                gameView += gameboard[boxIndex].symbol;
            }

            row.push(gameboard[boxIndex].symbol);

            gameView += '\t';
            boxIndex ++; // track index number outside of this loop
        };
        winKey.push(row);
        gameView += '\n\n';
    };
    console.log( gameView) + '\n\n';
    console.log(winKey);
}

function playRound() {
    totalPlays = 0; // used to determine if there are enough plays to check for a win yet
    currPlayer = player[0];
    game.createBoard();
    displayBoard();
    setTimeout(function() {
        makePlay();
    }, 200);
}

function makePlay() {
    console.log(currPlayer.name + ', make your play!');
    symbol = currPlayer.symbol;

    if (currPlayer.name != 'Computer' && currPlayer.name != 'auto') {
        boxPlay = prompt(currPlayer.name
            + ': Type in the box number you would like to mark with your play.\n\n'
            + gameView);
        boxPlay = Math.floor(boxPlay);
        if (boxPlay > totalBoxes || boxPlay < 1 || isNaN(boxPlay)) {
            alert('please pick a valid box number');
            // makePlay();
        } else {
            console.log(boxPlay);
            isValid();
        }
    } else {
        setTimeout(function() {
            smartMove();
        }, 2000);
    }
}

function nextPlayer() {
    currPlayerIndex = player.indexOf(currPlayer);
	var next = player[currPlayerIndex + 1];
	if (player.indexOf(next) < 0) {
		currPlayer = player[0];
    } else {
        currPlayer = next;
    }
    makePlay();
}

function smartMove() {
    switch (bestPlay) {
        // case blockWin():
        //     break;
        // case noOpponent():
        //     break;
        default:
            console.log('random move made');
            length = openBoxes.length
            console.log({length});
            boxPlay = Math.ceil(Math.random() * openBoxes.length);
            console.log({boxPlay});
    }
    isValid(); // TODO: can this be removed and changed to markBox(); in the future since the computer will no longer pick unavailable boxes with openBoxes array?
}

function isValid() {
    boxObj = gameboard.find(function(box) { //
        return box = (box.num === boxPlay);
    });

    if (boxObj.symbol != '') {
        if (currPlayer.name === 'Computer' || currPlayer.name === 'auto') {
            setTimeout(function() { // allow browser to update html between prompts and alerts
                smartMove();
            }, 400);
        } else {
            alert('Oops! This one is taken. Please pick a box that has not already been played.');
            makePlay();
        }
    } else {
        markBox();
    }
}

function markBox() {
    symbol = currPlayer.symbol; // set the symbol to current player's symbol
    boxObj.symbol = symbol; // mark the gameboard array

    let openIndex = openBoxes.indexOf(boxPlay); // find box number index in openBoxes array
    openBoxes.splice(openIndex, 1); // remove box number from openBoxes array

    if (boardRender) {
        boxRender = document.getElementById(boxObj.num); // get the DOM element
        boxRender.innerHTML = symbol;
        boxRender.classList.add(symbol);
    }
    displayBoard();
    setTimeout(function() { // allow browser to update html between prompts and alerts
        checkForWin();
    }, 400);
}

function allEqual(el, index, array) {
	return el === array[0] && el != '';
}

function checkForWin() {
    totalPlays++;

    // not enough plays
    if (totalPlays <= (boardRows-1)*2) {

        console.log('Not enough plays to determine a win yet...');
        nextPlayer(currPlayer);

    } else {

        // check for row win
        for(count = 0; count < boardRows; count++) {
            rowArr = winKey[count];
            if(rowArr.every(allEqual)) {
                console.log(currPlayer.name, 'made a ' + 'row win!');
                alert(currPlayer.name + ' made a ' + 'row win!\n\n' + gameView);
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
                colArr.push(winKey[rowIndex][colBox]);
                rowIndex ++ ;
            }

            if (colArr.every(allEqual)) {
                console.log(currPlayer.name, 'made a ' + 'column win!');
                alert(currPlayer.name + ' made a ' + 'column win!\n\n' + gameView);
                return;
            }
            colIndex ++ ;
            colBox ++ ;
        }

        // check for left to right diagonal win
        rowIndexLR = 0;
        colBoxLR = 0;
        var diagArrLR = [];
        for (countDiagLR = 0; countDiagLR < boardRows; countDiagLR++) {
            diagArrLR.push(winKey[rowIndexLR][colBoxLR]);
            rowIndexLR ++ ;
            colBoxLR ++ ;
        }
        if (diagArrLR.every(allEqual)) {
            console.log(currPlayer.name, 'made a ' + 'diagonal left to right win!');
            alert(currPlayer.name + ' made a ' + 'diagonal left to right win!\n\n' + gameView);
            return;
        }

        // check for right to left diagonal win
        rowIndexRL = 0;
        colBoxRL = boardRows - 1;
        var diagArrRL = [];
        for (countDiagRL = 0; countDiagRL < boardRows; countDiagRL++) {
            diagArrRL.push(winKey[rowIndexRL][colBoxRL]);
            rowIndexRL ++ ;
            colBoxRL --;
        }
        if (diagArrRL.every(allEqual)) {
            console.log(currPlayer.name, 'made a ' + 'diagonal right to left win!');
            alert(currPlayer.name + ' made a ' + 'diagonal right to left win!\n\n' + gameView);
            return;
        }

        // check for tied game
        if (totalPlays === totalBoxes) {
            console.log('The game is a tie!');
            alert('The game is a tie!\n\n' + gameView);
            return;
        }

        // no results yet
        console.log('No win yet...');
        nextPlayer();
    }
}
