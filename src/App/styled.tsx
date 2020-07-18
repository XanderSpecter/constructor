import styled from 'styled-components';

export const MainWrapper = styled.div`
    width: 100%;
    margin-top: 56px;

    font-family: 'Roboto', sans-serif;
    font-size: 16px;

    @media (min-width: 600px) {
        margin-top: 64px;
    }
`;

export const Warning = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 16px;

    padding: 16px;
    border-radius: 4px;

    background-color: #ff9800;
    color: white;
`;

export const Error = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 16px;

    padding: 16px;
    border-radius: 4px;

    background-color: #f44336;
    color: white;
`;
