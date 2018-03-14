'use sctrict'

alert('Welcome to Tic Tac Toe! This code was written by LD Dean. You can play any size grid in this game (3x3 is the classic, but try 10x10!) as the user against the computer and choose either "x" or "o". Click the button "Play a round!" to start a new game. Have fun!')

alert('Note: If playing in the console only, enter "playRound();" to start a new game. Each square is numbered from left to right, top to bottom. Example, in a 3x3 board the top left box is #1, the bottom right is #9.')

var boardRows = prompt('Please enter how many rows you want to play.'),
    totalBoxes = boardRows * boardRows,
    currPlayer,
    symbol = '',
    user = prompt('Please enter your name.'),
    userSymbol = prompt('Do you want x\'s or o\'s? Enter only lowercase "x" or lowercase "o".'),
    comp = 'Computer',
    compSymbol,
    boxPlay = '';
    boardRender = document.getElementById('board'),
    gridKey = [], // array used to associate box numbers with game array indices
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
    var createRow;
    var createBox;
    var gridKeyIndexCount = 1;
    if (boardRender) {
        boardRender.innerHTML = ''; // clear board for new game
    }
    if (boardRows > 5 && boardRender) {
        document.getElementById('title').innerHTML = 'Tic Tac Nope';
    }
    for(createRow = 0; createRow < this.boardRows; createRow++){
        this.grid[createRow] = [];
        for(createBox = 0; createBox < this.boardRows; createBox++){

            var boxWidth = 500/boardRows -6;
            var boxHeight = 500/boardRows -6;
            var text = gridKeyIndexCount
            var node = document.createElement('div');
            var textnode = document.createTextNode(text);
            var style = 'width: ' + boxWidth + 'px; height: ' + boxWidth + 'px; font-size: ' + 7/boardRows + 'em; line-height: ' + boxWidth + 'px';

            this.grid[createRow][createBox] = '';
            gridKey[gridKeyIndexCount] = [createRow, createBox];

            node.appendChild(textnode);
            node.setAttribute('id', text);
            node.setAttribute('class', 'board-box');
            node.setAttribute('style', style);
            if (boardRender) {
                boardRender.appendChild(node);
            }

            gridKeyIndexCount ++ ;
        }
    }
}


var game = new Board();
var gameboard = game.grid;
var players = new PlayerList();
var player = players.playersList;

// gameplay functions
function displayBoard() {
    gameboard.forEach(function(row) {
        console.log(row);
    });
}

function playRound() {
    totalPlays = 0;
    currPlayer = player[0];
    game.createBoard();
    displayBoard();
    setTimeout(function() { // allow browser to update html between prompts and alerts
        makePlay();
    }, 50);
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

function makePlay() {
    console.log(currPlayer.name, ', make your play!');

    var selection = null;
    var key0;
    var key1;
    symbol = currPlayer.symbol;
    boxPlay = 0;

    if (currPlayer.name != 'Computer' && currPlayer.name != 'auto') {
        boxPlay = prompt(currPlayer.name + ': Type in the box number you would like to mark with your play.')
    } else {
        boxPlay = Math.ceil(Math.random() * Math.floor(totalBoxes));
    }

    key0 = gridKey[boxPlay][0];
    key1 = gridKey[boxPlay][1];

    if (gameboard[key0][key1] != '') {
        if (currPlayer.name != 'Computer' && currPlayer.name != 'auto') {
            alert('Oops! This one is taken. Please pick a box that has not already been played.');
        }
        makePlay(currPlayer);
    } else {
        gameboard[key0][key1] = symbol;
        boxRender = document.getElementById(boxPlay);
        if (boardRender) {
            boxRender.innerHTML = symbol;
            boxRender.classList.add(symbol);
        }
        displayBoard();
        setTimeout(function() { // allow browser to update html between prompts and alerts
            checkForWin();
        }, 500);
    }
}

function allEqual(element, index, array) {
	return element === array[0] && element != '';
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
                alert(currPlayer.name + ' made a ' + 'row win!');
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
                alert(currPlayer.name + ' made a ' + 'column win!');
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
            alert(currPlayer.name + ' made a ' + 'diagonal left to right win!');
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
            alert(currPlayer.name + ' made a ' + 'diagonal right to left win!');
            return;
        }

        // check for tied game
        if (totalPlays === totalBoxes) {
            console.log('The game is a tie!');
            alert('The game is a tie!');
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
