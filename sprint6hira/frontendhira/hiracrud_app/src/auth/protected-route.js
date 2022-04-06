import React from 'react';
import {Outlet} from "react-router"
import { Route } from 'react-router-dom';
import  Loading  from '../components/loading';
import {Home} from '../components/Home'
import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
  const user = {loggedIn: false};
  return user && user.loggedIn;
}
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth0();
    return isAuthenticated ? <Outlet/> : <Home/>
};

