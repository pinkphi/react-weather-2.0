import './App.css';
import Weather from'./Weather';

function App() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Weather />
      <footer>
        This project was coded by <a href="https://portafolio-pamela.netlify.app" 
        target="_blank"
        rel="noreferrer"
        >
          PinkPhi</a> - {" "}
        <a href="https://github.com/pinkphi/react-weather-2.0"
        target="_blank"
        rel="noreferrer"
        >
          open-sourced on Github 
        </a>
      </footer>
    </div>
  );
}

export default App;
