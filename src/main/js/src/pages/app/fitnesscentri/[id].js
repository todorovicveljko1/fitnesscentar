import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import Paper from '../../../components/Layout/Paper'
import FitnessCentarModal from '../../../components/Modal/FitnessCentar'
import SalaModal from '../../../components/Modal/Sala'
import Table from '../../../components/Table/Table'

const columns = [
  { key: 'id', lable: 'ID' },
  { key: 'kapacitet', lable: 'Kapacitet' },
  { key: 'oznaka', lable: 'Oznaka' },
]

function FitnessCentar() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState({})
  const [mode, setMode] = useState('CREATE')

  const { isLoading, error, data } = useQuery(['fitnessCentri', id], () =>
    fetch('http://localhost:8080/api/fitnesscentar/' + id, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  const {
    isLoading: isLoadingSale,
    error: errorSale,
    data: dataSale,
  } = useQuery(['fitnessCentri', id, 'sale'], () =>
    fetch('http://localhost:8080/api/fitnesscentar/' + id + '/sale', {
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
        new bootstrap.Modal(document.getElementById('SalaModal')).show()
      },
    },
    {
      content: <button className='btn ms-2 btn-secondary'>Obriši</button>,
      onAction: (row) => {
        fetch('http://localhost:8080/api/sale/' + row.id, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }).then(() => {
          console.log(['fitnessCentri', id, 'sale'])
          queryClient.invalidateQueries(['fitnessCentri', id, 'sale'])
        })
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
                    data-bs-target='#fitnessCentarModal'
                  >
                    Izmeni
                  </button>
                </div>
              </div>
              <div className='row pt-3'>
                <span className='col-4'>
                  Adresa: <span className='text-muted'>{data.adresa}</span>
                </span>
                <span className='col-4'>
                  Telefon: <span className='text-muted'>{data.telefon}</span>
                </span>
                <span className='col-4'>
                  Email: <span className='text-muted'>{data.email}</span>
                </span>
              </div>
            </div>
            <FitnessCentarModal data={data} mode='EDIT' />
          </>
        )}
      </Paper>
      <Paper className='mt-4'>
        {isLoadingSale && <span>Loading...</span>}
        {!isLoadingSale && (errorSale || dataSale.error) && (
          <span>{dataSale && dataSale.error ? dataSale.error : 'Error'}</span>
        )}
        {!isLoadingSale && !(errorSale || dataSale.error) && (
          <>
            <div className='d-flex justify-content-between p-2 mx-1 pt-3'>
              <span className='fs-5 fw-bold '>Sale fitness centra</span>
              <div>
                <button
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#SalaModal'
                  onClick={() => {
                    setMode('CREATE')
                  }}
                >
                  Dodaj
                </button>
              </div>
            </div>
            <Table
              data={dataSale}
              columns={columns}
              title='Sale'
              rowActions={rowActions}
            ></Table>
            {!isLoading && !(error || data.error) && (
              <SalaModal data={editing} mode={mode} id={data.id} />
            )}
          </>
        )}
      </Paper>
    </>
  )
}

export default FitnessCentar
