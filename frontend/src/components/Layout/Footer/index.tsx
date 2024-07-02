import { Footer } from 'antd/lib/layout/layout';
import classes from './Footer.module.scss';
import React from 'react';

const FooterLayout: React.FC = () => {
  return (
    <Footer data-testid="footer" className={classes.footer}>
      Design Created by SVC
    </Footer>
  );
};

export default FooterLayout;
