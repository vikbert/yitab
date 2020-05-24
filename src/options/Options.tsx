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
        <>
            <div className="bg"/>
            <div className="wrapper">
                <header className="header">
                    <div className='header-logo'/>
                    <div className="header-info">I</div>
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

export default Options;
