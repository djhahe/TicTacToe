import React from 'react';
import Modal from 'Modal';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 0,
            cols: 0,
            numberToWin: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameSetting.boardSize.rows !== this.props.rows) {
            this.setState({ rows: nextProps.gameSetting.boardSize.rows })
        }

        if (nextProps.gameSetting.boardSize.cols !== this.props.cols) {
            this.setState({ cols: nextProps.gameSetting.boardSize.cols })
        }

        if (nextProps.gameSetting.rules.numberToWin !== this.props.numberToWin) {
            this.setState({ numberToWin: nextProps.gameSetting.rules.numberToWin })
        }
    }


    handleSaveSettingClick = (e) => {
        e.preventDefault();
        this.props.handleSaveSettingClick(this.getSetting());
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: Number(value)
        })
    }

    getSetting() {
        var newSetting = { ...this.props.gameSetting };
        newSetting.boardSize.rows = this.state.rows;
        newSetting.boardSize.cols = this.state.cols;
        newSetting.rules.numberToWin = this.state.numberToWin;
        newSetting.openStatus = false;
        return newSetting;
    }
    calculateMunberToWinBoundary() {
        return {
            min: Math.min(this.props.gameInfo.boardSizeLimit.minRows, this.props.gameInfo.boardSizeLimit.minCols),
            max: Math.max(this.state.rows, this.state.cols),
        }
    }

    renderSettingContent() {
        let numberToWinBoundary = this.calculateMunberToWinBoundary();
        return (
            <form onSubmit={this.handleSaveSettingClick} id="settingForm">
                <div className="setting-content">
                    <div className="setting-label">
                        <div>Rows:</div>
                        <div>Cols:</div>
                        <div>Number to Win:</div>
                    </div>
                    <div className="setting-input">
                        <input type="number" name='rows' min={this.props.gameInfo.boardSizeLimit.minRows} max={this.props.gameInfo.boardSizeLimit.maxRows}
                            placeholder={this.props.gameInfo.boardSizeLimit.minRows + " - " + this.props.gameInfo.boardSizeLimit.maxRows}
                            value={this.state.rows}
                            onChange={this.handleUserInput}
                            required />
                        <input type="number" name='cols' min={this.props.gameInfo.boardSizeLimit.minCols} max={this.props.gameInfo.boardSizeLimit.maxCols}
                            placeholder={this.props.gameInfo.boardSizeLimit.minCols + " - " + this.props.gameInfo.boardSizeLimit.maxCols}
                            value={this.state.cols}
                            onChange={this.handleUserInput}
                            required />
                        <input type="number" name='numberToWin' min={numberToWinBoundary.min} max={numberToWinBoundary.max}
                            placeholder={numberToWinBoundary.min + " - " + numberToWinBoundary.max}
                            value={this.state.numberToWin}
                            onChange={this.handleUserInput}
                            required />
                    </div>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div>
                <div onClick={this.props.handleSettingClick}>
                    <span className="setting">Setting</span>
                </div>
                <Modal isOpen={this.props.gameSetting.openStatus}
                    modalContent={this.renderSettingContent()}
                    handleCloseModal={this.props.handleCloseSetting}
                    formId="settingForm" />
            </div>
        );
    }
}

export default Setting