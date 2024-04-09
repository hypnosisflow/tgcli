import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Database from './components/database';
import { Navbar } from './components/navbar';
import Request from './components/request';
import { DatabaseModal } from './ui/database-modal';
import RequestUserModal from './ui/request-user-modal';

import './App.css';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <main className="flex flex-col items-center justify-start h-auto w-full">
      <Navbar />

      <Routes location={background || location}>
        <Route path="/" element={(<Request />)} />
        <Route path="/database" element={<Database />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/user/:id" element={<RequestUserModal />} />
          <Route path="/database/:id" element={<DatabaseModal />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
