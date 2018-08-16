import React from 'react';
import { render } from 'react-dom';
import TicTacToe from './tictactoe/TicTacToe.jsx';

const Game = () => <TicTacToe />

render(<Game />, document.getElementById('app'));