import React, { useMemo } from 'react'
import queryString from 'query-string'

import { useLocation } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

import { HeroCard } from '../heroes/HeroCard'
import { getHeroesByName } from '../../selectors/getHeroesByName'

export const SearchScreen = ({ history }) => {

  const { search } = useLocation()
  const { q = '' } = queryString.parse(search)

  const [values, handleInputChange] = useForm({
    searchQuery: q
  })

  const herosFiltered = useMemo(() => getHeroesByName(q), [q])

  const handleSearch = (e) => {
    e.preventDefault()

    history.push(`?q=${values.searchQuery}`)
  }

  return (
    <div>

      <div className="row">

        <div className="col-5">
          <h4>Search Form</h4>
          <hr />

          <form onSubmit={handleSearch}>

            <input
              autoComplete="off"
              className="form-control"
              name="searchQuery"
              onChange={handleInputChange}
              placeholder="Find your hero"
              spellCheck="false"
              type="text"
              value={values.searchQuery}
            />

            <button type="submit" className="m-1 btn btn-outline-primary btn-block">
              Search
            </button>

          </form>
        </div>

        <div className="col-7">

          <h4>Search Results</h4>
          <hr />

          {(q === '') && (
            <div className="alert alert-info">Search a hero</div>
          )}

          {(q !== '' && herosFiltered.length === 0) && (
            <div className="alert alert-danger">
              There is no a hero with the name: {q}
            </div>
          )}

          {
            herosFiltered.map(hero => (
              <HeroCard
                key={hero.id}
                {...hero}
              />
            ))
          }

        </div>

      </div>
    </div>
  )
}
