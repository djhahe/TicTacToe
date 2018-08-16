import React from 'react';

const History = ({ history, handleStepClick }) => {

    const HistoryLine = ({move,desc}) => <div href="#" className="history-line" onClick={() => handleStepClick(move)} >{desc}</div>

    const renderHistory = () => {
        return history.map((step, move) => {
            const desc = move ? 'Go to move #' + move :
                'Go to game start';
            return (
                <HistoryLine key={move}  move={move} desc={desc} />
            );
        })
    }

    return (
        <div className="history-content">
            <div>History</div>
            <div className="history">
                {renderHistory()}
            </div>
        </div>
    );
}

export default History