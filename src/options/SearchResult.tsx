import React from 'react';
import classnames from 'classnames';
import TabType from '../models/TabType';

export default function SearchResult({tabs = []}) {
    const tabSet = {
        isStarred: false,
        isLocked: false,
    };

    const handleRecall = () => {

    };

    const handleDeleteAll = () => {

    };

    const handleToggleIsLocked = () => {

    };

    const handleToggleIsStarred = () => {

    };

    return (
        <div className="tab-set">
            <div className="header">
                <div></div>
                <div className="counter">Found {tabs.length} Tabs</div>
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
                            onClick={() => null}>
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
}
