import { useState, useEffect } from "react";
import "./App.css";
import countries from "i18n-iso-countries";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureLow, faTemperatureHigh, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function App() {
  // state to store the API data and input 
  const [apiData, setApiData] = useState({});  // state to store the response
  const [getState, setGetState] = useState("Irvine, USA");   // to store the location name from input field
  const [state, setState] = useState("Irvine, USA");     // to store a copy of the getState - this will be helpful in updating state on button click

  // variables to store the API Key and URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;  // to store the URL that calls the location from getState and also apiKey.

  // Side effect 
  useEffect(() => {
    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => setApiData(data));
  }, [apiUrl]);

  // handle the input field, to get the data and store in getState
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  // copy the state from getState to state
  const submitHandler = () => {
    setState(getState);
  };

  // convert kelvin to celcius to farenheit with no decimals
  const kelvinToFahrenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label for="location-name" className="col-form-label">
              Enter Location :
            </label>
          </div>
          <div className="col-auto">
            <input type="text" id="location-name" className="form-control" onChange={inputHandler} value={getState} />
            <button className="btn btn-primary mt-2" onClick={submitHandler}>
              Search
            </button>
          </div>
        </div>
        <div className="card mt-3 mx-auto">
          {/* Is it true data coming in from open weather based on input location */}
          {apiData.main
          ? (<div className="card-body text-center">
                <img 
                  src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} 
                  alt="weather status icon"
                  className="weather-icon" />
                <p className="h2">{kelvinToFahrenheit(apiData.main.temp)}&deg; F</p>
                <p className="h5">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="fas fa-1x mr-2 text-dark" />{' '}
                    <strong>{apiData.name}</strong>
                </p>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <p>
                      <FontAwesomeIcon
                        icon={faTemperatureLow}
                        className="fas fa-1x mr-2 text-primary" 
                      />{' '}
                      <strong>{kelvinToFahrenheit(apiData.main.temp_min)}&deg; F</strong> 
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faTemperatureHigh}
                        className="fas fa-1x mr-2 text-danger" 
                      />{' '}
                      <strong>{kelvinToFahrenheit(apiData.main.temp_max)}&deg; F</strong> 
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {' '}
                      <strong>{apiData.weather[0].main}</strong>
                    </p>
                    <p>
                      <strong>
                        {' '}
                        {countries.getName(apiData.sys.country, 'en', {
                          select: 'official',
                        })}
                      </strong>
                    </p>
                  </div>
                </div>
          </div>)  /* Load data if true */
          : (<h1>Loading...</h1>)}  {/* Output message if false */}
        </div>
      </div>
      <footer className="footer">
        &copy; React Weather App
      </footer>
    </div>
  )
}

export default App;