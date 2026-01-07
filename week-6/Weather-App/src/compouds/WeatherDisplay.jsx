// src/components/WeatherDisplay.jsx
const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="mt-4">
      <h2 className="h4 text-secondary">
        {weather.location.name}, {weather.location.country}
      </h2>
      
      <div className="d-flex justify-content-center align-items-center my-3">
        <img 
          src={weather.current.condition.icon} 
          alt="weather icon" 
          style={{ width: '64px', height: '64px' }}
        />
        <span className="display-4 fw-bold ms-2">
          {weather.current.temp_c}°C
        </span>
      </div>
      
      <p className="lead text-capitalize mb-4">
        {weather.current.condition.text}
      </p>

      <div className="row">
        <div className="col-6">
          <div className="p-2 border rounded bg-light">
            <small className="d-block text-muted">Humidity</small>
            <strong>{weather.current.humidity}%</strong>
          </div>
        </div>
        <div className="col-6">
          <div className="p-2 border rounded bg-light">
            <small className="d-block text-muted">Wind</small>
            <strong>{weather.current.wind_kph} km/h</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;