import TabType from '../models/TabType';

type FilteredResult = {
    yiTabId: number;
    tabsToClose: Array<TabType>;
    tabsToSave: Array<TabType>;
}

export const filterTabs = (tabs): FilteredResult => {
    const tabsToClose = [];
    let yiTabId = 0;

    tabs.forEach((item) => {
        if (item.url.includes('yitab.html') && !yiTabId) {
            yiTabId = item.id;
        } else {
            tabsToClose.push({
                id: item.id,
                favIconUrl: item.favIconUrl,
                title: item.title,
                url: item.url,
                status: item.status,
                pinned: item.pinned,
            });
        }
    });

    const tabsToSave = tabsToClose.filter((tab: TabType) => {
        return !tab.url.includes('chrome-extension') &&
            !tab.url.includes('brave://') &&
            !tab.url.includes('chrome://');
    });

    return {yiTabId, tabsToClose, tabsToSave};
};

export const openTabs = (tabs: Array<TabType>): void => {
    tabs.forEach((tab: TabType) => {
        chrome.tabs.create({url: tab.url});
    });
};

export const reloadCurrentTab = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
};
