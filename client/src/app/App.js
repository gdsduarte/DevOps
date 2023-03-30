import Home from '../components/HomePage';
import Login from '../components/LoginPage';
import { useRole } from '../services/RoleProvider';

function App() {
  const { user, role } = useRole(); // Use the useRole hook to get user and role

  return (
    <div>
      {user ? <Home user={user} role={role} /> : <Login />}
    </div>
  );
}

export default App;
