import {useState} from 'react';

const useVisibility = (initValue?: boolean) => {
    const [visible, setVisible] = useState(initValue || false);

    return {
        visible,
        show: () => setVisible(true),
        hide: () => setVisible(false),
    };
};

export default useVisibility;
