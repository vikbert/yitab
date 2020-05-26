import React from 'react';
import {Icon} from 'react-weui';

const Confirm = ({visible, hide, message, confirmCallback = () => null}) => {
    const handleConfirm = () => {
        confirmCallback();
        hide();
    };
    
    return visible && (
        <div className={'confirm-wrapper'}>
            <div className="confirm">
                <div className="body">
                    <Icon value="info"/>
                    <span>{message}</span>
                </div>
                <div className="control">
                    <div className="item cancel" onClick={hide}>Cancel</div>
                    <div className="item ok" onClick={handleConfirm}>Ok</div>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
