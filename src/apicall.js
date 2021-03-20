// import axios from "axios"



export const apiCall=()=>{
    return fetch('https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch',{
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer tTU3gFVUdP`,
        },
        body:{
            "email":"mayankmittal@intugine.com"
        } 
    }
    )
}
