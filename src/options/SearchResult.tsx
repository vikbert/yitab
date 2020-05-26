import React, {useState, useEffect} from 'react';
import {createNewTabSet} from '../models/TabSetFactory';
import TabType from '../models/TabType';
import {openTabs, reloadCurrentTab} from '../utils/chromeTabsHelper';

export default function SearchResult({tabs}) {
    const [list, setList] = useState([]);

    const handleAddResult = () => {
        const newTabset = createNewTabSet(list);
    };

    const handleOpenResult = () => {
        openTabs(list);
    };

    const handleRemoveTab = (targetId: number) => {
        const filtered = list.filter((tab: TabType) => tab.id !== targetId);
        setList(filtered);

        if (filtered.length === 0) {
            reloadCurrentTab();
        }
    };

    useEffect(() => {
        setList(tabs || []);
    }, [tabs]);

    return list && (
        <div className="tab-set">
            <div className="header">
                <div></div>
                <div className="counter">Found {list.length} Tabs</div>
                <div className="action icon icon-rotate-ccw"
                    onClick={handleOpenResult}/>
                <div
                    className={'action icon icon-plus1'}
                    onClick={handleAddResult}/>

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
                        No data matched!
                    </div>
                )}
            </div>
            <div className="meta"/>
        </div>
    );
}
