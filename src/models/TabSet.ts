import TabSetType from './TabSetType';
import TabType from './TabType';

class TabSet implements TabSetType {
    title: string;

    createdAt: number;

    isLocked: boolean;

    isStarred: boolean;

    tabs: Array<TabType>;

    constructor(tabData) {
        this.createdAt = tabData.createdAt;
        this.isLocked = tabData.isLocked;
        this.isStarred = tabData.isStarred;
        this.title = tabData.title;
        this.tabs = tabData.tabs;
    }

    count(): number {
        return this.tabs.length;
    }

    deleteAllTabs(): void {
        this.tabs = [];
    }

    deleteTab(targetTab: TabType): void {
        const filtered = this.tabs.filter((tab) => tab.id === targetTab.id);
    }

    setTitle(newTitle: string): void {
        this.title = newTitle.trim();
    }

    toggleLocked(): void {
        this.isLocked = !this.isLocked;
    }

    toggleStarred(): void {
        this.isStarred = !this.isStarred;
    }
}
