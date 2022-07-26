import useCountDown from "react-countdown-hook";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
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
const getTimeMinutes = (time: number) =>
  ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;

const ReactCountdownHook = () => {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 3603; // use UNIX timestamp in seconds
  const remainingTime = endTime - stratTime;
  const [key, setKey] = useState(0);
  const [timeLeft, actions] = useCountDown(10000, 100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [initialRemainingTime, setInitialRemainingTime] = useState(
    remainingTime % minuteSeconds
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>ReactCountdownHook</h1>
      <CountdownCircleTimer
        {...timerProps}
        isPlaying={isPlaying}
        colors="#D14081"
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        isPlaying={isPlaying}
        colors="#EF798A"
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>

      <CountdownCircleTimer
        isPlaying={isPlaying}
        {...timerProps}
        colors="#218380"
        duration={minuteSeconds}
        initialRemainingTime={initialRemainingTime}
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
      <button
        id="start"
        style={{ marginRight: "10px" }}
        onClick={() => {
          actions.start();
          setIsPlaying(true);
        }}
      >
        Start
      </button>
      <button
        id="pause"
        style={{ marginRight: "10px" }}
        onClick={() => {
          actions.pause();
          setIsPlaying(false);
        }}
      >
        Pause
      </button>
      <button
        id="restart"
        style={{ marginRight: "10px" }}
        onClick={() => {
          actions.start(30000);
          setInitialRemainingTime(30);
          setKey((prevKey) => prevKey + 2);
        }}
      >
        Restart with 30s
      </button>
      <button id="reset" onClick={() => actions.reset()}>
        Reset
      </button>
    </div>
  );
};

export default ReactCountdownHook;
