import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import { DataContextWrapper } from './Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataContextWrapper>
        <App />
      </DataContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
