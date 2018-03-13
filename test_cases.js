// cases for check for win
// 3x3
gameTooFewPlays = [
    ['x', 'x', ''],
    ['', 'o', ''],
    ['', '', 'o']
]
gameXrow = [
    ['x', 'x', 'x'],
    ['x', 'o', ''],
    ['o', 'o', '']
]
gameOrow = [
    ['x', '', 'x'],
    ['o', 'o', 'o'],
    ['', 'x', '']
]
gameXcol = [
    ['o', 'x', ''],
    ['o', 'x', ''],
    ['', 'x', '']
]
gameOcol = [
    ['x', 'o', ''],
    ['', 'o', ''],
    ['x', 'o', 'x']
]
gameXdiagLeft = [
    ['x', 'o', ''],
    ['', 'x', 'o'],
    ['', '', 'x']
]
gameXdiagRight = [
    ['', 'o', 'x'],
    ['', 'x', ''],
    ['x', 'o', '']
]
gameOdiagLeft = [
    ['o', 'x', ''],
    ['', 'o', 'x'],
    ['', 'x', 'o']
]
gameOdiagRight = [
    ['x', 'x', 'o'],
    ['', 'o', ''],
    ['o', 'x', '']
]
gameTie = [
    ['x', 'o', 'x'],
    ['o', 'x', 'o'],
    ['o', 'x', 'o']
]

var boardRows = 3;
var plays = totalBoxes;
var totalBoxes = boardRows * boardRows;
checkWin(gameTooFewPlays);
checkWin(gameXrow);
checkWin(gameOrow);
checkWin(gameXcol);
checkWin(gameOcol);
checkWin(gameXdiagLeft);
checkWin(gameXdiagRight);
checkWin(gameOdiagLeft);
checkWin(gameOdiagRight);
checkWin(gameTie);
