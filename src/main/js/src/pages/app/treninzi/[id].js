import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import Paper from '../../../components/Layout/Paper'
import TreninziModal from '../../../components/Modal/Treninzi'
import TerminModal from '../../../components/Modal/Termin'
import Table from '../../../components/Table/Table'

const columns = [
  { key: 'id', lable: 'ID' },
  {
    key: 'vremePocetak',
    lable: 'vremePocetak',
    wrapper: (vremePocetka) => (
      <span>
        {new Intl.DateTimeFormat('default', {
          timeStyle: 'short',
          dateStyle: 'medium',
        }).format(new Date(vremePocetka))}
      </span>
    ),
  },
  { key: 'cena', lable: 'Cena', wrapper: (cena) => <span>{cena} rsd</span> },
  { key: 'brojPrijavljenih', lable: 'Broj Prijavljenih' },
  {
    key: 'sala',
    lable: 'Sala',
    wrapper: (sala) => (
      <span>
        {sala.oznaka}, Kapacitet: {sala.kapacitet}
      </span>
    ),
  },
]

function Trening() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState({})
  const [mode, setMode] = useState('CREATE')

  const { isLoading, error, data } = useQuery(['treninzi', id], () =>
    fetch('http://localhost:8080/api/treninzi/' + id, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  const {
    isLoading: isLoadingTermin,
    error: errorTermin,
    data: dataTermin,
  } = useQuery(['treninzi', id, 'termini'], () =>
    fetch('http://localhost:8080/api/treninzi/' + id + '/termini', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  const rowActions = [
    {
      content: <button className='btn btn-primary'>Izmeni</button>,
      onAction: (row) => {
        setEditing(row)
        setMode('EDIT')
        new bootstrap.Modal(document.getElementById('TerminModal')).show()
      },
    },
  ]
  return (
    <>
      <Paper>
        {isLoading && <span>Loading...</span>}
        {!isLoading && (error || data.error) && (
          <span>{data && data.error ? data.error : 'Error'}</span>
        )}
        {!isLoading && !(error || data.error) && (
          <>
            <div className='d-flex flex-column p-2 mx-1'>
              <div className='d-flex justify-content-between'>
                <span className='fs-5 fw-bold '>{data.naziv}</span>
                <div>
                  <button
                    className='btn ms-2 btn-primary'
                    data-bs-toggle='modal'
                    data-bs-target='#treninziModal'
                  >
                    Izmeni
                  </button>
                </div>
              </div>
              <div className='row pt-3'>
                <span className='col-4'>
                  Opis: <span className='text-muted'>{data.opis}</span>
                </span>
                <span className='col-4'>
                  Tip treninga:{' '}
                  <span className='text-muted'>{data.tipTreninga}</span>
                </span>
                <span className='col-4'>
                  Tajanje u min:{' '}
                  <span className='text-muted'>{data.trajanje}</span>
                </span>
              </div>
            </div>
            <TreninziModal data={data} mode='EDIT' />
          </>
        )}
      </Paper>
      <Paper className='mt-4'>
        {isLoadingTermin && <span>Loading...</span>}
        {!isLoadingTermin && (errorTermin || dataTermin.error) && (
          <span>
            {dataTermin && dataTermin.error ? dataTermin.error : 'Error'}
          </span>
        )}
        {!isLoadingTermin && !(errorTermin || dataTermin.error) && (
          <>
            <div className='d-flex justify-content-between p-2 mx-1 pt-3'>
              <span className='fs-5 fw-bold '>Termini treninga</span>
              <div>
                <button
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#TerminModal'
                  onClick={() => {
                    setMode('CREATE')
                  }}
                >
                  Dodaj
                </button>
              </div>
            </div>
            <Table
              data={dataTermin}
              columns={columns}
              rowActions={rowActions}
            ></Table>
            {!isLoading && !(error || data.error) && (
              <TerminModal
                data={{ ...editing, sala: editing?.sala?.id }}
                mode={mode}
                id={data.id}
              />
            )}
          </>
        )}
      </Paper>
    </>
  )
}

export default Trening
