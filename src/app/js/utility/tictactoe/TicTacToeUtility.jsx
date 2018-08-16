class TicTacToeUtility {

    calculateRowBoundary(cells, posistion, gameSetting) {
        for (var i = (gameSetting.boardSize.cols - 1); i < cells.length; i = i + gameSetting.boardSize.cols) {
            if (posistion <= i) {
                return { first: i - (gameSetting.boardSize.cols - 1), last: i };
            }
        }
        return { first: 0, last: gameSetting.boardSize.cols };
    }

    checkWinnerByRow(cells, posistion, gameSetting) {
        let rowBoundary = this.calculateRowBoundary(cells, posistion, gameSetting);
        let rowStreak = 1;

        for (let i = posistion; i > rowBoundary.first; i--) {
            if (cells[i] == cells[i - 1]) {
                ++rowStreak;
            } else {
                break;
            }
        }

        for (let i = posistion; i < rowBoundary.last; i++) {
            if (cells[i] == cells[i + 1]) {
                ++rowStreak;
            } else {
                break;
            }
        }

        if (rowStreak >= gameSetting.rules.numberToWin) {
            return cells[posistion];
        }

        return null;
    }

    checkWinnerByColumn(cells, posistion, gameSetting) {
        let colStreak = 1;
        for (let i = posistion; i >= 0; i -= gameSetting.boardSize.cols) {
            if (cells[i] == cells[i - gameSetting.boardSize.cols]) {
                ++colStreak;
            } else {
                break;
            }
        }

        for (let i = posistion; i <= cells.length; i += gameSetting.boardSize.cols) {
            if (cells[i] == cells[i + gameSetting.boardSize.cols]) {
                ++colStreak;
            } else {
                break;
            }
        }

        if (colStreak >= gameSetting.rules.numberToWin) {
            return cells[posistion];
        }

        return null;
    }

    checkWinnerByRightDiagonal(cells, posistion, gameSetting) {
        let rightDiagonalStreak = 1;
        for (let i = posistion; i >= 0; i -= (gameSetting.boardSize.cols - 1)) {
            let preDiagonalPos = i - (gameSetting.boardSize.cols - 1);
            let rowBoundary = this.calculateRowBoundary(cells, i, gameSetting);
            if (cells[i] == cells[preDiagonalPos]
                && ((i != rowBoundary.last && preDiagonalPos != rowBoundary.first)
                )) {
                ++rightDiagonalStreak;
            } else {
                break;
            }
        }

        for (let i = posistion; i <= cells.length; i += (gameSetting.boardSize.cols - 1)) {
            let nextDiagonalPos = i + (gameSetting.boardSize.cols - 1);
            let rowBoundary = this.calculateRowBoundary(cells, i, gameSetting);
            if (cells[i] == cells[i + (gameSetting.boardSize.cols - 1)]
                && ((i != rowBoundary.first && nextDiagonalPos != rowBoundary.last)
                )) {
                ++rightDiagonalStreak;
            } else {
                break;
            }
        }

        if (rightDiagonalStreak >= gameSetting.rules.numberToWin) {
            return cells[posistion];
        }
    }

    checkWinnerByLeftDiagonal(cells, posistion, gameSetting) {
        var leftDiagonalStreak = 1;
        for (var i = posistion; i >= 0; i -= (gameSetting.boardSize.cols + 1)) {
            if (cells[i] == cells[i - (gameSetting.boardSize.cols + 1)]) {
                ++leftDiagonalStreak;
            } else {
                break;
            }
        }

        for (var i = posistion; i <= cells.length; i += (gameSetting.boardSize.cols + 1)) {
            if (cells[i] == cells[i + (gameSetting.boardSize.cols + 1)]) {
                ++leftDiagonalStreak;
            } else {
                break;
            }
        }

        if (leftDiagonalStreak >= gameSetting.rules.numberToWin) {
            return cells[posistion];
        }
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
        switch (winner) {
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
            status = winner != 'Tie' ? 'Winner: ' + winner : winner;
        } else {
            status = 'Next player: ' + (isXNext ? 'X' : 'O');
        }
        return status;
    }
}

export default TicTacToeUtility