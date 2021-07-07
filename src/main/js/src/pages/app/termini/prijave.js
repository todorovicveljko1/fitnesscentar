import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import Paper from '../../../components/Layout/Paper'
import Table from '../../../components/Table/Table'

const columns = [
  {
    key: ['treningNaziv', 'id'],
    lable: 'Naziv treninga',
    wrapper: ([naziv, id]) => <Link to={'/app/termini/' + id}>{naziv}</Link>,
  },
  { key: 'treningTipTreninga', lable: 'Tip' },
  { key: 'treningTrajanje', lable: 'Trajanje' },
  {
    key: 'cena',
    lable: 'Cena termina',
    right: true,
    wrapper: (cena) => <span>{cena} rsd</span>,
  },
  {
    key: 'vremePocetka',
    lable: 'Vreme termina',
    right: true,
    wrapper: (vremePocetka) => (
      <span>
        {new Intl.DateTimeFormat('default', {
          timeStyle: 'short',
          dateStyle: 'medium',
        }).format(new Date(vremePocetka))}
      </span>
    ),
  },
  { key: 'salaOznaka', lable: 'Oznaka sale', right: true },
  {
    key: ['brojPrijavljenih', 'salaKapacitet'],
    lable: 'Prijavljeno',
    right: true,
    wrapper: ([brojPrijavljenih, salaKapacitet]) => (
      <span>
        {brojPrijavljenih}/{salaKapacitet}
      </span>
    ),
  },
]

function TerminiPrijave() {
  const { isLoading, error, data } = useQuery(['termini', 'prijave'], () =>
    fetch(`http://localhost:8080/api/clan/prijave`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  return (
    <Paper className='pb-2'>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (error || data.error) && <span>Error</span>}
      {!isLoading && !(error || data.error) && (
        <Table className='mx-1' data={data} columns={columns}></Table>
      )}
    </Paper>
  )
}

export default TerminiPrijave
