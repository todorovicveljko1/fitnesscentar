import React, { createContext, useContext, useEffect, useState } from 'react'

export const authContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
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
        .catch((err) => console.log(err))
    }
  }, [user])
  const login = (username, pass) => {
    setLoading(true)
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
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem('token', json.token)
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
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }
  const register = (podaci) => {
    setLoading(true)
    return fetch('http://localhost:8080/api/registracija', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(podaci),
    })
      .then((res) => {
        setLoading(false)
        return res.json()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
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
      value={{ user, loading, login, logout, register, hasRole }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
