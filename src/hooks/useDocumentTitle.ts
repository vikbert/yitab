import {useEffect} from 'react';

const useWindowTitle = (documentTitle: string) => {
    useEffect(() => {
        document.title = documentTitle;
    }, []);
};

export default useWindowTitle;
