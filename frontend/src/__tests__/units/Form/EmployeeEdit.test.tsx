/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom'
// @ts-expect-error
import React from 'react';
import { render, screen, fireEvent, waitFor, renderHook } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import EmployeeEditComponent from '../../../components/Employee/EmployeeEdit';
import { useMutationEmployee, useQueryDetailEmployee } from '../../../hooks/employee';

Object.defineProperty(window, 'matchMedia', {
    value: () => {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      };
    },
  });
// Mock the hooks and components
jest.mock('react-router-dom', () => ({
    useParams: jest.fn().mockReturnValue({ id: '1', mockReturnValue: jest.fn() }) as jest.MockedFunction<typeof useParams>,
    useNavigate: jest.fn(),
}));
jest.mock('../../../hooks/employee', () => ({
    useQueryDetailEmployee: jest.fn(),
    useMutationEmployee: jest.fn(),
}));
jest.mock('antd', () => {

    const originalModule = jest.requireActual('antd');
    const {renderHook} = jest.requireActual('@testing-library/react');
    const { Form } = originalModule;
    const { result } = renderHook(() => Form.useForm());
    return {
        ...originalModule,
        Form: {
            ...Form,
            useForm: jest.fn(() => [{
                ...result.current[0],
                getFieldsValue: jest.fn(),
                setFieldsValue: jest.fn(), // Ensure this method is defined
                // Add any other methods used in your component
            }, {}]),
        },
        message: {
            useMessage: jest.fn(() => [jest.fn()]),
        },
    };
});

describe('EmployeeEditComponent', () => {
    const mockNavigate = jest.fn();
    const mockMessageApi = {
        success: jest.fn(),
        error: jest.fn(),
    };
    const mockSetFieldsValue = jest.fn();
    const mockGetFieldsValue = jest.fn();
    const { result } = renderHook(() => Form.useForm());
    beforeEach(() => {
        jest.clearAllMocks();
        (useParams as jest.Mock).mockReturnValue({ id: '1' });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useQueryDetailEmployee as jest.Mock).mockReturnValue({
            data: {
                getEmployee: {
                    name: 'John Doe',
                    position: 'Developer',
                    salary: 1000,
                },
            },
        });
        (useMutationEmployee as jest.Mock).mockReturnValue({
            handleUpdateEmployee: jest.fn().mockResolvedValue({
                data: {
                    updateEmployee: true,
                },
            }),
        });
        (Form.useForm as jest.Mock).mockReturnValue([
            {
                ...result.current[0],
                getFieldsValue: mockGetFieldsValue,
                setFieldsValue: mockSetFieldsValue,
            },
            {},
        ]);
        (message.useMessage as jest.Mock).mockReturnValue([mockMessageApi]);
    });

    test('renders the component and sets form fields', async () => {
        render(<EmployeeEditComponent />);

        await waitFor(() => {
            expect(mockSetFieldsValue).toHaveBeenCalledWith({
                name: 'John Doe',
                position: 'Developer',
                salary: 1000,
            });
        });

        expect(screen.getByText('Edit Employee Id: 1')).toBeInTheDocument();
    });

    test('submits the form successfully', async () => {
        mockGetFieldsValue.mockReturnValue({
            name: 'Jane Doe',
            position: 'Manager',
            salary: '2000',
        });

        render(<EmployeeEditComponent />);

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(mockMessageApi.success).toHaveBeenCalledWith('Update employee success!');
        });

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('handles form submission failure', async () => {
        (useMutationEmployee as jest.Mock).mockReturnValue({
            handleUpdateEmployee: jest.fn().mockResolvedValue({
                data: {
                    updateEmployee: false,
                },
            }),
        });

        mockGetFieldsValue.mockReturnValue({
            name: 'Jane Doe',
            position: 'Manager',
            salary: '2000',
        });

        render(<EmployeeEditComponent />);

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(mockMessageApi.error).toHaveBeenCalledWith('Update employee failed!');
        });

        expect(mockNavigate).not.toHaveBeenCalled();
    });

    test('handles form submission error', async () => {
        (useMutationEmployee as jest.Mock).mockReturnValue({
            handleUpdateEmployee: jest.fn().mockRejectedValue(new Error('Error')),
        });

        mockGetFieldsValue.mockReturnValue({
            name: 'Jane Doe',
            position: 'Manager',
            salary: '2000',
        });

        render(<EmployeeEditComponent />);

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(mockMessageApi.error).toHaveBeenCalledWith('Error when update employee!');
        });

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});