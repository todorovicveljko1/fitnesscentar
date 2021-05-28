import React from 'react'
import { useHistory } from 'react-router-dom'
import Center from '../components/Layout/Center'
import Main from '../components/Layout/Main'

function Login() {
  const history = useHistory()
  return (
    <Main>
      <Center style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div
          className='m-auto p-4 rounded-3 shadow-sm card'
          style={{ width: '360px' }}
        >
          <h2>Prijavi se</h2>
          <form>
            <div className='mb-3 form-floating'>
              <input
                type='text'
                className='form-control'
                id='email_username'
                aria-describedby='emailHelp'
                placeholder='Email ili korisničko ime'
              />
              <label htmlFor='email_username' className='form-label'>
                Email ili korisničko ime:
              </label>
            </div>
            <div className='mb-3 form-floating'>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='lozinka'
              />
              <label htmlFor='password' className='form-label'>
                Lozinka:
              </label>
            </div>
            <div className='mb-3 form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                id='zapanti_me'
              />
              <label className='form-check-label' htmlFor='zapmanti_me'>
                Zapamti me
              </label>
            </div>
            <div className='d-flex justify-content-between'>
              <button
                className='btn btn-dark'
                onClick={() => {
                  history.push('/')
                }}
              >
                Otkaži
              </button>
              <button className='btn btn-primary'>Prijavi se</button>
            </div>
          </form>
        </div>
      </Center>
    </Main>
  )
}

export default Login
