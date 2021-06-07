import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import Paper from '../../../components/Layout/Paper'
import FitnessCentarModal from '../../../components/Modal/FitnessCentar'
import Table from '../../../components/Table/Table'

const columns = [
  { key: 'naziv', lable: 'Naziv' },
  { key: 'adresa', lable: 'Adresa', right: true },
  { key: 'telefon', lable: 'Naziv', right: true },
  { key: 'email', lable: 'Email', right: true },
]

function dev() {
  const history = useHistory()
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState({})
  const [mode, setMode] = useState('CREATE')
  const rowActions = [
    {
      content: <button className='btn btn-primary'>Izmeni</button>,
      onAction: (row) => {
        setEditing(row)
        setMode('EDIT')
        new bootstrap.Modal(
          document.getElementById('fitnessCentarModal')
        ).show()
      },
    },
    {
      content: <button className='btn ms-2 btn-secondary'>Obriši</button>,
      onAction: (row) => {
        fetch('http://localhost:8080/api/fitnesscentar/' + row.id, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }).then(() => {
          queryClient.invalidateQueries(['fitnessCentri', data.id])
        })
      },
    },
  ]
  const { isLoading, error, data } = useQuery('fitnessCentri', () =>
    fetch('http://localhost:8080/api/fitnesscentar', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  return (
    <Paper>
      <div className='d-flex justify-content-between p-2 mx-1 pt-3'>
        <span className='fs-5 fw-bold '>Fitness Centri</span>
        <div>
          <button
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#fitnessCentarModal'
            onClick={() => {
              setMode('CREATE')
            }}
          >
            Dodaj
          </button>
        </div>
      </div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && error && <span>Error</span>}
      {!isLoading && !error && (
        <Table
          data={data}
          columns={columns}
          title='Fitness Centar'
          rowActions={rowActions}
        />
      )}
      <FitnessCentarModal data={editing} mode={mode} />
    </Paper>
  )
}

export default dev
