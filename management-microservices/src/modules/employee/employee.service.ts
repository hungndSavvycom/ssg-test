import * as grpc from '@grpc/grpc-js';
import { AppDataSource } from "../../database/data-source";
import { Employee } from "../../database/entities/employee.entity";

export const getEmployee = async (call, callback) => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({ id: call.request.id });
  callback(null, employee);
};

export const getAllEmployees = async (call, callback) => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const employees = await employeeRepository.find({ order: { id: 'ASC' } });
  callback(null, { employees });
};

export const createEmployee = async (call, callback) => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const employee = employeeRepository.create(call.request);
  await employeeRepository.save(employee);
  callback(null, employee);
};

export const updateEmployee = async (call, callback) => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({ id: call.request.id });
  if (employee) {
    Object.assign(employee, call.request);

    await employeeRepository.save(employee);
    callback(null, employee);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Not Found"
    });
  }
};

export const deleteEmployee = async (call, callback) => {
  const employeeRepository = AppDataSource.getRepository(Employee);
  const result = await employeeRepository.delete(call.request.id);
  if (result.affected) {
    callback(null, { message: "Employee deleted" });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Not Found"
    });
  }
};