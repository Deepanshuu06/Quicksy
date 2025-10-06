import React from 'react'
import { Link } from 'react-router'

const Dashboard = () => {
  return (
    <div>Dashboard
      <Link to="/inventory">Go to Inventory</Link>
    </div>
  )
}

export default Dashboard