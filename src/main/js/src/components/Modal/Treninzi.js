import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import InputField from '../FormElements/InputField'
import { useHistory } from 'react-router'

const createTrening = (newTrening) => {
  return fetch('http://localhost:8080/api/treneri/treninzi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(newTrening),
  }).then((res) => res.json())
}

const updateTrening = (updateTrening) => {
  return fetch('http://localhost:8080/api/treninzi/' + updateTrening.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(updateTrening),
  }).then((res) => res.json())
}

function treninziModal(props) {
  const queryClient = useQueryClient()
  const createMutation = useMutation(createTrening, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('treninzi')
      queryClient.setQueryData(['treninzi', data.id], data)
      bootstrap.Modal.getInstance(
        document.getElementById('treninziModal')
      ).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })
  const updateMutation = useMutation(updateTrening, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('treninzi')
      queryClient.setQueryData(['treninzi', data.id], data)
      bootstrap.Modal.getInstance(
        document.getElementById('treninziModal')
      ).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const [data, setData] = useState({
    naziv: '',
    opis: '',
    tipTreninga: '',
    trajanje: '',
  })
  useEffect(() => {
    if (props.mode == 'CREATE')
      setData({
        naziv: '',
        opis: '',
        tipTreninga: '',
        trajanje: '',
      })
    else setData(props.data)
  }, [props.data, props.mode])
  return (
    <div
      className='modal fade show'
      id='treninziModal'
      tabIndex='-1'
      aria-labelledby='treninziModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='treninziModalLabel'>
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
                id='opis'
                label='Opis'
                value={data.opis}
                onChange={(v) => {
                  setData({ ...data, opis: v })
                }}
              />
              <InputField
                id='tipTreninga'
                label='Tip Treninga'
                value={data.tipTreninga}
                onChange={(v) => {
                  setData({ ...data, tipTreninga: v })
                }}
              />
              <InputField
                id='trajanje'
                type='number'
                label='Trajanje'
                value={data.trajanje}
                onChange={(v) => {
                  setData({ ...data, trajanje: v })
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

export default treninziModal
