import React from 'react';

class History extends React.Component {

    renderHistory() {
        return this.props.history.map((step, move) => {
            const desc = move ? 'Go to move #' + move :
                'Go to game start';
            return (
                <div key={move} className="history-line">
                    <a href="#" onClick={() => this.props.handleStepClick(move)} >{desc}</a>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="history-content">
                <div>History</div>
                <div className="history">
                    {this.renderHistory()}
                </div>
            </div>
        );
    }
}

export default History