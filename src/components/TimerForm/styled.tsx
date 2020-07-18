import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const FormWrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
`;

export const Form = styled.div`
    display: inline-block;

    background-color: white;

    padding: 16px;

    border-radius: 4px;
`;

export const Block = styled.div`
    margin-top: 8px;
`;

export const SaveButton = styled(Button)`
    margin-right: 8px;
`;
