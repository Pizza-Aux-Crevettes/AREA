import { MantineProvider } from '@mantine/core';
import Dashboard from './dashboard/Dashboard'
import '@mantine/core/styles.css';

function App() {

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Dashboard/>
    </MantineProvider>
  );
}

export default App;