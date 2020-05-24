import React, {useEffect} from 'react';
import useUpdates from '../hooks/useUpdates';
import AppManager from '../models/AppManager';
import TabType from '../models/TabType';
import {saveAppManager} from '../storage/tabStore';
import './tabSet.less';

type TabSetProps = {
    appManager: AppManager;
    tabSetKey: string;
}

const TabSet = ({appManager, tabSetKey}: TabSetProps) => {
    const tabSet = appManager.getTabSet(tabSetKey);
    const tabs = tabSet ? tabSet.tabs : [];
    const date = tabSet ? new Date(tabSet.createdAt) : new Date();

    const {updates, refreshUpdates} = useUpdates();

    const handleDelete = (tabId: number): void => {
        appManager.deleteTab(tabSetKey, tabId);
    };

    const handleRecall = () => {
        const recallUrls = appManager.recallTabSet(tabSetKey);
        recallUrls.forEach((recallUrl: string) => {
            chrome.tabs.create({url: recallUrl});
        });
        chrome.runtime.openOptionsPage();
        refreshUpdates();
    };

    const handleDeleteAll = () => {
        appManager.deleteTabSet(tabSetKey);
        refreshUpdates();
    };

    const handleToggleIsLocked = () => {
        appManager.toggleIsLocked(tabSetKey);
        refreshUpdates();
    };

    const handleToggleIsStarred = () => {
        appManager.toggleIsStarred(tabSetKey);
        refreshUpdates();
    };

    useEffect(() => {
        saveAppManager(appManager);
    }, [updates]);

    if (!tabSet) {
        return null;
    }

    return (
        <div className="tab-set">
            <div className="header">
                <div className="counter">{tabs.length} Tabs</div>
                <div className="control">
                    <div className="control-row created-at">
                        {`Erstellt am ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                    </div>
                    <div className="control-row actions">
                        <div className="action" onClick={handleRecall}>alle wiederherstellen</div>
                        <div className="action" onClick={handleDeleteAll}>alle löschen</div>
                        <div className="action"
                            onClick={handleToggleIsLocked}>{tabSet.isLocked ? 'entsperren' : 'sperren'}</div>
                        <div className="action"
                            onClick={handleToggleIsStarred}>{tabSet.isStarred ? 'Markierung aufheben' : 'markieren'}</div>
                    </div>
                </div>
            </div>
            <div className="body">
                {tabs.map((tab: TabType) => (
                    <div className="tab-item" key={tab.id}>
                        <div className="item-delete" onClick={() => handleDelete(tab.id)}>✖️</div>
                        <img src={tab.favIconUrl} alt="favicon"/>
                        <div className="item-title">
                            <a href={tab.url}>{tab.title}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabSet;
