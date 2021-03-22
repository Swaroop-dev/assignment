import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Left=({events})=>{



  const classes = useStyles();
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

  


  const ifDisplay=(events)=>{
    
    
    if (events!=undefined){
      const {scan}=events;
      console.log(scan)
      return(scan.forEach((scans)=><p>{scans.time}{scans.status_detail}{scans.location}</p>))
      // console.log(events)
      // return <p>hello</p>
    }    
  }
  if (events==undefined){
    console.log(events)
    return <p>not data</p>
  }


  return (
    <div className={classes.root}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
      {ifDisplay()}
    </div>
  );
}

export default Left
