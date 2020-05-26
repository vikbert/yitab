import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import {createNewTabSet} from '../models/TabSetFactory';
import TabType from '../models/TabType';
import {loadAppManager, saveAppManager} from '../storage/tabStore';
import ChromeApiHelper from '../utils/ChromeApiHelper';

export default function SearchResult({tabs}) {
    const [list, setList] = useState([]);

    const handleSaveResult = () => {
        const newTabset = createNewTabSet(list);
        const appManager = loadAppManager();
        appManager.insertTabSet(newTabset);
        saveAppManager(appManager);
        ChromeApiHelper.reloadCurrentTab();
    };

    const handleOpenResult = () => {
        ChromeApiHelper.openTabs(list);
    };

    const handleRemoveTab = (targetId: number) => {
        const filtered = list.filter((tab: TabType) => tab.id !== targetId);
        setList(filtered);

        if (filtered.length === 0) {
            ChromeApiHelper.reloadCurrentTab();
        }
    };

    const handleCancelSearch = () => {
        ChromeApiHelper.reloadCurrentTab();
    };

    useEffect(() => {
        setList(tabs || []);
    }, [tabs]);

    return list && (
        <div className="tab-set">
            <div className="header">
                <div></div>
                <div className="counter">Found {list.length} Tabs</div>
                <div className= {classnames('action icon icon-rotate-ccw', {'disabled': tabs && tabs.length === 0})}
                    onClick={handleOpenResult}/>
                <div
                    className={classnames('action icon icon-plus1', {'disabled': tabs && tabs.length === 0})}
                    onClick={handleSaveResult}/>

            </div>
            <div className="body">
                {list.map((tab: TabType) => (
                    <div className="tab-item" key={tab.id}>
                        <div className={'item-delete icon icon-x'}
                            onClick={() => handleRemoveTab(tab.id)}>
                        </div>
                        <img src={tab.favIconUrl} alt={' '}/>
                        <div className="item-title">
                            <a href={tab.url}>{tab.title}</a>
                        </div>
                    </div>
                ))}

                {list.length === 0 && (
                    <div className={'not-found'}>
                        <div>- No data found -</div>
                        <button onClick={handleCancelSearch}>Cancel search</button>
                    </div>

                )}
            </div>
        </div>
    );
}
