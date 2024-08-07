import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/home'
import LoginPage from './pages/login'

import './App.css'; // Import stylesheet

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  }, {
    path: '/login',
    element: <LoginPage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
