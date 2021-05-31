import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Nav/Navbar'
import Sidebar from '../Nav/Sidebar'

function Dashboard(props) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className={'d-flex flex-column main-bg '}>
      <Navbar onSideBarButtonClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className={'d-flex no-wrap'}>
        <Sidebar open={sidebarOpen} />
        <div className={'w-100 p-3'}>{props.children}</div>
      </div>
    </div>
  )
}

export default Dashboard
