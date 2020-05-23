import {useState} from 'react';

interface ShowSuccess {
    (seconds: number): void;
}

interface ShowLoading {
    (): void;
}
interface HideLoading {
    (): void;
}

const useToast = (): { toastState: { success: boolean; loading: boolean }; showSuccess: ShowSuccess; showLoading: ShowLoading; hideLoading: HideLoading } => {
    const [toastState, setToastState] = useState({
        success: false,
        loading: false,
    });

    const showSuccess = (seconds: number): void => {
        setToastState({
            ...toastState,
            success: true,
            loading: false,
        });
        window.setTimeout(() => {
            setToastState({
                ...toastState,
                success: false,
            });
        }, seconds * 1000);
    };

    const showLoading = (): void => {
        setToastState({
            ...toastState,
            loading: true,
        });
    };

    const hideLoading = (): void => {
        setToastState({
            ...toastState,
            loading: false,
        });
    };

    return {toastState, showSuccess, showLoading, hideLoading};
};

export default useToast;
