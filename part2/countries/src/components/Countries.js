import Country from './Country'

const Countries = ({ countries, onShowCountry: handleShowCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(({ name }) => {
          const countryName = name.common
          return (
            <div key={countryName}>
              <span>{countryName}</span>
              <button onClick={() => handleShowCountry(countryName)}>show</button>
            </div>
          )
        })}
      </div>
    )
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return <div>No matching country found!</div>
}

export default Countries