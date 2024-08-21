import { createBrowserRouter } from 'react-router-dom';
import Header from '@/components/Header';
import NotFound from '@/pages/NotFound';
import Home from './pages/Home';
import EditScreenSchedule from './pages/EditScreenSchedule';
import ReceptionStatus from './pages/ReceptionStatus';
import EditLimit from './pages/EditLimit';
import ApplicantsList from './pages/ApplicantsList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'screenSchedule',
        element: <EditScreenSchedule />,
      },
      {
        path: 'receptionStatus',
        element: <ReceptionStatus />,
      },
      {
        path: 'limit',
        element: <EditLimit />,
      },
      {
        path: 'applicantsList',
        element: <ApplicantsList />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
