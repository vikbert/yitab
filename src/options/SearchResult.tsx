import classnames from 'classnames';
import React from 'react';
import TabType from '../models/TabType';

export default function SearchResult({tabs = []}) {
    const tabSet = {
        isStarred: false,
        isLocked: false,
    };

    return tabs && (
        <div className="tab-set">
            <div className="header">
                <div></div>
                <div className="counter">Found {tabs.length} Tabs</div>
                <div className="action icon icon-rotate-ccw"
                    onClick={() => null}/>
                <div className={classnames('action icon icon-x', {'disabled': (tabSet.isStarred || tabSet.isStarred)})}
                    onClick={() => null}/>
                <div className={classnames('action icon icon-bookmark', {'selected': tabSet.isStarred})}
                    onClick={() => null}/>
                <div className={classnames('action icon icon-lock', {'selected': tabSet.isLocked})}
                    onClick={() => null}/>
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

                {tabs.length === 0 && (
                    <div className={'not-found'}>
                        No data matched!
                    </div>
                )}
            </div>
            <div className="meta"/>
        </div>
    );
}
