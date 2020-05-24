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

    it('insertTabSet', () => {
        const tabset3 = {
            'createdAt': 159026222003,
            'title': 'set3',
            'isStarred': false,
            'isLocked': false,
            'tabs': [
                {
                    'id': 120,
                    'favIconUrl': 'https://www.google.de/favicon.ico',
                    'title': 'Google',
                    'url': 'https://www.google.de/',
                    'status': 'completed',
                    'pinned': false,
                },
            ],
        };

        const prevCount = manager.count();
        expect(prevCount).toEqual(2);

        manager.insertTabSet(tabset3);

        const currentCount = manager.count();
        expect(currentCount).toEqual(3);

        const tabset4 = {
            'createdAt': 1590262226004,
            'title': 'set3',
            'isStarred': false,
            'isLocked': false,
            'tabs': [],
        };
        // check, tabset wihout tabs will not be inserted
        manager.insertTabSet(tabset4);
        expect(Object.keys(manager.appData).length).toEqual(3);
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
        // key1 is not deletable
        expect(manager.count()).toEqual(2);
        manager.deleteTabSet('key1');
        expect(manager.count()).toEqual(2);

        // key2 is deletable
        expect(manager.count()).toEqual(2);
        manager.deleteTabSet('key2');
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

    it('toggleIsLocked()', () => {
        let mySet;
        mySet = manager.toggleIsLocked('key2');
        expect(mySet.isLocked).toBeTruthy();

        mySet = manager.toggleIsLocked('key2');
        expect(mySet.isLocked).toBeFalsy();
    });

    it('toggleIsStarred()', () => {
        let mySet;
        mySet = manager.toggleIsStarred('key2');
        expect(mySet.isStarred).toBeTruthy();

        mySet = manager.toggleIsStarred('key2');
        expect(mySet.isStarred).toBeFalsy();
    });

    it('changeTabSetTitle()', () => {
        const mySet = manager.changeTabSetTitle('key2', 'Jest is great');
        expect(mySet.title).toEqual('Jest is great');
    });
});
