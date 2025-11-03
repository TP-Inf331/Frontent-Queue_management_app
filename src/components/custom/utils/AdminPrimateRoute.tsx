import React from 'react'
import { Navigate } from 'react-router-dom'

// This is a simple example; replace with your real admin auth logic.
const AdminPrivateRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('admin')) // check admin session

  if (!admin || !admin.isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminPrivateRoute
