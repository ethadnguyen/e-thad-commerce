import type React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Statistics from './pages/Statistics';
import Accounts from './pages/Accounts';
import Orders from './pages/Orders';
import Roles from './pages/Roles';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='categories' element={<Categories />} />
          <Route path='products' element={<Products />} />
          <Route path='statistics' element={<Statistics />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='orders' element={<Orders />} />
          <Route path='roles' element={<Roles />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
