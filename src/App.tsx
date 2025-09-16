import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import StatusCheckPage from './pages/StatusCheckPage';
import PaymentPage from './pages/Payments'; // Import the new page

/**
 * A component to protect routes that require authentication.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/status-check" element={<StatusCheckPage />} />
          <Route path="/create-payment" element={<PaymentPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
