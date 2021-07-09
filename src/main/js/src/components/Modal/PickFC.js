import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
function PickFCModal(props) {
  //bootstrap.Modal.getInstance(document.getElementById('PickFCModal')).hide()
  const { isLoading, error, data } = useQuery('fitnessCentri', () =>
    fetch('http://localhost:8080/api/fitnesscentar', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    }).then((res) => res.json())
  )

  const {
    isLoading: isLoadingFC,
    error: errorFC,
    data: dataFC,
  } = useQuery(['fitnessCentri', 'treneri', props.user.id], () =>
    fetch(
      'http://localhost:8080/api/treneri/' + props.user.id + '/fitnesscentar',
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    ).then((res) => res.json())
  )

  const [id, setID] = useState('')
  useEffect(() => {
    if (data && data[0]?.id) {
      console.log(dataFC)
      setID(data[0].id)
      if (!isLoadingFC && !(errorFC || dataFC.error) && !dataFC) {
        new bootstrap.Modal(document.getElementById('PickFCModal')).show()
      }
    }
  }, [data])
  return (
    <div
      className='modal fade show'
      id='PickFCModal'
      tabIndex='-1'
      aria-labelledby='PickFCModalLabel'
      aria-hidden='true'
      data-bs-backdrop='static'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='PickFCModalLabel'>
              Izaberi fitness centar u kom radiš
            </h5>
          </div>
          <div className='modal-body'>
            <div>
              {!isLoading && !(error || data.error) && (
                <select
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                  className='form-select'
                >
                  {data.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.naziv}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className='modal-footer'>
            <button
              className='btn btn-primary'
              onClick={() => {
                fetch(
                  `http://localhost:8080/api/treneri/${props.user.id}/fitnesscentar/${id}`,
                  {
                    method: 'GET',
                    headers: {
                      Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => console.log(data))
                bootstrap.Modal.getInstance(
                  document.getElementById('PickFCModal')
                ).hide()
              }}
            >
              Sačuvaj
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
/** 
<button className='btn btn-secondary me-2' data-bs-dismiss='modal'>
  Otkaži
</button> 

<button
  type='button'
  className='btn-close'
  data-bs-dismiss='modal'
  aria-label='Close'
></button>
*/
export default PickFCModal
