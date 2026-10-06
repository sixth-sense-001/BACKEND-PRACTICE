import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import TasksPage from './pages/TasksPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route index element={<WelcomePage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/tasks" element={<TasksPage />}/>
      <Route path ="*" element={<NotFoundPage />}/>
    </Routes>
  );
}

export default App;