import React from 'react';
import './dialog.less';

interface DialogProps {
    visible: boolean;
    hide: () => void;
    children?: JSX.Element;
    footer?: JSX.Element;
}

const Dialog = ({visible, hide, children, footer = null}: DialogProps) => {
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
