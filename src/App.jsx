import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { myContext } from './store/GlobalContext';

const App = () => {

const authCtx = useContext(myContext);

  return (
    <div>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCtx.isLoggedIn && (<Route path="/auth" element={<AuthPage />} />) }
       { authCtx.isLoggedIn && (<Route path="/profile" element={<UserProfile />} />) }
       <Route path='*' element={<HomePage/>} />
      </Routes>
    </Layout>
    </div>
  )
}

export default App 