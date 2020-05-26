import React, {useEffect, useState, Fragment} from 'react';
import './yitab.less';
import useDocumentTitle from '../hooks/useDocumentTitle';
import AppManager from '../models/AppManager';
import TabSetType from '../models/TabSetType';
import {loadAppManager} from '../storage/tabStore';
import TabSet from './TabSet';
import Search from '../components/Search';
import SearchResult from './SearchResult';

const YiTab = () => {
    useDocumentTitle('Yi Tab');
    const [appManager, setAppManager] = useState(new AppManager({}));
    const [counter, setCounter] = useState(0);
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
        setCounter(appManager.count());
    }, []);

    return appManager && (
        <>
            <div className="bg"/>
            <div className="wrapper">
                <header className="header">
                    <div className='header-left'>
                        <div className='logo'/>
                        <div className="info">I</div>
                    </div>
                    <div className='header-right'>
                        <Search
                            placeholder='Search here'
                            changeCallback= {changeCallback}
                        />
                        <span className="icon icon-settings"></span>
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
                </section>
            </div>
        </>
    );
};

export default YiTab;