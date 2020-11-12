import React , {useEffect} from 'react';
import './style.css';
import store from '../../redux/store';
import { slide as Menu } from 'react-burger-menu';
import chat from '../../images/chat.jpg';
// import './App.css';

// import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import deliveries from '../../images/deliveries.png';
import addproducts from '../../images/addproducts.png';

import { createMuiTheme } from '@material-ui/core/styles';

const drawerWidth = 240;


const theme = createMuiTheme({
  palette: {
    primary: {
      light: 'red',
      main: 'red',
      dark: 'red',
      contrastText: 'red',
    },
    secondary: {
      light: 'red',
      main: 'red',
      dark: 'red',
      contrastText: 'red',
    },
  },
});






const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));












const  SidebarComponent  = () =>  {


  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  

    useEffect(() => {
        console.log(store.getState().AdminState);
        store.subscribe(() => {
            let admin = store.getState().AdminState;
        } )
       
    }, [])
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

  return (
    // <div >
    //     <p>admin dashboard</p>
    //     <Link to="/deliveries" >deliveries</Link>
    //     <Link to="/addgames" >add games</Link>
    //     {/* <div></div> */}
    // </div>

    // <div className="DrawerComponent"  >

    // </div>


    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className=''
        style={{backgroundColor:'black'}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
         
          <List>
            <ListItem   >
            <ListItemIcon   > <img src={deliveries} className="deliveryicon"  style={{ fontWeight: 'bold' }}  />
            </ListItemIcon>
            <Link to="/deliveries"  className="routestyleAdmin"  style={{ fontWeight: 'bold' }}   >Deliveries</Link>
            </ListItem>
          </List>

          <List>
            <ListItem   >
            <ListItemIcon   > <img src={addproducts} className="deliveryicon"   style={{ fontWeight: 'bold' }}   />
            </ListItemIcon>
            <Link to="/addgames"  className="routestyleAdmin"   style={{ fontWeight: 'bold' }}  >Add Games</Link>
            </ListItem>
          </List>

          <List>
            <ListItem   >
            <ListItemIcon   > <img src={deliveries} className="deliveryicon"   style={{ fontWeight: 'bold' }}   />
            </ListItemIcon>
            <Link to="/rentaldeliveries"  className="routestyleAdmin"   style={{ fontWeight: 'bold' }}  >Rental Deliveries</Link>
            </ListItem>
          </List>


        </List>

        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt */}
         
        </Typography>
        
      </main>
    </div>

  

  );
}

export default SidebarComponent;
