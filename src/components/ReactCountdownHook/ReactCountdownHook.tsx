import useCountDown from "react-countdown-hook";

const buttonStyle = { marginRight: "10px" };

const ReactCountdownHook = () => {
  const [timeLeft, actions] = useCountDown(10000, 100);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>ReactCountdownHook</h1>
      <h1 id="time-left">{(timeLeft / 1000).toFixed(2)}</h1>
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
