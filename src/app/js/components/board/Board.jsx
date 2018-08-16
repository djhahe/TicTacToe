import React from 'react';
import Cell from 'Cell';

const Board = ({ boardSize, cells, onClick }) => {
    const renderCell = (i) => <Cell key={i} cell={cells[i]} onClick={() => onClick(i)} />

    const renderBoard = () => {
        var rows = Array(boardSize.rows).fill(null);
        var cols = Array(boardSize.cols).fill(null);

        return rows.map((row, i) => {
            const boardCells = cols.map((col, j) => {
                const cellKey = i * boardSize.cols + j;
                return renderCell(cellKey);
            });
            return <div className="row" key={i}>{boardCells}</div>
        });
    }

    return (
        <div className="board">
            {renderBoard()}
        </div>
    );
}

export default Board