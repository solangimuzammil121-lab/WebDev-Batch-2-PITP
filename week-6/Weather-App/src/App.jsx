import { useState } from 'react'
import './App.css'

function App() {
  const [weather, setWeather ] = useState()
  const [city, setCity] = useState("")

  const apiKey = '3aa4bf838d804c0cb33120407240902'
  const fetchWeather = async () => {

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
    
    const data = await response.json()

    setWeather(data)

    }

  return (
    <>
    <input type='text' value={city} placeholder='enter a city name ...'
     onChange={ (event)=>setCity(event.target.value) }></input>
     <h1>{weather?.location.name}</h1>
     <h2>Temperature: {weather?.current.temp_c} °C</h2>
     <h2>condition: <img src={weather?.current.condition.icon} /> {weather?.current.condition.text}</h2>
     <button type='button' onClick={fetchWeather}> Show Weather</button>
    </>
  )
}

export default App
 