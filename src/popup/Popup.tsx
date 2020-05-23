import React, {useEffect, useState} from 'react';
import 'weui';
import '../weui/weui.less';
import './Popup.scss';

export default function Popup(): JSX.Element {
    const [tabUrl, setTabUrl] = useState('');

    useEffect(() => {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            localStorage.setItem('tabUrl', tabs[0].url);
            setTabUrl(tabs[0].url);
        });
    }, []);

    return (
        <h1>foobar</h1>
    );
}
