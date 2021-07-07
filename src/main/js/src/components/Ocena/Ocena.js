import React from 'react'
import LightningBolt from '../Icons/lightningBoltIcon'
import './Ocena.scss'

function Ocena(props) {
  const { ocena, onChange } = props
  return (
    <span className='ocena d-inline-flex flex-row-reverse flex-nowrap ocena'>
      <span class='ocena-text ps-2 text-muted'>{ocena}/5</span>
      <LightningBolt
        className={`ic ${ocena >= 5 ? 'o' : 'no'}`}
        onClick={() => onChange(5)}
      />
      <LightningBolt
        className={`ic ${ocena >= 4 ? 'o' : 'no'}`}
        onClick={() => onChange(4)}
      />
      <LightningBolt
        className={`ic ${ocena >= 3 ? 'o' : 'no'}`}
        onClick={() => onChange(3)}
      />
      <LightningBolt
        className={`ic ${ocena >= 2 ? 'o' : 'no'}`}
        onClick={() => onChange(2)}
      />
      <LightningBolt
        className={`ic ${ocena >= 1 ? 'o' : 'no'}`}
        onClick={() => onChange(1)}
      />
    </span>
  )
}

export default Ocena
