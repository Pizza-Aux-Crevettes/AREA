import React from 'react';
import { Button } from '@mantine/core';
import Title from '../Title'
import './Dashboard.css'

function RectangleDashboard () {
  return (
      <div className='rectangle'>
        <p>Hehe</p>
      </div>
  )
}

function Dashboard() {
  return (
    <div className='all-container'>
      <Title title="Dashboard"/>
      <div className='container'>
        <div className='back-rectangle'>
          <div className='column-container'>
            <RectangleDashboard />
            <RectangleDashboard />
            <RectangleDashboard />
          </div>
          <div className='column-container'>
            <RectangleDashboard />
            <RectangleDashboard />
            <RectangleDashboard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
