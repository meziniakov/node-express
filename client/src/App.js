import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { useRoutes } from './routes';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <Router>
        <Navbar />
        <div className="App">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
