import AppData from './AppData';
import Tab from './Tab';
import TabSet from './TabSet';

class AppManager {
    _appData: AppData;

    constructor(data: AppData) {
        this._appData = data;
    }

    get appData(): AppData {
        return this._appData;
    }

    isEmpty(): boolean {
        return this.count() === 0;
    }

    count(tabSetKey?: string): number {
        if (tabSetKey) {
            return this.getTabSet(tabSetKey).tabs.length;
        }

        const countEachSet = Object.values(this._appData).map((tabSet: TabSet) => tabSet.tabs.length);

        return countEachSet.reduce((sum, x) => sum + x, 0);
    }

    getTabSet(tabSetKey: string): TabSet {
        return this._appData[tabSetKey];
    }

    deleteTabSet(tabSetKey: string): void {
        delete this._appData[tabSetKey];
    }

    recallTabSet(tabSetKey: string): Array<string> {
        const mySet = this.getTabSet(tabSetKey);

        if (!mySet.isLocked && !mySet.isStarred) {
            this.deleteTabSet(tabSetKey);
        }

        return mySet.tabs.map((tab: Tab) => tab.url);
    }

    lockTabSet(tabSetKey: string): TabSet {
        const mySet = this.getTabSet(tabSetKey);
        mySet.isLocked = true;

        return mySet;
    }

    unlockTabSet(tabSetKey: string): TabSet {
        const mySet = this.getTabSet(tabSetKey);
        mySet.isLocked = false;

        return mySet;
    }

    unstarTabSet(tabSetKey: string): TabSet {
        const mySet = this.getTabSet(tabSetKey);
        mySet.isStarred = false;

        return mySet;
    }

    changeTabSetTitle(tabSetKey: string, newTitle: string): TabSet {
        const mySet = this.getTabSet(tabSetKey);
        mySet.title = newTitle;

        return mySet;
    }
}

export default AppManager;
