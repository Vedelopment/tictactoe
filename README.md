# Tic Tac Toe

Play online:
[Tic Tac Toe, version 1](http://tictactoe-ld-dean.bitballoon.com/ "Tic Tac Toe v1 by LD Dean")
[Tic Tac Toe, version 2](http://tictactoe-v2-ld-dean.bitballoon.com// "Tic Tac Toe v2 by LD Dean")
### Updates:
+ Computer strategy updates:
..+ Will first check if the opponent has filled all the boxes on a row except for one (the opponent could win the next play) and will mark that box to block it
..+ If the previous condition is not met, the computer look for the first row that contains only blank boxes or the player's symbol and will mark a random box on that row
..+ If the previous condition is not met, the computer will choose a random blank box
+ Prompt now shows the board with corresponding box empty numbers or plays

An object-oriented javascript tic tac toe game that supports potentially unlimited grid sizes and has some functionality to support more than two players in the future.

### Future Features:
+ Computer strategy:
..+ Add columns and diagonals to block win function
..+ Add columns and diagonals to no opponent play function

To test wins, a 2x2 board is fastest. To test ties, a 4x4 board is easier to "not win". To test your patience, I recommend a board of 6x6 or higher.

To have the computer play itself, enter the name "auto".

![gameplay 3x3](https://i.imgflip.com/26bzrc.gif) ![gameplay 5x5](https://i.imgflip.com/26c2sc.gif) ![gameplay 5x5](https://i.imgflip.com/26c3l1.gif)

The visual interface is supported up to around 25x25 (625 box) grid, but higher number grids still work. (yes, I've tested a 30x30 grid and it took a while)

![30x30 gameboard](https://i.imgflip.com/26bybj.jpg)
