import {useState} from 'react';

interface ShowWarn {
    (text: string): void;
}

interface ShowSuccess {
    (text: string): void;
}

const useToptips = ():
    {
        tipState: {
            success: boolean;
            warn: boolean;
        };
        tipMessage: {
            warn: string;
            success: string;
        };
        showWarnTip: ShowWarn;
        showSuccessTip: ShowSuccess;
    } => {
    const [message, setMessage] = useState({
        success: '',
        warn: '',
    });
    const [state, setState] = useState({
        success: false,
        warn: false,
    });

    const showTipByType = (text: string, type: string) => {
        setMessage({
            ...message,
            [type]: text,
        });
        setState({
            ...state,
            [type]: true,
        });

        const milliseconds = type === 'success' ? 1000 : 2000;
        // eslint-disable-next-line no-undef
        setTimeout(() => {
            setState({
                ...state,
                [type]: false,
            });
        }, milliseconds);
    };

    const showWarn = (text: string): void => {
        showTipByType(text, 'warn');
    };

    const showSuccess = (text: string) => {
        showTipByType(text, 'success');
    };

    return {
        tipState: state,
        tipMessage: message,
        showWarnTip: showWarn,
        showSuccessTip: showSuccess,
    };
};

export default useToptips;
