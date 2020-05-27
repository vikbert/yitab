import * as React from 'react';
import * as ReactDOM from 'react-dom';
import YiTab from './YiTab';

document.addEventListener('DOMContentLoaded', () => {
    window.onblur = function() {
        document.getElementById('favicon').setAttribute('href', 'logo-fav.png');
    };

    window.onfocus = function() {
        document.getElementById('favicon').setAttribute('href', 'logo.png');
    };
});

chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
    ReactDOM.render(<YiTab/>, document.getElementById('app-container'));
});
