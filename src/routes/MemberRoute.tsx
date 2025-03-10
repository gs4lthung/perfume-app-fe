import { JSX, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface MemberRouteProps {
  children: JSX.Element;
}

const MemberRoute = ({ children }: MemberRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not found");
  }

  if (authContext.user?.isAdmin === undefined) {
    return null;
  }
  
  return authContext.user?.isAdmin ? <Navigate to="/" /> : children;
};

export default MemberRoute;
