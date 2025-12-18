import { Navigate, useLocation } from 'react-router';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const SellerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (role === 'vendor') {
    return children; 
  }

  return (
    <Navigate
      to="/"
      state={{ from: location.pathname }}
      replace
    />
  );
};

export default SellerRoute;
