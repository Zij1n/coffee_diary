import React from "react";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
export default function MyTimer({ probs }) {
  let sec = probs.time;
  let step = probs.step;
  let handleExpire = probs.expirecb;
  //   console.log(expiryTimestamp)\
  const time = new Date();
  time.setSeconds(time.getSeconds() + sec);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    // expiryTimestamp: ,
    autoStart:false,
    onExpire: () => {
      console.warn("onExpire called");
      handleExpire()
    },
  });
  
  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time,false);
  }, [sec]);

  return (
    <div style={{ textAlign: "center" }}>
      <p>Current Step:</p>
      <h1>{step}</h1>
      <p></p>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      <ButtonGroup size="small">
        {/* <Button onClick={start}>Start</Button> */}
        <Button onClick={resume}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button
          onClick={() => {
            // Restarts to 5 minutes timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + 30);
            restart(time,false);
            
          }}
        >
          Restart
        </Button>
      </ButtonGroup>
    </div>
  );
}

// export default function App() {
//   const time = new Date();
//   time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
//   return (
//     <div>
//       <MyTimer expiryTimestamp={time} />
//     </div>
//   );
// }
