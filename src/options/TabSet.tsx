import React, {useEffect} from 'react';
import useUpdates from '../hooks/useUpdates';
import AppManager from '../models/AppManager';
import TabType from '../models/TabType';
import {saveAppManager} from '../storage/tabStore';
import './tabSet.less';
import Calender from './calender';
import classnames from 'classnames';

type TabSetProps = {
    appManager: AppManager;
    tabSetKey: string;
}

const TabSet = ({appManager, tabSetKey}: TabSetProps) => {
    const tabSet = appManager.getTabSet(tabSetKey);
    const tabs = tabSet ? tabSet.tabs : [];
    const date = tabSet ? new Date(tabSet.createdAt) : new Date();

    const {updates, refreshUpdates} = useUpdates();

    const handleDeleteTab = (tabId: number): void => {
        if (tabSet.isLocked) {
            return;
        }

        appManager.deleteTab(tabSetKey, tabId);
        refreshUpdates();
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
                <div></div>
                <div className="counter">{tabs.length} Tabs</div>
                <div className="action icon icon-rotate-ccw"
                    onClick={handleRecall}/>
                <div className={classnames('action icon icon-x', {'disabled': (tabSet.isStarred || tabSet.isStarred)})}
                    onClick={handleDeleteAll}/>
                <div className={classnames('action icon icon-bookmark', {'selected': tabSet.isStarred})}
                    onClick={handleToggleIsStarred}/>
                <div className={classnames('action icon icon-lock', {'selected': tabSet.isLocked})}
                    onClick={handleToggleIsLocked}/>
            </div>
            <div className="body">
                {tabs.map((tab: TabType) => (
                    <div className="tab-item" key={tab.id}>
                        <div className={classnames('item-delete icon icon-x', {'disabled': tabSet.isLocked})}
                            onClick={() => handleDeleteTab(tab.id)}>
                        </div>
                        <img src={tab.favIconUrl} alt={' '}/>
                        <div className="item-title">
                            <a href={tab.url}>{tab.title}</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="meta">
            </div>
        </div>
    );
};

export default TabSet;
