import React, {useEffect, useState} from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import AppManager from '../models/AppManager';
import TabSetType from '../models/TabSetType';
import {loadAppManager} from '../storage/tabStore';
import './options.less';
import TabSet from './TabSet';

const Options = () => {
    useDocumentTitle('Yi Tab');
    const [appManager, setAppManager] = useState(new AppManager({}));
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setAppManager(loadAppManager());
        setCounter(appManager.count());
    }, []);

    return appManager && (
        <div className="app-wrapper">
            <div className="app-header">
                <div className="header-logo">
                    <span>Yi Tab</span>
                </div>
                <div className="header-info">
                    Gesamt: {counter} Tabs
                </div>
            </div>
            {!appManager.isEmpty() && (
                <div className="app-main">
                    {Object.values(appManager.appData).map((tabSet: TabSetType) => {
                        return (
                            <TabSet
                                appManager={appManager}
                                tabSetKey={tabSet.createdAt.toString()}
                                key={tabSet.createdAt}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Options;
