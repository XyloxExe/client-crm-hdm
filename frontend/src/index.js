import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.jsx";

import App from './App';
import reportWebVitals from './reportWebVitals';
import Connexion from "./Components/Connexion/Connexion.jsx"
import Inscription from './Components/Inscription/Inscription.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path='*' element={<NotFound/>} />
        <Route element={<PrivateRoute />}> // Routes protégées
          
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();