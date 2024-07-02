import React from 'react';
import { Menu, MenuProps } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderLayout: React.FC = () => {
  const location = useLocation();

  const activePath = useMemo(() => {
    let pathKey = '1';
    switch (location.pathname) {
      case '/':
        pathKey = '1';
        break;
      default:
        break;
    }

    return pathKey;
  }, [location.pathname]);

  const itemMenus: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: <Link to="/">List Employees</Link>,
      },
    ];
  }, []);

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[activePath]} items={itemMenus} />
    </Header>
  );
};

export default HeaderLayout;
