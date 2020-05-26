import React, {useState} from 'react';
import './search.less';

export default function Search({
    placeholder = 'Search in Bookmark and web',
    changeCallback = (text: string) => null,
    submitCallback = (text: string) => null,
}) {
    const [searchText, setSearchText] = useState('');

    const handleChangeSearch = (event) => {
        const searchString = event.target.value.toLowerCase();
        setSearchText(searchString);

        changeCallback(searchString);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            submitCallback(searchText);
        }
    };

    return (
        <div className="input-wrapper">
            <input
                type="text"
                placeholder={placeholder}
                className={'search'}
                value={searchText}
                onChange={handleChangeSearch}
                onKeyPress={handleKeyPress}
            />
            <span className="icon-search1" />
        </div>
    );
}
