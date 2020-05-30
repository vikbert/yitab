import React, {useState} from 'react';
import './newTabForm.less';
import {createNewTab} from '../../models/TabFactory';
import TabType from '../../models/TabType';

interface NewTabFormProps {
    tabsetId?: string;
    addNewTabCallback: (tab: TabType) => void;
}

export default function NewTabForm({tabsetId, addNewTabCallback}: NewTabFormProps) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [completed, setCompleted] = useState(false);

    const cleanForm = () => {
        setTitle('');
        setUrl('');
    };

    const toggleCheckIcon = (miliSeconds = 1600) => {
        setCompleted(true);
        setTimeout(() => {
            setCompleted(false);
        }, miliSeconds);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addNewTabCallback(createNewTab(title, url));
        cleanForm();

        toggleCheckIcon();
    };

    return (
        <form className='new-tab-form' onSubmit={handleSubmit}>
            <div className="form-title">
                <span>Insert a new Tab</span>
                {completed && <div className="icon icon-check completed scale-in-center "/>}
            </div>
            <input type="text" value={title} placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" value={url} placeholder='Enter URL' onChange={(e) => setUrl(e.target.value)}/>
            <button type='submit' className='btn'>Submit</button>
        </form>
    );
}
