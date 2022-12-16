import './App.css';
import useMouseLocation from "./hooks/useMouseLocation";
import useNow from './hooks/useNow';
import useSimpleTimer from './hooks/useSimpleTimer';
import useTimer from './hooks/useTimer';

function App() {

  const mouseLocation = useMouseLocation();
  const currentTime = useNow();
  const simpleTimerValue = useSimpleTimer();
  const { timerValue, paused, setPaused, resetTimer } = useTimer();

  const togglePaused = () => setPaused(!paused);

  return (
    <div className="App">

      <div>X: {mouseLocation.x}, Y: {mouseLocation.y}</div>

      <div>Time: {currentTime}</div>

      <div>Time Spent In Seconds: {simpleTimerValue}</div>

      <div>
        <h1>Time Spent In Seconds: {timerValue}</h1>
        <button onClick={togglePaused}>{paused ? 'Resume' : 'Pause'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

    </div>
  );
}

export default App;
