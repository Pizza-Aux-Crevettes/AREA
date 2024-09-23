import { useState } from 'react';
import { Switch, useMantineTheme, rem, Tooltip } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import Title from '../Title'
import logo_info from '../assets/information.png'
import './Dashboard.css'

function TooltipInfo() {
  return (
    <Tooltip
      label="More informations"
      position="bottom"
      placement="end"
      withArrow
      offset={10} // Ajuste cette valeur selon tes besoins
    >
      <img
        src={logo_info}
        alt="Logo Info"
        style={{ width: '10%', height: 'auto', cursor: 'pointer' }}
      />
    </Tooltip>
  );
}

function Toggle() {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      thumbIcon={
        checked ? (
          <IconCheck
            style={{ width: rem(12), height: rem(12) }}
            color={theme.colors.teal[8]}
            stroke={3}
          />
        ) : (
          <IconX
            style={{ width: rem(12), height: rem(12) }}
            color={theme.colors.red[6]}
            stroke={3}
          />
        )
      }
    />
  );
}

function RectangleDashboard() {
  return (
    <div className='rectangle'>
      <p>Hehe</p>
      <Toggle />
      <TooltipInfo />
    </div>
  );
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
