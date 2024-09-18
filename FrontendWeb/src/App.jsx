import { MantineProvider } from '@mantine/core';
import Dashboard from './dashboard/Dashboard'

function App() {

  return (
    <MantineProvider>
      <Dashboard/>
    </MantineProvider>
  );
}

export default App;