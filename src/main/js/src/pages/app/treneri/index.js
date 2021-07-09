import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Paper from '../../../components/Layout/Paper'
import TrenerModal from '../../../components/Modal/Trener'
import Table from '../../../components/Table/Table'

const columns = [
  { key: 'ime', lable: 'Ime' },
  { key: 'prezime', lable: 'Prezime' },
  { key: 'korisnickoIme', lable: 'Korisnicko Ime' },
  { key: 'email', lable: 'Email', right: true },
  {
    key: 'aktivan',
    lable: 'Aktivan',
    right: true,
    wrapper: (aktivan) => {
      return aktivan ? (
        <span className='badge rounded-pill bg-primary'>Aktivan</span>
      ) : (
        <span className='badge rounded-pill bg-secondary'>Nije aktivan</span>
      )
    },
  },
]

function dev() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const { isLoading, error, data } = useQuery('treneri', () =>
    fetch('http://localhost:8080/api/treneri', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  const rowActions = [
    {
      content: <button className='btn ms-2 btn-secondary'>Obriši</button>,
      onAction: (row) => {
        fetch('http://localhost:8080/api/treneri/' + row.id, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }).then(() => {
          queryClient.invalidateQueries(['treneri', data.id])
        })
      },
    },
  ]
  return (
    <Paper>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (error || data.error) && (
        <span>{data && data.error ? data.error : 'Error'}</span>
      )}
      {!isLoading && !(error || data.error) && (
        <>
          <div className='d-flex justify-content-between p-2 mx-1 pt-3'>
            <span className='fs-5 fw-bold '>Treneri</span>

            <div>
              <button
                className='btn btn-secondary me-2'
                onClick={() => {
                  history.push('/app/treneri/potvrdi')
                }}
              >
                Odobri
              </button>

              <button
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#TrenerModal'
              >
                Dodaj
              </button>
            </div>
          </div>

          <Table data={data} columns={columns} rowActions={rowActions} />
        </>
      )}
      <TrenerModal mode={'CREATE'} />
    </Paper>
  )
}

export default dev
