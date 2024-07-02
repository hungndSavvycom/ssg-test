/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom'
// @ts-expect-error
import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListComponent from '../../../components/common/List';
import { employeeListSample } from '../../../assets/data/employees';

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});
describe('Test List table component', () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Employee name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Employee position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Employee salary',
      dataIndex: 'salary',
      key: 'salary',
    },
  ];
  test('Is loading component', () => {
    render(
      <BrowserRouter>
        <ListComponent columns={columns} loading />
      </BrowserRouter>,
    );

    const loadingSkeleton = screen.getByTestId('loading-table');

    expect(loadingSkeleton).toBeInTheDocument();
  });

  test('Is empty component', () => {
    render(
      <BrowserRouter>
        <ListComponent columns={columns} loading={false} />
      </BrowserRouter>,
    );

    const emptyComponent = screen.getByTestId('empty-table');

    expect(emptyComponent).toBeInTheDocument();
  });

  test('Exist data', () => {
    render(
      <BrowserRouter>
        <ListComponent columns={columns} loading={false} data={employeeListSample} />
      </BrowserRouter>,
    );

    const emptyComponent = screen.getByTestId('list-table');

    expect(emptyComponent).toBeInTheDocument();
  });
});
