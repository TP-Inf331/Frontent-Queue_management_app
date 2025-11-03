import React from 'react'

const AdminLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form className="flex flex-col gap-3 w-80">
        <input
          type="text"
          placeholder="Admin username"
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
