import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { getEmployee, getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from './employee.service';

const PROTO_PATH = path.join(__dirname, '../../proto/employee.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const employeeProto: any = grpc.loadPackageDefinition(packageDefinition).employee;

export const employeeController = {
  service: employeeProto.EmployeeService.service,
  implementations: {
    getEmployee,
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
  }
};