import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import InputField from '../FormElements/InputField'
import { useHistory } from 'react-router'

const createFC = (newFC) => {
  return fetch('http://localhost:8080/api/fitnesscentar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(newFC),
  }).then((res) => res.json())
}

const updateFC = (updateFC) => {
  return fetch('http://localhost:8080/api/fitnesscentar/' + updateFC.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(updateFC),
  }).then((res) => res.json())
}

function FitnessCentarModal(props) {
  const queryClient = useQueryClient()
  const createMutation = useMutation(createFC, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('fitnessCentri')
      queryClient.setQueryData(['fitnessCentri', data.id], data)
      bootstrap.Modal.getInstance(
        document.getElementById('fitnessCentarModal')
      ).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })
  const updateMutation = useMutation(updateFC, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('fitnessCentri')
      queryClient.setQueryData(['fitnessCentri', data.id], data)
      bootstrap.Modal.getInstance(
        document.getElementById('fitnessCentarModal')
      ).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const [data, setData] = useState({
    naziv: '',
    adresa: '',
    telefon: '',
    email: '',
  })
  useEffect(() => {
    if (props.mode == 'CREATE')
      setData({
        naziv: '',
        adresa: '',
        telefon: '',
        email: '',
      })
    else setData(props.data)
  }, [props.data, props.mode])
  return (
    <div
      className='modal fade show'
      id='fitnessCentarModal'
      tabIndex='-1'
      aria-labelledby='fitnessCentarModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='fitnessCentarModalLabel'>
              Fitness Centar
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
                id='naziv'
                label='Naziv'
                value={data.naziv}
                onChange={(v) => {
                  setData({ ...data, naziv: v })
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
                id='adresa'
                label='Adresa'
                value={data.adresa}
                onChange={(v) => {
                  setData({ ...data, adresa: v })
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
                if (props.mode == 'CREATE') {
                  createMutation.mutate(data)
                } else if (props.mode == 'EDIT') {
                  updateMutation.mutate(data)
                }
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

export default FitnessCentarModal
