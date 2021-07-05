import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import InputField from '../FormElements/InputField'
import { useHistory } from 'react-router'

const createSala = (newSala, id) => {
  return fetch('http://localhost:8080/api/fitnesscentar/' + id + '/sale', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(newSala),
  }).then((res) => res.json())
}

const updateSale = (updateSale) => {
  return fetch('http://localhost:8080/api/sale/' + updateSale.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(updateSale),
  }).then((res) => res.json())
}

function SalaModal(props) {
  const { id } = props
  const queryClient = useQueryClient()
  const createMutation = useMutation((d) => createSala(d, id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('fitnessCentri')
      queryClient.setQueryData(['fitnessCentri', id, 'sale', data.id], data)
      bootstrap.Modal.getInstance(document.getElementById('SalaModal')).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })
  const updateMutation = useMutation(updateSale, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('fitnessCentri')
      queryClient.setQueryData(['fitnessCentri', id, 'sale', data.id], data)
      bootstrap.Modal.getInstance(document.getElementById('SalaModal')).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const [data, setData] = useState({
    kapacitet: '',
    oznaka: '',
  })
  useEffect(() => {
    if (props.mode == 'CREATE')
      setData({
        kapacitet: '',
        oznaka: '',
      })
    else setData(props.data)
  }, [props.data, props.mode])
  return (
    <div
      className='modal fade show'
      id='SalaModal'
      tabIndex='-1'
      aria-labelledby='SalaModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='SalaModalLabel'>
              Sala
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
                id='kapacitet'
                label='Kapacitet'
                value={data.kapacitet}
                onChange={(v) => {
                  setData({ ...data, kapacitet: v })
                }}
              />
              <InputField
                id='oznaka'
                label='Oznaka'
                value={data.oznaka}
                onChange={(v) => {
                  setData({ ...data, oznaka: v })
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
                  setData({
                    kapacitet: '',
                    oznaka: '',
                  })
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

export default SalaModal
