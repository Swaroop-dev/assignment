import React from 'react'


const Right=({data1})=>{
    return (
        <div>
            {data1.map((dat,index)=><p key={index}>{dat.awbno}{dat.carrier}{dat.from}{dat.to}{dat.current_status}</p>)}
        </div>
    )
}

export default Right
