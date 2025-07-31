import { useState, useRef  } from "react"
     // let timer;

export default function TimerChallange( {title, targetTime}) {
    const timer = useRef();
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, settimeExpired] = useState(false);



    function handleStart(){
       
         timer.current = setTimeout(() => {settimeExpired(true);}, targetTime * 1000);
         setTimerStarted(true);
    }

    function handleStop(){
        clearTimeout(timer.current);
    }

    return <section className="challenge">
        <h2>{title}</h2>

        {timerExpired && <p>you lost!</p>}
        <p className=" challange-time" >
            {targetTime} second {targetTime > 1 ? 's' : ''}

        </p>
        <button onClick={timerStarted ?  handleStop : handleStart }>
            {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
        <p className={timerStarted ? 'active' : undefined  }>
           {timerStarted ?' Timer is running...' :' Timer inactive' }
        </p>
    </section>
}