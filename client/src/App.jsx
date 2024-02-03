import axios from 'axios';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Dashboard } from './components/dashboard';
import { Database } from './components/database';
import { Navbar } from './components/navbar';
import { Request } from './components/request';

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState({ type: '', period: '' });
  const [data, setData] = useState({ id: '', data: [] });

  const generate = async (query, filter, id) => {
    setData(null);
    setLoading(true);

    try {
      const req = await axios.get('http://localhost:5050', {
        params: { type: query, period: filter, id },
      });
      if (req.status === 200) {
        const sorted = req.data.response.sort(
          (a, b) => b.msgs.length - a.msgs.length,
        );
        setData({ id: req.data.chatId, data: sorted });
        setTitle({ type: query, period: filter });
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error('data request error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start h-auto w-full">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={(
            <Request
              data={data?.data}
              generate={generate}
              loading={loading}
              title={title}
              chatId={data?.id}
            />
          )}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/database" element={<Database />} />
      </Routes>
    </main>
  );
};

export default App;
