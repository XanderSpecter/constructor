import styled from 'styled-components';
import { Timer } from '../../models/Timer';

const getBackgroundColorByType = (type: Timer['type']) => {
    if (type === 'main') {
        return '#f44336';
    }

    if (type === 'system') {
        return '#ff9800';
    }

    return '#4caf50';
};

interface TimerBlockProps {
    type: Timer['type'];
}

export const CountdownWrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TimerBlock = styled.div<TimerBlockProps>`
    width: 70%;
    min-width: 280px;
    font-size: 12vw;

    border-radius: 4px;
    color: white;

    padding: 16px;
    text-align: center;

    background-color: ${(props) => getBackgroundColorByType(props.type)};
`;
