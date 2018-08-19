class TicTacToeUtility {

    calculateRowBoundary( posistion, gameSetting) {

        let first = posistion - (posistion % gameSetting.boardSize.cols);
        let last = first + (gameSetting.boardSize.cols - 1);

        return { first: first, last: last };

    }

    checkWinnerByOffset(cells, posistion, gameSetting, boundary, offset) {
        let cellStreak = [posistion];

        for (let i = posistion; i > boundary.first; i -= offset) {
            let prePos = i - offset;
            if (cells[i] == cells[prePos]) {
                cellStreak.push(prePos);
            } else {
                break;
            }
        }

        for (let i = posistion; i < boundary.last; i += offset) {
            let nextPos = i + offset;
            if (cells[i] == cells[nextPos]) {
                cellStreak.push(nextPos);
            } else {
                break;
            }
        }

        if (cellStreak.length >= gameSetting.rules.numberToWin) {
            return cellStreak;
        }

        return null;
    }

    checkWinnerByRow(cells, posistion, gameSetting) {
        const offset = 1;
        const rowBoundary = this.calculateRowBoundary( posistion, gameSetting);

        return this.checkWinnerByOffset(cells, posistion, gameSetting, rowBoundary, offset);

    }

    checkWinnerByColumn(cells, posistion, gameSetting) {
        const offset = gameSetting.boardSize.cols;
        const boundary = { first: 0, last: cells.length };

        return this.checkWinnerByOffset(cells, posistion, gameSetting, boundary, offset);
    }

    checkWinnerByRightDiagonal(cells, posistion, gameSetting) {
        let rightDiagonalStreak = [posistion];
        let offset = gameSetting.boardSize.cols - 1;
        for (let i = posistion; i >= 0; i -= offset) {
            let preDiagonalPos = i - offset;
            let rowBoundary = this.calculateRowBoundary( i, gameSetting);
            if (cells[i] == cells[preDiagonalPos]
                && ((i != rowBoundary.last && preDiagonalPos != rowBoundary.first)
                )) {
                rightDiagonalStreak.push(preDiagonalPos);
            } else {
                break;
            }
        }

        for (let i = posistion; i <= cells.length; i += offset) {
            let nextDiagonalPos = i + offset;
            let rowBoundary = this.calculateRowBoundary( i, gameSetting);
            if (cells[i] == cells[i + offset]
                && ((i != rowBoundary.first && nextDiagonalPos != rowBoundary.last)
                )) {
                rightDiagonalStreak.push(nextDiagonalPos);
            } else {
                break;
            }
        }

        if (rightDiagonalStreak.length >= gameSetting.rules.numberToWin) {
            return rightDiagonalStreak;
        }

        return null;
    }

    checkWinnerByLeftDiagonal(cells, posistion, gameSetting) {
        const offset = gameSetting.boardSize.cols + 1;
        const boundary = { first: 0, last: cells.length };

        return this.checkWinnerByOffset(cells, posistion, gameSetting, boundary, offset);
    }

    checkWinner(cells, stepCount, posistion, gameSetting) {
        let winner = this.checkWinnerByRow(cells, posistion, gameSetting);
        winner = winner ? winner : this.checkWinnerByColumn(cells, posistion, gameSetting);
        winner = winner ? winner : this.checkWinnerByRightDiagonal(cells, posistion, gameSetting);
        winner = winner ? winner : this.checkWinnerByLeftDiagonal(cells, posistion, gameSetting);

        if (!winner && stepCount == cells.length) {
            winner = "Tie";
        }

        return winner;
    }

    calculateResult(winner, result) {
        var result = { ...result };
        switch (winner[0]) {
            case 'X':
                result.x = ++result.x;
                break;
            case 'O':
                result.o = ++result.o;
                break;
            default:
                result.tie = ++result.tie;
        }

        return result;
    }

    renderStatus(winner, isXNext) {
        let status;
        if (winner) {
            status = winner != 'Tie' ? 'Winner: ' + winner[0] : winner;
        } else {
            status = 'Next player: ' + (isXNext ? 'X' : 'O');
        }
        return status;
    }

    markWinRow(winner, cells) {
        let newCells = [...cells];
        winner.map((cell, i) => {
            newCells[cell] += 'w';
        })

        return newCells;
    }
}

export default TicTacToeUtility