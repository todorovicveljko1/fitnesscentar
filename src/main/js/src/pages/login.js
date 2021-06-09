import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/FormElements/InputField'
import CheckBox from '../components/FormElements/CheckBox'
import Center from '../components/Layout/Center'
import Main from '../components/Layout/Main'
import { useAuth } from '../utils/Auth'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})
const inputFields = {
  username: '',
  password: '',
}

function Login() {
  const history = useHistory()
  const { login, error } = useAuth()
  const [data, setData] = useState({
    ...inputFields,
  })
  const [inputErrors, setInputErrors] = useState({ ...inputFields })
  return (
    <Main>
      <Center style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div
          className='m-auto p-4 rounded-3 shadow-sm card'
          style={{ width: '360px' }}
        >
          <h2>Prijavi se</h2>
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}
          <form>
            <InputField
              id='email_username'
              label='Korisničko ime'
              variant='floating'
              value={data.username}
              onChange={(v) => setData({ ...data, username: v })}
              error={inputErrors.username}
            ></InputField>
            <InputField
              type='password'
              id='password'
              variant='floating'
              label='Lozinka'
              value={data.password}
              onChange={(v) => setData({ ...data, password: v })}
              error={inputErrors.password}
            ></InputField>
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
                  schema
                    .validate(data, { abortEarly: false })
                    .then((valid) => {
                      login(data.username, data.password).then((r) => {
                        if (!r.error) history.push('/')
                      })
                    })
                    .catch((err) => {
                      let es = {}
                      for (e of err.inner) {
                        es[e.path] = e.message
                      }
                      setInputErrors({ ...inputFields, ...es })
                    })
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
