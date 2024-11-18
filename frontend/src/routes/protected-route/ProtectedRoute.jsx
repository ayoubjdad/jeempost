import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

function ProtectedRoute({ element, ...rest }) {
  const { connected } = useContext(UserContext);

  return connected ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
