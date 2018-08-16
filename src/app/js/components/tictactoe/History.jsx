import React from 'react';

const History = ({ history, handleStepClick, hasWinner }) => {

    const HistoryLine = ({ move, desc }) => <div href="#" className="history-line" onClick={() => handleStepClick(move)} >{desc}</div>

    const renderHistory = () => {
        return history.map((step, move) => {
            const desc = 'Go to move #' + move;
            if (move) {
                return (
                    <HistoryLine key={move} move={move} desc={desc} />
                );
            }
        })
    }

    return (
        <div className={hasWinner ? "history-content" : "hidden"} >
            <div>History</div>
            <div className="history">
                {renderHistory()}
            </div>
        </div >
    );
}

export default History