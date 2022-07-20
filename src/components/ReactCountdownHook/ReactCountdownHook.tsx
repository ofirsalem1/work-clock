import useCountDown from "react-countdown-hook";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const buttonStyle = { marginRight: "10px" };

const minuteSeconds = 60;
const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};
const renderTime = (dimension: any, time: number) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};
const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;

const ReactCountdownHook = () => {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243248; // use UNIX timestamp in seconds
  const remainingTime = endTime - stratTime;

  const [timeLeft, actions] = useCountDown(10000, 100);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>ReactCountdownHook</h1>
      <CountdownCircleTimer
        {...timerProps}
        colors="#218380"
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("seconds", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>

      <h1 id="time-left">{(timeLeft / 1000).toFixed(0)}</h1>
      <button id="start" style={buttonStyle} onClick={() => actions.start()}>
        Start
      </button>
      <button
        id="restart"
        style={buttonStyle}
        onClick={() => actions.start(4200)}
      >
        Restart with 4.2s
      </button>
      <button id="pause" style={buttonStyle} onClick={() => actions.pause()}>
        Pause
      </button>
      <button id="resume" style={buttonStyle} onClick={() => actions.resume()}>
        Resume
      </button>
      <button id="reset" onClick={() => actions.reset()}>
        Reset
      </button>
    </div>
  );
};

export default ReactCountdownHook;
