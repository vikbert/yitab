import AppDataType from './AppDataType';
import TabSetType from './TabSetType';
import TabType from './TabType';

class AppManager {
    _appData: AppDataType;

    constructor(data: AppDataType) {
        this._appData = data;
    }

    get appData(): AppDataType {
        return this._appData;
    }

    isEmpty(): boolean {
        return this.count() === 0;
    }

    count(tabSetKey?: string): number {
        if (tabSetKey) {
            const tabset = this.getTabSet(tabSetKey);

            return tabset && tabset.tabs ? tabset.tabs.length : 0;
        }

        if (Object.keys(this._appData).length === 0) {
            return 0;
        }

        const countEachSet = Object.values(this._appData).map((tabSet: TabSetType) => tabSet.tabs && tabSet.tabs.length);

        return countEachSet.reduce((sum, x) => sum + x, 0);
    }

    insertTabSet(tabSet: TabSetType): void {
        if (tabSet.tabs && tabSet.tabs.length) {
            this._appData[tabSet.createdAt] = tabSet;
        }
    }

    getTabSet(tabSetKey: string): TabSetType {
        return this._appData[tabSetKey];
    }

    deleteTabSet(tabSetKey: string): void {
        const tabset = this.getTabSet(tabSetKey);

        if (tabset && !tabset.isLocked && !tabset.isStarred) {
            delete this._appData[tabSetKey];
        }
    }

    deleteTab(tabSetKey: string, tabId: number): void {
        const tabset = this.getTabSet(tabSetKey);
        const filteredTabs = tabset.tabs.filter((tab: TabType) => tab.id !== tabId);

        if (filteredTabs.length === 0) {
            this.deleteTabSet(tabSetKey);
        }

        tabset.tabs = filteredTabs;
    }

    recallTabSet(tabSetKey: string): Array<string> {
        const mySet = this.getTabSet(tabSetKey);

        if (!mySet) {
            return [];
        }

        if (!mySet.isLocked && !mySet.isStarred) {
            this.deleteTabSet(tabSetKey);
        }

        return mySet.tabs.map((tab: TabType) => tab.url);
    }

    toggleIsLocked(tabSetKey: string): TabSetType {
        const mySet = this.getTabSet(tabSetKey);
        mySet.isLocked = !mySet.isLocked;

        return mySet;
    }

    toggleIsStarred(tabSetKey: string): TabSetType {
        const mySet = this.getTabSet(tabSetKey);
        mySet.isStarred = !mySet.isStarred;

        return mySet;
    }

    changeTabSetTitle(tabSetKey: string, newTitle: string): TabSetType {
        const mySet = this.getTabSet(tabSetKey);
        mySet.title = newTitle;

        return mySet;
    }
}

export default AppManager;
