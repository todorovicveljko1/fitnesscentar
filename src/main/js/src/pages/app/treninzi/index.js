import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import Paper from '../../../components/Layout/Paper'
import TreninziModal from '../../../components/Modal/Treninzi'
import Table from '../../../components/Table/Table'

const columns = [
  {
    key: ['naziv', 'id'],
    lable: 'Naziv',
    wrapper: ([naziv, id]) => {
      return <Link to={'/app/treninzi/' + id}>{naziv}</Link>
    },
  },
  { key: 'opis', lable: 'Opis', right: true },
  { key: 'tipTreninga', lable: 'Tip Treninga', right: true },
  { key: 'trajanje', lable: 'Trajanje', right: true },
]

function dev() {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState({})
  const [mode, setMode] = useState('CREATE')
  const rowActions = [
    {
      content: <button className='btn btn-primary'>Izmeni</button>,
      onAction: (row) => {
        setEditing(row)
        setMode('EDIT')
        new bootstrap.Modal(document.getElementById('treninziModal')).show()
      },
    },
  ]
  const { isLoading, error, data } = useQuery('treninzi', () =>
    fetch('http://localhost:8080/api/treneri/treninzi', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  return (
    <Paper>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (error || data.error) && <span>{data.message}</span>}
      {!isLoading && !(error || data.error) && (
        <>
          <div className='d-flex justify-content-between p-2 mx-1 pt-3'>
            <span className='fs-5 fw-bold '>Treninzi</span>
            <div>
              <button
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#treninziModal'
                onClick={() => {
                  setMode('CREATE')
                }}
              >
                Dodaj
              </button>
            </div>
          </div>
          <Table data={data} columns={columns} rowActions={rowActions} />
        </>
      )}
      <TreninziModal data={editing} mode={mode} />
    </Paper>
  )
}

export default dev
