const Countries = ({ countriesToShow, showHandler }) => {
  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches. Specify another filter.
      </div>
    )
  } else if (countriesToShow.length == 1) {

    const country = countriesToShow[0]

    return (      
      <div>
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}<br />
            area {country.area}</p>
            <h3>languages</h3>
            <ul>
              { 
                Object.values(country.languages).map(
                  language => <li key={language}>{language}</li> 
                )
              }
            </ul>
            <img src={Object.values(country.flags)[0]} width="150"/>
          </div>
      </div>
    )

  } else if (countriesToShow.length == 0) {
    return (
      <div>
        No results with that search parameter.
      </div>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country => 
          <div key={country.name.common}>
            <div>{country.name.common} <button onClick={() => showHandler(country.name.common)}>show</button></div>
        </div>
        )}
      </div>
    )
  }
}

export default Countries

