import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register'; // Import the new page
import StatusCheckPage from './pages/StatusCheckPage';

/**
 * A component to protect routes that require authentication.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the child routes (the dashboard)
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

