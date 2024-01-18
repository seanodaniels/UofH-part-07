import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
  // Initialize the list of countries.
  useEffect(() => {
    const findIt = async () => {
      const response = await axios.get(`${baseUrl}/api/all`)
      const foundCountry = response.data.filter(r => r.name.common.toLowerCase().includes(name.toLowerCase()))
      if (foundCountry.length === 1) {
        console.log('foundcountry:', foundCountry[0])
        setCountry({ ...foundCountry[0], found: true})
      } else {
        setCountry({ ...null, found: false})
      }
    }
    findIt()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )
}



const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const [countriesList, setCountriesList] = useState([])
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App