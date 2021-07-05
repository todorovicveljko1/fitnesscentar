import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import InputField from '../FormElements/InputField'

const createTrener = (newTrener) => {
  return fetch('http://localhost:8080/api/treneri/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(newTrener),
  }).then((res) => res.json())
}

const inputFields = {
  ime: '',
  prezime: '',
  korisnickoIme: '',
  email: '',
  lozinka: '',
  telefon: '',
  datumRodjenja: '',
}

function TrenerModal(props) {
  const queryClient = useQueryClient()
  const createMutation = useMutation(createTrener, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('treneri')
      queryClient.setQueryData(['treneri', data.id], data)
      bootstrap.Modal.getInstance(document.getElementById('TrenerModal')).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const [data, setData] = useState(inputFields)
  return (
    <div
      className='modal fade show'
      id='TrenerModal'
      tabIndex='-1'
      aria-labelledby='TrenerModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='TrenerModalLabel'>
              Trener
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div>
              <InputField
                id='ime'
                label='Ime'
                value={data.ime}
                onChange={(v) => {
                  setData({ ...data, ime: v })
                }}
              />
              <InputField
                id='prezime'
                label='Prezime'
                value={data.prezime}
                onChange={(v) => {
                  setData({ ...data, prezime: v })
                }}
              />
              <InputField
                id='korisnickoIme'
                label='Korisnicko Ime'
                value={data.korisnickoIme}
                onChange={(v) => {
                  setData({ ...data, korisnickoIme: v })
                }}
              />
              <InputField
                id='email'
                label='Email'
                value={data.email}
                onChange={(v) => {
                  setData({ ...data, email: v })
                }}
              />
              <InputField
                id='lozinka'
                label='Lozinka'
                value={data.lozinka}
                onChange={(v) => {
                  setData({ ...data, lozinka: v })
                }}
              />
              <InputField
                id='telefon'
                label='Telefon'
                value={data.telefon}
                onChange={(v) => {
                  setData({ ...data, telefon: v })
                }}
              />
              <InputField
                id='datumRodjenja'
                label='Datum Rodjenja'
                type='date'
                value={data.datumRodjenja}
                onChange={(v) => {
                  setData({ ...data, datumRodjenja: v })
                }}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-secondary me-2' data-bs-dismiss='modal'>
              Otkaži
            </button>
            <button
              className='btn btn-primary'
              onClick={() => {
                console.log(data)
                console.log(props.mode)
                createMutation.mutate(data)
                setData(inputFields)
              }}
            >
              Sačuvaj
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrenerModal
