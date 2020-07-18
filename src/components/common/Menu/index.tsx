import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { StyledTypography } from './styled';

interface MenuProps {
    onAddClick: () => void;
    onStartClick: () => void;
    onStopClick: () => void;
    isPlaying: boolean;
}

const Menu = (props: MenuProps) => {
    const renderIcon = () => {
        if (props.isPlaying) {
            return <StopIcon />;
        }

        return <PlayArrowIcon />;
    };

    const onControlButtonClick = () => {
        if (props.isPlaying) {
            props.onStopClick();
        } else {
            props.onStartClick();
        }
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <StyledTypography variant="h6">Training Timers</StyledTypography>
                <Button color="inherit" onClick={props.onAddClick}>
                    <AddIcon />
                </Button>
                <Button color="inherit" onClick={onControlButtonClick}>
                    {renderIcon()}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Menu;
