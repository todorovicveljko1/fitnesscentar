import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import InputField from '../../../components/FormElements/InputField'
import Paper from '../../../components/Layout/Paper'
import Table from '../../../components/Table/Table'

const columns = [
  { key: 'treningNaziv', lable: 'Naziv treninga' },
  { key: 'treningOpis', lable: 'Opis trening' },
  { key: 'treningTipTreninga', lable: 'Tip treninga' },
  { key: 'treningTrajanje', lable: 'Trajanje treninga' },
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

function Treninzi() {
  const history = useHistory()
  const [naziv, setNaziv] = useState('')
  const [opis, setOpis] = useState('')
  const [cena, setCena] = useState('')
  const [tip, setTip] = useState('')
  const [date, setDate] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [direction, setDirection] = useState('')
  const { isLoading, error, data, refetch } = useQuery(
    ['treninzi', 'termini'],
    () =>
      fetch(
        `http://localhost:8080/api/treninzi/search?naziv=${naziv}&opis=${opis}&cena=${cena}&tip=${tip}&vremePocetka=${date}&orderBy=${orderBy}&direction=${direction}`,
        {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
        }
      ).then((res) => res.json())
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
        <div className='col-1 px-2'>
          <InputField
            id='cena'
            label='Cena'
            type='number'
            value={cena}
            onChange={setCena}
          />
        </div>
        <div className='col-2 px-2'>
          <InputField
            id='datum'
            label='Datum termina'
            type='date'
            value={date}
            onChange={setDate}
          />
        </div>
        <div className='col-2 pb-3 px-2'>
          <select
            className='form-select '
            onChange={(v) => {
              switch (v.target.value) {
                case '1':
                  setOrderBy('cena')
                  setDirection('asc')
                  break
                case '2':
                  setOrderBy('cena')
                  setDirection('desc')
                  break
                case '3':
                  setOrderBy('vremePocetak')
                  setDirection('asc')
                  break
                case '4':
                  setOrderBy('vremePocetak')
                  setDirection('desc')
                  break
                default:
                  break
              }
            }}
            defaultValue='0'
          >
            <option value='0'>Sortiraj po</option>
            <option value='1'>Cena rastuce</option>
            <option value='2'>Cena opadajuce</option>
            <option value='3'>Datum rastuce</option>
            <option value='4'>Datum opadajuce</option>
          </select>
        </div>
        <div className='col-1 pb-3 ps-2 d-flex justify-content-end'>
          <button className='btn btn-secondary' onClick={refetch}>
            Pretrazi
          </button>
        </div>
      </div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (error || data.error) && <span>Error</span>}
      {!isLoading && !(error || data.error) && (
        <Table className='mx-1' data={data} columns={columns}></Table>
      )}
    </Paper>
  )
}

export default Treninzi
