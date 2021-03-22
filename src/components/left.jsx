import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import  './left.css'
import {Grid} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Left=({events})=>{


  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });



  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  





  return (
    <Grid>
      <div className="progress-bar">
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer}  />
      {events.scan.map((s)=><tr><td>{s.to}</td><td>{s.location}</td><td>{s.status_detail}</td><td>{s.time}</td></tr>)}
    </div>
    </Grid>
    
  );
}

export default Left
