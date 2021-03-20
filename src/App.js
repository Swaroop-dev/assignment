
import './App.css';
import {useEffect,useState} from 'react';
import React from "react-dom";

const App=()=>{
  const [data,setData]=useState([])
  const [error,setError]=useState({isError:"false",errormessage:""})
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
        console.log(data1)
        if(data1?.message){
          console.log(data1.message)
          setError({isError:"true",errormessage:data1.message})
        }
        else {
          setData([...data,data1])
          }
      })
      .catch((err) => console.log(err))
    }
    preload();
  },[])

  const errorMessage=()=>{
    return(
      <div>
        <h1>{error.errormessage}</h1>
      </div>
    )
  }

  const dataMessage=()=>{
    data.forEach((d)=>{
      return(
        <li>
          {d.awbno}
        </li>
      )
    })
  }


  return(
    <div>
      {error.isError?errorMessage():dataMessage()}
    </div>
  )

}

export default App;