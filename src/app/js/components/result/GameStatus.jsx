import React from 'react';
import Modal from '../common/Modal.jsx';

const GameStatus = ({ status, hasWinner, handleCloseNotification, winnerNotification }) => {
    const renderModalContent = () => {
        return (
            <div className="game-status">
                <p className="status">{status}</p>
            </div>
        )
    }

    return (
        <div>
            <p className={hasWinner ? "status-end" : "status"}>{status}</p>
            <Modal modalContent={renderModalContent()}
                handleCloseModal={handleCloseNotification}
                isOpen={winnerNotification} />
        </div>
    )
}

export default GameStatus