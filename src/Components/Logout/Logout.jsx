import React, { useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem("userId");
    if (authToken &&  userId) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
    }
    navigate('/connexion'); 
  }, [navigate]); 

  return ;
}

