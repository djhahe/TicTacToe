import React from 'react';
import GameInfo from '../header/GameInfo.jsx';
import Board from '../board/Board.jsx';
import Setting from './Setting.jsx';
import History from './History.jsx';
import GameStatus from '../result/GameStatus.jsx';
import Result from '../result/Result.jsx';
import TicTacToeUtility from '../../utility/tictactoe/TicTacToeUtility.jsx'
import '../../../style/tictactoe.scss';


class TicTacToe extends React.Component {

    constructor() {
        super();
        this.tictactoeUtility = new TicTacToeUtility();
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
        var winner = this.tictactoeUtility.checkWinner(newCells, stepCount, i, this.state.gameSetting);

        if (!winner) {
            this.setState({
                isXNext: !this.state.isXNext,
                history: [...history, { cells: newCells }],
                stepCount: stepCount
            });
        } else {
            this.setState({
                result: this.tictactoeUtility.calculateResult(winner, this.state.result),
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

    renderRule() {
        return (
            <p> Get <span className="number-to-win">{this.state.gameSetting.rules.numberToWin}</span> in a row to win!</p>
        )
    }

    render() {
        return (
            <div className="main">
                <GameInfo gameInfo={this.gameInfo} handleSettingClick={this.handleSettingClick} rule={this.renderRule()} />
                <Setting gameInfo={this.gameInfo} gameSetting={this.state.gameSetting}
                    handleSettingClick={this.handleSettingClick}
                    handleSaveSettingClick={this.handleSaveSettingClick}
                    handleCloseSetting={this.handleCloseSetting} />
                <Board cells={this.state.history[this.state.stepCount].cells} boardSize={this.state.gameSetting.boardSize} onClick={this.handleCellClick} />
                <History handleStepClick={this.handleStepClick} history={this.state.history} hasWinner={this.state.hasWinner} />

                <div className="footer">
                    <GameStatus hasWinner={this.state.hasWinner} status={this.tictactoeUtility.renderStatus(this.state.hasWinner, this.state.isXNext)}
                        handleCloseNotification={this.handleCloseNotification} winnerNotification={this.state.winnerNotification} />
                    <Result result={this.state.result} />
                    <p className="btn playagain" onClick={this.handlePlayAgainClick}>Play Again</p>
                </div>
            </div>
        )
    }
}

export default TicTacToe;
