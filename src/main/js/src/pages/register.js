import React, { useState } from 'react'
import { useHistory } from 'react-router'
import CheckBox from '../components/FormElements/CheckBox'
import InputField from '../components/FormElements/InputField'
import Center from '../components/Layout/Center'
import Main from '../components/Layout/Main'
import { useAuth } from '../utils/Auth'
import * as yup from 'yup'

const schema = yup.object().shape({
  ime: yup.string().required(),
  prezime: yup.string().required(),
  korisnickoIme: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  telefon: yup.string().required(),
  datumRodjenja: yup.date().max('2021-06-05').min('1900-06-05').required(),
  budiTrener: yup.bool().required(),
})
const inputFields = {
  ime: '',
  prezime: '',
  korisnickoIme: '',
  email: '',
  password: '',
  telefon: '',
  datumRodjenja: '',
  budiTrener: '',
}

function Register() {
  const history = useHistory()
  const { register, error } = useAuth()
  const [data, setData] = useState({
    ...inputFields,
    budiTrener: false,
    datumRodjenja: '2021-06-09',
  })
  const [inputErrors, setInputErrors] = useState({ ...inputFields })

  return (
    <Main>
      <Center style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div
          className='m-auto p-4 rounded-3 shadow-sm card'
          style={{ width: '360px' }}
        >
          <h2>Registruj se</h2>
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}
          <form>
            <InputField
              id='ime'
              value={data.ime}
              onChange={(v) => setData({ ...data, ime: v })}
              variant='floating'
              label='Ime'
              error={inputErrors.ime}
            ></InputField>
            <InputField
              id='prezime'
              value={data.prezime}
              onChange={(v) => setData({ ...data, prezime: v })}
              variant='floating'
              label='Prezime'
              error={inputErrors.prezime}
            ></InputField>
            <InputField
              id='korisnickoIme'
              value={data.korisnickoIme}
              onChange={(v) => setData({ ...data, korisnickoIme: v })}
              variant='floating'
              label='Korisnicko Ime'
              error={inputErrors.korisnickoIme}
            ></InputField>
            <InputField
              id='email'
              value={data.email}
              onChange={(v) => setData({ ...data, email: v })}
              variant='floating'
              label='Email'
              error={inputErrors.email}
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
            <InputField
              id='telefon'
              variant='floating'
              label='Telefon'
              value={data.telefon}
              onChange={(v) => setData({ ...data, telefon: v })}
              error={inputErrors.telefon}
            ></InputField>
            <InputField
              type='date'
              id='datumRodjenja'
              variant='floating'
              label='Datum rođenja'
              value={data.datumRodjenja}
              onChange={(v) => setData({ ...data, datumRodjenja: v })}
              error={inputErrors.datumRodjenja}
            ></InputField>
            <CheckBox
              id='budiTrener'
              checked={data.budiTrener}
              onChange={(v) => setData({ ...data, budiTrener: v })}
              error={inputErrors.budiTrener}
              label='Registruj se kao trener'
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
                  schema
                    .validate(data, { abortEarly: false })
                    .then((valid) => {
                      register({
                        ime: data.ime,
                        prezime: data.prezime,
                        telefon: data.telefon,
                        korisnickoIme: data.korisnickoIme,
                        lozinka: data.password,
                        email: data.email,
                        datumRodjenja: data.datumRodjenja,
                        uloga: data.budiTrener ? 'TRENER' : 'CLAN',
                      })
                        .then((data) => {
                          console.log(data)
                          if (data) history.push('/login')
                        })
                        .catch((err) => {
                          console.log(err)
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
                {' '}
                Registruj se
              </button>
            </div>
          </form>
        </div>
      </Center>
    </Main>
  )
}

export default Register
