import React from 'react';
import { Navigate } from "react-router-dom";
import {AppContext} from '../contexts/CurrentUserContext'

const ProtectedRouteElement = ({ element: Component, ...props }) => {

  const appContext = React.useContext(AppContext);

  
  return (
    appContext.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
  )

}

export default ProtectedRouteElement;