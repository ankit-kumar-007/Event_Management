import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const OrganizerRoute = () => {
  const { isAuthenticated, isOrganizer, isLoading } = useAuth();

  if (isLoading) return <Loader label="Checking your session…" />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isOrganizer) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default OrganizerRoute;
