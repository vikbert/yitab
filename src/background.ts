import {insertTabs} from './storage/tabStore';
import Tab from './models/Tab';

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request) => {
    // onMessage must return "true" if response is async.
    console.log(request);

    // handle reload event
    if (request.reload) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    }

    return false;
});

chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({currentWindow: true}, (tabs) => {
        // exclude the tabs: chrome-extension, chrome://, brave://
        const filtered = tabs.filter((tab) => {
            return !tab.url.includes('chrome-extension') &&
            !tab.url.includes('brave://') &&
            !tab.url.includes('chrome://');
        });

        // save tabs to local storage
        const tabData = filtered.map((item) => {
            return {
                id: item.id,
                favIconUrl: item.favIconUrl,
                title: item.title,
                url: item.url,
                status: item.status,
                pinned: item.pinned,
            };
        });
        insertTabs(tabData);

        // close all tabs
        chrome.tabs.remove(tabData.map((tab): number => tab.id), () => null);

        // open option page(yiTab), then reload this tab
        chrome.runtime.openOptionsPage(() => null);
        chrome.tabs.getCurrent((tab) => {
            console.log('reload tab', tab);
            chrome.tabs.reload(tab.id);
        });
    });
});
