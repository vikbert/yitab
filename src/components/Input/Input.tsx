import React, {useState, useEffect} from 'react';
import './input.less';

const Input = ({initValue, placeHolder, updateCallback}) => {
    const [inputValue, setInputValue] = useState(initValue || '');

    const handleSubmit = (event) => {
        if (event.key === 'Enter') {
            updateCallback(inputValue);
        }
    };

    useEffect(() => {
        setInputValue(initValue);
    }, [initValue]);

    return initValue && (
        <>
            <input
                className={'transparent-input'}
                type="text"
                value={inputValue}
                placeholder={placeHolder}
                onChange={(event) => setInputValue(event.target.value)}
                onBlur={() => updateCallback(inputValue.trim())}
                onKeyPress={handleSubmit}
            />
        </>
    );
};

export default Input;
