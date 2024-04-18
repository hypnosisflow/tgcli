import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Database from './components/database';
import Navbar from './components/navbar';
import Request from './components/request';
import { DatabaseModal } from './ui/database-modal';
import RequestUserModal from './ui/request-user-modal';

import './App.css';
import HelpModal from './ui/modals/help';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <main className="flex flex-col items-center min-h-screen  w-full">
      <Navbar />

      <Routes location={background || location}>
        <Route path="/" element={(<Request />)} />
        <Route path="/database" element={<Database />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/user/:id" element={<RequestUserModal />} />
          <Route path="/database/:id" element={<DatabaseModal />} />
          <Route path="/help" element={<HelpModal />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
