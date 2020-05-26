import TabType from '../models/TabType';

interface ChromeApi {
    openTabs(tabs: Array<TabType>): void;

    reloadCurrentTab(): void;
}

const ChromeApiHelper = {
    openTabs(tabs: Array<TabType>): void {
        tabs.forEach((tab: TabType) => {
            chrome.tabs.create({url: tab.url});
        });
    },
    reloadCurrentTab(): void {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    },
};

export default ChromeApiHelper;
