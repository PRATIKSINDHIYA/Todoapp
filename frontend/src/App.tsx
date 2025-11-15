import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TodoList from './pages/TodoList';
import Layout from './components/Layout';

function App() {
  const { token } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/signup"
        element={token ? <Navigate to="/todos" replace /> : <Signup />}
      />
      <Route
        path="/signin"
        element={token ? <Navigate to="/todos" replace /> : <Signin />}
      />
      <Route
        path="/forgot-password"
        element={token ? <Navigate to="/todos" replace /> : <ForgotPassword />}
      />
      <Route
        path="/reset-password"
        element={token ? <Navigate to="/todos" replace /> : <ResetPassword />}
      />
      <Route
        path="/todos"
        element={
          token ? (
            <Layout>
              <TodoList />
            </Layout>
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
      <Route path="/" element={<Navigate to="/todos" replace />} />
    </Routes>
  );
}

export default App;

