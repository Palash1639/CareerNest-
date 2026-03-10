import { Route, Routes } from 'react-router-dom';

import Home from './components/home';
import Jobs from './components/jobs';
import Login from './components/login';
import NotFound from './components/notfound';
import ProtectedRoute from './components/protectedroute';
import JobItemDetails from './components/jobitemdetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={Home} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/jobs" element={<ProtectedRoute Component={Jobs} />} />
      <Route path="/jobs/:id" element={<ProtectedRoute Component={JobItemDetails} />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;