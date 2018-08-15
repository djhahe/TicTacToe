import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <link rel="icon" href={this.props.gameInfo.favicon} />
                <title>
                    {this.props.gameInfo.name}
                </title>
                <div className="name">
                    {this.props.gameInfo.name}
                </div>
                <div className="rule">{this.props.rule}</div>
            </div>
        );
    }
}

export default Header