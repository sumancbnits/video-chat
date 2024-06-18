import logo from './logo.svg';
import './App.css';
import JitsiMeet from './chat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <JitsiMeet roomName={"7229c1b3-1f39-4eaf-87e1-3353bc6acbad"} displayName={"User"} />
        </a>
      </header>
    </div>
  );
}

export default App;
