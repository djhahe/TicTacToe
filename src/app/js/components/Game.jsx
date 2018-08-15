import React from 'react';
import { render } from 'react-dom';
import TicTacToe from 'TicTacToe';

class Game extends React.Component {
    render() {
        return (
            <div>
                <TicTacToe/>
            </div>
        )
    }
}

render(<Game />, document.getElementById('app'));