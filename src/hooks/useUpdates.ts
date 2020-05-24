import {useState} from 'react';

const useUpdates = () => {
    const [updates, setUpdates] = useState(0);
    const refreshUpdates = () => setUpdates(updates + 1);

    return {
        updates,
        refreshUpdates,
    };
};

export default useUpdates;
