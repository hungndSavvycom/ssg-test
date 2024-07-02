import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HeaderLayout from '../../../components/Layout/Header';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useLocation: () => ({
    pathname: '/',
  }),
}));

describe('Test Header Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HeaderLayout />
      </BrowserRouter>,
    );
  });

  test('Default active menu', () => {
    const homeItem = screen.getByText('List Employees').closest('li');
    expect(homeItem).toHaveClass('ant-menu-item-selected');
  });
});
