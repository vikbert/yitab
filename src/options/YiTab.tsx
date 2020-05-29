import React, {useEffect, useState} from 'react';
import Search from '../components/Search';
import useDocumentTitle from '../hooks/useDocumentTitle';
import AppManager from '../models/AppManager';
import {loadAppManager} from '../storage/tabStore';
import SearchResult from './SearchResult';
import TabSet from './TabSet';
import './yitab.less';
import Clock from '../components/Clock';

const YiTab = () => {
    useDocumentTitle('Yi');
    const [appManager, setAppManager] = useState(new AppManager({}));
    const [searchResult, setSearchResult] = useState(null);

    const changeCallback = (searchInput: string): void => {
        if (searchInput.trim().length === 0) {
            setSearchResult(null);

            return;
        }

        setSearchResult(appManager.searchTabs(searchInput));
    };

    useEffect(() => {
        setAppManager(loadAppManager());
    }, []);

    return appManager && (
        <>
            <div className="bg"/>
            <div className="wrapper">
                <header className="header">
                    <div className="header-left">
                        <div className="logo"/>
                    </div>
                    <div className="header-right">
                        <Search
                            placeholder="Search here"
                            changeCallback={changeCallback}
                        />
                        <span className="icon icon-settings"/>
                    </div>
                </header>
                <section className="content">
                    <main>
                        {!appManager.isEmpty() && searchResult === null
                            ? (
                                <>
                                    {Object.values(appManager.appData).reverse().map((tabSet) => (
                                        <TabSet
                                            appManager={appManager}
                                            tabSetKey={tabSet.createdAt.toString()}
                                            key={tabSet.createdAt}
                                        />
                                    ))}
                                </>
                            )
                            : (
                                <>
                                    <SearchResult tabs={searchResult}/>
                                </>
                            )
                        }
                    </main>
                    <aside className='aside-container'>
                        <div className="clock-container">
                            <Clock/>
                        </div>
                    </aside>
                </section>
            </div>
        </>
    );
};

export default YiTab;
