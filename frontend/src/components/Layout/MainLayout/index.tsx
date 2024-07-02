import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Outlet } from 'react-router-dom';
import FooterLayout from '../Footer';
import HeaderLayout from '../Header';
import classes from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <Layout className="layout">
      <HeaderLayout />
      <Content className={classes.content}>
        <div className={classes.container}>
          <Outlet />
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default MainLayout;
