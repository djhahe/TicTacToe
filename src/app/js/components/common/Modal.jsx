import React from 'react';

const Modal = ({ isOpen, handleCloseModal, formId, modalContent }) => {

    const renderSubmitButton = () => formId ? <button type="submit" form={formId} className="btn" >Save</button> : null;
    return (
        <div className={isOpen ? "modal" : "hidden"}>
            <div className="modal-content">
                <span className="close" onClick={handleCloseModal} >&times;</span>
                {modalContent}
                <div className="modal-button">
                    {renderSubmitButton()}
                    <button className="btn" onClick={handleCloseModal}>Close</button>
                </div>
            </div>
        </div>
    );
}


export default Modal