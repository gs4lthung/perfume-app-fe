import { JSX, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface AmdinRouteProps {
  children: JSX.Element;
}

const AdminRoute = ({ children }: AmdinRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not found");
  }

  if (authContext.user?.isAdmin === undefined) {
    return null;
  }

  return authContext.user?.isAdmin === true ? children : <Navigate to="/" />;
};

export default AdminRoute;
