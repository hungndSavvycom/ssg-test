import { IResolvers } from '@graphql-tools/utils';
import {
  Employee,
  GetEmployeeRequest,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  DeleteEmployeeRequest,
  EmployeesResponse,
  DeleteEmployeeResponse
} from './employee.types';
import client from '../../grpcClient';

export const employeeResolvers: IResolvers = {
  Query: {
    getEmployee: async (_: any, { id }: GetEmployeeRequest): Promise<Employee> => {
      return new Promise((resolve, reject) => {
        client.getEmployee({ id }, (error: any, response: Employee) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    },
    getAllEmployees: async (): Promise<Employee[]> => {
      return new Promise((resolve, reject) => {
        client.getAllEmployees({}, (error: any, response: EmployeesResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(response.employees);
          }
        });
      });
    },
  },
  Mutation: {
    createEmployee: async (_: any, { name, position, salary }: CreateEmployeeRequest): Promise<Employee> => {
      return new Promise((resolve, reject) => {
        client.createEmployee({ name, position, salary }, (error: any, response: Employee) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    },
    updateEmployee: async (_: any, { id, name, position, salary }: UpdateEmployeeRequest): Promise<Employee> => {
      return new Promise((resolve, reject) => {

        client.updateEmployee({ id, name, position, salary }, (error: any, response: Employee) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    },
    deleteEmployee: async (_: any, { id }: DeleteEmployeeRequest): Promise<string> => {
      return new Promise((resolve, reject) => {
        client.deleteEmployee({ id }, (error: any, response: DeleteEmployeeResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(response.message);
          }
        });
      });
    },
  },
};