import React from 'react';
import './calender.less';

interface CalenderProps {
    date: Date;
}

export default function Calender({date}: CalenderProps): JSX.Element {
    return (
        <div className='calender'>
            <div className='month'>{date.toUTCString().substr(7, 4)}</div>
            <div className='day'>{date.toLocaleDateString().substr(0, 2)}</div>
        </div>
    );
}
