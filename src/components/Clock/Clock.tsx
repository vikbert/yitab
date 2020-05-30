import React from 'react';
import './clock.less';

const today = new Date();
interface ClockProps {
    time: string;
    date: string;
}
const Clock = ({time, date}: ClockProps) => (
    <div className={'clock'}>
        <div className={'time'}>{time}</div>
        <div className={'date'}>{date}</div>
    </div>
);

export default Clock;
