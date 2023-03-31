import Home from "../components/HomePage";
import Login from "../components/LoginPage";
import { useAuth } from "../services/AuthProvider"; // Keep this import statement

function App() {
  const { user, role } = useAuth(); // Keep using the useAuth hook to get user and role

  return (
    <div>
      {user ? <Home user={user} role={role} /> : <Login />}
    </div>
  );
}

export default App;
