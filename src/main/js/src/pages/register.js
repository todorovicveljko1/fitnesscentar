import React, { useState } from 'react'
import { useHistory } from 'react-router'
import CheckBox from '../components/FormElements/CheckBox'
import InputField from '../components/FormElements/InputField'
import Center from '../components/Layout/Center'
import Main from '../components/Layout/Main'

function Register() {
  const history = useHistory()
  const [ime, setIme] = useState('')
  const [prezime, setPrezime] = useState('')
  const [korisnickoIme, setKorisnickoIme] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telefon, setTelefon] = useState('')
  const [datumRodjenja, setDatumRodjenja] = useState('')
  const [budiTrener, setBudiTrener] = useState(false)

  return (
    <Main>
      <Center style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div
          className='m-auto p-4 rounded-3 shadow-sm card'
          style={{ width: '360px' }}
        >
          <h2>Registruj se</h2>
          <form>
            <InputField
              id='ime'
              value={ime}
              onChange={setIme}
              variant='floating'
              label='Ime'
            ></InputField>
            <InputField
              id='prezime'
              value={prezime}
              onChange={setPrezime}
              variant='floating'
              label='Prezime'
            ></InputField>
            <InputField
              id='korisnickoIme'
              value={korisnickoIme}
              onChange={setKorisnickoIme}
              variant='floating'
              label='Korisnicko Ime'
            ></InputField>
            <InputField
              id='email'
              value={email}
              onChange={setEmail}
              variant='floating'
              label='Email'
            ></InputField>
            <InputField
              type='password'
              id='password'
              variant='floating'
              label='Lozinka'
              value={password}
              onChange={setPassword}
            ></InputField>
            <InputField
              id='telefon'
              variant='floating'
              label='Telefon'
              value={telefon}
              onChange={setTelefon}
            ></InputField>
            <InputField
              type='date'
              id='datumRodjenja'
              variant='floating'
              label='Datum rođenja'
              value={datumRodjenja}
              onChange={setDatumRodjenja}
            ></InputField>
            <CheckBox
              id='budiTrener'
              checked={budiTrener}
              onChange={setBudiTrener}
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
                  console.log(
                    JSON.stringify({
                      ime,
                      prezime,
                      telefon,
                      korisnickoIme,
                      lozinka: password,
                      email,
                      datumRodjenja,
                      uloga: budiTrener ? 'TRENER' : 'CLAN',
                    })
                  )
                  fetch('http://localhost:8080/api/register', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      ime,
                      prezime,
                      telefon,
                      korisnickoIme,
                      lozinka: password,
                      email,
                      datumRodjenja,
                      uloga: budiTrener ? 'TRENER' : 'CLAN',
                    }),
                  })
                    .then((res) => {
                      console.log(res)
                      return res.json()
                    })
                    .then((json) => {
                      console.log(json)
                    })
                    .catch((e) => console.log(e))
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
