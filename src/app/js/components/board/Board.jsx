import React from 'react';
import Cell from 'Cell';

class Board extends React.Component {

    renderCell(i) {
        return <Cell key={i} value={this.props.cells[i]} onClick={() => this.props.onClick(i)} />
    }

    createBoard() {
        const boardSize = this.props.boardSize;
        var rows = Array(boardSize.rows).fill(null);
        var cols = Array(boardSize.cols).fill(null);

        return rows.map((row, i) => {
            const cells = cols.map((col, j) => {
                const cellKey = i * boardSize.cols + j;
                return this.renderCell(cellKey);
            });
            return <div className="row" key={i}>{cells}</div>
        });
    }

    render() {
        return (
            <div className="board">
                {this.createBoard()}
            </div>
        );
    }
}

export default Board