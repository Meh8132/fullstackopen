import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = ({ target }) => {
    setFilter(target.value.toLowerCase())
  }

  const showCountry = (countryName) => {
    setFilter(countryName.toLowerCase())
  }

  useEffect(() => {
    axios
      .get(COUNTRIES_API_URL)
      .then(({ data }) => setCountries(data))
  }, [])

  const countriesToShow = filter === ''
    ? []
    : countries.filter(({ name }) => name.common.toLowerCase().includes(filter))

  return (
    <div>
      <div>
        find countries
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        <Countries
          countries={countriesToShow}
          onShowCountry={showCountry}
        />
      </div>
    </div>
  )
}

export default App