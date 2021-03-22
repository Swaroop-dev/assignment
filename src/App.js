
import  './App.css';
import logo from './logo.svg'
import {useEffect,useState} from 'react';
import React from "react-dom";
import {NativeSelect,FormControl,Button} from '@material-ui/core';
import Left from './components/left.jsx';
import Right from './components/right.jsx';

import { Card,
  CardContent,
  Grid
 } from '@material-ui/core';
import  Countup from "react-countup";



import Typography from '@material-ui/core/Typography';






const App=()=>{
  
  
  const [data,setData]=useState([])
  const [Awbno,setAwbno]=useState("")
  const [error,setError]=useState({isError:"false",errormessage:""})
  const [cur_status,setcur_status]=useState("DEL")
  

  
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
    <ul>
          <li><a href="#home"><img src={logo} className="App-logo" alt="logo" />Intugine</a></li>
          <li style={{float:"right"}}><a  class="active"href="#news">Home</a></li>
          <li style={{float:"right"}}><a href="#contact">Brand</a></li>
          <li style={{float:"right"}}><a  href="#about">Transporters</a></li>
  </ul>
    <div>
          <div>
        <Grid container spacing={3} justify="center" className="classGrid1" >
          <Grid item component={Card} xs={3} md={1} className="classGrid">
          <Button onClick={()=>setcur_status("DEX")}>
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
            </Button>
          </Grid>
           <Grid item component={Card} xs={3} md={1} className="classGrid" >
           <Button onClick={()=>setcur_status("INL")}>
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
            </Button>
          </Grid>
          <Grid item component={Card} xs={3} md={1} className="classGrid" >
            <Button onClick={()=>setcur_status("DEL")}>
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
            </Button>
          </Grid> 
          <Grid item component={Card} xs={3} md={1} className="classGrid" >
            <Button onClick={()=>setcur_status("OOD")}>
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
            </Button>
          </Grid> 
          <Grid item component={Card} xs={3} md={1} className="classGrid" >
            <Button onClick={()=>setcur_status("NFI")}>
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
            </Button>
          </Grid> 
        </Grid>
      </div >
      <table style={{offset:100}}>
        <th >
          <td>
    <FormControl >
             <NativeSelect default="" onChange={(e)=>setAwbno(e.target.value)}>
                 <option value="">global</option>
    {data.map((dat1,index)=><option value={dat1.awbno} key={index}>{dat1.awbno}</option>)} 
             </NativeSelect>
    </FormControl>
     </td>
    {/* <td>carrier</td>
    <td>from</td>
    <td>to</td>
    <td>status</td>  */}
    
    <Grid container spacing={3} >
        <Grid item xs={4}md={2} >
          awbno
        </Grid>
        <Grid item xs={4}md={2}>
          carrier
        </Grid>
        <Grid item xs={4}md={2}>
          from
        </Grid>
        <Grid item xs={4}md={2}>
          to
        </Grid>
        <Grid item xs={4}md={2}>
         status
        </Grid>
      </Grid>

    {Awbno==""?<Right data1={data.filter((d)=>d.current_status_code===cur_status)} />:<div> <Right data1={data.filter((d)=>(d.awbno==Awbno && d.current_status_code===cur_status))}/> <Left events={data.filter((d)=>d.awbno==Awbno)[0]}/>
      </div>}
      </th>
      </table>
    </div>
    </div>
  )

}

export default App;