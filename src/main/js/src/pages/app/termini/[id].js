import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import Paper from '../../../components/Layout/Paper'

function FitnessCentar() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery(['termin', id], () =>
    fetch('http://localhost:8080/api/termin/' + id, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  const {
    isLoading: isLP,
    error: ep,
    data: dp,
  } = useQuery(['termin', 'prijave', id], () =>
    fetch('http://localhost:8080/api/clan/prijave/' + id, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  return (
    <Paper>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (error || data.error) && (
        <span>{data && data.error ? data.error : 'Error'}</span>
      )}
      {!isLoading && !(error || data.error) && (
        <>
          <div className='d-flex flex-column p-2 mx-1'>
            <div className='d-flex justify-content-between'>
              <span className='fs-5 fw-bold '>
                {data.treningNaziv} - Informacije:
              </span>
              {!isLP && !(ep || dp.error) && dp ? (
                <button
                  className='btn ms-2 btn-secondary'
                  onClick={() => {
                    fetch('http://localhost:8080/api/clan/prijave/' + id, {
                      method: 'DELETE',
                      headers: {
                        Authorization:
                          'Bearer ' + localStorage.getItem('token'),
                      },
                    })
                      .then((v) => v.json())
                      .then((d) => {
                        queryClient.invalidateQueries(['termin', id])
                        queryClient.invalidateQueries(['termin', 'prijave', id])
                      })
                  }}
                >
                  Otkazi prijavu
                </button>
              ) : (
                <button
                  className='btn ms-2 btn-primary '
                  disabled={data.brojPrijavljenih >= data.salaKapacitet}
                  onClick={() => {
                    fetch(
                      'http://localhost:8080/api/termin/' + id + '/prijave',
                      {
                        method: 'POST',
                        headers: {
                          Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                        },
                      }
                    )
                      .then((v) => v.json())
                      .then((d) => {
                        queryClient.invalidateQueries(['termin', id])
                        queryClient.invalidateQueries(['prijave', id])
                      })
                  }}
                >
                  Prijavi se
                </button>
              )}
            </div>
            <hr />
            <div className='row'>
              <span className='col-4'>
                Opis: <span className='text-muted'>{data.treningOpis}</span>
              </span>
              <span className='col-4'>
                Tip treninga:{' '}
                <span className='text-muted'>{data.treningTipTreninga}</span>
              </span>
              <span className='col-4'>
                Trajanje u minutima:{' '}
                <span className='text-muted'>{data.treningTrajanje}</span>
              </span>
            </div>
            <div className='row pt-3'>
              <span className='col-4'>
                Cena termina: <span className='text-muted'>{data.cena}</span>
              </span>
              <span className='col-4'>
                Pocetank termina:{' '}
                <span className='text-muted'>
                  {new Intl.DateTimeFormat('default', {
                    timeStyle: 'short',
                    dateStyle: 'medium',
                  }).format(new Date(data.vremePocetka))}
                </span>
              </span>
              <span className='col-4'>
                Prijavljeno za termin:{' '}
                <span className='text-muted'>
                  {data.brojPrijavljenih}/{data.salaKapacitet}
                </span>
              </span>
            </div>
            <hr />
            <div className='row'>
              <span className='col-12 fs-6 fw-bold '>Podaci o treneru:</span>
            </div>
            <div className='row pt-3'>
              <span className='col-4'>
                Korisnicko ime:{' '}
                <span className='text-muted'>{data.trenerKorisnickoIme}</span>
              </span>
              <span className='col-4'>
                Ime i prezime:{' '}
                <span className='text-muted'>
                  {data.trenerIme + ' ' + data.trenerPrezime}
                </span>
              </span>
              <span className='col-4'>
                Kontakt:{' '}
                <span className='text-muted'>
                  {data.trenerEmail}{' '}
                  {data.trenerTelefon ? ',' + data.trenerTelefon : ''}
                </span>
              </span>
            </div>
            <hr />
            <div className='row'>
              <span className='col-12 fs-6 fw-bold '>
                Podaci o Lokaciji odrzavanja treninga:
              </span>
            </div>
            <div className='row pt-3'>
              <span className='col-4'>
                Naziv Fitness Centra:{' '}
                <span className='text-muted'>{data.fcnaziv}</span>
              </span>
              <span className='col-4'>
                Adresa Fitness Centra:{' '}
                <span className='text-muted'>{data.fcadresa}</span>
              </span>
              <span className='col-4'>
                Oznaka Sale:{' '}
                <span className='text-muted'>{data.salaOznaka}</span>
              </span>
            </div>
          </div>
        </>
      )}
    </Paper>
  )
}

export default FitnessCentar
