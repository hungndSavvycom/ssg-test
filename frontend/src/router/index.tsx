import { useRoutes } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { HomePage } from '../pages/HomePage/loadable';
import { EmployeeCreate } from '../pages/Employee/Create/loadable';
import { EmployeeEdit } from '../pages/Employee/Edit/loadable';


const RouterList = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/employee/create',
          element: <EmployeeCreate />,
        },
        {
          path: '/employee/:id/edit',
          element: <EmployeeEdit />,
        },
      ],
    },
  ]);
};

export default RouterList;
