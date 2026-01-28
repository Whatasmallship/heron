import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import { Lang } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('cn');

  const toggleLang = () => {
    setLang(prev => prev === 'cn' ? 'en' : 'cn');
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage lang={lang} toggleLang={toggleLang} />} />
        <Route path="/demo" element={<DemoPage />} />
        {/* Redirect any specific .html paths to demo for prototype purposes */}
        <Route path="/*.html" element={<DemoPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;