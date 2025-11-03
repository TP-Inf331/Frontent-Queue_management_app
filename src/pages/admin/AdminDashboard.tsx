import React from 'react'
import NavbarDashboard from '@/pages/admin/dashboard/DoubleNavbar.tsx';
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <NavbarDashboard />
    </MantineProvider>
  </React.StrictMode>
)
