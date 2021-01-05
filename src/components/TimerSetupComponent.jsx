import React from 'react'

const TimerSetupComponent = ({
  time,
  setTime,
  label,
  type,
  prefix,
  isTimerRunning,
  timeLeft
}) => {
  React.useEffect(() => {
    if (prefix === "session") {
      timeLeft.current = time * 60;
    }
    // eslint-disable-next-line
  }, [time]);

  return (
    <div className='timer-setup'>
      <div id={`${prefix}-label`}>{label}</div>
      <div className="controls">
        <button
          id={`${prefix}-decrement`}
          onClick={() => setTime(time - 1 > 0 ? time - 1 : 1)}
          disabled={isTimerRunning}
        >
          <i class="fa fa-minus" />
        </button>
        <h3 id={`${prefix}-length`}>{time}</h3>
        <button
          id={`${prefix}-increment`}
          onClick={() => {
            setTime(time < 60 ? time + 1 : 60);
          }}
          disabled={isTimerRunning}
        >
          <i class="fa fa-plus" />
        </button>
      </div>
    </div>
  );
};

export default TimerSetupComponent;