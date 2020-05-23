import React, {useEffect, useState} from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './options.less';
import TabSet from './TabSet';
import {loadTabs} from '../storage/tabStore';

const Options = () => {
    useDocumentTitle('Yi Tab');
    const [tabs, setTabs] = useState({});

    useEffect(() => {
        setTabs(loadTabs());
    }, []);

    return (
        <div className="app-wrapper">
            <div className="app-header">
                <div className="header-logo">
                    <span>Yi Tab</span>
                </div>
                <div className="header-info">
                    Gesamt: 49 Tabs
                </div>
            </div>
            <div className="app-main">
                {Object.keys(tabs).map((key) => (
                    <TabSet tabSet={tabs[key]} timestamp={parseInt(key, 10)} key={key}/>
                ))}
            </div>
        </div>
    );
};

export default Options;
