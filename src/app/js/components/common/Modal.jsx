import React from 'react';

class Modal extends React.Component {

    renderSubmitButton() {
        if (this.props.handleSubmit) {
            return (
                <button type="submit" className="btn" onClick={this.props.handleSubmit}>Save</button>
            )
        }
    }

    render() {
        return (
            <div className={this.props.isOpen ? "modal" : "hidden"}>
                <div className="modal-content">
                    <span className="close" onClick={this.props.handleCloseModal} >&times;</span>
                    {this.props.modalContent}
                </div>
            </div>
        );
    }
}

export default Modal