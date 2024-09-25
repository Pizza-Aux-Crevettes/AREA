import { useState } from 'react';
import { Switch, useMantineTheme, rem, Tooltip } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import Title from '../Title'
import logo_info from '../assets/info.png'
import './Dashboard.css'

function TooltipInfo({ information }) {
  return (
    <Tooltip
      label={information}
      withArrow
    >
      <img
        src={logo_info}
        alt="Logo Info"
        style={{ width: '20px', height: 'auto', cursor: 'pointer' }}  // Ajustement de la taille
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

function RectangleDashboard({text, information}) {
  return (
    <div className='rectangle'>
        <p>{text}</p>
        <Toggle />
      <div className='cont-rect'>
        <TooltipInfo information={information}/>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='all-container'>
        <Title title="Dashboard"/>
        <div className='container'>
          <div className='back-rectangle'>
            <div className='column-container'>
              <RectangleDashboard text="Pluie" information="Pluie"/>
              <RectangleDashboard text="Tempête" information="Tempête"/>
              <RectangleDashboard text="Actualité" information="Actualité"/>
            </div>
            <div className='column-container'>
              <RectangleDashboard text="Mail" information="Mail"/>
              <RectangleDashboard text="Discord" information="Discord"/>
              <RectangleDashboard text="Tweet" information="Tweet"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
