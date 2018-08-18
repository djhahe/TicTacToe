#react-tic-tac-toe
=================
## Gameplay and Functional

A React implementation of Tic Tac Toe for two players. First palyer move with X, second player move with O. The game end when one met the win condition. User can setup board size and condition to win in setting dialog. The application also kept track the state of the game while playing, then show up the history when game ended. User can click history line to watch their move.

## Algorithm

The board was store in a single demension array with size = (rows * cols) in setting.

```
Array[row * cols]

[0,1,2,
3,4,5,
6,7,8]
```


## Components and struture

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
