import React, {useEffect, useState} from 'react';
import Search from '../components/Search';
import useDocumentTitle from '../hooks/useDocumentTitle';
import AppManager from '../models/AppManager';
import {loadAppManager, saveAppManager} from '../storage/tabStore';
import SearchResult from './SearchResult';
import TabSet from './TabSet';
import './yitab.less';
import Clock from '../components/Clock';
import Dialog from '../components/Dialog';
import useVisibility from '../hooks/useVisibility';
import NewTabForm from './NewTabForm';
import TabType from '../models/TabType';
import '../styles/animation.less';

const today = new Date();

const YiTab = () => {
    useDocumentTitle('Yi');
    const [appManager, setAppManager] = useState(new AppManager({}));
    const [searchResult, setSearchResult] = useState(null);
    const [tabsetId, setTabsetId] = useState(null);
    const {visible, show, hide} = useVisibility(false);

    const changeSearchCallback = (searchInput: string): void => {
        if (searchInput.trim().length === 0) {
            setSearchResult(null);

            return;
        }

        setSearchResult(appManager.searchTabs(searchInput));
    };

    const handleOpenNewTabForm = (tabsetKey: string) => {
        setTabsetId(tabsetKey);
        show();
    };

    const addNewTabCallback = (newTab: TabType): void => {
        const targetTabset = appManager.getTabSet(tabsetId);
        targetTabset.tabs.push(newTab);
        setAppManager(appManager);
        saveAppManager(appManager);
    };

    useEffect(() => {
        setAppManager(loadAppManager());
    }, []);

    return appManager && (
        <>
            <div className="bg"/>
            <Dialog visible={visible} hide={hide}>
                <NewTabForm tabsetId={tabsetId} addNewTabCallback={addNewTabCallback}/>
            </Dialog>
            <div className="wrapper">
                <header className="header">
                    <div className="header-left">
                        <div className="logo"/>
                    </div>
                    <div className="header-right">
                        <Search
                            placeholder="Search here"
                            changeCallback={changeSearchCallback}
                        />
                        <span className="icon icon-settings"/>
                    </div>
                </header>
                <section className="content">
                    <main>
                        {!appManager.isEmpty() && searchResult === null
                            ? (
                                <>
                                    {Object.values(appManager.appData).reverse().sort((a, b) => (b.isStarred ? 1 : -1)).map((tabSet) => (
                                        <TabSet
                                            appManager={appManager}
                                            tabSetKey={tabSet.createdAt.toString()}
                                            key={tabSet.createdAt}
                                            openNewTabFormCallback={(key) => handleOpenNewTabForm(key)}
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
                            <Clock
                                time={today.toLocaleTimeString().substr(0, 5)}
                                date={today.toUTCString().substr(0, 16)}
                            />
                        </div>
                    </aside>
                </section>
            </div>
        </>
    );
};

export default YiTab;
