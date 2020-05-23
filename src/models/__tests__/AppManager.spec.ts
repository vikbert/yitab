import AppManager from '../AppManager';
import {mockAppData} from '../mockAppData';

describe('AppManager', () => {
    let manager: AppManager;
    beforeEach(() => {
        manager = new AppManager({...mockAppData});
    });

    it('isEmpty()', () => {
        expect(manager.isEmpty()).toBeFalsy();
    });

    it('count()', () => {
        const allTabs = manager.count();
        expect(allTabs).toEqual(2);

        const tabsKey1 = manager.count('key1');
        expect(tabsKey1).toEqual(1);
    });

    it('appData()', () => {
        expect(manager.appData['key1'].isStarred).toBeTruthy();
        expect(manager.appData['key1'].isLocked).toBeTruthy();
        expect(manager.appData['key1'].tabs.length).toEqual(1);
    });

    it('getTabSet()', () => {
        const set1 = manager.getTabSet('key1');
        expect(set1.title).toEqual('set1');

        const set2 = manager.getTabSet('key2');
        expect(set2.title).toEqual('set2');
    });

    it('deleteTabSet()', () => {
        expect(manager.count()).toEqual(2);
        manager.deleteTabSet('key1');
        expect(manager.count()).toEqual(1);
    });

    it('recallTabSet()', () => {
        let urls;
        urls = manager.recallTabSet('key1');
        expect(urls.length).toEqual(1);
        expect(manager.count()).toEqual(2);

        urls = manager.recallTabSet('key2');
        expect(urls.length).toEqual(1);
        expect(manager.count()).toEqual(1);
    });

    it('lockTabSet()', () => {
        const mySet = manager.lockTabSet('key2');
        expect(mySet.isLocked).toBeTruthy();
    });

    it('unlockTabSet()', () => {
        const mySet = manager.unlockTabSet('key2');
        expect(mySet.isLocked).toBeFalsy();
    });

    it('starTabSet()', () => {
        const mySet = manager.unstarTabSet('key2');
        expect(mySet.isStarred).toBeFalsy();
    });

    it('changeTabSetTitle()', () => {
        const mySet = manager.changeTabSetTitle('key2', 'Jest is great');
        expect(mySet.title).toEqual('Jest is great');
    });
});
