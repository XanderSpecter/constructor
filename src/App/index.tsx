import React, { useState, useEffect } from 'react';

import { MainWrapper, Warning, Error } from './styled';
import Menu from '../components/common/Menu';
import Container from '@material-ui/core/Container';
import TimerForm from '../components/TimerForm';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import TimerCard from '../components/TimerCard';
import { v4 as uuidv4 } from 'uuid';
import Snackbar from '@material-ui/core/Snackbar';
import CountDown from '../components/CountDown';
import { Timer } from '../models/Timer';

const App = () => {
    const [timers, setTimers] = useState<Timer[]>([{ id: 'system', time: 10, type: 'system' }]);
    const [timerToEdit, setTimerToEdit] = useState<Timer>(null);
    const [showMainAlert, setShowMainAlert] = useState(true);
    const [error, setError] = useState<string>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTimer, setCurrentTimer] = useState(0);

    useEffect(() => {
        if (window && window.localStorage) {
            const newTimersString: string = window.localStorage.getItem('timers');
            const newTimers: Timer[] = JSON.parse(newTimersString) as Timer[];

            if (newTimers && newTimers.length) {
                setTimers([...newTimers]);
            }
        }
    }, []);

    const onStartClick = () => {
        let hasError = false;
        timers.forEach((timer, index) => {
            if (timers[index + 1] && timer.type === timers[index + 1].type) {
                hasError = true;
            }
        });

        if (hasError) {
            setError(
                'В списке содержится два таймера одинакового типа подряд. Исправьте настройки таймеров для корректной работы системы.'
            );

            return;
        }

        setIsPlaying(true);
    };

    const onStopClick = () => {
        setIsPlaying(false);
        setCurrentTimer(0);
    };

    const onAddClick = () => {
        setTimerToEdit({
            id: uuidv4(),
            time: 0,
            type: 'main',
        });
    };

    const saveDataToLocalStorage = (newTimers: Timer[]) => {
        if (window && window.localStorage) {
            window.localStorage.setItem('timers', JSON.stringify(newTimers));
        }
    };

    const onEditClick = (timer: Timer) => {
        setTimerToEdit({ ...timer });
    };

    const onDeleteClick = (id: string) => {
        const newTimers = timers.filter((timer) => timer.id !== id);

        setTimers([...newTimers]);
        saveDataToLocalStorage([...newTimers]);
    };

    const onTimerFormSubmit = (timer: Timer) => {
        const isTimerExists = Boolean(timers.find((oldTimer) => oldTimer.id === timer.id));
        let newTimers: Timer[] = [...timers];

        if (isTimerExists) {
            newTimers = timers.map((newTimer) => {
                if (newTimer.id === timer.id) {
                    return timer;
                }

                return newTimer;
            });
        } else {
            newTimers.push(timer);
        }

        setTimers([...newTimers]);
        saveDataToLocalStorage([...newTimers]);
        setTimerToEdit(null);
    };

    const onTimerFormCancel = () => {
        setTimerToEdit(null);
    };

    const renderTimerForm = () => {
        if (timerToEdit) {
            return <TimerForm timer={timerToEdit} onSubmit={onTimerFormSubmit} onCancel={onTimerFormCancel} />;
        }

        return null;
    };

    const renderTimers = () => {
        return timers.map((timer) => (
            <TimerCard key={timer.id} timer={timer} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
        ));
    };

    const onTimerEnd = () => {
        const nextTimer = currentTimer + 1;

        if (nextTimer < timers.length) {
            setCurrentTimer(nextTimer);

            return;
        }

        setIsPlaying(false);
        setCurrentTimer(0);
    };

    const renderMainContent = () => {
        if (!isPlaying) {
            return (
                <>
                    {renderTimerForm()}
                    {renderTimers()}
                </>
            );
        }

        return <CountDown timer={timers[currentTimer]} onTimerEnd={onTimerEnd} />;
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Menu onAddClick={onAddClick} onStartClick={onStartClick} onStopClick={onStopClick} isPlaying={isPlaying} />
            <MainWrapper>
                <Container maxWidth="lg">{renderMainContent()}</Container>
            </MainWrapper>
            <Snackbar open={showMainAlert} autoHideDuration={60000} onClose={() => setShowMainAlert(false)}>
                <Warning>
                    ВНИМАНИЕ!!! Данные о таймерах автоматически сохраняются в локальное хранилище браузера. Ничего
                    никуда не отправляется, однако если данные в браузере будут удалены, то и тут они пропадут :)
                    <br />
                    <b>Продолжая использовать этот сервис, вы соглашаетесь на вышеописанные условия.</b>
                </Warning>
            </Snackbar>
            <Snackbar open={Boolean(error)} autoHideDuration={60000} onClose={() => setError(null)}>
                <Error>{error}</Error>
            </Snackbar>
        </MuiPickersUtilsProvider>
    );
};

export default App;
