#react-tic-tac-toe
=================
## Gameplay and Functional
#### 1. Gameplay
A React implementation of Tic Tac Toe for two players. First player moves with X, second player moves with O. The game end when one met the win condition, or all cell were fulfilled.
#### 2. Setting
User can setup board size and condition to win in setting dialog. 
#### 3. History
The application also kept track the state of the game while playing, then show up the history when game ended. User can click history line to watch their move.
#### 4. Play new game
User can click "Play again" button to start a new game
#### 5. Winner alert and highlight win row
When game ended, an alert shown up the winner and highlighted win row
#### 6. Display score board
Display score board for multiple game


## Code, structure and components
#### 1. Code
* The code using ES6/JSX syntax.
* Using webpack for bundling and minifaction.
* Style with scss
#### 2. Structure
* Source code store in src folder


#### 3. Components
Base on single repository principle and think react, I tried to split all component to small component and can be reusable and group by their relationship. 
######  3.1 GameInfo 
GameInfo component: Display game information like name, rule.
###### 3.2 Board 
* Board component: 
* Cell component:
###### 3.3 TicTacToe 
1. TicTactoe component
* Store all states of the TicTacToe game
2. History component
* To display list of moving historical of the game. The history only displays when game ended
3. Setting component
* The board size and condition to win can be changed from setting component.
###### 3.4 Result 
* GameStatus component: Display the status of the game, who will be moved next, winner
* Scoreboard component: Display score from the beginning to current game
###### 3.5 Common 
  Content common component frequently use such as modal, animation...

## Algorithm

The board was store in a single dimension array with size = (rows * cols) in setting.

```
Array[row * cols]

[0,1,2,
3,4,5,
6,7,8]
```

First X move

```
[0,1,2,
3,X,5,
6,7,8]
```

Second O move 

```
[0,1,2,
3,X,5,
0,7,8]
```

Winner check Algorithm

Instead of looping all rows, columns, diagonal I start from the current move position and loop around its rows, columns and diagonal. If not enough continuous X or O symbol met the win condition and all cell were fulfilled, game will end with "Tie" status.

```
[0,1,X,
3,X,5,
O,7,8]
```

## Demo and deployment

Live demo: [djhahe.github.io](http://djhahe.github.io)

To run the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8080/`](http://localhost:8080/) in a browser.

To build and package , run:

```
npm install
npm run build:dev //dev environment
npm run build:prod //dev production
```
