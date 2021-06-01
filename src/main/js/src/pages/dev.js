import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Dashboard from '../components/Layout/Dashboard'
import Paper from '../components/Layout/Paper'
import Table from '../components/Table/Table'

function dev() {
  const { isLoading, error, data } = useQuery('fitnessCentar', () =>
    fetch('http://localhost:8080/api/fitnesscentar').then((res) => res.json())
  )
  const columns = [
    { key: 'naziv', lable: 'Naziv' },
    { key: 'adresa', lable: 'Adresa', right: true },
    { key: 'telefon', lable: 'Taziv', right: true },
    { key: 'email', lable: 'email', right: true },
  ]
  return (
    <Dashboard>
      <Paper>
        {isLoading && <span>Loading...</span>}
        {!isLoading && error && <span>Error</span>}
        {!isLoading && !error && <Table data={data} columns={columns} />}
      </Paper>
    </Dashboard>
  )
}

export default dev
