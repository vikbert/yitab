import React, { useState } from 'react';
import './search.less';

export default function Search({
  changeCallback = () => null,
  submitCallback = () => null,
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
    <div className="search-bar">
      <div className="input-wrapper">
        <span className="icon-search1" />
        <input
          type="text"
          placeholder={'Search in Bookmark and web'}
          className={'search'}
          value={searchText}
          onChange={handleChangeSearch}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
