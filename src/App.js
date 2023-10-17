import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



import Login from './components/Login';
import HomePage from './components/home/HomePage';
import { Children } from 'react';

import RootLayout from './components/home/RootLayout';
import HomePageContent from './components/home/HomePageContent';
import Tasks from './components/task/TaskBody';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: 'home',
    element: <RootLayout />,
    children: [
      {
      index: true,
      element: <HomePageContent/>
      },
      {
        path:'tasks',
        element:<Tasks/>
      }
    ]
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
