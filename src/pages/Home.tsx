import * as React from 'react';
import Box from '@mui/material/Box';
import { TopBar } from 'components/Bar';
import SideDrawer from 'components/Drawer';
import Dashboard from './Dashboard';

const drawerWidth: number = 240;



export default function Home() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <TopBar open={open} toggleDrawer={toggleDrawer} />
            <SideDrawer open={open} drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />

            <Dashboard/>
        </Box>
    );
}

