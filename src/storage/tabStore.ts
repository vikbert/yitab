import AppManager from '../models/AppManager';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const store = require('store');
const key = 'yitab_tabs';

export const loadAppManager = (): AppManager => {
    const data = store.get(key, {});
    console.log('storage reading: ' + (new Date()).getTime());

    return new AppManager(data);
};

export const saveAppManager = (appManager: AppManager) => {
    store.set(key, appManager.appData);
    console.log('storage saving: ' + (new Date()).getTime());
};
