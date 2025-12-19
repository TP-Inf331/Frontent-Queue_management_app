import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import { HelmetProvider } from 'react-helmet-async';
import '@mantine/core/styles.css';
import './index.css';
import App from './App';

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#eef3ff',
      '#dbe4ff',
      '#bac8ff',
      '#91a7ff',
      '#748ffc',
      '#5c7cfa',
      '#4c6ef5',
      '#4263eb',
      '#3b5bdb',
      '#1c3a6e', // 9: Primary Deep Blue matched
    ],
    orange: [
      '#fff4e6',
      '#ffe8cc',
      '#ffd8a8',
      '#ffc078',
      '#ffa94d',
      '#ff922b',
      '#fd7e14',
      '#f76707',
      '#ff8138', // 8: Secondary Orange matched
      '#d9480f',
    ],
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </HelmetProvider>
  </StrictMode>
);
