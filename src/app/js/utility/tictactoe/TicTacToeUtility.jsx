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
        let rowStreak = [posistion];

        for (let i = posistion; i > rowBoundary.first; i--) {
            let prePos = i - 1;
            if (cells[i] == cells[prePos]) {
                rowStreak.push(prePos);
            } else {
                break;
            }
        }

        for (let i = posistion; i < rowBoundary.last; i++) {
            let nextPos = i + 1;
            if (cells[i] == cells[nextPos]) {
                rowStreak.push(nextPos);
            } else {
                break;
            }
        }

        if (rowStreak.length >= gameSetting.rules.numberToWin) {
            return rowStreak;
        }

        return null;
    }

    checkWinnerByColumn(cells, posistion, gameSetting) {
        let colStreak = [posistion];

        for (let i = posistion; i >= 0; i -= gameSetting.boardSize.cols) {
            let prePos = i - gameSetting.boardSize.cols;
            if (cells[i] == cells[prePos]) {
                colStreak.push(prePos);
            } else {
                break;
            }
        }

        for (let i = posistion; i <= cells.length; i += gameSetting.boardSize.cols) {
            let nextPost = i + gameSetting.boardSize.cols;
            if (cells[i] == cells[nextPost]) {
                colStreak.push(nextPost);
            } else {
                break;
            }
        }

        if (colStreak.length >= gameSetting.rules.numberToWin) {
            return colStreak;
        }

        return null;
    }

    checkWinnerByRightDiagonal(cells, posistion, gameSetting) {
        let rightDiagonalStreak = [posistion];
        let offset = gameSetting.boardSize.cols - 1;
        for (let i = posistion; i >= 0; i -= offset) {
            let preDiagonalPos = i - offset;
            let rowBoundary = this.calculateRowBoundary(cells, i, gameSetting);
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
            let rowBoundary = this.calculateRowBoundary(cells, i, gameSetting);
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
        let leftDiagonalStreak = [posistion];
        let offset = gameSetting.boardSize.cols + 1;
        for (var i = posistion; i >= 0; i -= offset) {
            let prePos = i - offset;
            if (cells[i] == cells[prePos]) {
                leftDiagonalStreak.push(prePos);
            } else {
                break;
            }
        }

        for (var i = posistion; i <= cells.length; i += (gameSetting.boardSize.cols + 1)) {
            let nextPos = i + offset;
            if (cells[i] == cells[nextPos]) {
                leftDiagonalStreak.push(nextPos);
            } else {
                break;
            }
        }

        if (leftDiagonalStreak.length >= gameSetting.rules.numberToWin) {
            return leftDiagonalStreak;
        }

        return null;
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