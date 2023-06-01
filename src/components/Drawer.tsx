
// MUI ELEMENTS
import Toolbar from '@mui/material/Toolbar';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

// MUI ICONS
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// PAGES
import Landing from 'pages/Landing';
import QRcode_page from 'pages/QRcodeGen';
import BCard_page from 'pages/BCard'
import IFrame from './create_iframe';

import { styled } from '@mui/material/styles';
// import { mainListItems, secondaryListItems } from 'components/SideBar';

interface DrawerProps {
  open?: boolean;
  width?: number;
  setcurrentcomponent: (component: any) => void;
  toggleDrawer?: () => void;
}
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open, width }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}),
);
export default function SideDrawer(props: DrawerProps) {

  const handleMenuItemClick = (component: any) => {
    props.setcurrentcomponent(component);
  }

  return (
    <Drawer variant="permanent" open={props.open} width={props.width} setcurrentcomponent={()=>{}}  >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        {/* <List component="nav"> */}
          <ListItemButton onClick={() => handleMenuItemClick(<Landing />)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        {/* </List> */}
        <IconButton onClick={props.toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">


        <ListSubheader component="div" inset>
          Little Projects
        </ListSubheader>

        <ListItemButton onClick={() => handleMenuItemClick(<QRcode_page />)}>
          <ListItemIcon>
            <QrCode2Icon />
          </ListItemIcon>
          <ListItemText primary="QRCode Gen." />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="TBD" />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        <ListSubheader component="div" inset         >
          About me
        </ListSubheader>

        <ListItemButton onClick={() => handleMenuItemClick(<BCard_page />)}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Card" />
        </ListItemButton>

        <ListItemButton component="a" href='https://www.linkedin.com/in/gtommasini/' target='_blank'>
          <ListItemIcon>
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText primary="LinkedIn" />
        </ListItemButton>


        <ListItemButton onClick={() => handleMenuItemClick(<IFrame url='https://github.com/gmtommasini/my-page'/>)}>
        {/* <ListItemButton onClick={() => handleMenuItemClick(<IFrame url='https://www.lawrenceparkdental.com/doctor/dr-jose-olavo-queiroz-2-2-2/'/>)}> */}
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="GitHub" />
        </ListItemButton>

      </List>
    </Drawer>
  )
}