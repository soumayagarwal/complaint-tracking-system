import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import CreateTicket from './pages/CreateTicket'
import TicketDetail from './pages/TicketDetail'
import Login from './pages/Login'
import Registration from './pages/Register'

function App() {
  const { user, token, loading } = useContext(AuthContext);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route 
            path='/'
            element={
                  !token ? <Navigate to="/login" replace /> : user?.role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />
              }
          />
          <Route path="/login" element = {<Login />} />
          <Route path="/register" element = {<Registration />} />
          <Route
            path="/dashboard"
            element={
                token ? <UserDashboard /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/admin"
            element={
                token && user?.role==="admin" ? <AdminDashboard /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/tickets/new"
            element={
                token ? <CreateTicket/> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/tickets/:id"
            element={
                token ? <TicketDetail/> : <Navigate to="/login" replace />
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
