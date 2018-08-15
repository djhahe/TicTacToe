import React from 'react';
import Header from 'Header';
import Board from 'Board';
import Result from 'Result';
import Setting from 'Setting';
import History from 'History';
import 'TicTacToeStyle';
import TicTacToeFavicon from 'TicTacToeFavicon';

class TicTacToe extends React.Component {

    constructor() {
        super();
        this.gameInfo = {
            name: 'Tic Tac Toe',
            favicon: TicTacToeFavicon,
            boardSizeLimit: {
                minRows: 3,
                maxRows: 15,
                minCols: 3,
                maxCols: 15,
            }
        }
        this.state = {
            gameSetting: {
                openStatus: false,
                boardSize: {
                    rows: 3,
                    cols: 3
                },
                rules: {
                    numberToWin: 3
                }
            },
            history: [{
                cells: Array(9).fill(null)
            }],
            cells: Array(9).fill(null),
            isXNext: true,
            stepCount: 0,
            hasWinner: null,
            winnerNotification: false,
            result: {
                x: 0,
                tie: 0,
                o: 0
            }
        };
    }

    //=====================================================================================================================
    // React life cycle functions
    //=====================================================================================================================
    componentWillMount() {
        this.setState({
            history: [{
                cells: Array(this.state.gameSetting.boardSize.rows * this.state.gameSetting.boardSize.cols)
            }]
        })
    }

    //=====================================================================================================================
    // Action handlers
    //=====================================================================================================================
    handleCellClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepCount + 1);
        const current = history[history.length - 1];

        var newCells = [...(current.cells)];
        if (newCells[i] || this.state.hasWinner) {
            return;
        }

        var stepCount = ++this.state.stepCount;
        newCells[i] = this.state.isXNext ? 'X' : 'O';
        var winner = this.checkWinner(newCells, stepCount, i);

        if (!winner) {
            this.setState({
                isXNext: !this.state.isXNext,
                history: [...history, { cells: newCells }],
                stepCount: stepCount
            });
        } else {
            this.setState({
                result: this.calculateResult(winner),
                hasWinner: winner,
                winnerNotification: true,
                history: [...history, { cells: newCells }]
            })
        }
    }

    handlePlayAgainClick = () => {
        this.newGame();
    }

    handleSaveSettingClick = (gameSetting) => {
        this.updateSetting(gameSetting);
        this.newGame();
    }

    handleSettingClick = () => {
        let gameSetting = { ...this.state.gameSetting };
        gameSetting.openStatus = true;
        this.setState({
            gameSetting: gameSetting,
        })
    }

    handleCloseSetting = () => {
        let newSetting = { ...this.state.gameSetting };
        newSetting.openStatus = false;
        this.updateSetting(newSetting);
    }

    handleStepClick = (i) => {
        this.setState({
            stepCount: i,
            isXNext: (i % 2) === 0,
        });
    }

    handleCloseNotification = () => {
        this.setState({
            winnerNotification: false
        })
    }

    //=====================================================================================================================
    // Custom functions
    //=====================================================================================================================
    updateSetting(gameSetting) {
        this.setState({ gameSetting });
    }

    newGame() {
        this.setState({
            history: [{
                cells: Array(this.state.gameSetting.boardSize.cols * this.state.gameSetting.boardSize.rows).fill(null),
            }],
            isXNext: true,
            stepCount: 0,
            hasWinner: null
        });
    }

    calculateResult(winner) {
        var result = { ...this.state.result };
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

    checkWinner(cells, stepCount, posistion) {

        let winner = this.checkWinnerByRow(cells, posistion);
        winner = winner ? winner : this.checkWinnerByColumn(cells, posistion);
        winner = winner ? winner : this.checkWinnerByRightDiagonal(cells, posistion);
        winner = winner ? winner : this.checkWinnerByLeftDiagonal(cells, posistion);

        if (!winner && stepCount == cells.length) {
            winner = "Tie";
        }

        return winner;
    }

    checkWinnerByRow(cells, posistion) {
        let rowBoundary = this.calculateRowBoundary(posistion);
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

        if (rowStreak >= this.state.gameSetting.rules.numberToWin) {
            return cells[posistion];
        }

        return null;
    }

    checkWinnerByColumn(cells, posistion) {
        let colStreak = 1;
        for (let i = posistion; i >= 0; i -= this.state.gameSetting.boardSize.cols) {
            if (cells[i] == cells[i - this.state.gameSetting.boardSize.cols]) {
                ++colStreak;
            } else {
                break;
            }
        }

        for (let i = posistion; i <= cells.length; i += this.state.gameSetting.boardSize.cols) {
            if (cells[i] == cells[i + this.state.gameSetting.boardSize.cols]) {
                ++colStreak;
            } else {
                break;
            }
        }

        if (colStreak >= this.state.gameSetting.rules.numberToWin) {
            return cells[posistion];
        }

        return null;
    }

    checkWinnerByRightDiagonal(cells, posistion) {
        let rightDiagonalStreak = 1;
        for (let i = posistion; i >= 0; i -= (this.state.gameSetting.boardSize.cols - 1)) {
            let preDiagonalPos = i - (this.state.gameSetting.boardSize.cols - 1);
            let rowBoundary = this.calculateRowBoundary(i);
            if (cells[i] == cells[preDiagonalPos]
                && ((i != rowBoundary.last && preDiagonalPos != rowBoundary.first)
                )) {
                ++rightDiagonalStreak;
            } else {
                break;
            }
        }

        for (let i = posistion; i <= cells.length; i += (this.state.gameSetting.boardSize.cols - 1)) {
            let nextDiagonalPos = i + (this.state.gameSetting.boardSize.cols - 1);
            let rowBoundary = this.calculateRowBoundary(i);
            if (cells[i] == cells[i + (this.state.gameSetting.boardSize.cols - 1)]
                && ((i != rowBoundary.first && nextDiagonalPos != rowBoundary.last)
                )) {
                ++rightDiagonalStreak;
            } else {
                break;
            }
        }

        if (rightDiagonalStreak >= this.state.gameSetting.rules.numberToWin) {
            return cells[posistion];
        }
    }

    checkWinnerByLeftDiagonal(cells, posistion) {
        var leftDiagonalStreak = 1;
        for (var i = posistion; i >= 0; i -= (this.state.gameSetting.boardSize.cols + 1)) {
            if (cells[i] == cells[i - (this.state.gameSetting.boardSize.cols + 1)]) {
                ++leftDiagonalStreak;
            } else {
                break;
            }
        }

        for (var i = posistion; i <= cells.length; i += (this.state.gameSetting.boardSize.cols + 1)) {
            if (cells[i] == cells[i + (this.state.gameSetting.boardSize.cols + 1)]) {
                ++leftDiagonalStreak;
            } else {
                break;
            }
        }

        if (leftDiagonalStreak >= this.state.gameSetting.rules.numberToWin) {
            return cells[posistion];
        }
    }

    calculateRowBoundary(posistion) {
        for (var i = (this.state.gameSetting.boardSize.cols - 1); i < this.state.cells.length; i = i + this.state.gameSetting.boardSize.cols) {
            if (posistion <= i) {
                return { first: i - (this.state.gameSetting.boardSize.cols - 1), last: i };
            }
        }
        return { first: 0, last: this.state.gameSetting.boardSize.cols };
    }

    renderStatus() {
        const winner = this.state.hasWinner;
        let status;
        if (winner) {
            status = winner != 'Tie' ? 'Winner: ' + winner : winner;
        } else {
            status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        }
        return status;
    }

    renderRule(){
        return(
             <p> Get <span className="number-to-win">{this.state.gameSetting.rules.numberToWin}</span> in a row to win!</p>
        )
    }

    render() {
        return (
            <div className="main">
                
                <Header gameInfo={this.gameInfo} handleSettingClick={this.handleSettingClick} rule={this.renderRule()} />
                <Setting gameInfo={this.gameInfo} gameSetting={this.state.gameSetting} 
                    handleSettingClick={this.handleSettingClick}
                    handleSaveSettingClick={this.handleSaveSettingClick} 
                    handleCloseSetting={this.handleCloseSetting} />
                <Board cells={this.state.history[this.state.stepCount].cells} boardSize={this.state.gameSetting.boardSize} onClick={this.handleCellClick} />
                <History handleStepClick={this.handleStepClick} history={this.state.history} />
                <Result result={this.state.result} status={this.renderStatus()}
                    winnerNotification={this.state.winnerNotification}
                    hasWinner={this.state.hasWinner}
                    handleCloseNotification={this.handleCloseNotification}
                    handlePlayAgainClick={this.handlePlayAgainClick} />
            </div>
        )
    }
}

export default TicTacToe;
