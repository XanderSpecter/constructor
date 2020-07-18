import React from 'react';
import { TimerRow, Controls, Info } from './styled';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Timer } from '../../models/Timer';

interface TimerCardProps {
    timer: Timer;
    onEditClick: (timer: Timer) => void;
    onDeleteClick: (id: string) => void;
}

const TimerCard = (props: TimerCardProps) => {
    const typeMap = (type: Timer['type']) => {
        if (type === 'main') {
            return 'Подход';
        }

        if (type === 'system') {
            return 'Системный';
        }

        return 'Перерыв';
    };
    const timeToFormat = (time: number) => moment(time * 1000).format('mm:ss');

    const onEditClick = () => {
        props.onEditClick(props.timer);
    };

    const onDeleteClick = () => {
        props.onDeleteClick(props.timer.id);
    };

    const renderControls = () => {
        if (props.timer.type === 'system') {
            return null;
        }

        return (
            <Controls>
                <div onClick={onEditClick}>
                    <EditIcon color="primary" />
                </div>
                <div onClick={onDeleteClick}>
                    <DeleteForeverIcon color="secondary" />
                </div>
            </Controls>
        );
    };

    return (
        <TimerRow>
            <Info>
                <div>{timeToFormat(props.timer.time)}</div>
                <div>{typeMap(props.timer.type)}</div>
            </Info>
            {renderControls()}
        </TimerRow>
    );
};

export default TimerCard;
