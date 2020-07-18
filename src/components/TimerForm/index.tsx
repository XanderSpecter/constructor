import React, { useState } from 'react';
import { FormWrapper, Form, Block, SaveButton } from './styled';
import Typography from '@material-ui/core/Typography';
import { TimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Timer } from '../../models/Timer';

interface TimerFormProps {
    timer: Timer;
    onSubmit: (timer: Timer) => void;
    onCancel: () => void;
}

const TimerForm = (props: TimerFormProps) => {
    const [timer, setTimer] = useState<Timer>(props.timer);

    const onSubmit = () => {
        if (timer.time > 0) {
            props.onSubmit(timer);
        }
    };

    const handleTimeChange = (date: moment.Moment) => {
        setTimer({ ...timer, time: date.unix() });
    };

    const handleTypeChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        if (event.target) {
            setTimer({ ...timer, type: event.target.value as Timer['type'] });
        }
    };

    return (
        <FormWrapper>
            <Form>
                <Typography variant="h6">Редактировать таймер</Typography>
                <Block>
                    <TimePicker
                        ampm={false}
                        openTo="minutes"
                        views={['minutes', 'seconds']}
                        format="mm:ss"
                        label="Время"
                        value={new Date(timer.time * 1000)}
                        onChange={handleTimeChange}
                    />
                </Block>
                <Block>
                    <Select value={timer.type} onChange={handleTypeChange}>
                        <MenuItem value={'main'}>Подход</MenuItem>
                        <MenuItem value={'break'}>Перерыв</MenuItem>
                    </Select>
                </Block>
                <Block>
                    <SaveButton variant="contained" color="primary" onClick={onSubmit}>
                        Сохранить
                    </SaveButton>
                    <Button variant="contained" color="secondary" onClick={props.onCancel}>
                        Отмена
                    </Button>
                </Block>
            </Form>
        </FormWrapper>
    );
};

export default TimerForm;
