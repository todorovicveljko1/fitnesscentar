import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import Paper from '../../../components/Layout/Paper'
import Table from '../../../components/Table/Table'

const columns = [
  { key: 'ime', lable: 'Ime' },
  { key: 'prezime', lable: 'Prezime' },
  { key: 'korisnickoIme', lable: 'Korisnicko Ime' },
  { key: 'email', lable: 'Email' },
  { key: 'datumRodjenja', lable: 'Datum Rodjenja', right: true },
  { key: 'telefon', lable: 'Telefon', right: true },
]

function dev() {
  const history = useHistory()
  const queryClient = useQueryClient()
  const rowActions = [
    {
      content: <button className='btn btn-primary'>Odobri</button>,
      onAction: (row) => {
        fetch(`http://localhost:8080/api/treneri/${row.id}/aktiviraj`, {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            queryClient.invalidateQueries(['treneri', { aktivan: false }])
          })
          .catch((err) => console.log(err))
      },
    },
  ]
  const { isLoading, error, data } = useQuery(
    ['treneri', { aktivan: false }],
    () =>
      fetch('http://localhost:8080/api/treneri/neaktivni', {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }).then((res) => res.json())
  )
  return (
    <Paper className='pb-3'>
      <div className='d-flex justify-content-between p-2 mx-1 pt-3'>
        <span className='fs-5 fw-bold '>Odobravanje Trenera</span>
      </div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && error && <span>Error</span>}
      {!isLoading && !error && !!data.length && (
        <Table
          data={data}
          columns={columns}
          title='Fitness Centar'
          rowActions={rowActions}
        />
      )}
      {!isLoading && !error && !data.length && (
        <span className='p-2 mx-1 pt-3'>Nema trenera za odobravanje...</span>
      )}
    </Paper>
  )
}

export default dev
