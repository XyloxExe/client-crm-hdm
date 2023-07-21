import { Outlet, Navigate } from "react-router-dom";
import axios from 'axios';

const PrivateRoutes = async () => {
  let auth;
  try {
    const response = await axios.get(''); // url vers le serveur 
    auth = response.data.token;
  } catch (error) {
    console.error('Erreur lors de la récupération du token JWT:', error);
  }
  return auth ? <Outlet /> : <Navigate to="/connexion" />;
};

export default PrivateRoutes;