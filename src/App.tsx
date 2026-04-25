/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Layout from './components/Layout';
import ComparePage from './pages/ComparePage';
import HistoryPage from './pages/HistoryPage';
import StatisticsPage from './pages/StatisticsPage';
import ApiPage from './pages/ApiPage';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ComparePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/settings" element={<div className="p-8 text-center text-slate-500">Settings panel coming soon.</div>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

