import React from 'react';
import ReactDOM from 'react-dom';

import TimerSetupComponent from './components/timer-setup/TimerSetupComponent';
import Timer from './components/timer/TimerComponent';

import './App.css';
  
  const App = () => {
    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLength] = React.useState(25);
    const [isTimerRunning, setIsTimerRunning] = React.useState(false);
    const [isSession, setIsSession] = React.useState(true);
    const timeLeft = React.useRef(null);
  
    return (
      <>
        <h1>Pomodoro Clock</h1>
        <div className='timer-controls'>
  
          <TimerSetupComponent
            label="Break Length"
            time={breakLength}
            setTime={setBreakLength}
            prefix="break"
            isTimerRunning={isTimerRunning}
            timeLeft={timeLeft}
          />
          <TimerSetupComponent
            label="Session Length"
            time={sessionLength}
            setTime={setSessionLength}
            prefix="session"
            isTimerRunning={isTimerRunning}
            timeLeft={timeLeft}
          />
        </div>
  
        <Timer
          {...{
            breakLength,
            sessionLength,
            setBreakLength,
            setSessionLength,
            breakLabel: "Break",
            sessionLabel: "Session",
            isTimerRunning,
            setIsTimerRunning,
            isSession,
            setIsSession,
            timeLeft
          }}
        />
  
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </>
    );
  };
  
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
