import {useEffect} from 'react';

const useEscapeCallback = (callback) => {
    useEffect(() => {
        document.onkeydown = function(event) {
            let isEscape = false;

            if ('key' in event) {
                isEscape = (event.key === 'Escape' || event.key === 'Esc');
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                isEscape = (event.keyCode === 27);
            }

            if (isEscape) {
                console.log('isEscape', isEscape);
                callback();
            }
        };
    }, []);
};

export default useEscapeCallback;
