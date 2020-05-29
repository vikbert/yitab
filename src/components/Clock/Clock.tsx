import React from 'react';
import './clock.less';

const today = new Date();

const Clock = () => (
    <div className={'clock'}>
        <div className={'time'}>{today.toLocaleTimeString().substr(0, 5)}</div>
        <div className={'date'}>{today.toUTCString().substr(0, 16)}</div>
    </div>
);

export default Clock;
