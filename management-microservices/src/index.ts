import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { AppDataSource } from './database/data-source';
import { employeeController } from './modules/employee';

const PROTO_PATH = path.join(__dirname, '../src/proto/employee.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const employeeProto: any = grpc.loadPackageDefinition(packageDefinition).employee;

const server = new grpc.Server();

AppDataSource.initialize().then(() => {
  server.addService(employeeProto.EmployeeService.service, employeeController.implementations);

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server running at http://0.0.0.0:50051');
    server.start();
  });
}).catch(error => console.log('TypeORM connection error: ', error));