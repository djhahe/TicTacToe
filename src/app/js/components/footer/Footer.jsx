import React from 'react';
import GameStatus from '../result/GameStatus.jsx';
import Result from '../result/Result.jsx';
import PlayAgainButton from '../tictactoe/PlayAgainButton.jsx';

const Footer = ({ status, result, hasWinner, handleCloseNotification, winnerNotification, handlePlayAgainClick }) => {
    return (
        <div className="footer">
            <GameStatus hasWinner={hasWinner} status={status} handleCloseNotification={handleCloseNotification} winnerNotification={winnerNotification} />
            <Result result={result} />
            <PlayAgainButton handlePlayAgainClick={handlePlayAgainClick} />
        </div>
    )
}

export default Footer