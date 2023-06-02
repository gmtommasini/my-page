import * as React from 'react';
import Box from '@mui/material/Box';
import { TopBar } from 'components/Bar';
import SideDrawer from 'components/Drawer';
import Landing from './Landing';

import './styles.css'

const drawerWidth: number = 240;

export default function Home() {
    const [open, setOpen] = React.useState(true);
    const [currentComponent, setCurrentComponent] = React.useState(<Landing />);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <TopBar open={open} toggleDrawer={toggleDrawer} />
            <SideDrawer open={open} width={drawerWidth} toggleDrawer={toggleDrawer} setcurrentcomponent={setCurrentComponent} />
            <div id="display_area">
                {currentComponent}
            </div>
        </Box>
    );
}

