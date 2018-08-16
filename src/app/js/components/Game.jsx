import React from 'react';
import { render } from 'react-dom';
import TicTacToe from 'TicTacToe';

const Game = () => <TicTacToe />

render(<Game />, document.getElementById('app'));