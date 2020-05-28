import TabType from '../models/TabType';

type FilteredResult = {
    yiTabId: number;
    tabsToClose: Array<TabType>;
    tabsToSave: Array<TabType>;
}

export const filterTabs = (tabs): FilteredResult => {
    const tabsToClose = [];
    let tabsToSave = [];
    let yiTabId = 0;

    if (tabs.length === 0) {
        return {yiTabId, tabsToClose, tabsToSave};
    }

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

    tabsToSave = tabsToClose.filter((tab: TabType) => {
        return !tab.url.includes('chrome-extension') &&
            !tab.url.includes('brave://') &&
            !tab.url.includes('chrome://');
    });

    return {yiTabId, tabsToClose, tabsToSave};
};
