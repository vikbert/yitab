import React from 'react';

const Dialog = ({visible, hide, footer = null, children}) => {

    return visible && (
        <div className="dialog-wrapper">
            <div className="dialog">
                <div className="header">
                    <div className="icon-close icon-x" onClick={hide}/>
                </div>
                {children}
                {footer && (
                    <div className="control">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dialog;
