import React from 'react';
import styled from 'styled-components';

import Menu from '../components/common/Menu';

const Button = styled.button`
    color: red;
    display: flex;
`;

const App = () => (
    <>
        <Menu />
        <Button>123</Button>
    </>
);

export default App;
