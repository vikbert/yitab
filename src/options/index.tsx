import * as React from 'react';
import * as ReactDOM from 'react-dom';
import YiTab from './YiTab';

// switch favicon based on the activity of current Tab
// if Tab is active, use dark logo
// if Tab is inactive, use light logo
document.addEventListener('DOMContentLoaded', () => {
  window.onblur = function () {
    document.getElementById('favicon').setAttribute('href', 'logo-fav.png');
  };

  window.onfocus = function () {
    document.getElementById('favicon').setAttribute('href', 'logo.png');
  };
});

// render YiTab component in current active Tab
chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
  ReactDOM.render(<YiTab />, document.getElementById('app-container'));
});
