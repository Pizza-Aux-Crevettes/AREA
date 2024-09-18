import React from 'react';
import { Button } from '@mantine/core';
import Title from '../Title'
import './Dashboard.css'

function Dashboard() {
  return (
    <div>
      <Title title="Dashboard"/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '98vh', width: '100%' }}>
        <Button>Violet ?</Button>
      </div>
    </div>
  )
}

export default Dashboard;
