// LIBS
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// UI LIBS
import Box from '@mui/material/Box';

// Modules
import { TopBar } from 'components/Bar';
import SideDrawer from 'components/Drawer';
import Landing from './Landing';
import Hello from 'pages/Hello';
import QRCode from 'pages/QRCode';
import MusicPage from 'pages/Music';
import Dashboard from 'pages/Dashboard';
import Card from 'pages/Card';

import './styles.css'

const drawerWidth: number = 240;

export default function Home() {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Router>
                <TopBar open={open} toggleDrawer={toggleDrawer} />
                <SideDrawer open={open} width={drawerWidth} toggleDrawer={toggleDrawer} setcurrentcomponent={() => { }} />
                <div id="display_area">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/home" element={<Hello />} />
                        <Route path="/music" element={<MusicPage />} />
                        <Route path="/placeholder" element={<Dashboard />} />
                        <Route path="/qrcode" element={<QRCode />} />
                        <Route path="/card" element={<Card />} />
                    </Routes>
                </div>
            </Router>
        </Box>
    );
}

