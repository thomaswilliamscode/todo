import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage.tsx'
import DripFeedPage from './pages/DripFeedPage.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Layout from './components/Layout.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/dripfeed',
        element: <DripFeedPage />,
      }, 
      {
        path: '*',
        element: <ErrorPage />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).

render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
