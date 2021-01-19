import React, { useContext, useState } from 'react'

import { AuthContext } from '../../auth/AuthContext'
import { useForm } from '../../hooks/useForm'
import { types } from '../../types/types'

export const LoginScreen = ({ history }) => {

  const [values, handleInputChange] = useForm({ name: '' })
  const [error, setError] = useState(false)
  const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()

    if (values.name.length < 1) {
      setError(true)
      return
    } else {
      setError(false)
    }

    const lastPath = localStorage.getItem('lastPath') || '/'

    dispatch({
      type: types.login,
      payload: {
        name: values.name
      }
    })

    /* EL push manda al historial una nueva ruta */
    history.push(lastPath)

    /* 
      history.replace('/')

      El history replace, reemplaza la url actual, por consecuencia no se guarda en el historial.
    */
  }

  return (
    <div className="container mt-3">
      <h1>Login</h1>
      <small className="text-muted">
        This information only is for learning porpuses.
      </small>
      <hr />

      <div style={{ maxWidth: 300 }}>
        <form onSubmit={handleLogin}>

          <label htmlFor="name" className="text-dark">Your name: </label>

          <input
            autoComplete="off"
            className="form-control"
            type="text"
            name="name"
            id="name"
            spellCheck="false"
            placeholder="Your name"
            onChange={handleInputChange}
            value={values.name}
          />

          {(error) && (
            <div className="alert alert-danger mt-2 animate__animated animate__fadeIn">
              Please provide a valid name.
            </div>
          )}

          <button type="submit" className="btn btn-outline-primary mt-3">
            Login
          </button>

        </form>
      </div>

    </div>
  )
}
