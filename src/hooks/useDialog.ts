import {useState} from 'react';

interface ShowDialog {
    (): void;
}

interface HideDialog {
    (): void;
}

const useDialog = ():
{
    dialogVisible: boolean;
    buttons: Array<object>;
    showDialog: ShowDialog;
    hideDialog: HideDialog;
} => {
    const [visible, setVisible] = useState(false);
    const buttons = [
        {
            label: 'Ok',
            onClick: () => setVisible(false),
        },
    ];

    return {
        dialogVisible: visible,
        buttons: buttons,
        showDialog: () => setVisible(true),
        hideDialog: () => setVisible(false),
    };
};

export default useDialog;
