import React, { createContext, useContext, useEffect, useState } from 'react'

export const authContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  // Ako imamo token cekamo da se korisnik ucita ako nemamo nista ne cekamo
  const [loading, setLoading] = useState(!!localStorage.getItem('token'))
  useEffect(() => {
    if (localStorage.getItem('token') && !user) {
      setLoading(true)
      fetch('http://localhost:8080/api/me', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setUser(json)
          setLoading(false)
          return json
        })
        .catch((err) => {
          localStorage.removeItem('token')
          console.log(err)
        })
    }
  }, [user])
  const login = (username, pass) => {
    return fetch('http://localhost:8080/api/authenticate', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        korisnickoIme: username,
        lozika: pass,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          setError('Losa kombinacija korisničkog imena i lozinke')
          throw new Error()
        }
      })
      .then((json) => {
        setLoading(true)
        localStorage.setItem('token', json.token)
        return fetch('http://localhost:8080/api/me', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((res) => res.json())
          .then((json) => {
            setUser(json)
            setError(null)
            setLoading(false)
            return json
          })
          .catch((err) => {
            throw err
          })
      })
      .catch((err) => {
        return { error: err }
      })
  }
  const register = (podaci) => {
    return fetch('http://localhost:8080/api/registracija', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(podaci),
    })
      .then((res) => {
        setError(null)
        return res.json()
      })
      .catch((err) => {
        setError('Korisnik sa korisničkim imenom ili emajlom vec postoji')
      })
  }
  const updateMe = (data) => {
    return fetch('http://localhost:8080/api/me', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setUser(json)
        setError(null)
        return json
      })
      .catch((err) => {
        setError(err)
      })
  }
  const logout = () => {
    setLoading(true)
    setUser(null)
    localStorage.removeItem('token')
    setLoading(false)
  }
  const hasRole = (uloga) => {
    return !loading && user && user.uloga == uloga
  }
  return (
    <authContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        hasRole,
        error,
        updateMe,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
