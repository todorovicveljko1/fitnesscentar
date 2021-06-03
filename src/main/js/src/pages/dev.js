import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Dashboard from '../components/Layout/Dashboard'
import Paper from '../components/Layout/Paper'
import Table from '../components/Table/Table'

const columns = [
  { key: 'naziv', lable: 'Naziv' },
  { key: 'adresa', lable: 'Adresa', right: true },
  { key: 'telefon', lable: 'Naziv', right: true },
  { key: 'email', lable: 'Email', right: true },
]

const rowActions = [
  {
    content: <button className='btn btn-primary'>Izmeni</button>,
    onAction: (row) => console.log(row),
  },
  {
    content: <button className='btn ms-2 btn-secondary'>Obriši</button>,
    onAction: (row) => console.log(row),
  },
]

function dev() {
  const { isLoading, error, data } = useQuery('fitnessCentar', () =>
    fetch('http://localhost:8080/api/fitnesscentar').then((res) => res.json())
  )
  return (
    <Dashboard>
      <Paper>
        <div className='d-flex justify-content-between p-2 mx-1 pt-3'>
          <span className='fs-5 fw-bold '>Fitness Centri</span>
          <div>
            <button className='btn btn-primary'>Dodaj</button>
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
      </Paper>
    </Dashboard>
  )
}

export default dev
