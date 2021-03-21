
import './App.css';
import {useEffect,useState} from 'react';
import React from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';




const App=()=>{
  const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });
  
  const [data,setData]=useState([])
  const [error,setError]=useState({isError:"false",errormessage:""})
  const classes = useStyles();
  const [value, setValue] = useState(0);
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
                  
    { data.map((dat,index)=><p key={index}>{dat.awbno}</p>)} 
    {errorMessage()}
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
    </div>
  )

}

export default App;