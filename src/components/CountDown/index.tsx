import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Timer } from '../../models/Timer';
import { CountdownWrapper, TimerBlock } from './styled';

interface CountDownProps {
    timer: Timer;
    onTimerEnd: () => void;
}

let timerId: number;

const CountDown = (props: CountDownProps) => {
    const [remain, setRemain] = useState(props.timer.time);

    const timer = () => {
        if (remain > 0) {
            setRemain(remain - 1);

            return;
        }

        props.onTimerEnd();
    };

    const getHeader = () => {
        if (props.timer.type === 'main') {
            return 'Подход';
        }

        if (props.timer.type === 'system') {
            return 'Готовься';
        }

        return 'Перерыв';
    };

    useEffect(() => {
        setRemain(props.timer.time);
    }, [props.timer]);

    useEffect(() => {
        timerId = setTimeout(timer, 1000);

        return () => {
            clearTimeout(timerId);
        };
    });

    return (
        <CountdownWrapper>
            <TimerBlock type={props.timer.type}>
                <div>{getHeader()}</div>
                {moment(remain * 1000).format('mm:ss')}
            </TimerBlock>
        </CountdownWrapper>
    );
};

export default CountDown;
