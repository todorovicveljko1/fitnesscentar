import React, { createContext, useContext, useEffect, useState } from 'react'

export const authContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (localStorage.getItem('token') && !user) {
      setLoading(true)
      fetch('http://localhost:8080/api/me', {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setUser(json)
          setLoading(false)
        })
        .catch((err) => console.log(err))
    }
  }, [user])
  const login = (usernameOrEmail, pass) => {
    setLoading(true)
    return fetch('http://localhost:8080/api/prijava', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        korisnickoImeIliEmail: usernameOrEmail,
        lozika: pass,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem('token', json.id)
        setUser(json)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }
  const register = () => {}
  const logout = () => {}
  return (
    <authContext.Provider value={{ user, loading, login }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
