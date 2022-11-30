import { useState, useEffect } from 'react'
import Filter from './components/filter'
import axios from 'axios'
import CountryList from './components/countryList'
import Country from './components/country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [nameToSearch, setNameToSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleNameSearch = (event) => {
    setNameToSearch(event.target.value)
  }

  const filterThisCountry = (country) => {
    setNameToSearch(country)
  }

  const countriesToShow = countries.filter((c) => c.name.common.toLocaleLowerCase().includes(nameToSearch.toLocaleLowerCase()))

  const renderCountries = () => {
    if (countriesToShow.length > 10) {
      return <div>Too many countries to show</div>
    }

    if (countriesToShow.length < 10 && countriesToShow.length > 1) {
      return <CountryList countries={countriesToShow} showCountryHandler={filterThisCountry}></CountryList>
    }

    if (countriesToShow.length === 1) {
      return <Country country={countriesToShow[0]}></Country>
    }
  }

  return (
    <div>
      <Filter searchTerm={nameToSearch} handler={handleNameSearch}></Filter>
      {renderCountries()}
    </div>
  )
}

export default App
