import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import InputField from '../../../components/FormElements/InputField'
import Paper from '../../../components/Layout/Paper'

const columns = [
  { key: 'naziv', lable: 'Naziv' },
  { key: 'adresa', lable: 'Adresa', right: true },
  { key: 'telefon', lable: 'Naziv', right: true },
  { key: 'email', lable: 'Email', right: true },
]

function Treninzi() {
  const history = useHistory()
  const [naziv, setNaziv] = useState('')
  const [opis, setOpis] = useState('')
  const [cena, setCena] = useState('')
  const [tip, setTip] = useState('')
  const [date, setDate] = useState('')
  const { isLoading, error, data } = useQuery(['treninzi', 'termini'], () =>
    fetch(`http://localhost:8080/api/treninzi/termini`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )
  return (
    <Paper className='pb-2'>
      <div className='d-flex justify-content-between p-3'>
        <span className='fs-5 fw-bold '>Treninzi</span>
      </div>
      <div className='d-flex px-3 align-items-end pb-3'>
        <div className='col-2 px-2 ps-0'>
          <InputField
            id='naziv'
            label='Naziv'
            value={naziv}
            onChange={setNaziv}
          />
        </div>
        <div className='col-2 px-2'>
          <InputField id='opis' label='Opis' value={opis} onChange={setOpis} />
        </div>

        <div className='col-2 px-2'>
          <InputField
            id='tip'
            label='Tip treninga'
            value={tip}
            onChange={setTip}
          />
        </div>
        <div className='col-2 px-2'>
          <InputField
            id='cena'
            label='Cena termina'
            value={cena}
            onChange={setCena}
          />
        </div>
        <div className='col-2'>
          <InputField
            id='datum'
            label='Datum termina'
            type='date'
            value={date}
            onChange={setDate}
          />
        </div>
        <div className='col-2'></div>
      </div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (error || data.error) && <span>Error</span>}
      {!isLoading && !(error || data.error) && (
        <div className='d-flex flex-column'>
          {data
            .filter((row) => {
              return (
                row.naziv.includes(naziv) &&
                row.opis.includes(opis) &&
                row.tipTreninga.includes(tip)
              )
            })
            .map((row, i) => {
              return (
                <div
                  key={row.id}
                  className={`border-start ${
                    !(i % 2) ? 'border-primary' : 'border-secondary'
                  } border-4`}
                >
                  <div className='d-flex  ps-3 align-items-center border-top'>
                    <div className='col-8'>
                      <div> {row.naziv} </div>
                      <div className='text-muted'> {row.opis} </div>
                    </div>
                    <span className='col-2'>
                      <span className='fw-bold me-2'>Tip:</span>
                      {row.tipTreninga}
                    </span>
                    <span className='col-2'>
                      <span className='fw-bold me-2'>Trajanje:</span>{' '}
                      {row.trajanje} minuta
                    </span>
                  </div>
                  <div className='d-flex flex-column'>
                    <div className='fw-bold mt-2 mb-1 ms-3'>Termini:</div>
                    {row.termini &&
                      row.termini
                        .filter((termin) => {
                          return (
                            (cena == '' || termin.cena <= cena) &&
                            (date == '' ||
                              new Date(termin.vremePocetak) <= new Date(date))
                          )
                        })
                        .map((termin) => {
                          return (
                            <div
                              key={row.id + '_' + termin.id}
                              className='d-flex align-items-center p-2 px-3 ms-3 me-3 border-top'
                            >
                              <div className='col-2'>
                                <span className='text-muted pe-1'>Datum:</span>
                                {new Date(
                                  termin.vremePocetak
                                ).toLocaleDateString()}
                              </div>
                              <div className='col-2'>
                                <span className='text-muted pe-1'>Vreme:</span>
                                {new Date(
                                  termin.vremePocetak
                                ).toLocaleTimeString()}
                              </div>
                              <div className='col-2'>
                                <span className='text-muted pe-1'>Cena:</span>
                                {termin.cena} rsd
                              </div>
                              <div className='col-2'>
                                <span className='text-muted pe-1'>Sala:</span>
                                {termin.sala.oznaka}
                              </div>
                              <div className='col-3'>
                                <span className='text-muted pe-1'>
                                  Broj popunjenih mesta:
                                </span>
                                {termin.brojPrijavljenih}/
                                {termin.sala.kapacitet}
                              </div>
                              <div className='col-1 d-flex justify-content-end'>
                                <button className='btn btn-primary btn-sm'>
                                  Prijavi se
                                </button>
                              </div>
                            </div>
                          )
                        })}
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </Paper>
  )
}

export default Treninzi
