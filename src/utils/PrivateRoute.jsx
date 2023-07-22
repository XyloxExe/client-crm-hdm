import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Tentative de récupération du token
        const response = await axios.get(''); 
        // Mise à jour de l'état d'authentification avec le token ou false si le token n'est pas présent
        setAuth(response.data.token || false);
      } catch (error) {
        // Affichage de l'erreur en cas d'échec de la récupération du token
        console.error('Erreur lors de la récupération du token JWT:', error);
        // Mise à jour de l'état d'authentification à false en cas d'échec
        setAuth(false);
      }
    };
    fetchToken();
  }, []);

  // Si l'état d'authentification est null, ne rien retourner
  if (auth === null) {
    return null;
  }

  // Si l'utilisateur est authentifié, afficher le contenu, sinon rediriger vers la page de connexion
  return auth ? <Outlet /> : <Navigate to="/connexion" />;
};

export default PrivateRoute;
