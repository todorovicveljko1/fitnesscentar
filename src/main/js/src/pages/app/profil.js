import React from 'react'
import Paper from '../../components/Layout/Paper'
import ClanModal from '../../components/Modal/Clan'
import { useAuth } from '../../utils/Auth'

function Profil() {
  const { user } = useAuth()

  return (
    <Paper className='p-3'>
      <div className='row'>
        <div className='col-12 col-md-4'>
          Ime: <span className='text-muted'>{user.ime}</span>
        </div>
        <div className='col-12 col-md-4'>
          Prezime: <span className='text-muted'>{user.prezime}</span>
        </div>
        <div className='col-12 col-md-4'>
          Korisničko ime:
          <span className='text-muted'> {user.korisnickoIme}</span>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-4'>
          Email: <span className='text-muted'>{user.email}</span>
        </div>
        <div className='col-12 col-md-4'>
          Telefon:{' '}
          {!!user.telefon ? (
            <span className='text-muted'>{user.telefon}</span>
          ) : (
            <span style={{ color: 'var(--bs-danger)' }}>Nije postavljeno</span>
          )}
        </div>
        <div className='col-12 col-md-4'>
          Datum rodjenja:{' '}
          {!!user.datumRodjenja ? (
            <span className='text-muted'>{user.datumRodjenja}</span>
          ) : (
            <span style={{ color: 'var(--bs-danger)' }}>Nije postavljeno</span>
          )}
        </div>
      </div>
      <div className='d-flex justify-content-end mt-4'>
        <button
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#ClanModal'
        >
          Izmeni podatke
        </button>
      </div>
      <ClanModal />
    </Paper>
  )
}
//<button className='btn btn-secondary me-2'>Promeni lozinku</button>
export default Profil
