import React from 'react'

const Timer = ({
  breakLength,
  sessionLength,
  setBreakLength,
  setSessionLength,
  breakLabel,
  sessionLabel,
  isTimerRunning,
  setIsTimerRunning,
  isSession,
  setIsSession,
  timeLeft
}) => {
  const timeLeftRef = React.useRef(null);
  const intervalId = React.useRef(null);
  const timerLabelRef = React.useRef(null);

  const playBeep = () => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.play();
  };

  const initializeTimer = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
    clearInterval(intervalId.current);
    setIsTimerRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    timeLeftRef.current.innerText = formatTime(25 * 60);
    timeLeft.current = 0;
  };

  const startAndStopTimer = () => {
    if (!isTimerRunning) {
      timeLeft.current = timeLeft.current
        ? timeLeft.current
        : isSession
        ? sessionLength * 60
        : breakLength * 60;

      intervalId.current = setInterval(() => {
        timeLeftRef.current.innerText = formatTime(--timeLeft.current);

        if (timeLeft.current === 0) {
          clearInterval(intervalId.current);
          playBeep();
          // change session
          timerLabelRef.current.innerText === "Session"
            ? setIsSession(false)
            : setIsSession(true);
          timeLeft.current =
            timerLabelRef.current.innerText === "Session"
              ? sessionLength * 60 + 1
              : breakLength * 60 + 1;
          startAndStopTimer();
        }
      }, 1000);
    } else {
      clearInterval(intervalId.current);
    }
    isTimerRunning ? setIsTimerRunning(false) : setIsTimerRunning(true);
  };

  const formatTime = (numberOfSeconds = 25 * 60) => {
    let timeInSeconds = Math.floor(numberOfSeconds % 60);
    let timeInMinutes = Math.floor(numberOfSeconds / 60);

    return `${timeInMinutes < 10 ? "0" + timeInMinutes : timeInMinutes}:${
      timeInSeconds < 10 ? "0" + timeInSeconds : timeInSeconds
    }`;
  };

  return (
    <>
      <div className="timer">
        <h2 id="timer-label" ref={timerLabelRef}>
          {isSession ? sessionLabel : breakLabel}
        </h2>

        <h2 id="time-left" ref={timeLeftRef}>
          {formatTime(sessionLength * 60)}
        </h2>

        <div className="controls">
          <button id="start_stop" onClick={startAndStopTimer} className={`${isTimerRunning ? 'playing' : null}`}>
            <i className={`fa fa-${isTimerRunning? 'pause' : 'play'}`} />
          </button>

          <button id="reset" onClick={initializeTimer}>
            <i className="fa fa-sync-alt" />
          </button>
        </div>
      </div>
    </>
  );
};


export default Timer;