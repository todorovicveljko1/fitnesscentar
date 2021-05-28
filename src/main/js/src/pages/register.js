import React from 'react'
import { useHistory } from 'react-router'
import Center from '../components/Layout/Center'
import Main from '../components/Layout/Main'

function Register() {
  const history = useHistory()
  return (
    <Main>
      <Center style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div
          className='m-auto p-4 rounded-3 shadow-sm card'
          style={{ width: '360px' }}
        >
          <h2>Registruj se</h2>
          <form>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                id='ime'
                placeholder='Ime'
              />
              <label htmlFor='ime'>Ime</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                id='prezime'
                placeholder='Prezime'
              />
              <label htmlFor='prezime'>Prezime</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='name@example.com'
              />
              <label htmlFor='email'>Email address</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                id='korisnickoIme'
                placeholder='Korisnicko ime'
              />
              <label htmlFor='korisnickoIme'>Korisnicko Ime</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='lozinka'
              />
              <label htmlFor='password'>Lozinka</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                id='telefon'
                placeholder='Telefon'
              />
              <label htmlFor='password'>Telefon</label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='date'
                className='form-control'
                id='password'
                placeholder='Datum rođenja'
              />
              <label htmlFor='password'>Datum rođenja</label>
            </div>
            <div className='mb-3 form-check'>
              <input type='checkbox' className='form-check-input' id='trener' />
              <label className='form-check-label' htmlFor='trener'>
                Registruj se kao trener
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
              <button className='btn btn-primary'> Registruj se</button>
            </div>
          </form>
        </div>
      </Center>
    </Main>
  )
}

export default Register
