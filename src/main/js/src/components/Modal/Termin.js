import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import InputField from '../FormElements/InputField'

const createTermin = (newTermin, id) => {
  return fetch('http://localhost:8080/api/treninzi/' + id + '/termini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(newTermin),
  }).then((res) => res.json())
}

const updateTermin = (updateTermin) => {
  return fetch('http://localhost:8080/api/termin/' + updateTermin.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(updateTermin),
  }).then((res) => res.json())
}

function TerminModal(props) {
  const { id } = props
  const queryClient = useQueryClient()
  const createMutation = useMutation((d) => createTermin(d, id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('treninzi')
      queryClient.setQueryData(['treninzi', id, 'termini', data.id], data)
      bootstrap.Modal.getInstance(document.getElementById('TerminModal')).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })
  const updateMutation = useMutation(updateTermin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('treninzi')
      queryClient.setQueryData(['treninzi', id, 'termini', data.id], data)
      bootstrap.Modal.getInstance(document.getElementById('TerminModal')).hide()
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const [data, setData] = useState({
    vremePocetak: '',
    cena: '',
    sala: '',
  })
  const {
    isLoading: isLoadingSale,
    error: errorSale,
    data: dataSale,
  } = useQuery('fitnessCentri', () =>
    fetch('http://localhost:8080/api/treneri/sale', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  useEffect(() => {
    if (props.mode == 'CREATE')
      setData({
        vremePocetak: 'yyyy-mm-ddThh:mm:ss.000+00:00',
        cena: '',
        sala: dataSale && dataSale[0].id ? dataSale[0].id : '',
      })
    else setData(props.data)
  }, [props.data, props.mode])

  return (
    <div
      className='modal fade show'
      id='TerminModal'
      tabIndex='-1'
      aria-labelledby='TerminModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='TerminModalLabel'>
              Termin
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
                type='datetime-local'
                id='vremePocetak'
                label='Vreme Pocetak'
                value={data.vremePocetak}
                onChange={(v) => {
                  setData({ ...data, vremePocetak: v })
                }}
              />
              <InputField
                id='cena'
                label='Cena'
                type='number'
                value={data.cena}
                onChange={(v) => {
                  setData({ ...data, cena: v })
                }}
              />
              <div>
                <label htmlFor='sala' className={`form-label`}>
                  Sala
                </label>
                {!isLoadingSale && !(errorSale || dataSale.error) && (
                  <select
                    id='sala'
                    value={data.sala}
                    onChange={(v) => {
                      console.log(v)
                      setData({ ...data, sala: v.target.value })
                    }}
                    className='form-select'
                  >
                    {dataSale.map((row) => (
                      <option key={row.id} value={row.id}>
                        {row.oznaka}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-secondary me-2' data-bs-dismiss='modal'>
              Otkaži
            </button>
            <button
              className='btn btn-primary'
              disabled={data?.brojPrijavljenih > 0}
              onClick={() => {
                console.log(data)
                console.log(props.mode)
                if (props.mode == 'CREATE') {
                  createMutation.mutate(data)
                  setData({
                    vremePocetak: '',
                    cena: '',
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

export default TerminModal
