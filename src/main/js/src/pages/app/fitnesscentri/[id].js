import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import Paper from '../../../components/Layout/Paper'
import FitnessCentarModal from '../../../components/Modal/FitnessCentar'

function FitnessCentar() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery(['fitnessCentri', id], () =>
    fetch('http://localhost:8080/api/fitnesscentar/' + id, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  return (
    <Paper>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (error || data.error) && (
        <span>{data && data.message ? data.message : 'Error'}</span>
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
                  onClick={() => {
                    setMode('CREATE')
                  }}
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
  )
}

export default FitnessCentar
