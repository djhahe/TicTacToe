import React from 'react';

class Modal extends React.Component {

    renderSubmitButton() {
        if (this.props.formId) {
            return (
                <button type="submit" form={this.props.formId} className="btn" >Save</button>
            )
        }
    }

    render() {
        return (
            <div className={this.props.isOpen ? "modal" : "hidden"}>
                <div className="modal-content">
                    <span className="close" onClick={this.props.handleCloseModal} >&times;</span>
                    {this.props.modalContent}
                    <div className="modal-button">
                        {this.renderSubmitButton()}
                        <button  className="btn" onClick={this.props.handleCloseModal}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal