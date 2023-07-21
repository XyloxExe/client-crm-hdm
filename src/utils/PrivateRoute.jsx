import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(''); 
        setAuth(response.data.token || false);
      } catch (error) {
        console.error('Erreur lors de la récupération du token JWT:', error);
        setAuth(false);
      }
    };
    fetchToken();
  }, []);

  if (auth === null) {
    return null;
  }

  return auth ? <Outlet /> : <Navigate to="/connexion" />;
};

export default PrivateRoute;
