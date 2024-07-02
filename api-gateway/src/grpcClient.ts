import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../src/proto/employee.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const employeeProto: any = grpc.loadPackageDefinition(packageDefinition).employee;

const grpcServerAddress = process.env.GRPC_SERVER || 'localhost:50051';
const client = new employeeProto.EmployeeService(grpcServerAddress, grpc.credentials.createInsecure());

export default client;