
import  './App.css';
import {useEffect,useState} from 'react';
import React from "react-dom";
import {NativeSelect,FormControl} from '@material-ui/core';
import Left from './components/left.jsx';
import Right from './components/right.jsx';
import { Card,
  CardContent,
  Grid
 } from '@material-ui/core';
import  Countup from "react-countup";


import{ fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));




const App=()=>{
  
  
  const [data,setData]=useState([])
  const [Awbno,setAwbno]=useState()
  const [error,setError]=useState({isError:"false",errormessage:""})
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  
  const token="tTU3gFVUdP"

  useEffect(()=>{
    const preload = ()=>{
      fetch('https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch',{
        method: "POST",
        headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,  
        },
        body:JSON.stringify({
          email:token
      })
    }
    )
    .then(res=>res.json())
      .then((data1)=>{
        
        if(data1?.message){
          setError({isError:"true",errormessage:data1.message})
        }
        else {
          
          setData(data1)
          console.log(data)
          }
      })
      .catch((err) => console.log(err))
    }
    preload();
  },[])

  const errorMessage=()=>{
    if (error.isError){
      return(
        <div>
          <h1>{error.errormessage}</h1>
        </div>
      )
    }
  }




  return(
    <div>
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  
    <div>
          <div>
        <Grid container spacing={3} justify="center" className="classGrid1" >
          <Grid item component={Card} xs={3} md={1} className="classGrid">
            <CardContent>
              
              <Typography variant="h5">
                <Countup
                start={0}
                end={data.filter((dat)=>dat.current_status_code==="DEX").length}
                duration={2.5}
                separator=","
                />
              </Typography>
              
              <Typography variant="body2">DEX</Typography>
            </CardContent>
          </Grid>
           <Grid item component={Card} xs={3} md={1} className="classGrid" >
            <CardContent>
              <Typography variant="h5">
              <Countup
                start={0}
                end={data.filter((dat)=>dat.current_status_code==="INL").length}
                duration={2.5}
                separator=","
                />
              </Typography>
              <Typography variant="body2">INT</Typography>
            </CardContent>
          </Grid>
          <Grid item component={Card} xs={3} md={1} className="classGrid" >
            <CardContent>
  
              <Typography variant="h5">
              <Countup
                start={0}
                end={data.filter((dat)=>dat.current_status_code==="DEL").length}
                duration={2.5}
                separator=","
                />
              </Typography>
              <Typography variant="body2">DEL</Typography>
            </CardContent>
          </Grid> 
          <Grid item component={Card} xs={3} md={1} className="classGrid" >
            <CardContent>
  
              <Typography variant="h5">
              <Countup
                start={0}
                end={data.filter((dat)=>dat.current_status_code==="OOD").length}
                duration={2.5}
                separator=","
                />
              </Typography>
             
              <Typography variant="body2">OOD</Typography>
            </CardContent>
          </Grid> 
          <Grid item component={Card} xs={3} md={1} className="classGrid" >
            <CardContent>
  
              <Typography variant="h5">
              <Countup
                start={0}
                end={data.filter((dat)=>dat.current_status_code==="NFI").length}
                duration={2.5}
                separator=","
                />
              </Typography>
              <Typography variant="body2">NFI</Typography>
            </CardContent>
          </Grid> 
        </Grid>
      </div>
    <FormControl >
             <NativeSelect default=" " onChange={(e)=>setAwbno(e.target.value)}>
                 <option value="">global</option>
    {data.map((dat1,index)=><option value={dat1.awbno} key={index}>{dat1.awbno}</option>)} 
             </NativeSelect>
         </FormControl>


    {Awbno=="" &&<Right data1={data} />}
    {Awbno!="" &&<div> <Right data1={data.filter((d)=>d.awbno==Awbno)}/>  </div>}
    </div>
    </div>
  )

}

export default App;