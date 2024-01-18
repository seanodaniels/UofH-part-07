import { useState, useEffect } from 'react'
import countriesService from './services/countries.js'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')

  const hook = () => {
      countriesService
        .retrieve()
        .then(initialCountries => {
          setCountries(initialCountries)
      })
  }
  useEffect(hook, [filterName])

  const handleNameFilter = (event) => {
    setFilterName(event.target.value)
  }
  
  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(filterName.toLowerCase())
  )

  const showHandler = (value) => {
    setFilterName(value)
  }

  return (
    <div>
      <Filter value={filterName} changeThing={handleNameFilter} />
      <Countries countriesToShow={countriesToShow} showHandler={showHandler} />
    </div>
  )
}

export default App
