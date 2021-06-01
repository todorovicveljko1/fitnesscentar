import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/FormElements/InputField'
import CheckBox from '../components/FormElements/CheckBox'
import Center from '../components/Layout/Center'
import Main from '../components/Layout/Main'
import { useAuth } from '../utils/Auth'

function Login() {
  const history = useHistory()
  const { login } = useAuth()
  const [emailUsername, setEmailUsername] = useState('')
  const [password, setPassword] = useState('')
  const [zapamtiMe, setZapamtiMe] = useState(false)
  return (
    <Main>
      <Center style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div
          className='m-auto p-4 rounded-3 shadow-sm card'
          style={{ width: '360px' }}
        >
          <h2>Prijavi se</h2>
          <form>
            <InputField
              id='email_username'
              label='Email ili korisničko ime'
              variant='floating'
              value={emailUsername}
              onChange={setEmailUsername}
            ></InputField>
            <InputField
              type='password'
              id='password'
              variant='floating'
              label='Lozinka'
              value={password}
              onChange={setPassword}
            ></InputField>
            <CheckBox
              id='zapanti_me'
              checked={zapamtiMe}
              label='Zapamti me'
              onChange={setZapamtiMe}
            ></CheckBox>

            <div className='d-flex justify-content-between'>
              <button
                className='btn btn-secondary'
                onClick={() => {
                  history.push('/')
                }}
              >
                Otkaži
              </button>
              <button
                className='btn btn-primary'
                onClick={(e) => {
                  e.preventDefault()
                  login(emailUsername, password).then((r) => {
                    console.log('LOGIN')
                  })
                  history.push('/')
                }}
              >
                Prijavi se
              </button>
            </div>
          </form>
        </div>
      </Center>
    </Main>
  )
}

export default Login
