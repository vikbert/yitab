import TabType from './models/TabType';
import {loadAppManager, saveAppManager} from './storage/tabStore';
import {filterTabs} from './utils/chromeTabsHelper';

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
        chrome.runtime.openOptionsPage();

        const {yiTabId, tabsToClose, tabsToSave} = filterTabs(tabs);
        chrome.tabs.remove(tabsToClose.map((item: TabType) => item.id));
        chrome.tabs.reload(yiTabId);

        if (tabsToSave.length > 0) {
            const appManager = loadAppManager();
            appManager.insertTabSet({
                createdAt: (new Date()).getTime(),
                isStarred: false,
                isLocked: false,
                tabs: tabsToSave,
            });
            saveAppManager(appManager);
        }
    });
});
