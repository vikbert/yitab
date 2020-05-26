import React, {useState} from 'react';
import useEscapeCallback from '../../hooks/useEscapeCallback';
import ChromeApiHelper from '../../utils/ChromeApiHelper';
import './search.less';

export default function Search({
    placeholder = 'Search in Bookmark and web',
    changeCallback = (text: string) => null,
    submitCallback = (text: string) => null,
}) {
    const [searchText, setSearchText] = useState('');
    useEscapeCallback(() => {
        setSearchText('');
        ChromeApiHelper.reloadCurrentTab();
    });

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
            <span className="icon-search1"/>
        </div>
    );
}
