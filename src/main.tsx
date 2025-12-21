import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import DripFeedPage from './pages/DripFeedPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Layout from './components/Layout.tsx';
import TodoList from './components/TodoList'
import AddFolderOrList from './components/AddFolderOrList'
import FolderPage from './components/FolderPage'
// import Inbox from './pages/Inbox.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AddFolderOrList />,
      },
      {
        path: '/dripfeed',
        element: <DripFeedPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
      {
        path: 'list/:id',
        element: <TodoList />,
      },
      {
        path: '/add',
        element: <AddFolderOrList />,
      },
      {
        path: '/folder/:id',
        element: <FolderPage />,
      },
      {
        path: '/inbox',
        // element: <Inbox />
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
