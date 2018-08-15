import React from 'react';
import Modal from 'Modal';

class Result extends React.Component {

    renderResultHeader() {
        return Object.keys(this.props.result).map((header) => {
            return <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
        })
    }

    renderResult() {
        var result = this.props.result;
        return Object.keys(result).map((header) => {
            return <td key={header}>{result[header]}</td>
        })
    }

    createModalContent() {
        return (
            <div className="game-status">
                <p className="status">{this.props.status}</p>
            </div>
        )
    }
    render() {
        return (
            <div className="footer">
                <p className={this.props.hasWinner ? "status-end" : "status"}>{this.props.status}</p>
                <div className="result">
                    <table className="tblResult">
                        <tbody>
                            <tr>
                                {this.renderResultHeader()}
                            </tr>
                            <tr>
                                {this.renderResult()}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className={this.props.hasWinner ? "btn playagain" : "hidden"} onClick={this.props.handlePlayAgainClick}>Play Again</p>
                <Modal modalContent={this.createModalContent()}
                    handleCloseModal={this.props.handleCloseNotification}
                    isOpen={this.props.winnerNotification} />

            </div>
        );
    }
}

export default Result