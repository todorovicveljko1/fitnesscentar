import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router'
import Paper from '../../components/Layout/Paper'
import Table from '../../components/Table/Table'
import Ocena from '../../components/Ocena/Ocena'

const columns = [
  {
    key: 'treningNaziv',
    lable: 'Naziv treninga',
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
    key: ['ocenaOcena', 'ocenaId'],
    lable: 'Ocena',
    right: true,
    wrapper: ([ocena, id]) => {
      const queryClient = useQueryClient()
      return (
        <Ocena
          ocena={ocena}
          onChange={(novaOcena) => {
            if (ocena != novaOcena) {
              fetch('http://localhost:8080/api/clan/odradjeni/' + id, {
                method: 'PUT',
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaOcena),
              })
                .then((v) => v.json())
                .then((d) => {
                  queryClient.invalidateQueries(['odrajdeni'])
                })
            }
          }}
        />
      )
    },
  },
]

function Treninzi() {
  const { koji } = useParams()
  const { isLoading, error, data, refetch } = useQuery(
    ['odrajdeni', koji],
    () =>
      fetch(`http://localhost:8080/api/clan/odradjeni?o=${koji}`, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      })
        .then((res) => res.json())
        .then((json) => {
          return json.map((d) => ({
            ocenaId: d.id,
            ocenaOcena: d.ocena,
            ...d.termin,
          }))
        })
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

export default Treninzi
