import React, {useState, useEffect} from 'react';
import Tab from '../models/Tab';
import {updateTabs, deleteTabs} from '../storage/tabStore';
import './tabSet.less';

type TabSetProps = {
    timestamp: number;
    tabSet: Array<Tab>;
}

const TabSet = ({tabSet, timestamp}: TabSetProps) => {
    const [tabs, setTabs] = useState(tabSet);
    const date = new Date(timestamp);

    const handleDelete = (tabId: number): void => {
        const filtered = tabs.filter((tab: Tab) => {
            return tab.id !== tabId;
        });

        setTabs(filtered);
    };

    const handleRecall = () => {
        tabs.forEach((tab: Tab) => {
            chrome.tabs.create({url: tab.url});
        });

        setTabs([]);
        chrome.runtime.openOptionsPage(() => console.log('options page opened'));
    };

    const handleDeleteAll = () => {
        setTabs([]);
    };

    useEffect(() => {
        if (tabs.length === 0) {
            deleteTabs(timestamp);
        } else {
            updateTabs(tabs, timestamp);
        }
    }, [tabs]);

    return tabs.length > 0 && (
        <div className="tab-set">
            <div className="header">
                <div className="counter">{tabSet.length} Tabs</div>
                <div className="control">
                    <div className="control-row created-at">
                        {`Erstellt am ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                    </div>
                    <div className="control-row actions">
                        <div className="action" onClick={handleRecall}>alle wiederherstellen</div>
                        <div className="action" onClick={handleDeleteAll}>alle löschen</div>
                        <div className="action">alle sperren</div>
                        <div className="action">alle markieren</div>
                    </div>
                </div>
            </div>
            <div className="body">
                {tabs.map((tab: Tab) => (
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
