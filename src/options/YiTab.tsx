import React, {useEffect, useState} from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import AppManager from '../models/AppManager';
import TabSetType from '../models/TabSetType';
import {loadAppManager} from '../storage/tabStore';
import './yitab.less';
import TabSet from './TabSet';

const YiTab = () => {
    useDocumentTitle('Yi Tab');
    const [appManager, setAppManager] = useState(new AppManager({}));
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setAppManager(loadAppManager());
        setCounter(appManager.count());
    }, []);

    return appManager && (
        <>
            <div className="bg"/>
            <div className="wrapper">
                <header className="header">
                    <div className='logo'>
                        <div className='header-logo'/>
                        <div className="header-info">I</div>
                    </div>
                    <div className="search">
                        <span className="icon icon-search1"></span>
                    </div>
                    <div className="settings">
                        <span className="icon icon-settings"></span>
                    </div>
                </header>
                <section className="content">
                    {/* <nav>sidebar</nav> */}
                    <main>
                        {!appManager.isEmpty() && (<>
                            {Object.values(appManager.appData).map((tabSet: TabSetType) => (
                                <TabSet
                                    appManager={appManager}
                                    tabSetKey={tabSet.createdAt.toString()}
                                    key={tabSet.createdAt}
                                />
                            ))}
                        </>)}
                    </main>
                </section>
            </div>
        </>
    );
};

export default YiTab;
