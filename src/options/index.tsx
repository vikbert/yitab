import * as React from 'react';
import * as ReactDOM from 'react-dom';
import YiTab from './YiTab';

chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
    ReactDOM.render(<YiTab/>, document.getElementById('app-container'));
});
