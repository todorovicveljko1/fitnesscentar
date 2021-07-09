import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth } from '../../utils/Auth'
import InputField from '../FormElements/InputField'

const inputFields = {
  ime: '',
  prezime: '',
  korisnickoIme: '',
  email: '',
  telefon: '',
  datumRodjenja: '',
}

function ClanModal(props) {
  const { user, updateMe } = useAuth()
  const createMutation = useMutation(updateMe, {
    onSuccess: (data) => {
      console.log(data)
      bootstrap.Modal.getInstance(document.getElementById('ClanModal')).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const [data, setData] = useState(user)
  return (
    <div
      className='modal fade show'
      id='ClanModal'
      tabIndex='-1'
      aria-labelledby='ClanModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='ClanModalLabel'>
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
                createMutation.mutate(data)
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

export default ClanModal
