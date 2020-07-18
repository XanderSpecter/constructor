import styled from 'styled-components';

export const TimerRow = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: center;
    padding: 12px;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
`;

export const Info = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;

    div:first-child {
        margin-right: 8px;
    }
`;

export const Controls = styled.div`
    display: flex;
    align-items: center;

    div {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    div:first-child {
        margin-right: 8px;
    }
`;
