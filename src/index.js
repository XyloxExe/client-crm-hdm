import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.jsx"; // Corrected the import path

import App from './App';
import reportWebVitals from './reportWebVitals';
import Connexion from "./Components/Connexion/Connexion.jsx";
import Inscription from './Components/Inscription/Inscription.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import Profile from './Components/Profile/Profile.jsx' ; // Fixed typo in component name
import Logout from './Components/Logout/Logout.jsx';
import Dashboard from './Components/DashboardUser/Dashboard.jsx';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path='*' element={<NotFound />} />
      
    
        <Route element={<PrivateRoute />}>
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/Dashboard/:id" element={<Dashboard />} />
      <Route path="/Logout" element={<Logout />} />
      </Route>      
</Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
