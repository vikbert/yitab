import Tab from '../models/Tab';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const store = require('store');
const key = 'yitab_tabs';

type Tabs = {
    [key: string]: Tab;
}

export const loadTabs = (): Tabs => {
    return store.get(key, {});
};

export const updateTabs = (tabs: Array<Tab>, targetId: number): void => {
    if (tabs.length === 0) {
        return;
    }

    const prevTabs = loadTabs();
    store.set(key, {
        [targetId]: tabs,
        ...prevTabs,
    });
};

export const insertTabs = (tabs: Array<Tab>): void => {
    const uuid = (new Date()).getTime();
    updateTabs(tabs, uuid);
};

export const deleteTabs = (id: number): void => {
    const prevTabs = loadTabs();
    delete prevTabs[id];

    store.set(key, prevTabs);
};
