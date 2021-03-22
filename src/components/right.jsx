import React from 'react'


const Right=({data1})=>{
    return (
        <div>        
            {data1.map((dat)=><tr> <td style={{margin:5}}>{dat.awbno}</td><td style={{margin:5}}>{dat.carrier}</td><td style={{margin:5}}>{dat.from}</td><td style={{margin:5}}>{dat.to}</td><td style={{margin:5}}>{dat.current_status}</td></tr>)}
        </div>
    )
}

export default Right
