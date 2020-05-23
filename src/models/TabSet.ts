import Tab from './Tab';

interface TabSet {
    tabs: Array<Tab>;
    isStarred: boolean;
    isLocked: boolean;
    title?: string;
}

export default TabSet;
