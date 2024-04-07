import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import { DataContextWrapper } from './Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataContextWrapper>
        <App />
      </DataContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
