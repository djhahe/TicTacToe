import React from 'react';

class Cell extends React.Component {
    render() {
        return (
            <div className={"cell " + this.props.value} onClick={this.props.onClick}>
            </div>
        );
    }
}

export default Cell