import React from 'react';

const Header = ({ gameInfo, rule }) => {
    return (
        <div className="header">
            <title>
                {gameInfo.name}
            </title>
            <div className="name">
                {gameInfo.name}
            </div>
            <div className="rule">{rule}</div>
        </div>
    )
}

export default Header