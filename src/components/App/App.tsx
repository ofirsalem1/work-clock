import ReactCountdownCircleTimer from "../ReactCountdownCircleTimer/ReactCountdownCircleTimer";
import ReactCountdownHook from "../ReactCountdownHook/ReactCountdownHook";
import Timer from "../Timer/Timer";
import "./app.css";
function App() {
  return (
    <>
      <h1 className="title"> Work Clock </h1>
      <Timer initialMinute={10} initialSeconds={2} />
      <ReactCountdownHook />
      <ReactCountdownCircleTimer />
    </>
  );
}

export default App;
