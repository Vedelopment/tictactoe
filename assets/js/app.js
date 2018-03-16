'use sctrict'

alert('Welcome to Tic Tac Toe! This code was written by LD Dean. You can play any size grid in this game (3x3 is the classic, but try 10x10!) as the user against the computer and choose either "x" or "o". Click the button "Play a round!" to start a new game. Have fun!')

alert('Note: If playing in the console only, enter "playRound();" to start a new game. Each square is numbered from left to right, top to bottom. Example, in a 3x3 board the top left box is #1, the bottom right is #9.')

var boardRows = prompt('Please enter how many rows you want to play.'),
    totalBoxes = boardRows * boardRows,
    gameView,
    currPlayer,
    symbol = '',
    user = prompt('Please enter your name.'),
    userSymbol = prompt('Do you want x\'s or o\'s? Enter only lowercase "x" or lowercase "o".'),
    comp = 'Computer',
    compSymbol,
    boxPlay = '',
    smartPlay,
    boardRender = document.getElementById('board'),
    gridKey = [], // array used to associate box numbers with game array indices
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

function Board() {
    this.boardRows = boardRows;
    this.grid = [];
}

Board.prototype.createBoard = function() {
    var createRow,
        createBox,
        gridKeyIndexCount = 1,
        boxDisplay = 1;

    if (boardRender) {
        boardRender.innerHTML = ''; // clear board for new game
    }
    if (boardRows > 5 && boardRender) {
        document.getElementById('title').innerHTML = 'Tic Tac Nope';
    }

    for(createRow = 0; createRow < this.boardRows; createRow++){
        this.grid[createRow] = [];

        for(createBox = 0; createBox < this.boardRows; createBox++){

            var boxWidth = 500/boardRows -6,
                boxHeight = 500/boardRows -6,
                text = boxDisplay,
                boxId = '' + createRow + createBox,
                node = document.createElement('div'),
                textnode = document.createTextNode(text),
                style = 'width: ' + boxWidth + 'px; height: ' + boxWidth + 'px; font-size: ' + 7/boardRows + 'em; line-height: ' + boxWidth + 'px';

            this.grid[createRow][createBox] = '';
            gridKey[gridKeyIndexCount] = [createRow, createBox];

            node.appendChild(textnode);
            node.setAttribute('id', boxId);
            node.setAttribute('class', 'board-box');
            node.setAttribute('style', style);

            if (boardRender) {
                boardRender.appendChild(node);
            };

            if (createBox < (boardRows - 1)) {
                boxDisplay ++ ;
            };

            gridKeyIndexCount ++ ;
        }
        boxDisplay ++ ;
    }
    boxCollection = document.getElementsByClassName("board-box");
}

var game = new Board();
var gameboard = game.grid;
var players = new PlayerList();
var player = players.playersList;

////////////////////////////// COMPARE/STRATEGY FUNCTIONS //////////////////////////////
function onlyOpponent (el, array, index) { // check if only opponent symbols are in row, assumes only two players
    return el != symbol;
}
function noOpponentCheck (el, array, index) { // check for row with player symbol and no opponent symbols
    return el === '' || el === symbol;
}


function blockWinCheck(rowArr) {
    arrCompare = []; // to contain arrays of empty boxes' row and index values
    arrCompKey = []; // to contain empty boxes row and index value
    rowArr.forEach(function callback(el, index) {
        if (el === '') {
            arrCompKey.push(rowIndex); // push the row's index
            arrCompKey.push(index); // push the boxes index
            arrCompare.push(arrCompKey); // push the box array containing empty boxes' row and index values to the compare array
        }
    })
    if (arrCompare.length === 1 && rowArr.every(onlyOpponent)) { // if the compare array has only one value AND only has opponent's symbol in the remaining boxes, use the box's row and index values as keys to mark play
        key0 = arrCompare[0][0];
        key1 = arrCompare[0][1];
        return true; // return true to if statement in blockWin
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
    for(count = 0; count < boardRows; count++) {
        rowArr = gameboard[count];
        if (rowArr.every(noOpponentCheck)) { // check for rows that do not have an opponent symbol in them or are empty
            key0 = count; // count is the index of the row we are evaluating, set the key to this value
            key1 = Math.floor(Math.random() * boardRows); // pick a random box on this row (TODO: use array to store unplayed boxes to prevent invalid moves)
            return true;
        }
    }
}

////////////////////////////// GAMEPLAY //////////////////////////////
function displayBoard() {
    gameView = [];
    gameViewPrompt = '';
    let boxCount = 1;
    gameboard.forEach(function(row) {
        console.log(row);
        for(rowCount = 0; rowCount < boardRows; rowCount ++) {
            if(row[rowCount] === '') {
                gameViewPrompt += boxCount;
            } else {
                gameViewPrompt += row[rowCount];
            }
            gameViewPrompt += '\t';
            boxCount ++;
        };
        gameViewPrompt += '\n\n';
    });
}

function playRound() {
    totalPlays = 0; // used to determine if there are enough plays to check for a win yet
    currPlayer = player[0];
    game.createBoard();
    displayBoard();
    setTimeout(function() {
        makePlay();
    }, 500);
}

function makePlay() {
    console.log(currPlayer.name + ', make your play!');
    symbol = currPlayer.symbol;

    if (currPlayer.name != 'Computer' && currPlayer.name != 'auto') {
        boxPlay = prompt(currPlayer.name
            + ': Type in the box number you would like to mark with your play.\n\n'
            + gameViewPrompt);
        boxPlay = Math.floor(boxPlay);
        if (boxPlay > totalBoxes || boxPlay < 0 || isNaN(boxPlay)) {
            alert('please pick a valid box number');
            makePlay();
        } else {
            key0 = gridKey[boxPlay][0];
            key1 = gridKey[boxPlay][1];
            isValid();
        }
    } else {
        smartMove();
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
        case blockWin():
            break;
        case noOpponent():
            break;
        default:
            key0 = Math.floor(Math.random() * boardRows);
            key1 = Math.floor(Math.random() * boardRows);
    }
    setKeys();
}

function setKeys() {
    smartPlay = gameboard[key0][key1];
    isValid();
}

function isValid() {
    if (currPlayer.name === 'Computer' || currPlayer.name === 'auto') {
        if (smartPlay != '') {
            smartMove();
        } else {
            markBox();
        }
    }
    else if (gameboard[key0][key1] != '') {
        if (currPlayer.name != 'Computer' && currPlayer.name != 'auto') {
            alert('Oops! This one is taken. Please pick a box that has not already been played.');
        }
        makePlay();
    } else {
        markBox();
    }
}

function markBox() {
    gameboard[key0][key1] = symbol;
    boxRender = document.getElementById('' + key0 + key1);
    if (boardRender) {
        boxRender.innerHTML = symbol;
        boxRender.classList.add(symbol);
    }
    displayBoard();
    setTimeout(function() { // allow browser to update html between prompts and alerts
        checkForWin();
    }, 800);
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
            rowArr = gameboard[count];
            if(rowArr.every(allEqual)) {
                console.log(currPlayer.name, 'made a ' + 'row win!');
                alert(currPlayer.name + ' made a ' + 'row win!\n\n' + gameViewPrompt);
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
                colArr.push(gameboard[rowIndex][colBox]);
                rowIndex ++ ;
            }

            if (colArr.every(allEqual)) {
                console.log(currPlayer.name, 'made a ' + 'column win!');
                alert(currPlayer.name + ' made a ' + 'column win!\n\n' + gameViewPrompt);
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
            diagArrLR.push(gameboard[rowIndexLR][colBoxLR]);
            rowIndexLR ++ ;
            colBoxLR ++ ;
        }
        if (diagArrLR.every(allEqual)) {
            console.log(currPlayer.name, 'made a ' + 'diagonal left to right win!');
            alert(currPlayer.name + ' made a ' + 'diagonal left to right win!\n\n' + gameViewPrompt);
            return;
        }

        // check for right to left diagonal win
        rowIndexRL = 0;
        colBoxRL = boardRows - 1;
        var diagArrRL = [];
        for (countDiagRL = 0; countDiagRL < boardRows; countDiagRL++) {
            diagArrRL.push(gameboard[rowIndexRL][colBoxRL]);
            rowIndexRL ++ ;
            colBoxRL --;
        }
        if (diagArrRL.every(allEqual)) {
            console.log(currPlayer.name, 'made a ' + 'diagonal right to left win!');
            alert(currPlayer.name + ' made a ' + 'diagonal right to left win!\n\n' + gameViewPrompt);
            return;
        }

        // check for tied game
        if (totalPlays === totalBoxes) {
            console.log('The game is a tie!');
            alert('The game is a tie!\n\n' + gameViewPrompt);
            return;
        }

        // no results yet
        console.log('No win yet...');
        nextPlayer();
    }
}

game.createBoard();
players.createPlayers(user, userSymbol);
players.createPlayers(comp, compSymbol);
