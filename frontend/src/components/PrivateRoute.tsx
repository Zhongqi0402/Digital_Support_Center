import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { user } = useSelector((state: any) => state.auth)

  return user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute